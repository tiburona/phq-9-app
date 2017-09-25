import React from 'react'
import { buttonStyle } from './constants'

export const makeNavButton = (path, text, history, margins) => {
  var style = Object.assign({}, buttonStyle)
  style.marginTop = margins[0]
  style.marginLeft = margins[1]
  style.marginRight = margins[2]
  style.marginBottom = margins[3]
  return (
    <button
      className='btn' style={style} onClick={() => { history.push(path) }}>
      {text}
    </button>
  )
}

