import cssStyles from '../../content/styles/site.css.js'

export function loadStyles(res) {
    res.setHeader('content-type', 'text/css');
    res.write(cssStyles);
}