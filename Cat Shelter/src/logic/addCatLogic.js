import { uuid } from "../../lib/uuid.js";
import { fs, EOL, path } from "../../lib/coreLibraries.js";
import { addCatHtml } from "../views/addCat.html.js";

export function addCatLogic(req, res) {
    const method = req.method;

    switch (method) {
        case 'POST':
            extractInputData(req, res);
            break;
    }

    fs.readFile('./data/breeds.json', { encoding: 'utf-8' })
        .then(data => {
            const breeds = JSON.parse(data);
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(addCatHtml(breeds));
            res.end();
        })
        .catch(error => console.error(error.message));
}

function extractInputData(req) {
    const body = [];

    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
        const dataBuffer = Buffer.concat(body);
        const data = dataBuffer.toString("binary");
        const boundary = req.headers['content-type'].split('boundary=').at(1);
        const dataParts = data.split(`--${boundary}`);

        formDataRetrieval(dataParts);
    });
}

function formDataRetrieval(dataParts) {
    const newCatData = {};
    const imageFile = dataParts.splice(3, 1).at(0);
    const rawData = dataParts.splice(1, 3);
    const catId = uuid();

    newCatData[catId] = {};

    const imageRetrieval = (imageFile, catData) => new Promise((resolve, reject) => {
        const [metaData, imageData] = imageFile.split(EOL + EOL);
        const imageName = metaData.match(/filename="(.+)"/).at(1);
        let curDir = import.meta.dirname.split('\\');
        let savePath = '';
        curDir.pop();
        curDir.pop();
        curDir = curDir.join('\\');

        fs.mkdir(`./content/images/cat_images/${catId}`)
            .then(() => savePath = path.join(curDir, 'content', 'images', 'cat_images', catId, imageName))
            .then(() => {
                fs.writeFile(savePath, imageData, { encoding: 'binary' })
                    .then(() => {
                        catData[catId].id = catId;
                        catData[catId].imagePath = `/content/images/cat_images/${catId}/${imageName}`;
                        resolve();
                    })
                    .catch(error => {
                        reject();
                        throw new Error(error.message);
                    });
            })
            .catch(error => console.error(error.message));
    })

    const rawDataRetrieval = (rawData, catData) => new Promise((resolve) => {
        const [nameRawData, descriptionRawData, breedRawData] = rawData;

        const name = nameRawData.split(EOL + EOL).at(1).split(EOL).at(0);
        const description = descriptionRawData.split(EOL + EOL).at(1).split(EOL).at(0);
        const breed = breedRawData.split(EOL + EOL).at(1).split(EOL).at(0);

        catData[catId].name = name;
        catData[catId].description = description;
        catData[catId].breed = breed;
        resolve();
    })

    Promise.all([
        imageRetrieval(imageFile, newCatData),
        rawDataRetrieval(rawData, newCatData)
    ])
        .then(() => {
            initCats(newCatData)
        })
        .catch(error => console.error(error.message));
}

function initCats(newCat) {
    let cats = [];

    fs.readFile('./data/cats.json', { encoding: 'utf-8' })
        .then(resp => {
            cats.push(JSON.parse(resp));
            if (cats[0] === undefined) {
                cats = [];
            }
            addNewCat(newCat, cats);
        })
        .catch(error => console.error(error.message));
}

function addNewCat(newCat, existingCats) {
    existingCats[0].push(newCat);
    const catsJson = JSON.stringify(existingCats[0], null, 2);
    fs.writeFile('./data/cats.json', catsJson, { encoding: 'utf-8' })
        .then(() => console.log('It works!'))
        .catch(error => console.error(error.message));
}