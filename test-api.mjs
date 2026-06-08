
import fetch from "node-fetch";


const API_KEY = "de379885-e05e-479c-a352-9b6e1fd90dee";

export async function getTeams() {
  const response = await fetch("https://api.balldontlie.io/v1/teams", {
    headers: { Authorization: API_KEY }
  });
  const data = await response.json();
  return data.data;
}

getTeams().then(console.log).catch(console.error);