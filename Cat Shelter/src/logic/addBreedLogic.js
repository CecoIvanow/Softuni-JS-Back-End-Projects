import { fs } from "../../lib/coreLibraries.js";
import { addBreedHtml } from "../views/addBreed.html.js";

export function addBreedLogic(req, res) {
    const method = req.method;

    switch (method) {
    case 'POST':
        initBreeds(req);
        break;
    }

    res.writeHead(201, {
        'content-type': 'text/html'
    });
    res.write(addBreedHtml);
    res.end();
}

function initBreeds(req) {
    let queryString = '';
    let newBreed = '';
    let breeds = [];

    req.on('data', chunk => {
        queryString += chunk;
    });

    req.on('end', () => {
        fs.readFile('./data/breeds.json', { encoding: 'utf8' })
            .then(resp => {
                breeds = JSON.parse(resp);
                newBreed = extractBreedInput(queryString)
                addNewBreed(newBreed, breeds);
            })
            .catch(error => console.error(error));
    });
}

function extractBreedInput(queryString) {
    const newBreedSearchParams = new URLSearchParams(queryString);
    const newBreedObject = Object.fromEntries(newBreedSearchParams);
    const newBreed = Object.values(newBreedObject);
    return newBreed;
}

function addNewBreed(newBreed, existingBreeds) {
    existingBreeds.push(newBreed[0]);
    const breedsJson = JSON.stringify(existingBreeds, null, 2);
    fs.writeFile('./data/breeds.json', breedsJson, { encoding: 'utf-8'})
    .catch(error => console.error(error))
}