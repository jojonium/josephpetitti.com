/* (c) 2022 Joseph Petitti | https://josephpetitti.com/license.txt */

interface PaintSettings {
  tileWidth: number,
  tileHeight: number,
  pixelsPerSide: number,
  pixelSize: number,
  gapSize: number,
  bgColor: string,
  doneColor: string,
  currentColor: string,
  sleepTime: number
}

class Tile {
  public readonly id: number;
  public top = '';
  public right = '';
  public bottom = '';
  public left = '';
  public contents: string[][]
  constructor(contents: string) {
    const [idLine, ...lines] = contents.split("\n");
    this.contents = lines.map(s => s.trim().split(''));
    this.id = +idLine.split(":")[0].split(" ")[1];
    this.updateSides();
  }

  private updateSides(): Tile {
    this.top = this.contents[0].join('');
    this.bottom = this.contents[this.contents.length - 1].join('');
    this.right = this.contents.map(l => l[l.length - 1]).join('');
    this.left = this.contents.map(l => l[0]).join('');
    return this;
  }

  public flipX(): Tile {
    this.contents = this.contents.map(l => l.reverse());
    this.updateSides();
    return this;
  }

  public flipY(): Tile {
    this.contents = this.contents.reverse();
    this.updateSides();
    return this;
  }

  public rotate(n = 1): Tile {
    if (n === 0) return this;
    for (let turns = 0; turns < n; turns++) {
      this.contents =
        this.contents.map((_, i) => this.contents.map(x => x[i]).reverse())
    }
    this.updateSides();
    return this;
  }

  public prettyPrint(): String {
    return this.contents.map(s => s.join('')).join('\n');
  }

  private try(
    above?: Tile,
    toRight?: Tile,
    below?: Tile,
    toLeft?: Tile
  ): boolean {
    return (above === undefined || this.top === above.bottom) &&
      (toRight === undefined || this.right === toRight.left) &&
      (below === undefined || this.bottom === below.top) &&
      (toLeft === undefined || this.left === toLeft.right);
  }

  public async fit(
    ctx: CanvasRenderingContext2D,
    settings: PaintSettings,
    full: (Tile | undefined)[][],
    x: number,
    y: number
  ): Promise<Tile | false> {
    const above = (full[x] ?? [])[y - 1];
    const toRight = (full[x + 1] ?? [])[y];
    const below = (full[x] ?? [])[y + 1];
    const toLeft = (full[x - 1] ?? [])[y];
    await paint(ctx, settings, this, x, y, true);
    for (let n = 0; n <= 3; ++n) {
      this.rotate(1);
      // Normal
      if (this.try(above, toRight, below, toLeft)) {
        return this;
      }

      // Flipped X
      this.flipX();
      if (this.try(above, toRight, below, toLeft)) {
        return this;
      }

      // Flipped Y
      this.flipX();
      this.flipY();
      if (this.try(above, toRight, below, toLeft)) {
        return this;
      }

      // Flipped X and Y
      this.flipX();
      if (this.try(above, toRight, below, toLeft)) {
        return this;
      }
      this.flipX();
      this.flipY();
    }
    return false;
  }
}

const sort = (tiles: Tile[]): {
  corners: {t: Tile, tu: boolean, ru: boolean, bu: boolean, lu: boolean}[],
  edges: Tile[],
  middle: Tile[]
} => {
  const corners: {t: Tile, tu: boolean, ru: boolean, bu: boolean, lu: boolean}[] = [];
  const edges: Tile[] = [];
  const middle: Tile[] = [];
  for (const tile of tiles) {
    const others = tiles.filter(x => x !== tile).map(t => [
      t.top, t.top.split('').reverse().join(''),
      t.right, t.right.split('').reverse().join(''),
      t.bottom, t.bottom.split('').reverse().join(''),
      t.left, t.left.split('').reverse().join(''),
    ]);
    let topAppearances = 0;
    let rightAppearances = 0;
    let bottomAppearances = 0;
    let leftAppearances = 0;
    for (const other of others) {
      if (other.includes(tile.top)) topAppearances++;
      if (other.includes(tile.right)) rightAppearances++;
      if (other.includes(tile.bottom)) bottomAppearances++;
      if (other.includes(tile.left)) leftAppearances++;
    }
    let c = 0;
    if (topAppearances === 0) c++;
    if (rightAppearances === 0) c++;
    if (bottomAppearances === 0) c++;
    if (leftAppearances === 0) c++;
    if (c === 2) {
      corners.push({
        t: tile,
        tu: topAppearances === 0,
        ru: rightAppearances === 0,
        bu: bottomAppearances === 0,
        lu: leftAppearances === 0
      });
    }
    else if (c === 1) edges.push(tile);
    else if (c === 0) middle.push(tile);
    else console.error("That's not supposed to happen! " + c);
  }
  return {corners, edges, middle}
}

