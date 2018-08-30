// create global canvas
var canvas = document.createElement('canvas');
canvas.id = 'globalCanvas';
canvas.width = 400;
canvas.height = 800;
var ctx = canvas.getContext("2d");

// other global variables
var then;
var enemies = [];
var globActive = undefined; // true if in the middle of typing a word

var Enemy = function(text) {
	this.text = text;
	this.remaining = text;
	this.next = text.charAt(0);
	ctx.font = "bold 18px sans-serif";
	this.x = Math.floor(Math.random() * (400 - ctx.measureText(text).width));
	this.y = 12;
};

Enemy.prototype = {
	draw: function() {
		ctx.save();
		ctx.font = "bold 18px sans-serif";
		ctx.textBaseline = "top";
		if (globActive && globActive.text == this.text) ctx.fillStyle = "#5668aa";
		else ctx.fillStyle = "#815f40";
		var width = ctx.measureText(this.text).width;
		ctx.fillRect(this.x - 5, this.y - 5, width + 10, 18 + 10) // background
		ctx.fillStyle = "#ffffff";
		ctx.fillText(this.remaining, this.x /*+ (ctx.measureText(this.text.replace(this.remaining, '')))*/, this.y); // text
		ctx.restore();
	}
};

window.onload = function() { 
	then = Date.now();
	document.getElementById('canvas-holder').appendChild(canvas);

	document.addEventListener('keypress', function(e) {
		e.preventDefault();
		type(e);
	});
	main();
};

var main = function() {
	var now = Date.now();
	var delta = now - then;

	if (delta > 1000) {
		var newWord = getWord(3, 9);
		enemies.push(new Enemy(newWord));
		then = now;
	}
	update();
	render();


	requestAnimationFrame(main);
};

var update = function() {
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].y += 1;
	}
};

var render = function() {
	// clear canvas
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 400, 800);

	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();
	};
	
};

var getWord = function(low, high) {
	var len = Math.floor(Math.random() * (high - low)) + low;
	return dictionary[len][Math.floor(Math.random() * dictionary[len].length)];
};

/* typing engine */
var type = function(e) {
	if (globActive) { 
		if (e.key == globActive.remaining.charAt(0)) {
			if (globActive.remaining.length > 1) {
				globActive.remaining = globActive.remaining.slice(1);
			} else { // word finished
				var index = enemies.indexOf(globActive);
				enemies.splice(index, 1);
				globActive = undefined;
			}
		}
	} else {
		// search for the first applicable word
		for (var i = 0; i < enemies.length; i++) {
			if (e.key == enemies[i].remaining.charAt(0)) {
				enemies[i].remaining = enemies[i].remaining.slice(1);
				globActive = enemies[i];
				return 1;
			}
		}
	}
};
