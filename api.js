// Store your API key as a string here (this file will NOT be pushed to GitHub)
const API_KEY = "de379885-e05e-479c-a352-9b6e1fd90dee";


//Handle API REQUEST  
// Error Handling 

// async function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

export async function getTeams() {


    // Make a request 
    // fetch()
    // https: //developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

        // await
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
        const response = await fetch("https://api.balldontlie.io/v1/teams", {
            headers: {
                // confirm authorization 
                Authorization: API_KEY
            }
        });

        // Response.ok – boolean indicating a successful HTTP status	
        // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok

    // Check for http errors 
    if (!response.ok) {


        // Error constructor – creating custom errors	
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        throw new Error(`Failed to fetch teams ${response.status})`);
        // Template literals (`…${…}`)	
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    }
    // convert to JSON
    const data = await response.json();


    return data.data;
}