
import { Modal, Button} from "react-bootstrap";
import { deleteDocs } from "../services/UserService";
import { toast } from "react-toastify";
const ModalConfirmDocs=(props)=>{

    const{show, handleClose,dataDocsDelete,handleDeleteDocsFromModal,isEqualId,idDocHandle}=props;

    const confirmDelete = async() => {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let updateTime = date+'T'+time+'Z'

        let updateDocs ={id:dataDocsDelete.id ,name:dataDocsDelete.name, active: 'false',author:dataDocsDelete.author,created_at:dataDocsDelete.created_at,group_rack_id: dataDocsDelete.group_rack_id, rack_id_Document:dataDocsDelete.rack_id_Document}
        let res = await deleteDocs(dataDocsDelete.id, updateDocs)
        console.log(">>> Check res uninstall",res)
        if (res ){
            toast.success("Unactive succeed!")
            handleClose();
            handleDeleteDocsFromModal(dataDocsDelete)
        }else{
            toast.error("Error unactive succeed!")
        }

    }
    console.log(">>> Data delete===",dataDocsDelete)


    return(<div>
            {isEqualId === 1 ?( <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
            <Modal.Header closeButton>
                <Modal.Title>Unactive doccument</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    
                
                    You still want to unactive Documment?
                    <br/>
                    <b>{dataDocsDelete.email}</b> 
                    
                
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
        </>):(<>
                    <Modal 
                        show={show} 
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Unactive Documment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='body-add-new'>
                            <div className="mb-3">
                                <label className="form-label">This document is is located at Group rack number {idDocHandle}. 
                                Please move to this group rack to unactive the document.</label>
                                
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

export default ModalConfirmDocs