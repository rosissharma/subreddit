import React, { useState, useEffect } from 'react';

import Article from './components/Article';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyBh9Xx9qkuyJYvhTzZiTpcgVOkDtffRVyk",
  authDomain: "react-subreddit.firebaseapp.com",
  databaseURL: "https://react-subreddit.firebaseio.com",
  projectId: "react-subreddit",
  storageBucket: "react-subreddit.appspot.com",
  messagingSenderId: "617202479053",
  appId: "1:617202479053:web:b384ec67bcea4913dfde84",
  measurementId: "G-ZET6FWY7J1"
})

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('movies');

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
      if (res.status != 200) {
        console.log("Error!")
        return;
      }

      res.json().then(data => {
        if (data != null) {
          setArticles(data.data.children);
        }
      })
    })
  }, [subreddit])

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)} />
      </header>
      <div className="articles">
        {
          (articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''
        }
      </div>
    </div>
  );
}

export default App;
