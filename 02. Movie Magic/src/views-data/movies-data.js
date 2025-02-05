export function getMovieCategoriesViewData(category) {
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film',
    }

    const categories = Object.keys(categoriesMap).map(value => ({
        value,
        label: categoriesMap[value],
        selected: categoriesMap[value] === category ? 'selected' : '',
    }))

    return categories;
}