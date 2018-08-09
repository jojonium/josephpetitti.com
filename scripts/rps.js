var h = 800;
var w = 1600;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var flag = false;
var dotFlag = false;
var clr = 'red';
var canvas, ctx, c, cnext, x, y, d, level, r, x1, x2, y1, y2, cloc, p, power;
var running = false;

function start() {
	// initialize canvas
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0, 0, w, h);	// fill canvas with white
	
	// initialize power	
	power = new Array(w);
	for (x = 0; x < w; x++) {
		power[x] = new Array(h);
		for (y = 0; y < h; y++) {
			power[x][y] = 0;
		}
	}
	
	cnext = ctx.getImageData(0, 0, w, h);
	c = ctx.getImageData(0, 0, w, h);
	
	initDraw();
	
	document.getElementById("start").addEventListener("click", function() {
		if (!running) {
			document.getElementById("start").innerHTML = "Stop";
			running = true;
			run();
		} else {
			document.getElementById("start").innerHTML = "Start";
			running = false;
		}
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
			ctx.beginPath();
			ctx.fillStyle = clr;
			ctx.fillRect(currX, currY, 2, 2);
			ctx.closePath();
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
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = clr;
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();
	sharpenColors();
}

function pickColor(obj) {
	clr = obj.style.backgroundColor;
}

function run() {
	//cnext = ctx.getImageData(0, 0, w, h);
	c = ctx.getImageData(0, 0, w, h);
	
	for (x = 0; x < w; x++) {
		for(y = 0; y < h; y++) {
			p = pickRandomNeighbor();
			if (c.data[(x+y*w)*4+1] > 128) { // if white or green
				if (p.r > 128 && p.g < 128 && p.b < 128 && p.p > 0) { // if neighbor is red and power > 0
					cnext.data[(x+y*w)*4+0] = 255;
					cnext.data[(x+y*w)*4+1] = 0;
					cnext.data[(x+y*w)*4+2] = 0;
					cnext.data[(x+y*w)*4+3] = 255;
					if (c.data[(x+y*w)*4+3] < 128) {	// gain power for eating green, lose it for eating white
						power[x][y] = p.p + 1;
					} else {
						power[x][y] = p.p - 1;
					}
				}
			} if (c.data[(x+y*w)*4+2] > 128) { // if white or blue
				if (p.r < 128 && p.g > 128 && p.b < 128 && p.p > 0) { // if neighbor is green and power > 0
					cnext.data[(x+y*w)*4+0] = 0;
					cnext.data[(x+y*w)*4+1] = 255;
					cnext.data[(x+y*w)*4+2] = 0;
					cnext.data[(x+y*w)*4+3] = 255;
					if (c.data[(x+y*w)*4+0] < 128) {	// gain power for eating blue, lose it for eating white
						power[x][y] = p.p + 1;
					} else {
						power[x][y] = p.p - 1;
					}
				}
			} if (c.data[(x+y*w)*4+0] > 128) { // if white or red
				if (p.r < 128 && p.g < 128 && p.b > 128 && p.p > 0) { // if neighbor is blue and power > 0
					cnext.data[(x+y*w)*4+0] = 0;
					cnext.data[(x+y*w)*4+1] = 0;
					cnext.data[(x+y*w)*4+2] = 255;
					cnext.data[(x+y*w)*4+3] = 255;
					if (c.data[(x+y*w)*4+1] < 128) {	// gain power for eating red, lose it for eating white
						power[x][y] = p.p + 1;
					} else {
						power[x][y] = p.p - 1;
					}
				}
			}
		}
	}
	
	// write cnext into c
	for (i = 0; i < cnext.data.length; i++) {
		c.data[i] = cnext.data[i];
	}
	
	ctx.putImageData(c, 0, 0);
	
	if (running) {
		setTimeout(run, 1);
	}
}

function pickRandomNeighbor() {
	r = Math.floor(Math.random() * 8);

	// set offsets and check for wrap around
	y1 = (y - 1 >= 0) ? y - 1 : h - 1; // above
	y2 = (y + 1 <= h - 1) ? y + 1 : 0; // below
	x1 = (x + 1 <= w - 1) ? x + 1 : 0; // right
	x2 = (x - 1 >= 0) ? x - 1 : w - 1; // left
	
	switch(r) {
		case 0:
			cloc = (x+y1*w)*4; // top
			r = power[x][y1];
			break;
		case 1:
			cloc = (x1+y1*w)*4; // top right
			r = power[x1][y1];
			break;
		case 2:
			cloc = (x1+y*w)*4; // right
			r = power[x1][y];
			break;
		case 3:
			cloc = (x1+y2*w)*4; // bottom right
			r = power[x1][y2];
			break;
		case 4:
			cloc = (x+y2*w)*4; // bottom
			r = power[x][y2];
			break;
		case 5:
			cloc = (x2+y2*w)*4; // bottom left
			r = power[x2][y2];
			break;
		case 6:
			cloc = (x2+y*w)*4; // left
			r = power[x2][y];
			break;
		case 7:
			cloc = (x2+y1*w)*4; // top left
			r = power[x2][y1];
			break;
	}
	
	return {r: c.data[cloc],
			g: c.data[cloc+1],
			b: c.data[cloc+2],
			a: c.data[cloc+3],
			p: r}
}

function sharpenColors() {
	c = ctx.getImageData(0, 0, w, h);
	
	for (x = 0; x < w; x++) {
		for(y = 0; y < h; y++) {
			if (c.data[(x+y*w)*4+0] > 128 && c.data[(x+y*w)*4+1] > 128 && c.data[(x+y*w)*4+2] > 128) {
				cnext.data[(x+y*w)*4+0] = 255;
				cnext.data[(x+y*w)*4+1] = 255;
				cnext.data[(x+y*w)*4+2] = 255;
				cnext.data[(x+y*w)*4+3] = 255;
			} else {
				cloc = (x+y*w)*4;
				if (c.data[cloc+0] > 128) {
					cnext.data[cloc+0] = 255;
					power[x][y] = 10;
				} else {
					cnext.data[cloc+0] = 0;
				}
				if (c.data[cloc+1] > 128) {
					cnext.data[cloc+1] = 255;
					power[x][y] = 10;
				} else {
					cnext.data[cloc+1] = 0;
				}
				if (c.data[cloc+2] > 128) {
					cnext.data[cloc+2] = 255;
					power[x][y] = 10;
				} else {
					cnext.data[cloc+2] = 0;
				}
			}
		}
	}
	
	ctx.putImageData(cnext, 0, 0);
	
}