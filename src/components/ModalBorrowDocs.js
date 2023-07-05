
import { Modal, Button} from "react-bootstrap";
import { borrowUser,control,history } from "../services/UserService";
import { toast } from "react-toastify";
const ModalBorrow=(props)=>{

    const{show, handleClose,dataDocsBorrow,handleBorrowDocsFromModal,isEqualId,idDocHandle}=props;

    const confirmBorrow = async() => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let borrowTime = date+'T'+time+'Z'
        var date2 = today.getFullYear()+'-'+(today.getMonth()+3)+'-'+today.getDate();
        let borrowTime2 = date2+'T'+time+'Z'
        let borrow_info = {
            "document_id": 
                dataDocsBorrow.id
            ,
            "date_borrowed": 
                borrowTime
            ,
            "date_returned": 
            borrowTime2
            ,
            // " ":dataDocsBorrow.group_rack_id
            // ,
            // "rack_id_Document": 
            //     dataDocsBorrow.rack_id_Document
            // ,
            // "active": 
            //     "false"
            
        }
        let res = await borrowUser(dataDocsBorrow.id,borrow_info)
        const data ={"rack_id_Operation": dataDocsBorrow.rack_id_Document,
            "open_specific_rack": dataDocsBorrow.rack_id_Document,
            "handlemoving": 0,
            "ventilate": false,
            "guide_light": 0,
            "group_id": 1
        }
        const dataHistory = {"action": 'Tài liệu :'+dataDocsBorrow.name+' có ID là: '+dataDocsBorrow.id+' ở tủ '+dataDocsBorrow.rack_id_Document+' được mượn.',"created_at":borrowTime}
        console.log(">>>check item:", dataDocsBorrow.rack_id_Document)
        control(data)
        console.log(">>>res.statusCode ",res)
        if (res && res.document_id ){
            toast.success("Borrow document succeed!")
            handleClose();
            handleBorrowDocsFromModal(dataDocsBorrow)
            let resHistory = await history(dataHistory)
        }else{
            toast.error("Error borrow document!")
        }
        
    }
    
    console.log(">>> isEqualID Borrow=", isEqualId)
    return(<div>
        {isEqualId === 1 ?( <>
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
        </>)
        :
        (<>
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
                    <div className="mb-3">
                        <label className="form-label">This document is located at Group rack number {idDocHandle}. 
                        Please move to this group rack to borrow the document.</label>
                        
                    </div>
                
            
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            {/* <Button variant="primary" onClick={()=>handleEditDocs()}>
                Confirm
            </Button> */}
            </Modal.Footer>
            </Modal>
        </>)}
    </div>
       
    )
}

export default ModalBorrow