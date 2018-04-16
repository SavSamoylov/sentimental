import React, {Fragment} from 'react';
import {Doughnut} from 'react-chartjs-2';


const TweetOverview = (props) => {

    const selectedTweet = props.selectedTweet;
    const tweets = props.tweets;
    let tweetData = [];

    if (tweets){
        // Get data from the Sidebar tweet that was clicked.
        tweetData = tweets.filter(tweet => {
            return tweet.id === selectedTweet;
        });
    }

    const renderOverview = (tweet) => {

        // Tweet data for tweet that is active/selected.
        const tweetData = tweet[0];

        if(tweetData){
            
            // Convert sentiment confidence from a decimal number to a whole number out of 100.
            // Calculate the remaining difference in order to complete the Doughnut chart.
            // Store color values to be used in the Doughnut chart based on the tweet's sentiment in an array.
            const sentimentConfidence = Math.floor(tweetData.confidence * 100);
            const remainder = 100 - sentimentConfidence;
            let   colorArray = [];

            switch (tweetData.sentiment.toLowerCase()) {
                case 'positive':
                    colorArray = ["#87f6fe", "rgba(255, 255, 255, .2)"];
                  break;
                case 'negative':
                    colorArray = ["#ec6b52", "rgba(255, 255, 255, .2)"];
                  break;
                case 'neutral':
                    colorArray = ["#fd99f5", "rgba(255, 255, 255, .2)"];
                  break;
                default:
                    colorArray = ["#87f6fe", "rgba(255, 255, 255, .2)"];
              }

            return (
                <Fragment>
                    <h3 className=''>Tweet Overview</h3>
                    <div className='tweet-overview'>
                        <div className='tweet-overview__sentiment'>
                            <div className='chart-block'>
                                <p className=''>
                                    {sentimentConfidence}
                                    <span className=''>{tweetData.sentiment}</span>
                                </p>
                                <Doughnut data={{
                                    datasets: [{
                                            data: [sentimentConfidence, remainder],
                                            backgroundColor: colorArray,
                                            borderWidth: 0
                                        }]
                                }} options={{
                                    maintainAspectRatio: false,
                                    cutoutPercentage: 85
                                }}/>
                            </div>
                        </div>
                        <div className='tweet-overview__stats'>
                            <div className='tweet-overview__rt'>
                                <span className=''>Retweets</span>
                                {tweetData.rt_count}
                            </div>
                            <div className='tweet-overview__favorites'>
                                <span className=''>Favorites</span>
                                {tweetData.favorite_count}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    return renderOverview(tweetData)
    
}

export default TweetOverview;