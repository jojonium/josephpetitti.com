// CONSTANTS
var HERO_SIZE = 10;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var FASTEST_PROJECTILE = 5;

// global variables
var platforms = [];
var projectiles = [];
var fireButtonDown = false;
var then;
var fps = [];

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
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

// hero
var hero = {
	pic: heroImg,
	xSpeed: 0, // movement speed in pixels per frame
	ySpeed: 0,
	x: 50,
	y: 450,
	grounded: false,
	direction: 1
};

// basic platform
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
	// returns string telling what side of the platform the thing collided with, otherwise returns ""
	checkCollide: function(otherX, otherY, otherWidth, otherHeight) {
		var otherTop = otherY;
		var otherBottom = otherY + otherHeight;
		var otherLeft = otherX;
		var otherRight = otherX + otherWidth;
		
		var pfTop = this.y;
		var pfBottom = this.y + this.height;
		var pfLeft = this.x;
		var pfRight = this.x + this.width;
		
		// top collision
		if (otherBottom == pfTop && otherRight > pfLeft && otherLeft < pfRight) {
			return "top";
		}
		
		// bottom collision
		if (otherTop == pfBottom && otherRight > pfLeft && otherLeft < pfRight) {
			return "bottom";
		}
		
		// left collision
		if (otherRight == pfLeft && ((otherTop < pfBottom && otherTop > pfTop) || (otherBottom > pfTop && otherBottom < pfBottom))) {
			return "left";
		}
		
		// right collision
		if (otherLeft == pfRight && ((otherTop < pfBottom && otherTop > pfTop) || (otherBottom > pfTop && otherBottom < pfBottom))) {
			return "right";
		}
		
		return "";
	}
};

var Gun = function(bulletSize, bulletSpeed)  {
	this.pic = ctx.createImageData(bulletSize, bulletSize);
	for (var i = 0; i < this.pic.data.length; i+=4) {
		this.pic.data[i+0] = 0;
		this.pic.data[i+1] = 0;
		this.pic.data[i+2] = 255;
		this.pic.data[i+3] = 255;
	}
	this.bulletSpeed = bulletSpeed;
	this.bulletSize = bulletSize;
};

Gun.prototype = {
	shoot: function() {
		projectiles.push({
			pic: this.pic,
			speed: hero.direction * this.bulletSpeed,
			x: (hero.x + HERO_SIZE / 2) - this.bulletSize / 2,
			y: (hero.y + HERO_SIZE / 2) - this.bulletSize / 2,
			size: this.bulletSize
		});
	}
};

// make platforms
platforms.push(new Platform(100, 150, 100, 300));
platforms.push(new Platform(230, 340, 70, 10));
platforms.push(new Platform(300, 450, 100, 10));
platforms.push(new Platform(300, 250, 100, 10));

