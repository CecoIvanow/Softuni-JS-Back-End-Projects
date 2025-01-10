import { fs } from "../../lib/coreLibraries.js";
import { addCatHtml } from "../views/addCat.html.js";

export function addCatLogic(req, res) {
    fs.readFile('./data/breeds.json', { encoding: 'utf-8' })
        .then(data => {
            const breeds = JSON.parse(data);
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(addCatHtml(breeds));
            res.end();
        })
        .catch(error => console.error(error.message));
}