import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditChannelForm from './EditChannelForm';

const EditChannelModal = ({channel}) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            
            <div>
                <button onClick={()=> setShowModal(true)}>Edit Channel</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannelForm channel={channel} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )

}

export default EditChannelModal;