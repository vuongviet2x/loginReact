import { useEffect, useState } from "react";
import { Modal, Button} from "react-bootstrap";
import {putUpdateDocs} from "../services/UserService";
import { toast } from 'react-toastify';
const ModalEditDocs=(props)=>{
    const{show, handleClose,dataDocsEdit, handleEditDocsFromModal}=props;
    const[name,setName]=useState("");
    const[job,setJob]=useState("");

    const handleEditDocs=async()=>{
       let res= await putUpdateDocs(name,job)
       if(res && res.updatedAt){
        //success
        handleEditDocsFromModal({
            first_name: name,
            id: dataDocsEdit.id
        })
       }
       handleClose();
       toast.success("Upload user succeed!")
    }
    useEffect(()=>{
        if(show){
            setName(dataDocsEdit.first_name)
        }
    },[dataDocsEdit])
  
    return(
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Edit Documment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={name}
                            onChange={(event)=>setName(event.target.value)}
                        />

                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Job</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={job}
                            onChange={(event)=>setJob(event.target.value)}
                        />
                    </div>
                    
                
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>handleEditDocs()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalEditDocs