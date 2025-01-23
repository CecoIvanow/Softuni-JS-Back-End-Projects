export default function movieRatingHelper(rating) {
    return '★'.repeat(Math.round(rating) / 2);
}