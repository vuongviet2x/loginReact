
import { Modal, Button} from "react-bootstrap";
import { deleteDocs } from "../services/UserService";
import { toast } from "react-toastify";
const ModalConfirmDocs=(props)=>{

    const{show, handleClose,dataDocsDelete,handleDeleteDocsFromModal}=props;

    const confirmDelete = async() => {
        let res = await deleteDocs(dataDocsDelete.id)
        if (res && +res.statusCode === 204){
            toast.success("Delete user succeed!")
            handleClose();
            handleDeleteDocsFromModal(dataDocsDelete)
        }else{
            toast.error("Error delete user!")
        }

    }


    return(
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
            <Modal.Header closeButton>
                <Modal.Title>Delete doccument</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    
                    This action cannot be undone!
                    You still want to delete this Documment?
                    <br/>
                    <b>email = {dataDocsDelete.email}</b> 
                    
                
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>confirmDelete()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalConfirmDocs