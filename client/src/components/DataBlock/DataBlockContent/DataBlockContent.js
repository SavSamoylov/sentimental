import React from 'react';
import {SearchForm, TweetOverview, SentimentSummary} from '../../';

const DataBlockContent = (props) => {
    return (
        <section className='data-block__content'>
            <SearchForm 
            handleSearchFormInput={props.handleSearchFormInput} 
            handleUsernameFormSubmission={props.handleUsernameFormSubmission}
            tweetBlockFeedback={props.tweetBlockFeedback} 
            tweets={props.tweets} />

            <TweetOverview 
            tweets={props.tweets} 
            selectedTweet={props.selectedTweet} />

            {props.publicTweets.length > 0 ? 
                <SentimentSummary 
                publicTweets={props.publicTweets}
                publicTweetStats={props.publicTweetStats}
                foundUsername={props.foundUsername} />
                : null}

        </section>
    ); 
}

export default DataBlockContent;