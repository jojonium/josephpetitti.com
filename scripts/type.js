// create global canvas
var canvas = document.createElement('canvas');
canvas.id = 'globalCanvas';
canvas.width = 400;
canvas.height = 800;
var ctx = canvas.getContext("2d");
document.getElementById('canvas-holder').appendChild(canvas);

// other global variables
var then, scoreSpan, multiplierSpan, comboSpan;
var enemies = [];
var particles = [];
var globActive = undefined; // true if in the middle of typing a word
var score = 0;
var multiplier = 1;
var combo = 0;
var speedFactor = 1;
var maxWordLen = 5;

var Enemy = function(text) {
	this.text = text;
	this.remaining = text;
	this.next = text.charAt(0);
	ctx.font = "bold 18px sans-serif";
	this.x = Math.floor(Math.random() * (400 - ctx.measureText(text).width));
	this.y = 12;
};

var Particle = function(x, y) {
	this.x = x;
	this.y = y;
	var mag = Math.random() * 5;
	var life = Math.floor(Math.random() * 60);
	this.dir = Math.random() * Math.PI * 2;
	this.xvel = Math.cos(this.dir) * mag;
	this.yvel = Math.sin(this.dir) * mag;
	this.lifetime = 5 + life;
};

Particle.prototype = {
	draw: function() {
		ctx.save();
		ctx.fillStyle = "#4f92ff";
		ctx.fillRect(this.x - 4, this.y - 4, 8, 8);
		ctx.restore();
	}
};

Enemy.prototype = {
	draw: function() {
		ctx.save();
		ctx.font = "bold 18px sans-serif";
		ctx.textBaseline = "top";
		if (globActive && globActive.text == this.text) ctx.fillStyle = "#5668aa";
		else ctx.fillStyle = "#815f40";
		var width = ctx.measureText(this.text).width;
		ctx.fillRect(this.x - 5, this.y - 5, width + 10, 18 + 10); // background
		ctx.fillStyle = "#ffffff";
		ctx.fillText(this.remaining, this.x /*+ (ctx.measureText(this.text.replace(this.remaining, '')))*/, this.y); // text
		ctx.restore();
	}
};

document.getElementById('start').onclick = function() { 
	then = Date.now();

	scoreSpan = document.getElementById("score-span");
	multiplierSpan = document.getElementById("multiplier-span");
	comboSpan = document.getElementById("combo-span");

	document.addEventListener('keypress', function(e) {
		e.preventDefault();
		type(e);
	});
	
	document.getElementById('start').disabled = "true";
	main();
};

var main = function() {
	var now = Date.now();
	var delta = now - then;

	if (delta > 1000) {
		var newWord = getWord(3, maxWordLen);
		enemies.push(new Enemy(newWord));
		speedFactor += .02;
		maxWordLen += .08;
		then = now;
	}
	update();
	render();

	// check for lose
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].y > (800 - 24)) {
			return 1;
		}
	}
	requestAnimationFrame(main);
};

var update = function() {
	// move enemies down
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].y += speedFactor;
	}

	for (var i = 0; i < particles.length; i++) {
		particles[i].x += particles[i].xvel;
		particles[i].y += particles[i].yvel;
		particles[i].lifetime--;
        particles[i].lifetime *= 0.9;
	}
	particles = particles.filter(particle => particle.lifetime > 0);

	// calculate multiplier
	if (combo > 64) {
		multiplier = 5;
	} else if (combo > 32) {
		multiplier = 4;
	} else if (combo > 16) {
		multiplier = 3;
	} else if (combo > 8) {
		multiplier = 2;
	} else {
		multiplier = 1;
	}
};

var render = function() {
	// clear canvas
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 400, 800);

	for (var i = 0; i < particles.length; i++) {
		particles[i].draw();
	};
	
	// draw enemies
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();
	};

	// show stats
	scoreSpan.innerHTML = score;
	comboSpan.innerHTML = combo;
	multiplierSpan.innerHTML = multiplier;
};

var getWord = function(low, high) {
	var len = Math.floor(Math.random() * (high - low)) + low;
	return dictionary[len][Math.floor(Math.random() * dictionary[len].length)];
};

/* typing engine */
var type = function(e) {
	if (globActive) { // if in a word
		if (e.key == globActive.remaining.charAt(0)) { // if hit
			score += multiplier;
			combo++;
			if (globActive.remaining.length > 1) { // word still has more letters
				globActive.remaining = globActive.remaining.slice(1);
			} else { // word finished
				var index = enemies.indexOf(globActive);
				for (var i = 0; i < 30; i++) {
					particles.push(new Particle(enemies[index].x, enemies[index].y));
				}
				enemies.splice(index, 1);
				globActive = undefined;
			}
		} else { // miss
			combo = 0;
		}
	} else { // not in a word
		// search for the first applicable word
		for (var i = 0; i < enemies.length; i++) {
			if (e.key == enemies[i].remaining.charAt(0)) {
				enemies[i].remaining = enemies[i].remaining.slice(1);
				globActive = enemies[i];
				score += multiplier;
				combo++;
				return 1;
			}
		}
		combo = 0;
	}
};
