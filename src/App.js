/* global alert fetch */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import './App.css'

const useStyles = makeStyles({
  title: {
    fontSize: 14
  }
})

function App () {
  const classes = useStyles()
  const [timeline, settimeline] = useState([])

  const getNewTweets = (x) => {
    fetch('http://localhost:3001/feed' || 'https://twitter-feed-api.herokuapp.com/feed')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        settimeline(result.reverse())
      })
  }

  useEffect(getNewTweets, [])

  return (
    <div className='App'>
      <h1>Welcome to the twitter feed</h1>
      <button onClick={() => getNewTweets('y')}>Load More</button>
      <div className='timeline'>
        {timeline.map((item, i) =>
          <Card key={i} className='tweet'>
            <CardContent>
              <Typography variant='h5' component='h3'>
                {item.user}
              </Typography>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                {`@${item.user}`}
              </Typography>
              <Typography variant='body2' component='p'>
                {item.body.split('https')[0]}
              </Typography>
              <Typography variant='body2' component='p' color='textSecondary'>
                {item.date.split('+')[0]}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
