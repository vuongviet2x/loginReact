import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import {postCreateDocs} from "../services/UserService";
import { toast } from 'react-toastify';
const ModelAddNewDocs=(props)=>{
    const{show, handleClose,handleUpdateTable}=props;
    const[name,setName]=useState("");
    const[job,setJob]=useState("");

    const handleSaveDocs = async () => {
        let res = await postCreateDocs(name,job);
        console.log(">>> check res:",res)
        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success(" A Doccumment is created succeed!");
            props.handleUpdateTable({title: name,id:res.id});
            //success
        }
        else {
            //error
            toast.error(" An Error!")

        }
    }
    return(
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Doccumment</Modal.Title>
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
                <Button variant="primary" onClick={()=>handleSaveDocs()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModelAddNewDocs