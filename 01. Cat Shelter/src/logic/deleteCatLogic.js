import { fs } from "../../lib/coreLibraries.js";

export function deleteCat(req, res) {
    const pathname = req.url;
    const catId = pathname.split('/').pop();

    const deleteImageDir = () => new Promise((resolve, reject) => {
        fs.rm(`./content/images/cat_images/${catId}`, { recursive: true })
            .then(() => resolve())
            .catch(error => {
                reject();
                console.error(error.message);
            });
    })

    const deleteCatJsonEntry = (toBeDeletedCatId) => new Promise((resolve, reject) => {
        let cats = [];

        fs.readFile('./data/cats.json', { encoding: 'utf-8' })
            .then(resp => {
                cats = JSON.parse(resp);

                const tempNewExistingCats = [];

                for (const curCat of cats) {
                    const curCatId = Object.keys(curCat).at(0);

                    if (curCatId === toBeDeletedCatId) {
                        continue;
                    }
                    tempNewExistingCats.push(curCat);
                }
                const catsJson = JSON.stringify(tempNewExistingCats, null, 2);

                fs.writeFile('./data/cats.json', catsJson, { encoding: 'utf-8' })
                    .then(() => resolve())
                    .catch(error => console.error(error.message));
            })
            .catch(error => {
                reject();
                console.error(error.message);
            });
    })

    Promise.all([
        deleteCatJsonEntry(catId),
        deleteImageDir()
    ])
        .then(() => {
            res.writeHead(303, { 'Location': 'http://localhost:5050/' });
            res.end();
        })
}