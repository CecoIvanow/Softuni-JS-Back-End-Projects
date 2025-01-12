import cssStyles from '../../content/styles/site.css.js'
import { fs } from '../../lib/coreLibraries.js';

export function loadStyles(res) {
    res.writeHead(200,
        { 'content-type': 'text/css' });
    res.write(cssStyles);
    res.end();
}

export function loadIcon(res) {
    fs.readFile('./content/images/favicon.ico')
        .then(image => {
            res.writeHead(200,
                { 'content-type': 'image/x-icon' });
            res.write(image);
            res.end();
        })
        .catch(error => console.error(error.message))
}