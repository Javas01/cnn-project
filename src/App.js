import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './App.css';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
});

function App() {
  const classes = useStyles();
  const [timeline, settimeline] = useState([])

  useEffect(() => {
    fetch('https://twitter-feed-api.herokuapp.com/feed')
    .then(res => res.json())
    .then(result => {
      console.log(result)
      settimeline(result)
    })
  }, []);

  return (
    <div className="App">
    <h1>Welcome to the twitter feed</h1>
      <div className="timeline">
        {timeline.map((item,i) => 
          <Card key={i} className="tweet">
            <CardContent>
              <Typography variant="h5" component="h3">
                CNN
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                @CNN
              </Typography>
              <Typography variant="body2" component="p">
              {item.text.split('https')[0]}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
              {item.created_at.split('+')[0]}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}

export default App;
