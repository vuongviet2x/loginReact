
import { Modal, Button} from "react-bootstrap";
import { borrowUser,control } from "../services/UserService";
import { toast } from "react-toastify";
const ModalBorrow=(props)=>{

    const{show, handleClose,dataDocsBorrow,handleBorrowDocsFromModal}=props;

    const confirmBorrow = async() => {
        let borrow_info = {
            "name": 
                dataDocsBorrow.name
            ,
            "author": 
                dataDocsBorrow.author
            ,
            "created_at": 
                dataDocsBorrow.created_at
            ,
            "rack_id_Document": 
                dataDocsBorrow.rack_id_Document
            ,
            "active": 
                "false"
            
        }
        let res = await borrowUser(dataDocsBorrow.id,borrow_info)
        const data ={"rack_id_Operation": dataDocsBorrow.rack_id_Document,
            "open_specific_rack": dataDocsBorrow.rack_id_Document,
            "handlemoving": 0,
            "ventilate": false,
            "guide_light": 0,
            "group_id": 1
        }
            console.log(">>>check item:", dataDocsBorrow.rack_id_Document)
        control(data)
        console.log(">>>res.statusCode ",res)
        if (res && res.active === false){
            toast.success("Borrow document succeed!")
            handleClose();
            handleBorrowDocsFromModal(dataDocsBorrow)
        }else{
            toast.error("Error borrow document!")
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
                <Modal.Title>Borrow Doccumment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    Document is<b>"{dataDocsBorrow.name}"</b>
                     <br/>
                    If confirm to borrow, move to Rack number <b> {dataDocsBorrow.rack_id_Document}</b>  to take the item!
                    <br/>
                    If not, click <b>Cancle</b>
                
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancle
                </Button>
                <Button variant="primary" onClick={()=>confirmBorrow()}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalBorrow