// export so main.js can import 
export function renderTeams(teams) {

    // find the team list div in index.html
    const container = document.getElementById("team-list");

    // Empty contaainer (filter or reload page )
    container.textContent = "";

    const fragment = document.createDocumentFragment();

    // loop or iterate the teams obj in API
    teams.forEach(team => {
        // console.log("render", team.full_name);

        // make new div for each team and assign CSS class
        const card = document.createElement("div");
        card.className = "team-card";

        // Build Card:
        // Template literal – embed JS expressions in a string	
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        //  team.full_name = "Los Angeles"
        // teams.abbreviation = LAL
        // teams.city and teams.conference = add info 

        //     card.innerHTML = `
        //  <strong>${teams.full_name}</strong> (${teams.abbreviation})<br>
        //  ${teams.city} - ${teams.conference}
        //  `;


        //  <strong>${teams.full_name}</strong>

        const strong = document.createElement("strong");

        // Insert plain text into the <strong>	
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

        strong.textContent = team.full_name;

        // Append the <strong> as a child of the card	
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
        card.appendChild(strong)

        // (${teams.abbreviation})<br>
        // document.createTextNode(` (${team.abbreviation})`)	
        // Create a raw text node (the space and abbreviation)	
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
        // function addTextNode(text) {
        //   const newText = document.createTextNode(text);
        //   const p1 = document.getElementById("p1");

        //   p1.appendChild(newText);
        // }

        // document.querySelectorAll("button").forEach((button) => {
        //   button.addEventListener("click", (event) => {
        //     addTextNode(`${event.target.textContent} `);
        //   });
        // });


        // space + (abbr)
        const abbrev = document.createTextNode(` (${team.abbreviation})`);
        card.appendChild(abbrev);

        // line break
        card.appendChild(document.createElement("br"));


        // city - conference - turn plain text to string 
        const info = document.createTextNode(`${team.city} - ${team.conference}`);
        card.appendChild(info);

        // Append the card as a child of the card	
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
        fragment.appendChild(card);
    });
    container.appendChild(fragment); // 1 DOM insert 
}