const solve = async (
  tiles: Tile[],
  ctx: CanvasRenderingContext2D,
  settings: PaintSettings
): Promise<Tile[][]> => {
  const sorted = sort(tiles);
  const dimensions = Math.sqrt(tiles.length);
  const image = new Array<(Tile | undefined)[]>(dimensions);
  for (let i = 0; i < dimensions; ++i) {
    image[i] = new Array<Tile | undefined>(dimensions);
    image[i].fill(undefined);
  }
  // Rotate a corner piece until its unique sides are top and left
  const {t: tile, tu, ru, bu, lu} = sorted.corners.shift()!!;
  let rotations = 0;
  if (bu && lu) rotations = 1;
  else if (ru && bu) rotations = 2;
  else if (tu && ru) rotations = 3;
  for (let r = 0; r < rotations; r++) {
    await paint(ctx, settings, tile, 0, 0, true);
    tile.rotate();
  }
  image[0][0] = tile;
  await paint(ctx, settings, tile, 0, 0, false);

  const slotIn = async (
    x: number, y: number, pool: Tile[]
  ): Promise<Tile> => {
    for (let e = pool.length - 1; e >= 0; e--) {
      const fit = await
        pool[e].fit(ctx, settings, image, x, y);
      if (fit !== false) {
        image[x][y] = fit;
        await paint(ctx, settings, fit, x, y, false);
        return fit;
      }
    }
    throw new Error(`Nothing fits in ${x},${y}`);
  }

  // Fill in the left edge of the puzzle
  for (let y = 1; y < dimensions - 1; y++) {
    const slot = await slotIn(0, y, sorted.edges);
    sorted.edges = sorted.edges.filter(e => e !== slot);
  }

  // Fill in bottom left corner
  let slot = await slotIn(0, dimensions - 1, sorted.corners.map(c => c.t));
  sorted.corners = sorted.corners.filter(c => c.t !== slot);

  // Fill in the bottom edge of the puzzle
  for (let x = 1; x < dimensions - 1; x++) {
    const slot = await slotIn(x, dimensions - 1, sorted.edges);
    sorted.edges = sorted.edges.filter(e => e !== slot);
  }

  // Fill in bottom right corner
  slot = await slotIn(dimensions - 1, dimensions - 1, sorted.corners.map(c => c.t));
  sorted.corners = sorted.corners.filter(c => c.t !== slot);

  // Fill in the right edge of the puzzle
  for (let y = dimensions - 2; y > 0; y--) {
    const slot = await slotIn(dimensions - 1, y, sorted.edges);
    sorted.edges = sorted.edges.filter(e => e !== slot);
  }

  // Fill in top right corner
  slot = await slotIn(dimensions - 1, 0, sorted.corners.map(c => c.t));
  sorted.corners = sorted.corners.filter(c => c.t !== slot);

  // Fill in the top edge of the puzzle
  for (let x = dimensions - 2; x > 0; x--) {
    const slot = await slotIn(x, 0, sorted.edges);
    sorted.edges = sorted.edges.filter(e => e !== slot);
  }

  // Fill in the center of the puzzle in a spiral
  for (let o = 1; o < dimensions / 2; o++) {
    for (let x = o; x < dimensions - o; x++) {
      slot = await slotIn(x, o, sorted.middle);
      sorted.middle = sorted.middle.filter(e => e !== slot);
    }
    for (let y = o + 1; y < dimensions - o; y++) {
      const x = dimensions - o - 1;
      slot = await slotIn(x, y, sorted.middle);
      sorted.middle = sorted.middle.filter(e => e !== slot);
    }
    for (let x = dimensions - o - 2; x >= o; x--) {
      const y = dimensions - o - 1;
      slot = await slotIn(x, y, sorted.middle);
      sorted.middle = sorted.middle.filter(e => e !== slot);
    }
    for (let y = dimensions - o - 2; y > o; y--) {
      slot = await slotIn(o, y, sorted.middle);
      sorted.middle = sorted.middle.filter(e => e !== slot);
    }
  }

  return image as Tile[][];
};

