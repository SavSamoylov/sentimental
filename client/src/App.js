import React, { Component } from 'react';
import {DataBlock, TweetBlock} from './components';
import twitterAPI from './api/twitter_api.js';


class App extends Component {
  state = {
    searchedUsername: '',
    tweetBlockOpen: false,
    tweets: [],
    tweetBlockFeedback: '',
    selectedTweet: null,
    publicTweets: [],
    foundUsername: ''
  }

  // SearchForm Input Change Handler
  handleSearchFormInput = (e) => {

    const {value} = e.target;

    this.setState({
      searchedUsername: value
    });

  }

  // Open/Close Sidebar
  toggleTweetBlock = () => {
    this.setState({
      tweetBlockOpen: !this.state.tweetBlockOpen
    });
  }

  // SearchForm Input Submission
  handleUsernameFormSubmission = (e) => {

    e.preventDefault();

    const username = this.state.searchedUsername;

    // Make a Call to the API to get {username} data.
    twitterAPI.getUsersTweets(username, tweets => {

      // Handle Error and empty state if no user data is returned.
      if (tweets.error){
        this.setState({
          tweetBlockFeedback: tweets.error,
          tweets: [],
          publicTweets: [],
          publicTweetStats: {}
        });

        // Close TweetBlock Sidebar.
        if(this.state.tweetBlockOpen){
          this.toggleTweetBlock();
        }
      }

      // SUCCESS: {username}'s data retrieved.
      if (!tweets.error) {

        // Initialize the {username}'s tweet overview data with the latest tweet.
        this.selectTweet(null, tweets.usersTweets[0].id);
 
        this.setState({
          tweets: tweets.usersTweets,
          publicTweets: tweets.publicTweets,
          publicTweetStats: tweets.publicTweetStats,
          foundUsername: username
        });

        // Open TweetBlock Sidebar to display {username}'s tweets.
        if(!this.state.tweetBlockOpen){
          this.toggleTweetBlock();
        }
      }
    });
  }

  // Displays Sentiment and Popularity statistics for the {username}'s active/clicked on tweet. 
  selectTweet = (e, selectedTweet) =>{

    if(e){

      const tweet = e.currentTarget;
      const siblings = getSiblings(tweet);
  
      siblings.forEach(sibling => {
        // Remove '.active' class from any siblings who have previously had it.
        if(sibling.classList.contains('active')){
          sibling.classList.remove('active');
        }

      });
      
      // Add '.active' class to the currently clicked tweet.
      tweet.classList.add('active');

    } 

    this.setState({
      selectedTweet
    });

    // Helper Functions for selecting siblings.
    function getChildren(n, skipMe){
      var r = [];
      for ( ; n; n = n.nextSibling ) 
         if ( n.nodeType === 1 && n !== skipMe)
            r.push( n );        
      return r;
    };
  
    function getSiblings(n) {
      if(n){
        return getChildren(n.parentNode.firstChild, n);
      }
    };

  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <DataBlock 
          handleSearchFormInput={this.handleSearchFormInput} 
          toggleTweetBlock={this.toggleTweetBlock}
          handleUsernameFormSubmission={this.handleUsernameFormSubmission} 
          tweetBlockFeedback={this.state.tweetBlockFeedback}
          tweets={this.state.tweets}
          selectedTweet={this.state.selectedTweet}
          publicTweets={this.state.publicTweets}
          publicTweetStats={this.state.publicTweetStats}
          foundUsername={this.state.foundUsername} />

          <TweetBlock 
          tweetBlockOpen={this.state.tweetBlockOpen} 
          tweetBlockFeedback={this.state.tweetBlockFeedback} 
          tweets={this.state.tweets}
          selectTweet={this.selectTweet}
          selectedTweet={this.state.selectedTweet} />
        </div>
      </div>
    );
  }
}

export default App;
