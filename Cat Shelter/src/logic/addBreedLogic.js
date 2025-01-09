import { addBreedHtml } from "../views/addBreed.html.js";

export function addBreedLogic(res) {
    res.setHeader('content-type', 'text/html');
    res.write(addBreedHtml);
}