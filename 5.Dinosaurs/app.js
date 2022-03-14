// Common parent constructor
function Creature(name, weight, height, diet) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
}

// Create Dino Constructor
function Dino(dino) {
    Creature.call(this, dino.species, dino.weight, dino.height, dino.diet);
    this.where = dino.where;
    this.when = dino.when;
    this.fact = dino.fact;
}

// Create Dino Objects. dinoDataSource is from dino.js file
const dinoArray = dinoDataSource.map(dino => {
    return new Dino(dino);
});

// Create Human Object
const human = new Creature();

// Use IIFE to get human data from form
function getHumanData() {
    (function(humanObj){
        humanObj.name = document.getElementById('name').value;
        humanObj.weight = Number(document.getElementById('weight').value);
        humanObj.diet = document.getElementById('diet').value;
        const feet = Number(document.getElementById('feet').value);
        const inches = Number(document.getElementById('inches').value);
        humanObj.height = feet * 12 + inches;
    }(human));
}

// Create Dino Compare Method 1
function getHeightComparisonFact(humanObj, dinoObj) {
    const factPrefix = `${dinoObj.name} is `;
    if (dinoObj.height > humanObj.height) {
        return `${factPrefix}${dinoObj.height - humanObj.height} inches taller than humans`;
    } else if (dinoObj.height === humanObj.height) {
        return `${factPrefix} the same height as humans`;
    } else {
        return `${factPrefix}${humanObj.height - dinoObj.height} inches shorter than humans`;
    }
}

    
// Create Dino Compare Method 2
function getWeightComparisonFact(humanObj, dinoObj) {
    const factPrefix = `${dinoObj.name} is `;
    if (dinoObj.weight > humanObj.weight) {
        return `${factPrefix}${dinoObj.weight - humanObj.weight} pounds heavier than humans`;
    } else if (dinoObj.weight === humanObj.weight) {
        return `${factPrefix} the same weight as humans`;
    } else {
        return `${factPrefix}${humanObj.weight - dinoObj.weight} pounds lighter than humans`;
    }
}
    
// Create Dino Compare Method 3
function getDietComparisonFact(humanObj, dinoObj) {
    if (dinoObj.diet === humanObj.diet) {
        return `${dinoObj.name} has the same ${dinoObj.diet} diet as humans`;
    } else {
        return `${dinoObj.name} has ${dinoObj.diet} diet unlike ${humanObj.diet} diet humans`;
    }
}

// Function to return random fact for dino
function getRandomFact(dinoObj) {
    if (dinoObj.name === 'Pigeon') {
        return dinoObj.fact;
    }
    // get random int 0 - 3 to return random fact
    const random = Math.floor(Math.random() * Math.floor(4));
    switch (random) {
        case 0:
            return dinoObj.fact;
        case 1:
            return getHeightComparisonFact(human, dinoObj);
        case 2:
            return getWeightComparisonFact(human, dinoObj);
        case 3:
            return getDietComparisonFact(human, dinoObj);
        default:
            break;
    }
}

// Generate Tiles for each Dino in Array
function generateTiles() {
    let tiles = "";  
    for (let i = 0; i < dinoArray.length; i++) {
        const dino = dinoArray[i];
        let tile = `<div class="grid-item">`;
        if (i === Math.floor(dinoArray.length/2)) {
            tile += `<h3>${human.name}</h3>`;
            tile += `<img src="images/human.png">`;
            // slide array contents by one space at this index
            // since human tile is inserted here
            dinoArray.splice(i, 0, '');
        } else {
            tile += `<h3>${dino.name}</h3>`;
            tile += `<img src="images/${dino.name.toLowerCase()}.png">`;
            tile += `<p>${getRandomFact(dino)}</p>`;
        }
        tile += `</div>`;
        tiles += tile;
    }
    return tiles;
}

// Add tiles to DOM
function displayTiles() {
    document.getElementById('grid').innerHTML = generateTiles();
}

// Remove form from screen
function hideForm() {
    document.getElementById('dino-compare').style.display = 'none';
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', () => {
    hideForm();
    getHumanData();
    displayTiles()
});
