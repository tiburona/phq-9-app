import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {postPhq, scorePhq} from '../store'
import {Phq} from '.'
import {UnfinishedModal} from '.'
import {lightColor, medColor, darkColor} from './constants'


/**
 * CONTAINER
 */

class PhqContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phq: {
        q1: false, q2: false, q3: false, q4: false, q5: false,
        q6: false, q7: false, q8: false, q9: false, q10: false
      },
      hilitRows: [],
      modalOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.makeRow = this.makeRow.bind(this)
    this.makeButtons = this.makeButtons.bind(this)
  }

  //handles clicks on radio buttons
  handleChange(question, event) {
    var newPhq = this.state.phq
    newPhq[question] = event.target.value
    this.setState({phq: newPhq})
  }

  // on submit, first prevent default and execute
  // appropriate routine depending on completion
  handleSubmit(event) {
    event.preventDefault()
    this.checkCompletion() ? this.ifComplete() : this.ifUncomplete()
  }

  // returns true if user has completed the PHQ-9 with no missing values
  checkCompletion() {
    return !this.unfinishedRows().length || this.oneToNine().every(val => val === 0)
  }

  // if PHQ-9 is complete, score it, dispatch the results and score
  // to the store and redirect to the results page
  ifComplete() {
    this.props.scorePhq(this.score())
    var phq = Object.assign({}, this.state.phq)
    phq.session = this.props.session
    phq.score = this.score()
    if (this.props.user) phq.userId = this.props.user.id
    this.props.postPhq(phq)
    this.props.history.push('/results')
  }

  // if PHQ-9 is uncomplete, display an alert to the user
  // and highlight the uncompleted rows
  ifUncomplete() {
    this.toggleModal()
    this.setState({ hilitRows: this.unfinishedRows() })
  }

  // returns an array with the indices of the rows the user has not completed
  unfinishedRows() {
    return Object.keys(_.pickBy(this.state.phq, (val) => val === false))
  }

  // returns an array with the values of the first 9 questions of the PHQ-9
  oneToNine() {
    var qs1to9 = Object.assign({}, this.state.phq)
    delete qs1to9.q10
    return Object.values(qs1to9)
  }

  // toggles the modal that alerts the user they have uncompleted questions
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  // scores the PHQ-9
  score() {
    return this.oneToNine()
      .map(val => parseInt(val))
      .reduce((total, num) => total + num)
  }

  // renders one row of the PHQ-9
  makeRow = (question, rows, i) => {
    var { rStyle, bStyle, qStyle } = this.checkRowStyle(rows, i)
    return (
      <tr key={i} style={rStyle}>
        {this.makeQuestion(question, qStyle, i)}
        {this.makeButtons(labels1to9, bStyle, i)}
      </tr>
    )
  }

  // renders a question on the PHQ-9
  makeQuestion = (question, style, i) => {
    return (
      <td style={style}>
        <div>
          {question}
        </div>
      </td>
    )
  }

  // generates the radio buttons for each PHQ-9 question
  makeButtons = (labels, style, i) => {
    var question = 'q' + (i + 1).toString()
    return (
      <div style={{paddingRight: 15, margin: 0}}>
        {labels.map((label, j) => this.makeButton(question, label, style, j))}
      </div>
    )
  }

  // makes an individual radio button
  makeButton = (question, label, style, j) => {
    return (
      <td key={j} style={style}>
        <div className="col radio center-text" >
          <input
            type="radio"
            value={j}
            onChange={(event) => {this.handleChange(question, event)}}
            checked={this.state.phq[question] && parseInt(this.state.phq[question]) == j} />
          <label>{label}</label>
        </div>
      </td>
    )
  }

  // alters row background color styling (called to highlight uncompleted rows)
  checkRowStyle = (rows, i) => {
    var rStyle = {}
    var qStyle = { border: 0, paddingTop: 10 }
    var bStyle = { border: 0, paddingBottom: 0 }
    if (rows.some(el => parseInt(el.slice(1)) === i + 1)) {
      rStyle.backgroundColor = darkColor
      qStyle.border = bStyle.border = 5
      qStyle.borderColor = bStyle.borderColor = lightColor
    }
    return { rStyle, qStyle, bStyle }
  }

  render() {
    return (
      <div>
        <Phq
          hilitRows={this.state.hilitRows}
          handleSubmit={this.handleSubmit}
          checkRowStyle={this.checkRowStyle}
          makeRow={this.makeRow}
          makeButtons={this.makeButtons}
        />
        <div>
          <UnfinishedModal
            show={this.state.modalOpen}
            toggleModal={this.toggleModal} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    session: state.session
  }
}

const mapDispatch = (dispatch) => {
  return {
    postPhq: (qs) => {
      dispatch(postPhq(qs))
    },
    scorePhq: (total) => {
      dispatch(scorePhq(total))
    }
  }
}

export default connect(mapState, mapDispatch)(PhqContainer)

const labels1to9 = ['Not at all', 'Several days', 'More than half the days',
  'Every day']



