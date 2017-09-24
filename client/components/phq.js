import React, {Component} from 'react'
import {buttonStyle} from './constants'

/**
 * COMPONENT
 */

export const Phq = (
  {hilitRows, checkRowStyle, handleSubmit,makeRow, makeButtons}) => {
  return (
    <div className='container'>
      <div className='container-fluid'>
        <form onSubmit={handleSubmit}>
          <div className='row' style={{marginTop: 30, marginBottom: 30}}>
            <div className='col center-text'>
              <h5>Over the last 2 weeks, how often have you been bothered
                            by any of the following problems?
              </h5>
            </div>
          </div>
          <table className='table table-striped borderless'>
            <tbody>
              {questions.map((question, i) => {
                return makeRow(question, hilitRows, i)
              })}
            </tbody>
          </table>
          <div className='row' style={checkRowStyle(hilitRows, 9).rStyle}>
            <div className='col-12'>
              <h5>If you checked off <em>any</em> problems,
                            how <em>difficult</em> have those problems made it for you
                            to do your work, take care of things at home, or get along with
                            other people?
              </h5>
            </div>
            <div className='center'>
              {makeButtons(labels10, checkRowStyle(hilitRows, 9).bStyle, 9)}
            </div>
          </div>
          <div className='row'>
            <div className='col' style={{textAlign:'center', marginBottom: 100}}>
              <button
                type='submit'
                className='btn'
                style={buttonStyle}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure or \
    have let yourself or your family down',
  'Trouble concentrating on things, such as reading the \
    newspaper or watching television',
  'Moving or speaking so slowly that other people could have \
    noticed? Or the opposite — being so fidgety or restless \
    that you have been moving around a lot more than usual ',
  'Thoughts that you would be better off dead or of hurting \
    yourself in some way'
]

const labels10 = ['Not difficult at all', 'Somewhat difficult', 'Very difficult',
  'Extremely difficult']





