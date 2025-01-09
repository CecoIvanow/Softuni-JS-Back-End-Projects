import { http } from "../lib/coreLibraries.js";

import { homePageLogic } from "./logic/homePageLogic.js";
import { loadStyles } from "./logic/loadPageResources.js";
import { addBreedLogic } from "./logic/addBreedLogic.js";
import { addCatLogic } from "./logic/addCatLogic.js";

const server = http.createServer((req, res) => {
    const pathname = req.url;

    switch (pathname) {
        case '/content/styles/site.css':
            loadStyles(res);
            break;
        case '/':
            homePageLogic(res);
            break;
        case '/cats/add-cat':
            addCatLogic(res);
            break;
        case '/cats/add-breed':
            addBreedLogic(res);
            break;
        default:
            break;
    }

    res.end();
})

server.listen(5050);
console.log('Server is listening on http://localhost:5050...');