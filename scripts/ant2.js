/* (c) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

"use strict";

/**
 * BOARD object, contains constants, variables, and methods relating to ants,
 * rules, and board. Contains no UI methods.
 */
let BOARD = {
	rules: {},
	nextRuleID: 0,
	ants: {},
	nextAntID: 0,
	width: 100,
	height: 100
};


/**
 * UI object, contains constants, variables, and methods relating the UI,
 * including buttons, inputs, and the canvas.
 */
let UI = {
	/**
	 * Sets the background-color of the appropriate swatch-wrapper whenever the
	 * interior color input is changed. Also updates the BOARD rules array and
	 * the URL.
	 * @param number the ID number of the swatch being changed, required
	 * @param color the color to change it to, in the form #123abc, required
	 * @return this, so it can be chained, or undefined if it failed
	 */
	swatchChange(number, color) {
		// validate input
		if (typeof number !== 'number' || number >= rules.length || number < 0) {
			throw 'swatchChange: illegal ID number: ' + number;
		}
		if (!color || !/^#[0-9A-F]{6}$/i.test(color)) {
			throw 'swatchChange: illegal color: ' + color;
		}

		$('#swatch-wrapper-' + number).css('background-color', color);

		BOARD.rules[number].c = color;
		UI.updateURL();

		return this;
	},


	/**
	 * Updates BOARD.rules to reflect a new direction for a particular rule.
	 * Should be called when the direction radio buttons are clicked.
	 * @param number the ID number of the rule being changed, required.
	 * @param dir the new direction. Must be of the form /^[lrcu]$/, required.
	 * @return this, so it can be chained, or undefined if it failed
	 */
	dirChange(number, dir) {
		// validate input
		if (typeof number !== 'number' || number >= rules.length || number < 0) {
			throw 'dirChange: illegal ID number: ' + number;
			return;
		}
		if (!dir || !/^[lrcu]$/i.test(dir)) {
			throw 'dirChange: illegal direction: ' + dir;
		}

		BOARD.rules[number].d = dir;
		UI.updateURL();

		return this;
	},


	/**
	 * Adds a randomized rule, both to the UI and to the rule list. Updates the
	 * URL afterward.
	 * @param color: the color for this rule in the form #123abc. Generates a
	 * random color if omitted or illegal
	 * @param rule: one of ['l', 'r', 'c', 'u']. Generates a random rule if
	 * omitted or illegal
	 * @return this, so it can be chained.
	 */
	addRule(color, rule) {
		let id = BOARD.nextRuleID++, newRule;

		// if color isn't a valid HTML color generate a new one
		let col = (/^#[0-9A-F]{6}$/i.test(color)) ? color : this.randColor();

		// if rule isn't a valid rule generate a new one
		if ('lrcu'.indexOf(rule) > -1 && rule.length === 1) {
			newRule = rule;
		} else {
			let z = Math.random();
			if (z < 0.25)
				newRule = 'l';
			else if (z < 0.5)
				newRule = 'r';
			else if (z < 0.75)
				newRule = 'c';
			else
				newRule = 'u';
		}

		// create HTML element showing this rule and append it to div#rules
		$('#rules').append(`<div class="a-rule" id="rule-${id}">
			<div class="swatch-wrapper" id="swatch-wrapper-${id}" 
				 title="Select color" style="background-color: ${col}">
			<input class="swatch" id="swatch-${id}" value="${col}" type="color">
			</div>
			<div class="rule-radio-wrapper">
			<input type="radio" name="rule-${id}" id="rule-${id}-l" value="l"
					${newRule === 'l' ? 'checked' : ''}>
			<label for="rule-${id}-l" title="Turn left">L</label>

			<input type="radio" name="rule-${id}" id="rule-${id}-r" value="r"
					${newRule === 'r' ? 'checked' : ''}>
			<label for="rule-${id}-r" title="Turn right">R</label>

			<input type="radio" name="rule-${id}" id="rule-${id}-c" value="c"
					${newRule === 'c' ? 'checked' : ''}>
			<label for="rule-${id}-c" title="Continue straight">C</label>

			<input type="radio" name="rule-${id}" id="rule-${id}-u" value="u"
					${newRule === 'u' ? 'checked' : ''}>
			<label for="rule-${id}-u" title="Make a U-turn">U</label>
			<i class="fas fa-times" title="Delete rule" id="delete-rule-${id}"></i>
			</div>
			</div>`
		);

		// animate
		$('#rule-' + id).hide();
		$('#rule-' + id).slideDown();

		// add swatchChange listener to the swatch input
		$('#swatch-' + id).change(function() {
			UI.swatchChange(id, $('#swatch-' + id).val());
		});

		// add dirChange listener to the radio buttons
		$('input[type=radio][name=rule-' + id + ']').change(function() {
			UI.dirChange(id, this.value);
		});

		// add deleteRule listener to the X button
		$('#delete-rule-' + id).click(function() {
			UI.deleteRule(id);
		});

		// add the new rule to BOARD.rules
		BOARD.rules[id] = {c: col, d: newRule};

		UI.updateURL();

		return this;
	},


	/**
	 * Adds a randomized ant, both to the UI and to the ant list. Updates the
	 * URL afterward.
	 * @param startX the starting x position of this ant, in squares from the
	 * left wall. Random if omitted or invalid.
	 * @param startY the starting y position of this ant, in squares from the
	 * top wall. Random if omitted or invalid.
	 * @param startDir the starting direction of this ant, in the form
	 * /^[udlr]{1}$/. Random if omitted or invalid.
	 * @return this, so it can be chained.
	 */
	addAnt(startX, startY, startDir) {
		let id = BOARD.nextAntID++;

		// validate input
		if (isNaN(startX) || startX < 1 || startX > BOARD.width) {
			var startX = Math.random() * BOARD.width;
		}
		if (isNaN(startY) || startY < 1 || startY > BOARD.height) {
			var startY = Math.random() * BOARD.height;
		}

		startX = Math.floor(startX);
		startY = Math.floor(startY);

		if (!/^[udlr]{1}$/i.test(startDir)) {
			let z = Math.random();
			if (z < 0.25)
				startDir = 'u';
			else if (z < 0.5)
				startDir = 'd';
			else if (z < 0.75)
				startDir = 'l';
			else
				startDir = 'r';
		}

		// add to BOARD.ants
		BOARD.ants[id] = { x: startX, y: startY, d: startDir };

		// add to DOM
		$('#ants').append(`<div class="an-ant box" id="ant-${id}">
				<i class="fas fa-times" title="Delete ant" id="delete-ant-${id}"></i>
				<h3>Ant ${id}</h3>
				<label for="ant-${id}-x">Start x position</label>
				<input type="number" id="ant-${id}-x" value="${startX}">
				<br>
				<label for="ant-${id}-y">Start y position</label>
				<input type="number" id="ant-${id}-y" value="${startY}">
				<br>
				<label for="ant-${id}-dir">Starting dir.</label>
				<select id="ant-${id}-dir">
					<option value="u" ${(startDir === 'u') ? 'selected' : ''}>Up</option>
					<option value="d" ${(startDir === 'd') ? 'selected' : ''}>Down</option>
					<option value="l" ${(startDir === 'l') ? 'selected' : ''}>Left</option>
					<option value="r" ${(startDir === 'r') ? 'selected' : ''}>Right</option>
				</select>
			</div>`
		);

		// animate
		$('#ant-' + id).hide();
		$('#ant-' + id).slideDown();

		// add update listeners to inputs
		$(`#ant-${id}-x, #ant-${id}-y, #ant-${id}-dir`).change(function() {
			UI.updateAnt(id);
		});

		// add deleteAnt listener to X button
		$('#delete-ant-' + id).click(function() {
			UI.deleteAnt(id);
		});

		UI.updateURL();

		return this;
	},


	/**
	 * Updates a given ant in BOARD.ants based on the info in the DOM inputs.
	 * Also updates URL.
	 * @param id the ID of the ant to change, required.
	 * @return this, so it can be chained
	 */
	updateAnt(id) {
		if (!BOARD.ants[id]) {
			throw 'updateAnt: Illegal ID: ' + id;
		}
		BOARD.ants[id].x = parseInt($(`#ant-${id}-x`).val());
		BOARD.ants[id].y = parseInt($(`#ant-${id}-y`).val());
		BOARD.ants[id].d = $(`#ant-${id}-dir`).val();

		UI.updateURL();

		return this;
	},

	/**
	 * Deletes the ant with the given ID from BOARD.ants, and removes its
	 * display from the DOM. Note that this doesn't change the HTML ID's of
	 * existing HTML elements. Also updates URL.
	 * @param id the ID of the rule to delete
	 * @return this, so it can be chained
	 */
	deleteAnt(id) {
		// validate input
		if (!BOARD.ants[id]) {
			throw 'deleteAnt: illegal ID: ' + id;
		}
		
		// remove from BOARD
		BOARD.ants[id] = undefined;

		// remove deleted DOM elements
		$('#ant-' + id).slideUp(400, () => $('#ant-' + id).remove());

		// update url
		this.updateURL();

		return this;
	},

	/**
	 * Deletes the rule with the given ID from BOARD.rules, and removes its
	 * display from the DOM. Note that this doesn't change the HTML ID's of
	 * existing HTML elements. Also updates URL.
	 * @param id the ID of the rule to delete
	 * @return this, so it can be chained
	 */
	deleteRule(id) {
		// validate input
		if (!BOARD.rules[id]) {
			throw 'deleteRule: illegal ID: ' + id;
		}
		BOARD.rules[id] = undefined;

		// remove deleted DOM elements
		$('#rule-' + id).slideUp(400, () => $('#rule-' + id).remove());

		// update url
		this.updateURL();

		return this;
	},
		
	/**
	 * Generates a random HTML color
	 * @return a color string in the form #123abc.
	 */
	randColor() {
		let color = '#';
		for (let i = 0; i < 6; ++i) {
			color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
		}
		return color;
	},


	/**
	 * Updates the URL text area with a URL that will recreate the current set
	 * up rules.
	 * @return the new URL
	 */
	updateURL() {
		const newURL = window.location.href.split('?')[0] 
			+ '?r=' + UI.encodeRules()
			+ '&a=' + UI.encodeAnts();
		$('#url-text').html(newURL);

		return newURL;
	},


	/**
	 * Encodes the BOARD.ants object in base64. There's nothing fancy here, and
	 * it could probably be more efficient. That's something to consider in the
	 * future.
	 * @return the stringified BOARD.ants object encoded in base64.
	 */
	encodeAnts() {
		return btoa(JSON.stringify(BOARD.ants));
	},


	/**
	 * Encodes the rules array in base64.
	 * Each rule consists of a six-hex-digit color (24 bits) and one of four
	 * possible directions (2 bits). Each color in order is converted from six
	 * hex digits to a 24-digit binary string, then encoded as four base64
	 * characters. At the end of the string, two-bit directions are packed into
	 * six-bit chunks and converted to base64 characters (three directions per
	 * character. If the number of rules is not divisible by 3 the end is padded
	 * with 0 bits. The final string is the encoded colors, followed by a `|'
	 * character, followed by the encoded directions
	 * @return the encoded base64 string
	 */
	encodeRules() {
		let dirBits = '';
		let tempDirChars = '';
		let out = '';
		let dirs, binString;

		for (const r in BOARD.rules) {
			if (typeof BOARD.rules[r] !== 'undefined') {
				binString = '';
				// convert color to binary string
				for (let i = 1; i < 7; i += 2) { // start at 1 to remove '#'
					binString += parseInt(BOARD.rules[r].c
						.substring(i, i + 2), 16).toString(2).padStart(8, '0');
				}

				// convert binary string to base64 string
				for (let i = 0; i < binString.length; i += 6) {
					out += this.encodeOne(binString.substring(i, i + 6));
				}

				// convert directions to binary
				dirBits += 'lrcu'.indexOf(BOARD.rules[r].d)
					.toString(2).padStart(2, '0');
			}
		}

		out += '|';

		// pad out direction bits and convert to base64
		while (dirBits.length % 6 != 0) dirBits += '0';
		for (let i = 0; i < dirBits.length; i += 6) {
			out += UI.encodeOne(dirBits.substring(i, i + 6));
		}

		return out;
	},


	/**
	 * Converts a binary string to a base64 string
	 * @param binary a binary string, required
	 * @return the input string encoded in base64, or undefined if invalid input
	 */
	binToB64(binary) {
		// validate input
		if (!/^[01]+$/i.test(binary)) {
			console.error('binToB64: invalid binary string: ' + binary);
			return;
		}

		let out = '';
		for (let i = 0; i < binary.length; i += 6) {
			out += encodeOne(parseInt(bitString.substring(i, i + 6), 2));
		}
		return out;
	},


	/**
	 * Converts one six-bit binary string to one base64 character
	 * @param num a six-bit binary string, required
	 * @return a single base64 character, or undefined if invalid input
	 */
	encodeOne(num) {
		num = parseInt(num, 2);
		return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[num];
	},


	/**
	 * Converts one base64 character to one six-bit binary string
	 * @param char a base64 character, required
	 * @return a single six-bit binary string, or undefined if invalid input
	 */
	decodeOne(char) {
		const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		if (char.length !== 1 || s.indexOf(char) < 0)
			throw 'illegal character: ' + char;
		else
			return s.indexOf(char).toString(2).padStart(6, '0');
	},


	/**
	 * Checks the query string and tries to decode a set of ants from it. If it
	 * can't, it generates one ant in the center of the board.
	 * @return this, so it can be chained
	 */
	decodeAnts() {
		const urlParams = new URLSearchParams(window.location.search);
		let b64Ants = urlParams.get('a');
		console.log(b64Ants);
		if (b64Ants) {
			try {
				const newAnts = JSON.parse(atob(b64Ants));
				for (const a in newAnts) {
					UI.addAnt(newAnts[a].x, newAnts[a].y, newAnts[a].d);
				}
			} catch (err) {
				console.error('something went wrong: ' + err);
			}
		} else {
			console.log('here')
			UI.addAnt(BOARD.width / 2, BOARD.height / 2, 'u');
		}
	},


	/**
	 * Checks the query string and tries to decode a set of rules from it. If it
	 * can't, it generates two rules randomly.
	 * @return this, so it can be chained.
	 */
	decodeRules() {
		const urlParams = new URLSearchParams(window.location.search);
		let b64Rules = urlParams.get('r');
		if (b64Rules) {
			try {
				let binString = '';
				let colors = [];
				let dirs;
				let tempCol = '#';
				b64Rules = b64Rules.split('|');
				const c = b64Rules[0];
				const d = b64Rules[1];
				// convert colors to binary string
				for (let i = 0; i < c.length; ++i) {
					binString += this.decodeOne(c[i]);
				}

				// convert binary string back to #123abc style colors
				for (let i = 0; i < binString.length; i += 8) {
					tempCol += parseInt(binString.substring(i, i + 8), 2)
						.toString(16).padStart(2, '0');
					if (tempCol.length >= 7) {
						colors.push(tempCol);
						tempCol = '#';
					}
				}

				// convert directions to binary string
				binString = '';
				for (let i = 0; i < d.length; ++i) {
					binString += this.decodeOne(d[i]);
				}

				// convert binary string to a 'l', 'r', 'c', or 'u'
				dirs = new Array(colors.length);
				// remember that directions are 2 bits
				for (let i = 0; i < colors.length * 2; i += 2) {
					dirs[Math.floor(i / 2)] = 
						'lrcu'[parseInt(binString.substring(i, i + 2), 2)];
				}

				// add the decoded rules
				for (let i = 0; i < colors.length; ++i) {
					this.addRule(colors[i], dirs[i]);
				}

			} catch (err) {
				// something went wrong, let's just make two random rules
				console.error('something went wrong: ' + err);
				this.addRule().addRule();
			}
		} else {
			// no query string, make two starting rules
			this.addRule('#ffffff', 'r').addRule('#000000', 'l');
		}

		this.updateURL();

		return this;
	}
}


/**
 * Attach listen events to buttons and prepare various initializations when the
 * document is fully loaded and ready.
 */
$(document).ready(() => {
	$('#add-rule').click(() => { UI.addRule() });

	$('#add-ant').click(() => { UI.addAnt() });

	$('#copy-url').click(() => {
		document.getElementById('url-text').select();
		document.execCommand('copy');
	});

	// parse rules from query string
	UI.decodeRules();

	// parse ants from query string
	UI.decodeAnts();

	//UI.addAnt().addAnt();
});


