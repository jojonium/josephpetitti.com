/* (c) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

const o = new Array(36);

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

window.onload = () => {
  o[0] = '"National"';
  o[1] = 'Alumni present';
  o[2] = 'Two brothers get in a pissing fit';
  o[3] = 'Proud to be a Beta';
  o[4] = 'Ti-De-I-De-O';
  o[4] = 'Goes past 9:00 PM';
  o[5] = 'Show and Tell';
  o[6] = '"Check your availability"';
  o[7] = 'Matts get confused as to who is who';
  o[8] = 'One individual snarks 3 times during meeting';
  o[9] = 'Forgetting role call';
  o[10] = 'Someone has a burrito bowl';
  o[11] = 'Matt messes up voting procedure';
  o[12] = '"Talk to me after chapter"';
  o[13] = 'More than 3 people late';
  o[14] = 'No Kai Kan';
  o[15] = 'Let\'s check the Constitution';
  o[16] = '"No report"';
  o[17] = '"We\'ll be here all night"';
  o[18] = '"I propose a motion"';
  o[19] = '"Suspend the Bylaws"';
  o[20] = 'Below quorum';
  o[21] = 'Agenda not filled out';
  o[22] = 'Values are mentioned';
  o[23] = 'Event signup';
  o[24] = '"Robert\'s Rules"';
  o[25] = 'Discuss taking money from savings';
  o[26] = 'Push this discussion to next meeting';
  o[27] = 'Senior talks about how we used to do stuff';
  o[28] = 'Snark lasts more than a minute';
  o[29] = 'IFC screws up';
  o[30] = 'Discussion about discussions';
  o[31] = 'Song lyrics are wrong';
  o[32] = 'Someone asks what day of the week an event is';
  o[33] = 'Asking if everyone can see the minutes/zoom in';
  o[34] = '*Dabs*';
  o[35] = 'Chairman spacing out when it\'s time for their report';
  o[36] = 'Single discussion exceeds 20 minutes';
  o[37] = 'One big snap';

  shuffle(o);

  var j = 0;
  for (let i = 1; i <= 25; ++i) {
    if (i != 13) {
      document.getElementById("bb" + i).innerHTML =
			`<span>` + o[j++] + `</span>`;
    }
  }

  // left click
  $('.bbox').click(function(event) {
    if ($(this).css('backgroundColor') != 'rgba(240, 153, 12, 0.9)') {
      $(this).css('background-color', 'rgba(240, 153, 12, 0.9)')
        .css('color', 'black');
    } else {
      $(this).css('background-color', '#004b6e')
        .css('color', '#bcd');
    }
  });

  // right click
  $('.bbox').on('contextmenu', function(event) {
    console.log('here');
    if ($(this).css('backgroundColor') != 'rgba(83, 83, 83, 0.9)') {
      $(this).css({
        'background-color': 'rgba(83, 83, 83, 0.9)',
        'color': 'black'
      });
    } else {
      $(this).css({
        'background-color': '#004b6e',
        'color': '#bcd'
      });
    }
    return false;
  });
}