var pistol = new Gun(4, 5);

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
	if ([38, 40, 37, 39, 32, 90].indexOf(e.keyCode) > -1) {
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
		hero.xSpeed = Math.max(hero.xSpeed - 2, -10);
		hero.direction = -1;
	} else if (39 in keysDown) { // player holding right
		hero.xSpeed = Math.min(hero.xSpeed + 2, 10);
		hero.direction = 1;
	}
	
	if (38 in keysDown || 32 in keysDown || 90 in keysDown) { // player holding up or space or Z
		if (hero.grounded) {
			hero.grounded = false;
			hero.ySpeed -= 15;
		}
	}
	
	if (88 in keysDown) { // shoot button down
		if (!fireButtonDown) { // prevents full auto
			pistol.shoot();
			fireButtonDown = true;
		}
	} else {
		fireButtonDown = false;
	}
	
	for (var i = 0; i < Math.max(Math.abs(hero.ySpeed), Math.abs(hero.xSpeed), FASTEST_PROJECTILE); i++) {
		var heroMoved = false;
		if (Math.abs(hero.xSpeed) > i) {
			hero.x += Math.sign(hero.xSpeed);
			heroMoved = true;
		}
		if (Math.abs(hero.ySpeed) > i) {
			hero.y += Math.sign(hero.ySpeed);
			heroMoved = true;
		}
		
		// if the hero moved we need to check if he collided with anything
		if (heroMoved) {
			var gFlag = false;
			for (var p = 0; p < platforms.length; p++) {
				// check platform collisions
				var collision = platforms[p].checkCollide(hero.x, hero.y, HERO_SIZE, HERO_SIZE);
				if (collision == "top") {
					hero.ySpeed = 0;
					gFlag = true;
				} else if (collision == "bottom") {
					hero.ySpeed = 0;
				} else if (collision == "left" || collision == "right") {
					hero.x-= Math.sign(hero.xSpeed);
					hero.xSpeed = 0;
				}
			}
			
			// check ceiling collision
			if (hero.y < 0) {
				hero.y = 0;
				hero.ySpeed = 0;
			}
			
			// check ground collision
			if (hero.y > (CANVAS_HEIGHT - HERO_SIZE)) {
				hero.y = (CANVAS_HEIGHT - HERO_SIZE);
				hero.ySpeed = 0;
			}
			
			// check wall collisions
			if (hero.x < 0) {
				hero.x = 0;
				hero.xSpeed = 0;
			}
			if (hero.x > (CANVAS_WIDTH - HERO_SIZE)) {
				hero.x = (CANVAS_WIDTH - HERO_SIZE);
				hero.xSpeed = 0;
			}
			// set grounded
			hero.grounded = gFlag || (hero.y == CANVAS_HEIGHT - HERO_SIZE);
		}		
		
		// now for the projectiles
		var toRemove = [];
		for (var j = 0; j < projectiles.length; j++) {
			if (Math.abs(projectiles[j].speed) > i) {
				projectiles[j].x += Math.sign(projectiles[j].speed);
				
				// check if the projectile hit anything
				for (var p = 0; p < platforms.length; p++) {
					if (platforms[p].checkCollide(projectiles[j].x, projectiles[j].y, projectiles[j].size, projectiles[j].size)
						|| projectiles[j].x <= 0 || projectiles[j].x >= (CANVAS_WIDTH - projectiles[j].size)
						|| projectiles[j].y <= 0 || projectiles[j].y >= (CANVAS_HEIGHT - projectiles[j].size)) {
						if (!toRemove.includes(j)) {
							toRemove.push(j);
						}
					}
				}
			}
		}
		
		// remove any projectiles that collided
		// we have to do this in reverse order so the array doesn't get messed up
		for (var r = toRemove.length - 1; r >= 0; r--) {
			projectiles.splice(toRemove[r], 1);
		}
	}
};

var render = function() {
	ctx.putImageData(bg, 0, 0);
	ctx.putImageData(hero.pic, hero.x, hero.y);
	for (var p = 0; p < platforms.length; p++) {
		ctx.putImageData(platforms[p].pic, platforms[p].x, platforms[p].y);
	}
	for (var p = 0; p < projectiles.length; p++) {
		ctx.putImageData(projectiles[p].pic, projectiles[p].x, projectiles[p].y);
	}
};

var main = function() {
	var now = Date.now();
	var delta = now - then;
	fps.push((1 / delta) * 1000);
	var sum = 0;
	if (fps.length > 25) {
		for (var i = 0; i < fps.length; i++) {
			sum+= fps[i];
		}
		$("#fps-counter").html(Math.round(sum / fps.length));
		fps = [];
	}
	
	update();
	render();
	
	then = now;
	
	requestAnimationFrame(main);
};

$("document").ready(function() {
	then = Date.now();
	document.getElementById("canvas-holder").appendChild(canvas);
	$('main').append("<p><span id='fps-counter'></span> frames per second</p>");
	main();
});