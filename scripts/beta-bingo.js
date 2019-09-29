/* (c) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

// randomizes the order of elements in an array in place
const shuffle = (array) => {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    let temp = array[--counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

window.onload = () => {
  const o = [
    '"National"',
    'Alumni present',
    'Nothing happened in IFC',
    'Proud to be a Beta',
    'Ti-De-I-De-O',
    'Meeting runs late',
    'Show and Tell',
    '"Check your availability"',
    'Matts get confused as to who is who',
    'One individual snarks 3 times during meeting',
    'Forgetting role call',
    'Someone has a burrito bowl',
    'Confusion about voting procedure',
    '"Talk to me after chapter"',
    'More than 3 people late',
    'No Kai Kan',
    'Let\'s check the Constitution',
    '"No report"',
    '"We\'ll be here all night"',
    '"I propose a motion"',
    '"Suspend the Bylaws"',
    'Below quorum',
    'Agenda not filled out',
    'Values are mentioned',
    'Event signup',
    '"Robert\'s Rules"',
    'Discuss taking money from savings',
    'Push this discussion to next meeting',
    'Senior talks about how we used to do stuff',
    'Snark lasts more than a minute',
    'IFC screws up',
    'Discussion about discussions',
    'Song lyrics are wrong',
    'Someone asks what day of the week an event is',
    'Asking if everyone can see the minutes/zoom in',
    '*Dabs*',
    'Chairman spacing out when it\'s time for his report',
    'Single discussion exceeds 20 minutes',
    'One big snap',
    'President is late',
    'WPI administration screws us over',
    'Clock is wrong',
    'More than one "no report"',
    'Something said goes in #quotes',
    'Google Doc linked in a report',
    '"Straw poll"',
    'President checks his phone',
    'Recruitment asks for more money',
    'Zoning out when named called during attendance',
    'Someone writes on the blackboard or whiteboard',
    'Misspelled name in minutes',
    'Voting on something',
    'Announcing an event more than three weeks in the future'
  ];

  shuffle(o);

  let j = 0;
  for (let i = 1; i <= 25; ++i) {
    // insert random box contents, except for center ("free real estate")
    if (i !== 13) {
      document.getElementById('bb' + i).innerHTML =
        `<span>` + o[j++] + `</span>`;
    }

    // add left click listener
    document.getElementById('bb' + i).addEventListener("click", e => {
      const el = document.getElementById('bb' + i);
      el.classList.remove('missed');
      el.classList.toggle('selected');
    });

    // add right click listener
    document.getElementById('bb' + i).addEventListener("contextmenu", e => {
      e.preventDefault();
      const el = document.getElementById('bb' + i);
      el.classList.remove('selected');
      el.classList.toggle('missed');
    });
  }
};
