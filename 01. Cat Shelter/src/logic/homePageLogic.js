import { fs } from '../../lib/coreLibraries.js';
import { homePageHtml } from '../views/homePage.html.js';

export function homePageLogic(res) {
    let catsJsonList = [];

    fs.readFile('./data/cats.json', { encoding: 'utf-8' })
        .then(resp => {
            JSON.parse(resp).map(cat => catsJsonList.push(cat));

            const catsData = catsJsonList.map(cat => Object.values(cat).at(0));
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(homePageHtml(catsData));
            res.end();
        })
        .catch(error => console.error(error.message));
}