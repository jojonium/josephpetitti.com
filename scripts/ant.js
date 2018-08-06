// create global canvas
var canvas = document.createElement('canvas');
canvas.id = 'globalCanvas';
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

// global iteration counter and pause button
var iterationCount = 0;
var paused = false;


function langtonant(antx, optx) {
	'use strict';
	var x, y, i;
	
	// extend default opts
	var opts = {
		gridsize: 100,
		pixlsize: 4,
		interval: 4
	};
	for (i in optx) {
		opts[i] = optx[i];
	}
	
	// extend default ants
	var ants = [{
		x: 50,
		y: 50,
		d: 0,
		s: true
	}];
	for (i in antx) {
		ants[i] = antx[i];
	}
	
	// initialize grid
	var grid = [];
	for (x = 0; x < opts.gridsize; x++) {
		grid[x] = [];
		for (y = 0; y < opts.gridsize; y++) {
			grid[x][y] = true;
		}
	}
	
	// initialize directions
	var dirs = [
		{x: 1, y: 0},
		{x: 0, y: -1},
		{x: -1, y: 0},
		{x: 0, y: 1}
	];
	
	// initialize canvas
	var canv = document.getElementById('globalCanvas');
	var cont = canv.getContext('2d');
	canv.width = opts.gridsize * opts.pixlsize;
	canv.height = opts.gridsize * opts.pixlsize;
	
	// initialize pixels
	var pixlblac = cont.createImageData(opts.pixlsize, opts.pixlsize);
	for (i = 0; i < (opts.pixlsize * opts.pixlsize * 4); i += 4) {
		pixlblac.data[i + 3] = 255;
	}
	var pixlwhit = cont.createImageData(opts.pixlsize, opts.pixlsize);
	for (i = 0; i < (opts.pixlsize * opts.pixlsize * 4); i += 4) {
		pixlwhit.data[i + 3] = 0;
	}
	
	// run simulation
	function simulate() {
		// iterate over ants
		for (i = 0; i < ants.length; i++) {
			var n = ants[i];
			
			// invert, draw, turn
			if (grid[n.x][n.y]) {
				grid[n.x][n.y] = false;
				cont.putImageData(pixlblac, n.x * opts.pixlsize, n.y * opts.pixlsize);
				n.d--;
			} else {
				grid[n.x][n.y] = true;
				cont.putImageData(pixlwhit, n.x * opts.pixlsize, n.y * opts.pixlsize);
				n.d++;
			}

			
			// modulus wraparound
			n.d += dirs.length;
			n.d %= dirs.length;
			
			// position + directions
			n.x += dirs[n.d].x;
			n.y += dirs[n.d].y;
			
			// sanity checked
			n.s = !(n.x < 0 || n.x >= opts.gridsize || n.y < 0 || n.y >= opts.gridsize);
		}
		
		// remove all insane ants (out of bounds)
		for (i = 0; i < ants.length; i++) {
			if (!ants[i].s) {
				ants.splice(i, 1);
			}
		}
		
		iterationCount++;
		document.getElementById('counter').innerHTML = iterationCount;
		if (!paused && ants.length > 0) {
			setTimeout(simulate, opts.interval);
		}
	}
	
	simulate();
	
	// Pause/Play button
	document.getElementById("pause").addEventListener("click", function() {
		if (!paused) {
			paused = true;
			document.getElementById("pause").innerHTML = "Play";
		} else {
			paused = false;
			document.getElementById("pause").innerHTML = "Pause";
			simulate();
		}
	});
}


// Add Ant button
document.getElementById("add-ant").addEventListener("click", function() {
	var antNum = document.getElementById("input-ants").children.length + 1;
	var inputAnts = document.getElementById("input-ants");
	console.log("antNum: " + antNum);
	
	var newInput = document.createElement('div');
	newInput.className = "an-ant";
	
	var htmlString = "<h3>Ant " + antNum + "</h3>" +
		"Start X Position: <input type=\"text\" id=\"start-x-" + antNum + "\" value=\"50\"><br>" +
		"Start Y Position: <input type=\"text\" id=\"start-y-" + antNum + "\" value=\"50\"><br>" +
		"Direction (0-3): <input type=\"text\" id=\"direction-" + antNum + "\" value=\"0\"><br>";

	newInput.innerHTML = htmlString;
	
	inputAnts.appendChild(newInput);
});


