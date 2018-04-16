import React from 'react';
import DataBlockHeader from './DataBlockHeader/DataBlockHeader';
import DataBlockContent from './DataBlockContent/DataBlockContent';

const DataBlock = (props) => {
    return (
        <div className='data-block'>
        <DataBlockHeader toggleTweetBlock={props.toggleTweetBlock} />
        <DataBlockContent 
        handleSearchFormInput={props.handleSearchFormInput} 
        handleUsernameFormSubmission={props.handleUsernameFormSubmission} 
        tweetBlockFeedback={props.tweetBlockFeedback} 
        tweets={props.tweets}
        selectedTweet={props.selectedTweet}
        publicTweets={props.publicTweets}
        publicTweetStats={props.publicTweetStats} 
        foundUsername={props.foundUsername}/>
      </div>
    )
}

export default DataBlock;