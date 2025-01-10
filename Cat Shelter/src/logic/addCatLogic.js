import { addCatHtml } from "../views/addCat.html.js";

export function addCatLogic(res) {
    res.writeHead(200, 
        {'content-type': 'text/html'});
    res.write(addCatHtml());
}