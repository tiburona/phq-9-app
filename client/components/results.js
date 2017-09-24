import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {buttonStyle} from './constants'
import {navButton} from '.'

/**
 * COMPONENT
 */

const levels = {
  none: 'Your test results indicate that you are not depressed.',
  mild: 'Your test results indicate that you may have mild depression.',
  moderate: 'Your test results indicate that you may be moderately depressed. If you are not \
    already in treatment, consider following up with a mental health care professional \
    to confirm your diagnosis and make a treatment plan.',
  moderateSevere: 'Your test results indicate that you may have moderate depression, perhaps \
    verging on severe. If you are not already in treatment, a mental health care professional \
    can confirm your diagnosis and help you make a treatment plan.',
  severe: 'Your test results indicate that you may be severely depressed.  If you are not \
    already in treatment, please follow up with a mental health care professional \
    to confirm your diagnosis and make a treatment plan.'
}

export const getLevel = (num) => {
  if (num > 19) return 'severe'
  if (num > 14) return 'moderateSevere'
  if (num > 9) return 'moderate'
  if (num > 4) return 'mild'
  return 'none'
}

export const Results = ({ score, history, user }) => {

  var results

  if (!score && score !== 0) {
    results =
      <div>
        <h4>You have to take the PHQ-9 before you can see your results.</h4>
        <div className='container center' style={{padding: 40}}>
          {navButton('/phq', 'Take the PHQ-9', history, [0, 0, 0, 0])}
        </div>
      </div>
  } else {
    var historyMessage = user.id ?
      <div>
        <h4>If you'd like to see your full history, go to your home page.</h4>
        {navButton('/', 'Home', history, [40, 0, 0, 0])}
      </div> :
      <div>
        <h4>Log in or sign up to track your history.</h4>
        {navButton('/login', 'Login', history, [40, 20, 20, 0])}
        {navButton('/signup', 'Sign Up', history, [40, 20, 20, 0])}
      </div>
    results =
      <div className='container'>
        <h4 style={{marginBottom: 30}}>{`Your score on the PHQ-9 was ${score}.  ${levels[getLevel(parseInt(score))]}`}</h4>
        {historyMessage}
      </div>
  }

  return (
    <div className='container'>
      <div className='container-fluid'>
        <div className='row' style={{ margin: 70 }}>
          <div className='col-12 center-text'>
            {results}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
* CONTAINER
*/
const mapState = (state) => {
  return {
    score: state.phq.score,
    user: state.user
  }
}

export default connect(mapState)(Results)

