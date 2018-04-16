import React from 'react';

const TweetBlock = (props) => {

    const tweets = props.tweets;

    // Display Tweets if there are any
    const renderTweets = () => {

        if(tweets.length > 0) {

            return (
                <ul className='tweets'>

                    {/* Loop through Tweers Array */}
                    {tweets.map(tweet => {

                        // Add active class to the currently selected tweet.
                        const itemClass = () => {
                            const classes = ['tweet'];

                            if(tweet.id === props.selectedTweet){
                                classes.push("active");
                            }

                            return classes.join(' ');
                        }

                        // Display users tweets.
                        return (
                            <li role='button' className={itemClass()} key={tweet.id} onClick={(e) => props.selectTweet(e, tweet.id)}>
                                <span className={'tweet__mood ' + tweet.sentiment}>{tweet.sentiment}</span>
                                <p className='tweet__text'>{tweet.text}</p>
                                <span className='tweet__date'>{tweet.date}</span>
                            </li>
                        )
                    })}
                </ul>
            );

        } else {
            
            // Display message if there are no tweets.
            return (
                <div className='tweet-feedback'>
                    <h3 className=''>There are no tweets</h3>
                    <p className=''>Search for an existing Twitter Username to get a Sentiment Analysis based on their latest Tweets.</p>
                    {props.tweetBlockFeedback ? <p className=''>{props.tweetBlockFeedback}</p> : null}
                </div>
            );
        }
    }

    // Display Sidebar
    return (
        <div className={props.tweetBlockOpen ? 'tweet-block open' : 'tweet-block' }>
            {renderTweets()}
        </div>
    );
}

export default TweetBlock;