class Point {
	constructor(c, p) {
		this.color = c;  // 0=white, 1=red, 2=green, 3=blue
		this.power = p;
	}
	
	setClr(clr, x, y, powerIn) {
		cnt[p[x][y].color]--;
		if (clr === 'white' || clr === 0) {
			this.color = 0;
		} else if (clr === 'red' || clr === 1) {
			this.color = 1;
		} else if (clr === 'lime' || clr === 2) {
			this.color = 2;
		} else if (clr === 'blue' || clr === 3) {
			this.color = 3;
		} else if (clr === 'black' || clr === 4) {
			this.color = 4;
		}
		this.power = powerIn;
		cnt[this.color]++;
		ctx.putImageData(pixels[this.color], x, y);
	}
}

var h = 800;
var w = 1600;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var flag = false;
var clr = 'red';
var count = 0;
var cnt = new Array(h * w, 0, 0, 0, 0);
var canvas, ctx, p, np, i, j, slope, pixels, temp, neighbor, rcounter, gcounter, bcounter, oldCount;

function start() {
	// initialize canvas
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0, 0, w, h);	// fill canvas with white
	var counter = document.getElementById('counter');
	rcounter = document.getElementById('color-1');
	gcounter = document.getElementById('color-2');
	bcounter = document.getElementById('color-3');
	
	// initialize array of points
	p = new Array(w);
	for (i = 0; i < w; i++) {
		p[i] = new Array(h);
		for (j = 0; j < h; j++) {
			p[i][j] = new Point(0, 0);
		}
	}
	
	// initialize np and oldCount
	np = p.slice();	
	oldCount = cnt.slice();
	
	// initialize pixels
	pixels = [];
	
	// white
	temp = ctx.createImageData(1, 1);
	temp.data[0] = 255;
	temp.data[1] = 255;
	temp.data[2] = 255;
	temp.data[3] = 255;
	pixels.push(temp);
	
	// red
	temp = ctx.createImageData(1, 1);
	temp.data[0] = 255;
	temp.data[1] = 0;
	temp.data[2] = 0;
	temp.data[3] = 255;
	pixels.push(temp);
	
	// green
	temp = ctx.createImageData(1, 1);
	temp.data[0] = 0;
	temp.data[1] = 255;
	temp.data[2] = 0;
	temp.data[3] = 255;
	pixels.push(temp);
	
	// blue
	temp = ctx.createImageData(1, 1);
	temp.data[0] = 0;
	temp.data[1] = 0;
	temp.data[2] = 255;
	temp.data[3] = 255;
	pixels.push(temp);
	
	// black
	temp = ctx.createImageData(1, 1);
	temp.data[0] = 0;
	temp.data[1] = 0;
	temp.data[2] = 0;
	temp.data[3] = 255;
	pixels.push(temp);
	
	initDraw();
	
	document.getElementById('start').addEventListener("click", function() {
		run();
	});
}

// initialize drawing on the canvas
function initDraw() {
	canvas.addEventListener("mousemove", function(e) {
		findxy('move', e);
	}, false);
	canvas.addEventListener("mousedown", function(e) {
		findxy('down', e);
	}, false);
	canvas.addEventListener("mouseup", function(e) {
		findxy('up', e);
	}, false);
	canvas.addEventListener("mouseout", function(e) {
		findxy('out', e);
	}, false);
}
	
// helper function for drawing
function findxy(res, e) {
	if (res == 'down') {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;
		
		flag = true;
		dotFlag = true;
		
		// make dots 2x2 so they look better
		if (dotFlag) {
			np[currX][currY].setClr(clr, currX, currY, 10);
			np[wrapRight(currX)][currY].setClr(clr, wrapRight(currX), currY, 10);
			np[currX][wrapDown(currY)].setClr(clr, currX, wrapDown(currY), 10);
			np[wrapRight(currX)][wrapDown(currY)].setClr(clr, wrapRight(currX), wrapDown(currY), 10);
			dotFlag = false;
		}
	}
	if (res == 'up' || res == 'out') {
		flag = false;
	}
	if (res == 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;
			draw();
		}
	}
}

