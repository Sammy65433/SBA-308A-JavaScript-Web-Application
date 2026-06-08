



// `main.js` - event listener and app logic  - 
// "Controls what happens when app starts

// import getTeams function from api.js
import { getTeams } from "./api.js";

// async function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// Load teams 
async function loadTeams() {
try {
    // wait for Api request 
    const teams = await getTeams();
console.log(teams);
} catch (e) {
    console.error(e)
    // print teams
    // console.log(teams);
}
}

// Run function
loadTeams();