// Grab inputs from form, clean them, and start
document.getElementById("go").addEventListener("click", function() {
	// clean and set input grid size
	var inputGridSize = parseInt(document.getElementById('grid-size').value);
	if (isNaN(inputGridSize) || inputGridSize < 1) {
		document.getElementById('grid-size').value = 100;
		inputGridSize = 100;
	}
	
	// clean and set input pixel size
	var inputPixelSize = parseInt(document.getElementById('pixel-size').value);
	if (isNaN(inputPixelSize) || inputPixelSize < 1) {
		document.getElementById('pixel-size').value = 4;
		inputPixelSize = 4;
	}
	
	// clean and set input interval
	var inputInterval = parseInt(document.getElementById('interval').value);
	if (isNaN(inputInterval) || inputInterval < 1) {
		document.getElementById('interval').value = 4;
		inputInterval = 4;
	}
	
	var antArray = [];
	var antElements = document.getElementsByClassName('an-ant');
	// for each input ant
	for (a = 1; a <= antElements.length; a++) {
		// clean and set start x
		ix = parseInt(document.getElementById("start-x-" + a).value);
		if (isNaN(ix) || ix < 0) {
			document.getElementById("start-x-" + a).value = 0;
			ix = 0;
		} else if (ix > inputGridSize - 1) {
			document.getElementById("start-x-" + a).value = inputGridSize - 1;
			ix = inputGridSize - 1;
		}
		
		// clean and set start y
		iy = parseInt(document.getElementById("start-y-" + a).value);
		if (isNaN(iy) || iy < 0) {
			document.getElementById("start-y-" + a).value = 0;
			iy = 0;
		} else if (iy > inputGridSize - 1) {
			document.getElementById("start-y-" + a).value = inputGridSize - 1;
			iy = inputGridSize - 1;
		}
		
		//clean and set start direction
		id = parseInt(document.getElementById("direction-" + a).value);
		if (isNaN(id) || id < 0) {
			document.getElementById("direction-" + a).value = 0;
			id = 0;
		} else if (id > 3) {
			document.getElementById("direction-" + a).value = 3;
			id = 3;
		}
		
		// add this ant to the array
		antArray.push({
			x: ix,
			y: iy,
			d: id,
			s: true
		});
	}
	
	// finally run it
	langtonant(antArray, {
		gridsize: inputGridSize,
		pixlsize: inputPixelSize,
		interval: inputInterval
	});
});

// Clear button (just refreshes the page)
document.getElementById('clear').addEventListener("click", function() {
	location.reload();
});
	
// Cool bonus
document.getElementById('bonus').addEventListener("click", function() {
	// make sure there are exactly 4 ants
	var antElements = document.getElementsByClassName('an-ant');
	while(antElements.length < 4) {
		document.getElementById("add-ant").click();
	}
	while(antElements[4]) {
		document.getElementById('input-ants').removeChild(antElements[4]);
	}
	
	// set all inputs
	document.getElementById('start-x-1').value = 57;
	document.getElementById('start-y-1').value = 57;
	document.getElementById('direction-1').value = 1;
	
	document.getElementById('start-x-2').value = 57;
	document.getElementById('start-y-2').value = 43;
	document.getElementById('direction-2').value = 2;
	
	document.getElementById('start-x-3').value = 43;
	document.getElementById('start-y-3').value = 43;
	document.getElementById('direction-3').value = 3;
	
	document.getElementById('start-x-4').value = 43;
	document.getElementById('start-y-4').value = 57;
	document.getElementById('direction-4').value = 0;
	
	document.getElementById('grid-size').value = 100;
	document.getElementById('pixel-size').value = 4;
	document.getElementById('interval').value = 4;
	
	// go
	document.getElementById('go').click();
});