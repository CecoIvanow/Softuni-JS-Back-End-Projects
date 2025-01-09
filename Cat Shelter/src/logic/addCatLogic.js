import { addCatHtml } from "../views/addCat.html.js";

export function addCatLogic(res) {
    res.setHeader('content-type', 'text/html');
    res.write(addCatHtml());
}