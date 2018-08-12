// CONSTANTS
var HERO_SIZE = 10;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var ctx, canvas, bg;
var platforms = [];

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var heroImg = ctx.createImageData(HERO_SIZE, HERO_SIZE);
for (var i = 0; i < heroImg.data.length; i+=4) {
	heroImg.data[i+0] = 255;
	heroImg.data[i+1] = 0;
	heroImg.data[i+2] = 0;
	heroImg.data[i+3] = 255;
}

// define the background image
var bg = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT)
for (var i = 0; i < bg.data.length; i+=4) {
	bg.data[i+0] = 255;
	bg.data[i+1] = 255;
	bg.data[i+2] = 255;
	bg.data[i+3] = 255;
}

// game objects
var hero = {
	pic: heroImg,
	xSpeed: 0, // movement speed in pixels per frame
	ySpeed: 0,
	x: 50,
	y: 450,
	grounded: false
};

var Platform = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this. width = width;
	this.height = height;
	this.pic = ctx.createImageData(width, height);
	for (var i = 0; i < this.pic.data.length; i+=4) {
		this.pic.data[i+0] = 0;
		this.pic.data[i+1] = 0;
		this.pic.data[i+2] = 0;
		this.pic.data[i+3] = 255;
	}
};

Platform.prototype = {
	checkHeroCollide: function() {
		var heroTop = hero.y;
		var heroBottom = hero.y + HERO_SIZE;
		var heroLeft = hero.x;
		var heroRight = hero.x + HERO_SIZE;
		
		var pfTop = this.y;
		var pfBottom = this.y + this.height;
		var pfLeft = this.x;
		var pfRight = this.x + this.width;
		
		// top collision
		if (heroBottom == pfTop && heroRight > pfLeft && heroLeft < pfRight) {
			hero.ySpeed = 0;
			return 2;
		}
		
		// bottom collision
		if (heroTop == pfBottom && heroRight > pfLeft && heroLeft < pfRight) {
			hero.ySpeed *= -.5
			return 1;
		}
		
		// left collision
		if (heroRight == pfLeft && ((heroTop < pfBottom && heroTop > pfTop) || (heroBottom > pfTop && heroBottom < pfBottom))) {
			hero.xSpeed = 0;
			return 1;
		}
		
		// right collision
		if (heroLeft == pfRight && ((heroTop < pfBottom && heroTop > pfTop) || (heroBottom > pfTop && heroBottom < pfBottom))) {
			hero.xSpeed = 0;
			return 1;
		}

		return 0;
	}
};


// make platforms
platforms.push(new Platform(100, 350, 100, 100));
platforms.push(new Platform(230, 300, 30, 10));
platforms.push(new Platform(300, 450, 100, 10));
platforms.push(new Platform(300, 150, 100, 10));

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
	if ([38, 40, 37, 39, 32].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

// update game objects
var update = function() {	
	// friction
	if (hero.xSpeed > 1) {
		hero.xSpeed--;
	} else if (hero.xSpeed < -1) {
		hero.xSpeed++;
	} else {
		hero.xSpeed = 0;
	}
	
	// gravity
	hero.ySpeed += !hero.grounded;
	

	if (37 in keysDown) { // player holding left
		hero.xSpeed-= 2;
	}
	
	if (39 in keysDown) { // player holding right
		hero.xSpeed+=2;
	}
	
	if (38 in keysDown || 32 in keysDown) { // player holding up or space
		if (hero.grounded) {
			hero.grounded = false;
			hero.ySpeed -= 20;
		}
	}
	
	/*if (40 in keysDown) { // player holding down
		hero.ySpeed++;
	}*/
	
	// MOVE Y
	for (var j = 0; j < Math.abs(hero.ySpeed); j++) {
		hero.y+= Math.sign(hero.ySpeed);
		
		// platform collision
		var gFlag = false;
		for (var p = 0; p < platforms.length; p++) {
			if (platforms[p].checkHeroCollide() == 2) {
				gFlag = true;
			}
		}
		hero.grounded = gFlag;
		
		// bounce off ceiling
		if (hero.y < 0) {
			hero.y = 0;
			hero.ySpeed *= -.5;
		}
	
		// hit ground
		if (hero.y > (CANVAS_HEIGHT - HERO_SIZE)) {
			hero.y = (CANVAS_HEIGHT - HERO_SIZE);
			hero.ySpeed = 0;
			hero.grounded = true;
		}
		
		if (38 in keysDown || 32 in keysDown) { // player holding up or space
			if (hero.grounded) {
				hero.grounded = false;
				hero.ySpeed -= 20;
			}
		}
		
		/*if (40 in keysDown) { // player holding down
			hero.ySpeed++;
		}*/
		
	}
	
	// MOVE X
	for (var i = 0; i < Math.abs(hero.xSpeed); i++) {
		hero.x+= Math.sign(hero.xSpeed);
		
		// platform collision
		var gFlag = false;
		for (var p = 0; p < platforms.length; p++) {
			if (platforms[p].checkHeroCollide() == 2) {
				gFlag = true;
			}
		}
		hero.grounded = gFlag;
		
		// bounce off edges
		if (hero.x < 0) {
			hero.x = 0;
			hero.xSpeed *= -.5;
		}
		if (hero.x > (CANVAS_WIDTH - 1 - HERO_SIZE)) {
			hero.x = (CANVAS_WIDTH - 1 - HERO_SIZE);
			hero.xSpeed *= -.5;
		}
	}
};

var render = function() {
	ctx.putImageData(bg, 0, 0);
	ctx.putImageData(hero.pic, hero.x, hero.y);
	for (var p = 0; p < platforms.length; p++) {
		ctx.putImageData(platforms[p].pic, platforms[p].x, platforms[p].y);
	}
};

var main = function() {
	update();
	render();
	
	requestAnimationFrame(main);
};

$("document").ready(function() {
	document.getElementById("canvas-holder").appendChild(canvas);
	main();
});