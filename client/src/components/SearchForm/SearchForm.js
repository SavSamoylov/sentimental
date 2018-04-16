import React, {Fragment} from 'react';

const SearchForm = (props) => {
    const tweets = props.tweets;
    const tweetBlockFeedback = props.tweetBlockFeedback;

    const searchFeedback = (cls) => {
        if(tweets.length > 0){
            return <h5 className={cls}>{tweets.length + ' tweets found. Select a Tweet from the Sidebar to view its Stats'}</h5>
        } else {
            return <h5 className={cls}>{tweetBlockFeedback}</h5>
        }
    }

    return (
        <Fragment>
            <form onSubmit={props.handleUsernameFormSubmission}>
                <label className='' htmlFor='search'>
                    <h3 className=''>Search Twitter Usernames</h3>
                    <span className=''>@</span>
                    <input className='search-tweet' type='text' name='search' autoComplete="off"
                    placeholder='Enter a Twitter Username to see what their last 5 tweets say about them'
                    onChange={props.handleSearchFormInput} />
                </label>
            </form>
            {searchFeedback('search-feedback')}
        </Fragment>    
    );
}

export default SearchForm;