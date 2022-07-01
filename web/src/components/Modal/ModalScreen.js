import React from 'react';
import { Modal } from 'react-bootstrap'
import { EmojiSmile, EmojiFrown } from 'react-bootstrap-icons';

import Button from '../Button/Button';
import './ModalScreen.scss';

const ModalScreen = (
    props
) => {
    return(
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal-container'
        >
            <Modal.Body className='modal-body'>
                {
                    props.status == 'ok' ? 
                    <EmojiSmile size={85} color='#03AC13'/>
                    :
                    <EmojiFrown size={85} color='#B90E0A'/>
                }
                
                <p>{props.message}</p>

                <Button className='btn-modal' buttonSize='btn--small' buttonStyle='btn--blue' onClick={props.onHide}>OK</Button>
            </Modal.Body>
        </Modal>
    )

}

export default ModalScreen