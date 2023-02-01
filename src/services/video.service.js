const {getPossibleContentRatings, sortVideos} = require('./custom.service')
const Values = require('../utils/values');
const { Video } = require('../models/video.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getVideos = async (title, contentRating, genres, sortBy) => {
    const titleMatch = {'title': {'$regex': title, '$options': 'i'}};

    const defaultContentRatings = [...Values.ratings];
    const contentRatings = getPossibleContentRatings(defaultContentRatings, contentRating);
    const contentRatingMatch = {'contentRating':{$in: contentRatings}};

    let getGenres = []

    if(genres.includes('All') || genres === '') {
        getGenres = [...Values.genres];
    } else {
        getGenres = [...genres];
    }

    let genreMatch = {'genre': {$in: getGenres}}

    const videos = await Video.find({
        ...titleMatch,
        ...contentRatingMatch,
        ...genreMatch
    })

    if(!sortBy) {
        return videos;
    } else {
        return sortVideos(videos, sortBy);
    }

}

const getVideoById = async (id) => {
    const video = Video.findOne({_id: id});
    return video;
}

const addNewVideo = async(title, videoLink, genre, contentRating, releaseDate, previewImage) => {
    const video = await Video.create({
        title,
        videoLink,
        genre,
        contentRating,
        releaseDate,
        previewImage
    });

    return video;
}

const changeViews = async (videoId) => {
    const video = await Video.findOne({_id: videoId});

    if(!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with the matching id");

    } else {
        video.viewCount +=1;
        await video.save();
    }
}

const changeVotes = async(videoId, vote, change) => {
    const video = await Video.findOne({_id: videoId});

    if(!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");

    } else {
        let changeVote = "downVotes";
        if(vote === "upVote") {
            changeVote = "upVotes"
        }

        const prevVoteCount = video.votes[changeVote];

        let updatedVoteCount = prevVoteCount;

        if(change === "increase") {
            updatedVoteCount += 1;

        } else {
            updatedVoteCount -=1;
        }

        updatedVoteCount = Math.max(updatedVoteCount, 0);
        video.votes[changeVote] = updatedVoteCount;
        await video.save();
    }
}


module.exports = {
    getVideos,
    getVideoById,
    addNewVideo,
    changeViews,
    changeVotes
}