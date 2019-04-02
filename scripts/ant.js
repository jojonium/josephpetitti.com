/* (c) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

// create global canvas
var canvas = document.createElement('canvas');
canvas.id = 'globalCanvas';
canvas.width = 400;
canvas.height = 400;
document.getElementById('canvas-holder').appendChild(canvas);

// global iteration counter and pause button
var iterationCount = 0;
var paused = false;

function langtonant(antx, optx, rulex) {
	var x, y, i;
	
	// extend default opts
	var opts = {
		gridsize: 100,
		pixlsize: 4,
		interval: 4,
		wrap: false
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
	
	// extend default rules
	var rules = [
		{cr: 255, cg: 255, cb: 255, r: 'l'},
		{cr: 0, cg: 0, cb: 0, r: 'r'}
	];
	for (i in rulex) {
		rules[i] = rulex[i];
	}
	
	// initialize grid
	var grid = [];
	for (x = 0; x < opts.gridsize; x++) {
		grid[x] = [];
		for (y = 0; y < opts.gridsize; y++) {
			grid[x][y] = 0;
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

	// Initialize pixels
	var pixelArray = [];
	var temp;
	for (r in rules) {
		temp = cont.createImageData(opts.pixlsize, opts.pixlsize);
		for (i = 0; i < temp.data.length; i +=4) {
			temp.data[i] = rules[r].cr;
			temp.data[i+1] = rules[r].cg;
			temp.data[i+2] = rules[r].cb;
			temp.data[i+3] = 255;
		}
		pixelArray.push(temp);
	}
	
	var squareColor;
	// run simulation
	function simulate() {
		// iterate over ants
		for (i = 0; i < ants.length; i++) {
			var n = ants[i];
			
			//follow rule on location
			squareColor = grid[n.x][n.y];
			if (rules[squareColor].r === "R") {
				n.d--; //subtract to turn right
			} else if (rules[squareColor].r === "L") {
				n.d++; //add to turn left
			} else if (rules[squareColor].r === "U") {
				n.d += 2; //add two to U-turn
			}
			
			squareColor++;
			squareColor %= rules.length;
			grid[n.x][n.y] = squareColor;
			cont.putImageData(pixelArray[squareColor], n.x * opts.pixlsize, n.y * opts.pixlsize);
			
			// modulus wraparound
			n.d += dirs.length;
			n.d %= dirs.length;
			
			// move forward
			n.x += dirs[n.d].x;
			n.y += dirs[n.d].y;
			
			// if wraparound on, wrap ant positions
			if (opts.wrap) {
				if (n.x < 0) n.x = opts.gridsize - 1;
				else if (n.x >= opts.gridsize) n.x = 0;
				if (n.y < 0) n.y = opts.gridsize - 1;
				else if (n.y >= opts.gridsize) n.y = 0;
			}
			
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
	
	var newInput = document.createElement('div');
	newInput.className = "an-ant";
	
	let xVal = Math.floor(Math.random() * document.getElementById('grid-size').value);
	let yVal = Math.floor(Math.random() * document.getElementById('grid-size').value);
	let dirVal = Math.floor(Math.random() * 4)
	
	var htmlString = `<h2>Ant ${antNum}</h2>` +
		`	<div class="an-ant-flex">` +
		`		<span>Start X Position: </span><input type="text" id="start-x-${antNum}" value="${xVal}">` +
		`		<span>Start Y Position: </span><input type="text" id="start-y-${antNum}" value="${yVal}">` +
		`		<span>Direction (0-3): </span><input type="text" id="direction-${antNum}" value="${dirVal}">` +
		`	</div>`;
	

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
	if (isNaN(inputInterval) || inputInterval < 0) {
		document.getElementById('interval').value = 4;
		inputInterval = 4;
	}
	
	// Parse input ants
	var antArray = [];
	var antElements = document.getElementsByClassName('an-ant');
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
	
	// Parse the input rules
	var ruleArray = [];
	var ruleElements = document.getElementById('color-rules').children;
	var ruleLetter;
	for (r = 0; r < ruleElements.length; r += 2) {
		rgbString = ruleElements[r].children[0].value;
		icr = parseInt(rgbString.slice(1, 3), 16);
		icg = parseInt(rgbString.slice(3, 5), 16);
		icb = parseInt(rgbString.slice(5), 16);
		
		// clean rule input
		ruleLetter = ruleElements[r + 1].value.toUpperCase();
		if (!(ruleLetter.length == 1 && "RLUC".indexOf(ruleLetter) > -1)) {
			// if input is invalid make it random
			var x = Math.random();
			if (x < .25) {
				ruleLetter = 'R';
			} else if (x < .5) {
				ruleLetter = 'L';
			} else if (x < .75) {
				ruleLetter = 'U';
			} else {
				ruleLetter = 'C';
			}
		}
		
		ruleElements[r + 1].value = ruleLetter;
		ir = ruleLetter;
		
		// add this rule to the array
		ruleArray.push({
			cr: icr,
			cg: icg,
			cb: icb,
			r: ir
		});
	}

	// remove the "go" button so it can't be pressed again
	document.getElementById("go").disabled = true;
	document.getElementById("add-ant").disabled = true;
	document.getElementById("wrap").disabled = true;
	document.getElementById("bonus").disabled = true;
	document.getElementById("add-rule").disabled = true;
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].disabled = true;
	}
	document.getElementById("wrap-button").classList.add("disabled");

	// finally run it
	langtonant(antArray, {
		gridsize: inputGridSize,
		pixlsize: inputPixelSize,
		interval: inputInterval,
		wrap: document.getElementById('wrap').checked
	}, ruleArray);
});

// Clear button (just refreshes the page)
document.getElementById('clear').addEventListener("click", function() {
	location.reload();
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Add Rule button
document.getElementById('add-rule').addEventListener("click", function() {
	var rulePanel = document.getElementById('color-rules');
	var ruleNum = (rulePanel.children.length - 1) / 3 + 1;
	var swatch = document.createElement('input');
    swatch.type = 'color';
	swatch.className = 'swatch';
	
	// generate a random color
	var randCol = getRandomColor();
	
    // make the swatch wrapper
    var swatchWrapper = document.createElement('div');
    swatchWrapper.className = 'swatch-wrapper';
    swatchWrapper.style.backgroundColor = randCol;
    swatchWrapper.id = "color-wrapper-" + ruleNum;
	swatch.value = randCol;
	swatch.id = "color-" + ruleNum;
    swatch.onchange = function(){swatchChange(this.id)};
    
    rulePanel.appendChild(swatchWrapper);
    swatchWrapper.appendChild(swatch);
	
	var newInput = document.createElement('input');
	newInput.type = "text";
	newInput.id = "rule-" + ruleNum;
	
	// make inital value essentially random
	var z = Math.random();
	if (z < 0.25) {
		newInput.value = "R";
	} else if (z < 0.5) {
		newInput.value = "L";
	} else if (z < 0.75) {
		newInput.value = "U";
	} else {
		newInput.value = "C";
	}
	rulePanel.appendChild(newInput);
});

// Make wrap button affect check box
document.getElementById('wrap-button').addEventListener("click", function() {
	var state = document.getElementById('wrap').checked;
	document.getElementById('wrap').checked = !state;
});

var swatchChange = function(wrapId) {
    var number = wrapId.slice(6);
    document.getElementById("color-wrapper-" + number).style.backgroundColor = document.getElementById("color-" + number).value;
};


// I'm Feeling Lucky button
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
	
	if (document.getElementById('grid-size').value < 100)
		document.getElementById('grid-size').value = 100;
	
	// go
	document.getElementById('go').click();
});
