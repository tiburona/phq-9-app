import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPhqs} from '../store'
import {getLevel} from './results'

/**
 * COMPONENT
 */

export const Past = ({pastScores}) => {

  return (
    <div className='container' style={{margin: 40}}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col center-text'>
            <h4>
              Your PHQ-9 History
          </h4>
          </div>
        </div>
        <table
          className='table table-striped'
          style={{marginTop: 40}} >
          <tbody>
            <tr>
              <th><td style={{border: 0}}>Date</td></th>
              <th><td style={{border: 0}}>Score</td></th>
              <th><td style={{border: 0}}>Severity</td></th>
            </tr>
            {pastScores && pastScores.map((phq, i) => {
              var level = getLevel(phq.score)
              if (level==='moderateSevere') level = 'moderate-severe'
              return (
                <tr key={i}>
                <td style={{paddingLeft:24}}>{phq.date}</td>
                <td style={{paddingLeft:24}}>{phq.score}</td>
                <td style={{paddingLeft:24}}>{level}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
* CONTAINER
*/

class PastScoresContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchPhqs(this.props.userId)
  }

  // sorts past scores by date
  sort(phqs) {
    return phqs.sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1
      if (b.createdAt < a.createdAt) return 1
      return 0
    })
  }

  // returns the createdBy date in a human readable format
  parseDate(date) {
    var date = date.split('T')[0].split(':')[0].split('-')
    var year = date[0]
    return date.slice(1).concat(year).join('/')
  }

  render() {
    const scores =
      this.sort(this.props.pastScores)
        .map(phq => ({date: this.parseDate(phq.createdAt), score: phq.score}))
    return (
      <Past pastScores={scores} />
    )
  }
}

const mapState = (state) => {
  return {
    userId: state.user.id,
    pastScores: state.phq.history
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPhqs: (userId) => {
      dispatch(fetchPhqs(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(PastScoresContainer)