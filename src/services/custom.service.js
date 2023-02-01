const sortVideos = (videos, sortBy) => {
    videos.sort((video1, video2) => {
        if(sortBy === 'releaseDate') {
            return new Date(video2.releaseDate) - new Date(video1.releaseDate);
        }
    })

    return videos;
}


const getPossibleContentRatings = (ratingValues, contentRating) => {
    let contentRatings = ratingValues;

    if(contentRating === 'All' || contentRating === '') {
        return contentRatings;
    }

    const IndexOfContentRating = contentRatings.indexOf(contentRating);
    const getPossibleContentRatings = contentRatings.splice(IndexOfContentRating);

    return getPossibleContentRatings;
}

module.exports = {
    getPossibleContentRatings,
    sortVideos
}