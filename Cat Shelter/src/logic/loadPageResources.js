import cssStyles from '../../content/styles/site.css.js'

export function loadStyles(res) {
    res.writeHead(200, 
        {'content-type': 'text/css'});
    res.write(cssStyles);
    res.end();
}