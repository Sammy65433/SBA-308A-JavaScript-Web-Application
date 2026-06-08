// Store your API key as a string here (this file will NOT be pushed to GitHub)
const API_KEY = "de379885-e05e-479c-a352-9b6e1fd90dee";

export async function getTeams() {


    const response = await fetch("https://api.balldontlie.io/v1/teams", {
        headers: {
            // confirm authorization 
            Authorization: API_KEY
        }
    });

    // convert to JSON
    const data = await response.json();


    return data.data;
}