import { homePageHtml } from '../views/home.html.js';

export function homePageLogic(res) {
    res.setHeader('content-type', 'text/html')
    res.write(homePageHtml());
}