const printImage = (image: (Tile | undefined)[][]): string => {
  let str = '';
  for (let y = 0; y < image[0].length; ++y) {
    for (let l = 0; l < 10; ++l) {
      for (let x = 0; x < image.length; ++x) {
        let temp = (image[x][y] === undefined)
          ? ' '.repeat(10)
          : image[x][y]?.contents[l].join('')
        str += temp + ' ';
      }
      str += '\n';
    }
    str += '\n';
  }
  return str;
}

const paragraphsAsStrings = async (filename: string): Promise<string[]> => {
  const fetchResponse = await fetch(filename);
  const text = await fetchResponse.text();
  return text.trim().split("\n\n");
};

const wait = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => {
    resolve()
  }, ms));
}

const paint = async (
  ctx: CanvasRenderingContext2D,
  settings: PaintSettings,
  tile: Tile,
  x: number,
  y: number,
  active = false,
  noSleep = false
) => {
  if (!noSleep) await wait(settings.sleepTime);
  const xOffset = x * settings.pixelsPerSide * settings.pixelSize
    + settings.gapSize * x
  const yOffset = y * settings.pixelsPerSide * settings.pixelSize
    + settings.gapSize * y

  ctx.save();
  ctx.fillStyle = settings.bgColor;
  ctx.fillRect(
    xOffset,
    yOffset,
    settings.pixelsPerSide * settings.pixelSize,
    settings.pixelsPerSide * settings.pixelSize
  );

  ctx.fillStyle = active ? settings.currentColor : settings.doneColor;
  for (let i = 0; i < tile.contents.length; i++) {
    for (let j = 0; j < tile.contents[i].length; j++) {
      if (tile.contents[i][j] !== '#') continue;
      ctx.fillRect(
        xOffset + (j * settings.pixelSize),
        yOffset + (i * settings.pixelSize),
        settings.pixelSize,
        settings.pixelSize
      );
    }
  }
  ctx.restore();
}

const start = async (tiles: Tile[], ctx: CanvasRenderingContext2D, cs: PaintSettings) => {
  const totalWidth = cs.tileWidth * cs.pixelsPerSide * cs.pixelSize
    + cs.gapSize * (cs.tileWidth - 1);
  const totalHeight = cs.tileHeight * cs.pixelsPerSide * cs.pixelSize
    + cs.gapSize * (cs.tileHeight - 1);
  ctx.save();
  ctx.fillStyle = cs.bgColor;
  ctx.fillRect(0, 0, totalWidth, totalHeight);
  ctx.restore();
  await solve(tiles, ctx, cs);
};

(async () => {
  const input = await paragraphsAsStrings('puzzle-input.txt');
  const tiles = input.map((para: string) => new Tile(para));
  const cs: PaintSettings = {
    tileWidth: Math.floor(Math.sqrt(tiles.length)),
    tileHeight: Math.floor(Math.sqrt(tiles.length)),
    pixelsPerSide: 10,
    pixelSize: 4,
    gapSize: 1,
    bgColor: '#1f0053',
    doneColor: '#3066be',
    currentColor: '#f1a208',
    sleepTime: 1
  }

  const canvas = document.getElementById('puzzle-canvas') as HTMLCanvasElement;
  if (!canvas) throw new Error("Couldn't get canvas");
  canvas.width = cs.tileWidth * cs.pixelsPerSide * cs.pixelSize
    + cs.gapSize * (cs.tileWidth - 1);
  canvas.height = cs.tileHeight * cs.pixelsPerSide * cs.pixelSize
    + cs.gapSize * (cs.tileHeight - 1);
  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("Couldn't get 2D canvas context");
  ctx.save();
  ctx.fillStyle = cs.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  const button = document.getElementById('start-button') as HTMLButtonElement;
  if (!button) throw new Error("Couldn't get start button");
  button.addEventListener("click", async () => {
    button.disabled = true;
    await start(tiles, ctx, cs);
    button.disabled = false;
  });
})();
