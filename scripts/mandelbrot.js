var canvas, ctx;

(function() {
	// create canvas
	canvas = document.createElement("canvas");
	canvas.width = 600;
	canvas.height = 600;
	document.getElementById("main").appendChild(canvas);
	ctx = canvas.getContext("2d");

	// start drawing
	var magFactor = 200;
	var panX = 2;
	var panY = 1.5;
	draw(panX, panY, magFactor);

})();

function draw(panX, panY, magFactor) {
	var r1 = Math.random() * 20;
	var r2 = Math.random() * 20;
	var r3 = Math.random() * 20;
	for (var x = 0; x < canvas.width; x++) {
		for (var y = 0; y < canvas.height; y++) {
			var belongs = mandelBelongs(x / magFactor - panX, y / magFactor - panY);
			ctx.fillStyle = 'rgb(' + belongs * r1 % 255 + ', ' + belongs * r2 % 255 + ', ' + belongs * r2 % 255 + ')';
			ctx.fillRect(x, y, 1, 1);
			
		}
	}
}

// checks if a point belongs to the Mandelbrot set
function mandelBelongs(x, y) {
	var realComponent = x;
	var imaginaryComponent = y;
	var maxIterations = 100;

	for (var i = 0; i < maxIterations; i++) {
		// calculate the real and imaginary components of the result separately
		var tempReal = realComponent * realComponent - imaginaryComponent * imaginaryComponent + x;
		var tempImag = 2 * realComponent * imaginaryComponent + y;

		realComponent = tempReal;
		imaginaryComponent = tempImag;

		if (realComponent * imaginaryComponent > 4)
			return (i / maxIterations * 100);
	}

	return 1;
}
