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
  o[1] = 'Alumni Present';
  o[2] = 'Two Brothers get in a Pissing Fit';
  o[3] = 'Proud to be a Beta';
  o[4] = 'Ti-De-I-De-O';
  o[4] = 'Goes Past 9:00 PM';
  o[5] = 'Show and Tell';
  o[6] = '"Check Your Availability"';
  o[7] = 'Matts get Confused as to Who is Who';
  o[8] = 'One Individual Snarks 3 Times During Meeting';
  o[9] = 'Forgetting Role Call';
  o[10] = 'Someone has a Burrito Bowl';
  o[11] = 'Matt Messes up Voting Procedure';
  o[12] = '"Talk to me After Chapter"';
  o[13] = 'More than 3 People Late';
  o[14] = 'No Kai Kan';
  o[15] = 'Let\'s Check the Constitution';
  o[16] = '"No Report"';
  o[17] = '"We\'ll be Here all Night"';
  o[18] = '"I Propose a Motion"';
  o[19] = '"Suspend the Bylaws"';
  o[20] = 'Below Quorum';
  o[21] = 'Agenda not Filled Out';
  o[22] = 'Values are Mentioned';
  o[23] = 'Event Signup';
  o[24] = '"Robert\'s Rules"';
  o[25] = 'Discuss Taking Money from Savings';
  o[26] = 'Push this Discussion to Next Meeting';
  o[27] = 'Senior Talks About how we Used to Do Stuff';
  o[28] = 'Snark Lasts More Than a Minute';
  o[29] = 'IFC Screws Up';
  o[30] = 'Discussion About Discussions';
  o[31] = 'Song Lyrics are Wrong';
  o[32] = 'Someone asks What day of the Week an Event is';
  o[33] = 'Asking if Everyone can see the Minutes/Zoom in';
  o[34] = '*Dabs*';
  o[35] = 'Chairman Spacing out When it\'s Time for Their Report';
  
  
  
  shuffle(o);
    
  var j = 0;
  for (let i = 1; i <= 25; ++i) {
    if (i != 13) {
      document.getElementById("bb" + i).innerHTML = `<span>` + o[j++] + `</span>`;
    }
  }
  
  $('.bbox').click(function() {
    if ($(this).css('backgroundColor') != 'rgb(0, 255, 0)') {
      $(this).css('background-color', 'rgb(0, 255, 0)');
    } else {
      $(this).css('background-color', 'white');
    }
  });
}
