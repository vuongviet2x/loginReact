
import { Modal, Button} from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalConfirm=(props)=>{

    const{show, handleClose,dataUserDelete,handleDeleteUserFromModal}=props;

    const confirmDelete = async() => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204){
            toast.success("Delete user succeed!")
            handleClose();
            handleDeleteUserFromModal(dataUserDelete)
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
                <Modal.Title>Unactive Doccumment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    
                    
                    You still want to unactive this Doccument?
                    <br/>
                    <b> {dataUserDelete.email}</b> 
                    
                
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

export default ModalConfirm