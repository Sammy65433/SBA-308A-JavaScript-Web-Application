import {
    PAGE_SIZE,
    STORAGE_KEY
} from "./constant.js";



// export so main.js can import 
export function renderTeams(teams, page = 1) {
    console.log('renderTeams called – received', teams.length, 'teams (page', page, ')');

    // find the team list div in index.html
    const container = document.getElementById("team-list");

    // Empty contaainer (filter or reload page )
    container.textContent = "";


    // Pagination 

    const start = (page - 1) * PAGE_SIZE;
    const pageTeams = teams.slice(start, start + PAGE_SIZE);



    const fragment = document.createDocumentFragment();

    // loop or iterate the teams obj in API
    pageTeams.forEach(team => {
        // console.log("render", team.full_name);

        // make new div for each team and assign CSS class
        const card = document.createElement("div");
        card.className = "team-card";

        // add team click 

        card.addEventListener("click", () => alert(team.full_name));

        // fragment.appendChild(card);
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
        // TEAM Name 
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

        // ABBrev
        // space + (abbr)
        card.appendChild(document.createTextNode(` (${team.abbreviation})`));
        // card.appendChild(abbrev);

        // line break
        card.appendChild(document.createElement("br"));


        // city - conference - turn plain text to string 
        const info = document.createTextNode(`${team.city} - ${team.conference}`);
        card.appendChild(info);

        // fav button
        const star = document.createElement("button");
        star.textContent = isFav(team.id) ? "★" : "☆";
        star.className = "fav-btn";


        star.addEventListener("click", e => {
            e.stopPropagation();
            toogleFav
        })

        // Append the card as a child of the card	
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
        card.appendChild(document.createElement("br"));
        card.appendChild(star);
    });
    container.appendChild(fragment); // 1 DOM insert 
}


// Helper Function FAVORITES - Stored in local storage 

// which teams are saved for star 
function getFavIds() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];

}
// decide the star’s initial state and later to decide whether clicking 
// the star should add or remove the team.
function isFav(id) {
    return getFavIds().includes(id);
}

function toogleFav(team, btnEl) {
    // pull current list of favids from sstorage 
    const favs = getFavIds();

    // does this team exist 
    if (isFav(team.id)) {
        // remove id 
        const idx = favs.indexOf(team.id); //postion id in array
        favs.splice(idx, 1); //delete sinlge element 
        btnEl.textContent = "☆"; // change to empty star 
    } else {
        // add id 
        favs.push(team.id); //append team id 
        btnEl.textContent = "☆"; //change to fill star 

    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}