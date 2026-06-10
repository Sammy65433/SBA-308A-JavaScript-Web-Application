// `main.js` - event listener and app logic  - 
// "Controls what happens when app starts

// import getTeams function from api.js
import {
    getTeams
} from "./api.js";


import {
    renderTeams
} from "./ui.js";

// async function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// Load teams 
// async function loadTeams() {
//     try {
//         // wait for Api request 
//         const teams = await getTeams();
//         renderTeams(teams);
//         // console.log(teams);
//     } catch (e) {
//         console.error(e)
//         // print teams
//         // console.log(teams);
//     }
// }

// Run function from ui.js

async function init() {
    try {
        // wait for Api request 
        const rawTeams = await getTeams();
        console.log('fetch succeeded – rawTeams length:', rawTeams.length);


        const activeTeams = rawTeams.filter(t => t.id <= 30);
        console.log('after filter – activeTeams length:', activeTeams.length); // should be 30

        renderTeams(activeTeams);
        attachSearch(activeTeams);
        // console.log(teams);
    } catch (err) {
        console.error(' init error:', err);
    }
}
// print teams
// console.log(teams);


// init();

// SEARCH LOGIC 
// getTeams() returns a complete Array
function attachSearch(allTeams) {

    // Grab the search element from DOM
    const input = document.getElementById("search");

    // listen for input event 
    input.addEventListener("input", () => {
        // case insensitive 
        // String.prototype.trim()	Removes leading and trailing whitespace.	
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
        // String.prototype.toLowerCase()	Returns a lower‑case version of the string.	
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
        const term = input.value.trim().toLowerCase();

        // build filtered to turn the user’s free‑text input into a concrete, immutable list
        const filtered = allTeams.filter(team =>
            team.fullname.toLowerCase().includes(term) ||
            team.abbreviation.toLowerCase().includes(term) ||
            team.city.toLowerCase().includes(term) ||
            team.conference.toLowerCase().includes(term)
        );
        renderTeams(filtered)
    });

}


// loadTeams();
document.addEventListener("DOMContentLoaded", init);