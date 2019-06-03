/* (c) 2019 Joseph Petitti | josephpetitti.com/license.txt */

/*
 * Adds the "shown" class to the navbar, causing it to open on mobile screens
 */
const showNav = function() {
  document.getElementById('nav').classList.add("shown");
}

/*
 * Removes the "shown" class from the navbar, causing it to close on mobile
 */
const closeNav = function() {
  document.getElementById('nav').classList.remove("shown");
}
