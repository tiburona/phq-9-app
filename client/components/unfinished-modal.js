import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal'
import {buttonStyle} from './constants'

/**
 * COMPONENT
 */

export const UnfinishedModal = ({show, toggleModal}) => {
  return (
    <Modal
      isOpen={show}
      style={modalStyles}
      contentLabel="Unfinished Modal"
    >
      <div style={modalStyles.container}>
        <div style={{padding: 10}}>Remember to answer every question.</div>
        <div style={{padding: 10, textAlign: 'center'}}>
          <button
            onClick={toggleModal}
            className='btn'
            style={buttonStyle}>
              Go Back
            </button>
        </div>
      </div>
    </Modal>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
};

const modalStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  container: {
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
