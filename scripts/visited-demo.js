/**
 * (C) 2020 Joseph Petitti | https://josephpetitti.com/license.txt
 *
 * This demo shows how the CSS `:visited` pseudo-class can be leak browser
 * history by tricking the user into interacting with the page
 */

"use strict";

/**
 * Top 50 most visited sites in the US according to alexa.com. Each one
 * will be assigned a code word.
 * @type {string[]}
 */
const TOP_SITES = [
  "https://www.google.com",
  "https://www.youtube.com/",
  "https://www.amazon.com/",
  "https://www.yahoo.com/",
  "https://www.facebook.com/",
  "https://www.reddit.com/",
  "https://zoom.us/",
  "https://www.wikipedia.org/",
  "https://myshopify.com/",
  "https://www.ebay.com/",
  "https://www.netflix.com/",
  "https://www.bing.com/",
  "https://www.office.com/",
  "https://outlook.live.com/",
  "https://www.twitch.tv/",
  "https://www.microsoft.com/",
  "https://www.instagram.com/",
  "https://chaturbate.com/",
  "https://www.chase.com/",
  "https://www.zillow.com/",
  "https://microsoftonline.com/",
  "https://www.cnn.com/",
  "https://www.apple.com/",
  "https://www.linkedin.com/",
  "https://www.etsy.com/",
  "https://www.walmart.com/",
  "https://www.aliexpress.com/",
  "https://www.dropbox.com/",
  "https://www.espn.com/",
  "https://www.nytimes.com/",
  "https://www.adobe.com/",
  "https://www.craigslist.org/",
  "https://twitter.com/",
  "https://www.wellsfargo.com/",
  "https://www.okta.com/",
  "https://livejasmin.com/",
  "https://www.instructure.com/",
  "https://imgur.com/",
  "https://www.salesforce.com/",
  "https://www.homedepot.com/",
  "https://force.com/",
  "https://www.hulu.com/",
  "https://www.usps.com/",
  "https://www.pornhub.com/",
  "https://www.indeed.com/",
  "https://www.stackoverflow.com/",
  "https://www.imdb.com/",
  "https://www.msn.com/",
  "https://www.ca.gov/",
];

/**
 * These will be assigned as code words
 * @type {string[]}
 */
const TOP_WORDS = [
  "as",
  "I",
  "his",
  "that",
  "he",
  "was",
  "for",
  "on",
  "are",
  "with",
  "they",
  "be",
  "at",
  "one",
  "have",
  "this",
  "from",
  "by",
  "hot",
  "word",
  "but",
  "what",
  "some",
  "is",
  "it",
  "you",
  "or",
  "had",
  "the",
  "of",
  "to",
  "and",
  "a",
  "in",
  "we",
  "can",
  "out",
  "other",
  "were",
  "which",
  "do",
  "their",
  "time",
  "if",
  "will",
  "how",
  "said",
  "an",
  "each",
  "tell",
  "does",
  "set",
  "three",
  "want",
  "air",
  "well",
  "also",
  "play",
  "small",
  "end",
  "put",
  "home",
  "read",
  "hand",
  "port",
  "large",
  "spell",
  "add",
  "even",
  "land",
  "here",
  "must",
  "big",
  "high",
  "such",
  "follow",
  "act",
  "why",
  "ask",
  "men",
  "change",
  "went",
  "light",
  "kind",
  "off",
  "need",
  "house",
  "picture",
  "try",
  "us",
  "again",
  "animal",
  "point",
  "mother",
  "world",
  "near",
  "build",
  "self",
  "earth",
  "father"
];

/** these words will be thrown in as decoys */
const DECOY_WORDS = [
  "any",
  "new",
  "work",
  "part",
  "take",
  "get",
  "place",
  "made",
  "live",
  "where",
  "after",
  "back",
  "little",
  "only",
  "round",
  "man",
  "year",
  "came",
  "show",
  "every",
  "good",
  "me",
  "give",
  "our",
  "under",
  "name",
  "very",
  "through",
  "just",
  "form",
  "sentence",
  "great",
  "think",
  "say",
  "help",
  "low",
  "line",
  "differ",
  "turn",
  "cause",
  "much",
  "mean",
  "before",
  "move",
  "right",
  "boy",
  "old",
  "too",
  "same",
  "she",
  "all",
  "there",
  "when",
  "up",
  "use",
  "your",
  "way",
  "about",
  "many",
  "then",
  "them",
  "write",
  "would",
  "like",
  "so",
  "these",
  "her",
  "long",
  "make",
  "thing",
  "see",
  "him",
  "two",
  "has",
  "look",
  "more",
  "day",
  "could",
  "go",
  "come",
  "did",
  "number",
  "sound",
  "no",
  "most",
  "people",
  "my",
  "over",
  "know",
  "water",
  "than",
  "call",
  "first",
  "who",
  "may",
  "down",
  "side",
  "been",
  "now",
  "find"
];

/**
 * @type {Map<string, string>}
 * Maps a code word to a site.
 */
const SITES_MAP = new Map();

const CHARACTERS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";

/** @type{HTMLElement} */
let BOARD;

/**
 * Shuffles an array in place.
 * @param {Array} array
 * @returns {Array}
 */
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const populateBoard = () => {
  shuffle(TOP_WORDS);
  shuffle(DECOY_WORDS);

  for (let i = 0; i < TOP_SITES.length; ++i) {
    // Assign this site a code word.
    SITES_MAP.set(TOP_WORDS[i], TOP_SITES[i]);
    const link = document.createElement("a");
    link.text = TOP_WORDS[i] + " ";
    link.href = TOP_SITES[i];
    link.classList.add("real-word");

    BOARD.appendChild(link);

    // Random chance to add a decoy word.
    if (Math.random() < 0.25) {
      const decoyLink = document.createElement("a");
      decoyLink.text = DECOY_WORDS[i] + " ";
      decoyLink.href="/";
      decoyLink.classList.add("decoy-word");

      BOARD.appendChild(decoyLink);
    }
  }
}

/**
 * Decode the text entered by the user and display what sites used.
 */
const processInput = () => {
  const textArea = document.getElementById("user-input");
  if (textArea === null) {
    throw new Error("Text area element does not exist");
  }

  const userText = textArea.value.trim();
  

}

/**
 * Sets up the DOM and event listeners. This should only be called once,
 * when the page is first loaded.
 */
const setup = () => {
  BOARD = document.getElementById("board");
  if (board === null) {
    throw new Error("Board div does not exist");
  }
  const submitButton = document.getElementById("submit-button");
  if (submitButton === null) {
    throw new Error("Submit button does not exist");
  }
  submitButton.addEventListener("click", processInput);

  populateBoard();
}

window.onload = () => {
  setup();
}
