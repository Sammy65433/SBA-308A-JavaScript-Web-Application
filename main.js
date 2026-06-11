// `main.js` - event listener and app logic  - 
// "Controls what happens when app starts

// import getTeams function from api.js
import {
    getTeams
} from "./api.js";


import {
    renderTeams
} from "./ui.js";

import {
    PAGE_SIZE,
    STORAGE_KEY
} from "./constant.js";

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
            allTeams = JSON.parse(cached);
            console.log("Loaded teams from localstorage");
        } else {
            rawTeams = await getTeams();
            allTeams = rawTeams.filter(t => t.id <= 30);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allTeams));
            console.log("fetch teams from API and cached");

        }
        // wait for Api request 

        // console.log('fetch succeeded – rawTeams length:', rawTeams.length);


        // console.log('after filter – activeTeams length:', activeTeams.length); // should be 30
        filteredTeams = [...allTeams];
        currentPage = 1;

        renderCurrentPage();
        attachSearch();
        attachConferenceFilter();
        attachPaginationControls();

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

        // EMpty box - show all teams 
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
// Build ALL / EAST / West filter 
// insert it into the page and wire it to team list rendering. 
// Conference Dropdown 
function attachConferenceFilter() {


    // create select element 
    const select = document.createElement("select"); // MDN: Document.createElement()
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement


    select.id = "conf-filter";

    // Add three options elements 
    ["All", "East", "West"].forEach(opt => {
        const el = document.createElement("option");
        el.value = opt.toLowerCase();
        el.textContent = opt;
        select.appendChild(el);

    });

    // get dropdown Above team list 

    // / insertBefore should insert the new node before the reference node in the DOM
    document.body.insertBefore(select, document.getElementById("team-list"));


    // react when user picks different option 
    select.addEventListener("change", () => {
        const val = select.value;

        // Filter the master array (allTeams) according to the chosen conference.
        // If the user selected “All”, keep every team; otherwise keep only teams
        // whose conference matches the selected value.
        filteredTeams = allTeams.filter(team => {
            if (val === "all") return true;
            return team.conference.toLowerCase() === val
        });
        // reset 1st page because data changed 
        currentPage = 1;

        // re-draw with new list
        renderCurrentPage();
    });

}





// create container and drw 1st bar 
function attachPaginationControls() {

    // create div 
    const nav = document.createElement("div");


    // HTMLElement.id	
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/id
    nav.id = "pagination";

    // put container at the end of body 
    document.body.appendChild(nav);

    // Draw the first set of buttons (Prev, page numbers, Next)
    renderPagination();
}

// Re‑draw the pagination bar based on the current page / total pages

function renderPagination() {

    // Grab the container
    const nav = document.createElement("pagination");

    // refresh buttons
    nav.textContent = "";

    // How many pages do we need?  (total items ÷ items per page, rounded up)
    const totalPages = Math.ceil(filteredTeams.length / PAGE_SIZE);


    /* PREV button  */
    const prev = document.createElement("button");
    prev.textContent = "<- Prev";

    // Disable it on the very first page (no previous page to go to)
    prev.disabled = currentPage === 1;

    // When clicked, move one page back and re‑render everything
    prev.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderCurrentPage();
        }
    });
    nav.appendChild(prev);
    


    // next button 
    const next = document.createElement("button");
    next.textContent = "Next ->";

    next.disabled = currentPage === totalPages;

    next.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCurrentPage();
        }
    });
    nav.appendChild(next);


}

function renderCurrentPage() {
    renderTeams(filteredTeams, currentPage);
renderPagination();
}


// loadTeams();
document.addEventListener("DOMContentLoaded", init);