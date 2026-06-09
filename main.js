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
async function loadTeams() {
    try {
        // wait for Api request 
        const teams = await getTeams();
        renderTeams(teams);
        // console.log(teams);
    } catch (e) {
        console.error(e)
        // print teams
        // console.log(teams);
    }
}

// Run function from ui.js

async function init() {
    try {
        // wait for Api request 
        const teams = await getTeams();
        renderTeams(teams);
        // console.log(teams);
    } catch (e) {
        console.error(e)
        // print teams
        // console.log(teams);
    }
}
// init();

// SEARCH LOGIC 
// getTeams() returns a complete Array
function attachSearch(allTeams) {

}
// Grab the search element from DOM


loadTeams();
