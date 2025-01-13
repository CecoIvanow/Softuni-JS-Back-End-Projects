import { fs } from "../../lib/coreLibraries.js";

export function loadImages(req, res) {
    const pathname = req.url;

    const imageExtension = pathname
        .split('/')
        .pop()
        .split('.')
        .pop();

    fs.readFile('.' + pathname)
        .then(image => {
            switch (imageExtension) {
                case 'jpeg':
                case 'jpg':
                    res.writeHead(200, { 'content-type': 'image/jpeg' });
                    break;
                case 'png':
                    res.writeHead(200, { 'content-type': 'image/png' });
                    break;
            }
            res.write(image);
            res.end()
        })
        .catch(error => console.error(error.message));
}