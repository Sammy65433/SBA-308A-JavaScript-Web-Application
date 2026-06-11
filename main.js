// `main.js` - event listener and app logic  - 
// "Controls what happens when app starts

// import getTeams function from api.js
import {
    getTeams
} from "./api.js";


import {
    renderTeams
} from "./ui.js";

import { PAGE_SIZE, STORAGE_KEY } from "./constant.js";

// const STORAGE_KEY = "nbaTeams"

let allTeams = [];
let filteredTeams = [];
let currentPage = 1;

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
        // load from localstorage 
        const cached = localStorage.getItem(STORAGE_KEY);
        let rawTeams;
        if (cached) {
            allTeams =JSON.parse(cached);
            console.log("Loaded teams from localstorage");
        } else {
        rawTeams = await getTeams();
        allTeams = rawTeams.filter(t => t.id <= 30);
        localStorage.setItem(STORAGE_KEY,JSON.stringify(allTeams));
        console.log("fetch teams from API and cached");

        }
                // wait for Api request 

        // console.log('fetch succeeded – rawTeams length:', rawTeams.length);


        // console.log('after filter – activeTeams length:', activeTeams.length); // should be 30
filteredTeams = [...allTeams];
currentPage = 1;

renderCurrentPage();
attachSearch()
        // renderTeams(activeTeams);
        // attachSearch(activeTeams);
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
// reset all teams 
function attachSearch() {

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
        if (terms === "") {
    filtered = [...activeTeams];
    currentPage = 1
    renderCurrentPage();
    return;
        }

        // build filtered to turn the user’s free‑text input into a concrete, immutable list
        const filtered = allTeams.filter(team =>
            team.fullname.toLowerCase().includes(term) ||
            team.abbreviation.toLowerCase().includes(term) ||
            team.city.toLowerCase().includes(term) ||
            team.conference.toLowerCase().includes(term)
        );
currentPage = 1;
renderCurrentPage();
        // renderTeams(filtered)
    });


}

// Conference Dropdown 
function attachConferenceFilter() {





}





function renderCurrentPage() {
    renderTeams(filteredTeams,currentPage);
    
}


// loadTeams();
document.addEventListener("DOMContentLoaded", init);