function draw() {
	np[prevX][prevY].setClr(clr, prevX, prevY, 25)
	slope = (currY - prevY) / (currX - prevX);
	i = prevX;
	j = prevY;
	while (i != currX) {
		if (currX > prevX) j += Math.round(slope); // moving right
		else j -= Math.round(slope); // moving left
		//console.log(i + ", " + j);
		np[i][j].setClr(clr, i, j, 25);
		i = (i < currX) ? i + 1 : i - 1;
	}
	np[currX][currY].setClr(clr, currX, currY, 25);
	rcounter.innerHTML = prettify(cnt[1]);
	gcounter.innerHTML = prettify(cnt[2]);
	bcounter.innerHTML = prettify(cnt[3]);
	document.getElementById('color-4').innerHTML = prettify(cnt[4]);
}

function pickColor(obj) {
	clr = obj.style.backgroundColor;
}

function wrapRight(x) {
	return (x < w - 1) ? x + 1 : 0;
}

function wrapDown(y) {
	return (y < h - 1) ? y + 1 : 0;
}

function wrapLeft(x) {
	return (x > 0) ? x - 1 : w - 1;
}

function wrapUp(y) {
	return (y > 0) ? y - 1 : h - 1;
}

// run one frame of the simulation
function run() {
	oldCount = cnt.slice();
	p = np.slice();
	for (i = 0; i < w; i++) {
		for (j = 0; j < h; j++) {
			neighbor = pickRandomNeighbor();
			if (p[i][j].color === 0) { // if white
				if (neighbor.power > 0 && neighbor.power < 50) {
					np[i][j].setClr(neighbor.color, i, j, neighbor.power + 1);
				}
			} else if (p[i][j].color === 1 && neighbor.power > 0) { // if red
				if (neighbor.color === 2 /*&& Math.random() * oldCount[neighbor.color] < neighbor.power*/) {
					np[i][j].setClr(2, i, j, Math.max(neighbor.power - 1, 0));
				}
			} else if (p[i][j].color === 2 && neighbor.power > 0) { // if green
				if (neighbor.color === 3 /*&& Math.random() * oldCount[neighbor.color] < neighbor.power*/) {
					np[i][j].setClr(3, i, j, Math.max(neighbor.power - 1, 0));
				}
			} else if (p[i][j].color === 3 && neighbor.power > 0) { // if blue
				if (neighbor.color === 1 /*&& Math.random() * oldCount[neighbor.color] < neighbor.power*/) {
					np[i][j].setClr(1, i, j, Math.max(neighbor.power - 1, 0));
				}
			}
			/*if (count % 100 == 0) {
				if (np[i][j].color == 1) {
					np[i][j].power += parseInt(rcounter.innerHTML) / 10;
				} else if (np[i][j].color == 2) {
					np[i][j].power += parseInt(gcounter.innerHTML) / 10;
				} else if (np[i][j].color == 2) {
					np[i][j].power += parseInt(bcounter.innerHTML) / 10;
				}
			}*/
		}
	}
	
	count++;
	counter.innerHTML = count;
	rcounter.innerHTML = prettify(cnt[1]);
	gcounter.innerHTML = prettify(cnt[2]);
	bcounter.innerHTML = prettify(cnt[3]);
	document.getElementById('color-4').innerHTML = prettify(cnt[4]);
	setTimeout(run, 1);
}

function isSmallest(n) {
	return oldCount[n] < 1000 || oldCount[n] == Math.min(oldCount[1], oldCount[2], oldCount[3]);
}

function prettify(n) {
	if (n < 10000) return n;
	n = n / 1000;
	if (n < 100) {
		n = Math.round(n * 10);
		n /= 10;
		return n.toFixed(1) + 'k';
	}
	return Math.round(n).toString() + 'k';
}

function pickRandomNeighbor() {
	r = Math.floor(Math.random() * 8);
	switch(r) {
		case 0:
			// top
			return p[i][wrapUp(j)];
		case 1:
			// top right
			return p[wrapRight(i)][wrapUp(j)];
		case 2:
			// right
			return p[wrapRight(i)][j];
		case 3:
			// bottom right
			return p[wrapRight(i)][wrapDown(j)];
		case 4:
			// bottom
			return p[i][wrapDown(j)];
		case 5:
			// bottom left
			return p[wrapLeft(i)][wrapDown(j)];
		case 6:
			// left
			return p[wrapLeft(i)][j];
		case 7:
			// top left
			return p[wrapLeft(i)][wrapUp(j)];
	}
}