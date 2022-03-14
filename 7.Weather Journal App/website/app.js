// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=9517c4ced3838c35339020d493d089bd&units=imperial";
let input, zip, url = '';

// setup new date
let d = new Date();
let today = d.getMonth() + 1 '.' + d.getDate() + '.' + d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', verifyZip);

// Validate the zipcode user entered
function verifyZip(zip) {
    zip = document.getElementById('zip').value;
    if (zip.length != 5) {
        console.log(zip.length);
        alert('Please enter a 5 digit zip code');
        return;
    }
    else if (isNaN(parseInt(zip))){
        alert('Please enter your numeric zip code only')
        return;
    }
    getInput(zip);
}

/* Function called by event listener */
function getInput(zip) {
    input = document.getElementById('feelings').value;
    getData(baseURL, zip, apiKey)
    .then(function(data) {
        // add data to POST request
        postData('/addEntry', {temp: data.main.temp, date: today, input: input});
        updateUI();
    });
}

/* Function to GET Web API Data*/
const getData = async(baseURL, zip, key) => {
    const response = await fetch(baseURL + zip + key);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }

}

/* GET project data and update UI */
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        // make journal entry visible
        document.getElementById('journal-entry').classList.remove('hidden');

        // update values for journal entry
        document.getElementById('date').innerHTML = "<strong>Date:</strong> " + allData.date;
        document.getElementById('temp').innerHTML = "<strong>Temperature:</strong> " + allData.temp + " &deg;F";
        document.getElementById('content').innerHTML = "<strong>Journal entry:</strong> " + allData.input;
    }
    catch(error) {
        console.log("Error: ", error);
    }
}
