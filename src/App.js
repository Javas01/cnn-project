/* global alert fetch */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
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
  const [value, setvalue] = useState('')

  const getNewTweets = (screenName) => {
    // fetch(`http://localhost:3001/feed/${screenName}`)
    fetch(`https://twitter-feed-api.herokuapp.com/feed/${screenName}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        settimeline(result.reverse())
      })
  }

  // useEffect(getNewTweets, [])

  return (
    <div className='App'>
      <h1>Welcome to the twitter feed</h1>
      <input type='search' name='screenname' value={value} onChange={e => setvalue(e.target.value)} />
      <button onClick={() => getNewTweets(value)}>Load More</button>
      <div className='timeline'>
        {timeline.map((tweet, i) =>
          <Card key={i} className='tweet'>
            <CardContent>
              <Typography variant='h5' component='h3'>
                {tweet.name}
              </Typography>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                {`@${tweet.screen_name}`}
              </Typography>
              <Typography variant='body2' component='p'>
                {console.log(tweet.text)}
                {tweet.text}
              </Typography>
              <Typography variant='body2' component='p' color='textSecondary'>
                {tweet.created_at.split('+')[0]}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size='small'>More</Button>
            </CardActions> */}
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
