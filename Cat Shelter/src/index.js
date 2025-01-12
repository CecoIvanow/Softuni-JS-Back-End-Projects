import { http } from "../lib/coreLibraries.js";

import { homePageLogic } from "./logic/homePageLogic.js";
import { loadStyles } from "./logic/loadPageResources.js";
import { addBreedLogic } from "./logic/addBreedLogic.js";
import { addCatLogic } from "./logic/addCatLogic.js";
import { loadImages } from "./logic/loadCatImages.js";

const server = http.createServer((req, res) => {
    let pathname = req.url;

    if (pathname.includes('/content/images/cat_images')) {
        pathname = '/content/images/cat_images';
    }

    switch (pathname) {
        case '/content/styles/site.css':
            loadStyles(res);
            break;
        case '/':
            homePageLogic(res);
            break;
        case '/cats/add-cat':
            addCatLogic(req, res);
            break;
        case '/cats/add-breed':
            addBreedLogic(req, res);
            break;
        case '/content/images/cat_images':
            loadImages(req, res);
            break;
    }
})

server.listen(5050);
console.log('Server is listening on http://localhost:5050...');