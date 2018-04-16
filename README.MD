# SENTIMENTAL
---
##### Go to [Live Version of the Site](https://sentimental-sav.herokuapp.com/)

![Alt text](/client/public/demo.gif?raw=true "Search Results and Favoriting Functionality")

### About:
##### The application uses [Twitter API](https://developer.twitter.com/) and [Aylien Text Analysis API](https://aylien.com/text-api/) to provide the user with a sentiment analysis of the searched for Username as well as a sentiment analysis of that users mentions.

### Directions:

1.   After cloning ```cd``` into the applications repo.
```sh
$ cd sentimental
```

2. In the root directory run ```npm install```.
3. Upon completion of install,  ```cd``` into the client directory, ```cd client``` and run ```npm install``` for a second time.
4. Return to the root directory, ```cd ..``` 
5. The app will require [Twitter API](https://developer.twitter.com/) and [Aylien Text Analysis API](https://aylien.com/text-api/) credentials to run. But you can view the live site without needing to that.
   ### [Live Site](https://sentimental-sav.herokuapp.com/)

6. If you do want to run it locally. Use the ```.env.example``` file as a template to create your own ```.env``` file and fill in the appropriate values for the environment variables.
```sh
AYLIEN_APP_ID= your-id
AYLIEN_APP_KEY= your-key

TWITTER_APP_CONSUMER_KEY= yours-consumer-key
TWITTER_APP_CONSUMER_SECRET= your-consumer-secret
TWITTER_APP_ACCESS_TOKEN_KEY= your-access-token-key
TWITTER_APP_ACCESS_TOKEN_SECRET= your-access-token-secret
```
7. Once the environment variables are filled in, from the root directory, run ```npm start``` and your local application should open on ```localhost:3000```
