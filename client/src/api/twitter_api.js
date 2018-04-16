export default {
    getUsersTweets: (username, cb) => {
        fetch('/api/tweets/'+username)
        .then((response) => {
            return(response.json());
        })
        .then((tweets) => {
            cb(tweets);
        })
    }
}
