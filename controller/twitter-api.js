const express = require('express');
const router = new express.Router();
const moment = require('moment');
const Twitter = require('twitter');
const TextAnalysis = require('aylien_textapi');


// API Credentials
// =============================================
const textAPI = new TextAnalysis({
    application_id: process.env.AYLIEN_APP_ID,
    application_key: process.env.AYLIEN_APP_KEY
});

const tweetTimeline = new Twitter({
    consumer_key: process.env.TWITTER_APP_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_APP_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_APP_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_APP_ACCESS_TOKEN_SECRET
})


// API Routes
// =============================================

router.get('/tweets/:username', (req, res) => {

    const username = req.params.username;

    // CALLBACK: Get {usernames} tweets from twitter api.
    getTweets(username, (tweets) => {
    
        // Return an Error Object if no Tweets or Error.
        if (!tweets) {

            res.json({
                error: `No Tweets Found for @${username}`
            });

        } else {

            // CALLBACK: If there are tweets for {username}, run them through
            // Aylien sentiment analysis API and return new data.
            getSentiment(tweets, (tweetsWithSentiments) => {

                // Sort in Descending Order
                const sortedUsersTweets = tweetsWithSentiments.sort((a, b) => b.id - a.id);

                // CALLBACK: Find public tweets mentioning {username}
                getPublicTweets(username, (tweets) => {

                    // Return an Error Object if no Tweets or Error.
                    if (!tweets) {

                        res.json({
                            usersTweets
                        });

                    } else {

                        // CALLBACK: If there are public tweets run them through
                        // Aylien sentiment analysis API and return new data.
                        getSentiment(tweets, (publicSentiments) => {

                            // Sort in Descending Order
                            const sortedPublicTweets = orderDesc(publicSentiments);

                            // IIFE: Get Sentiment Statistics based on public tweets.
                            const publicSentimentStats = (() => {

                                const positive = {
                                    mood: 'positive',
                                    count: 0
                                };

                                const negative = {
                                    mood: 'negative',
                                    count: 0
                                };

                                const neutral = {
                                    mood: 'neutral',
                                    count: 0
                                };

                                // Iterrate sentiment count
                                publicSentiments.forEach((s) => {
                                    switch (s.sentiment) {
                                        case 'positive':
                                            positive.count++;
                                            break;
                                        case 'negative':
                                            negative.count++;
                                            break;
                                        case 'neutral':
                                            neutral.count++;
                                            break;
                                        default:
                                            neutral.count++;
                                    }
                                });

                                // Sort in Descending Order
                                const moodArr = [positive, negative, neutral].sort((a, b) => b.count - a.count);

                                return {
                                    public_sentiment_majority: moodArr[0].mood,
                                    positive: positive.count,
                                    neutral: neutral.count,
                                    negative: negative.count
                                }
                            })();

                            // SUCCESS: Send JSON object back to the user.
                            res.json({
                                usersTweets: sortedUsersTweets,
                                publicTweets: sendFive(sortedPublicTweets),
                                publicTweetStats: publicSentimentStats
                            });

                        });
                    }
                });
            });
        }
    });
});


//
// API Helper Functions
//

function getTweets(username, cb) {

    const params = {
        screen_name: username,
        count: 5,
        trim_user: true,
        include_rts: false
    };

    tweetTimeline.get('statuses/user_timeline', params, (err, tweets, res) => {
        if (err || tweets.length == 0) {
            console.log(err);
            cb(false);
        } else {
            const data = tweets.map(tweet => {

                return {
                    id: tweet.id,
                    text: tweet.text,
                    date: moment(tweet.created_at).format("dddd, MMMM Do"),
                    rt_count: tweet.retweet_count,
                    favorite_count: tweet.favorite_count,
                }
            });

            cb(data);
        }

    });
}

function getSentiment(tweetsArr, cb) {
    const tweetsArrLength = tweetsArr.length;
    const tweets = [];

    tweetsArr.map(tweet => {
        textAPI.sentiment({
            'text': tweet.text,
            'mode': 'tweet'
        }, function (err, res) {
            if (err === null) {
                tweet.sentiment = res.polarity;
                tweet.confidence = res.polarity_confidence;
                tweets.push(tweet);
                if (tweets.length === tweetsArrLength) {
                    cb(tweets);
                }
            }
        });
    });

}

function getPublicTweets(username, cb) {

    const params = {
        q: username,
        count: 19,
        result_type: "recent",
        include_entities: false
    };

    tweetTimeline.get('search/tweets', params, (err, tweets, res) => {
        if (err || tweets.length == 0) {
            console.log(err);
            cb(false);
        } else {

            const data = tweets.statuses.map(tweet => {

                return {
                    id: tweet.id,
                    text: tweet.text,
                    img: tweet.user.profile_image_url_https,
                    name: '@' + tweet.user.screen_name
                }
            });

            cb(data);
        }

    });
}

function sendFive(arr) {
    return arr.slice(0, 5);
}

function orderDesc(arr) {
    return arr.sort((a, b) => b - a);
}

module.exports = {
    router,
    sendFive,
    orderDesc
}