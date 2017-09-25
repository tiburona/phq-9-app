/* global describe beforeEach it */

import 'jsdom-global/register'

import { expect } from 'chai'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { UnfinishedModal } from '.'

describe('UnfinishedModal', () => {
  let unfinishedModal

  beforeEach(() => {
    unfinishedModal = shallow(<UnfinishedModal />)
  })

  it('contains a button', () => {
    expect(unfinishedModal.find('button')).length.to.be(1)
  })
})