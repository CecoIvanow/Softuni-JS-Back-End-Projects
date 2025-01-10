import { homePageHtml } from '../views/home.html.js';

export function homePageLogic(res) {
    res.writeHead(200, 
        {'content-type': 'text/html'});
    res.write(homePageHtml());
}