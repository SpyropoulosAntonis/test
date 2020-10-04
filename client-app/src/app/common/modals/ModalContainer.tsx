import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'

const ModalContainer = () => {
    const rootstore = useContext(RootStoreContext);
    const {modal:{open,body},closeModal}=rootstore.modalStore;
    return (
     <Modal open={open} onClose={closeModal} size='mini'>
         <Modal.Content>{body}</Modal.Content>
     </Modal>
    )
}

export default observer(ModalContainer)
