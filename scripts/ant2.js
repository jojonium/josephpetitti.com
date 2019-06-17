'use strict';

/**
 * BOARD object, contains constants, variables, and methods relating to ants,
 * rules, and board. Contains no UI methods.
 */
let BOARD = {
	rules: []
};


/**
 * UI object, contains constants, variables, and methods relating the UI,
 * including buttons, inputs, and the canvas.
 */
let UI = {
	/**
	 * Sets the background-color of the appropriate swatch-wrapper whenever the
	 * interior color input is changed. Purely cosmetic
	 * @param number the ID number of the swatch being changed, required
	 * @param color the color to change it to, in the form #123abc, required
	 * @return this, so it can be changed, or undefined if it failed
	 */
	swatchChange(number, color) {
		// validate input
		if (!number || number >= rules.length || number < 0) {
			console.err('swatchChange: illegal ID number: ' + number);
			return;
		}
		if (!color || !/^#[0-9A-Fa-f]{6}$/i.test(color)) {
			console.err('swatchChange: illegal color: ' + color);
			return;
		}

		$('#swatch-wrapper-' + number).css('background-color', color);
	},


	/**
	 * Adds a randomized rule, both to the UI TODO: and to the rule list.
	 * @param color: the color for this rule in the form #123abc. Generates a
	 * random color if omitted
	 * @param rule: one of ['l', 'r', 'c', 'u']. Generates a random rule if
	 * omitted 
	 * @return this, so it can be chained.
	 */
	addRule(color, rule) {
		let id = BOARD.rules.length, newRule;

		// if color isn't a valid HTML color generate a new one
		let col = (/^#[0-9A-Fa-f]{6}$/i.test(color)) ? color : getRandomColor();

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
		$('#rules').append(`<div class="a-rule">
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
			</div>
			</div>`
		);

		// add swatchChange listener to the swatch-wrapper div
		$('#swatch-wrapper-' + id).change(function() {
			UI.swatchChange(id, $(this).val());
		});

		// add the new rule to BOARD.rules
		BOARD.rules.push({c: col, r: newRule});
		console.log(BOARD.rules);

		return this;
	}
}


/**
 * Attach listen events to buttons and prepare various initializations when the
 * document is fully loaded and ready.
 */
$(document).ready(() => {
	$('#add-rule').click(() => { UI.addRule() });

	// add two default rules
	UI.addRule('#ffffff', 'r').addRule('#000000', 'l');
});


/**
 * Generates a random HTML color
 * @return a color string in the form #123abc.
 */
const getRandomColor = () => {
	let color = '#';
	for (let i = 0; i < 6; ++i) {
		color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
	}
	return color;
};
