/* (c) 2022 Joseph Petitti | https://josephpetitti.com/license.txt */

"use strict";

const entries = [
  'Matt and Kat get married (free space)',
  'Hagan asks to DJ',
  'Someone misses rehearsal',
  'Dress code violation',
  'Someone throws up Sat/Sun night',
  'Looking at football during ceremony or reception',
  'Noise complaint',
  'Someone arrives late to the ceremony',
  'Minor sneaks a drink',
  'New Jersey relative quotes Goodfellas',
  'Mom cries',
  'Shots with Mom',
  'Uncomfortable Cream Team interaction'
];

/**
 * Randomizes the order of elements in an array in place.
 * @param array {Array<N>}
 * @return {Array<N>}
 */
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


/** @return {{entryCookie: string, checkedCookie: string}} */
const readCookies = () => {
  const entryCookie = document.cookie
    .split('; ').find(s => s.startsWith('entries='))?.split('=')[1] ?? '';
  const checkedCookie = document.cookie
    .split('; ').find(s => s.startsWith('checked='))?.split('=')[1] ?? '';
  return {entryCookie, checkedCookie};
}


/**
 * @param {string} entryCookie
 * @param {string} checkedCookie
 */
const writeCookies = (entryCookie, checkedCookie) => {
  document.cookie = `entries=${entryCookie}; SameSite=Strict; Secure`;
  document.cookie = `checked=${checkedCookie}; SameSite=Strict; Secure`;
}


/**
 * @param {string} entryCookie
 * @param {string} checkedCookie
 */
const drawBoard = (entryCookie, checkedCookie) => {
  entryCookie.split('').forEach((char, i) => {
    document.getElementById('bb' + (i + 1)).innerText = 
      entries['0123456789abcdefghijklmno'.lastIndexOf(char)] ?? '';
  });
  checkedCookie.split('').forEach((char, i) => {
    if (char === '1') {
      document.getElementById('bb' + (i + 1)).parentNode.classList.add('selected');
    } else {
      document.getElementById('bb' + (i + 1)).parentNode.classList.remove('selected');
    }
  });
};


window.onload = () => {
  // Check for existing cookies and initialize if invalid or not found.
  let {entryCookie, checkedCookie} = readCookies();
  if (!/[01]{25}/.test(checkedCookie)) checkedCookie = '0'.repeat(25)
  if (!/[0-9a-o]{25}/.test(entryCookie)) {
    const temp = '123456789abcdefghijklmno'.split('');
    shuffle(temp);
    temp.splice(12, 0, '0');
    entryCookie = temp.join('');
  }
  writeCookies(entryCookie, checkedCookie);

  drawBoard(entryCookie, checkedCookie);

  // Add listeners for clicking on squares.
  document.querySelectorAll('.bbox').forEach(elt => {
    elt.addEventListener('click', () => {
      const i = elt.firstChild.id.substring(2) - 1;
      const arr = checkedCookie.split('');
      arr[i] = arr[i] === '0' ? '1' : '0';
      checkedCookie = arr.join('');
      writeCookies(entryCookie, checkedCookie);
      const bbox = document.getElementById('bb' + (i + 1)).parentNode;
      if (arr[i] === '1') bbox.classList.add('selected');
      else bbox.classList.remove('selected');
    });
  });
};
