import fs from 'fs/promises';

export async function initCats() {
    let catsData = [];

    await fs.readFile('./data/cats.json', { encoding: 'utf-8' })
        .then(resp => {
            let catsJsonList = [];

            JSON.parse(resp).map(cat => catsJsonList.push(cat));
            catsData = catsJsonList.map(cat => Object.values(cat).at(0));
        })
        .catch(error => console.error(error.message));

    return catsData;
}