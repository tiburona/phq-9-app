import React from 'react'
import {Link} from 'react-router-dom'
import {navButton} from '.'

/**
 * COMPONENT
 */


export const Splash = ({history}) => {
  
  return (
    <div className='container' style={{marginTop: 40}}>
    <div style={{padding: 15}}>
      <h4>The PHQ-9 is a questionnaire designed to screen for depression.
      It is 10 questions long.
        <br />
        <br />
        You can <Link to='/phq'>take the test</Link>, <Link to='/signup'>create an account</Link> to
      save your results and see your progress over time, or <Link to='/login'>log in</Link> to an
      existing account.
        <br />
        <br />
        Remember that online questionnaires are not a substitute for
      the diagnosis of a mental health professional.
      </h4>
      </div>
      <div className='center'>
        {navButton('/phq', 'Take the PHQ-9', history, [30, 10, 60, 0])}
        {navButton('/login', 'Login', history, [30, 10, 60, 0])}       
        {navButton('/signup', 'Sign Up', history, [30, 10, 60, 0])}
      </div>
    </div>
  )
}


