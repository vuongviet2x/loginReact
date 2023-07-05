import { useEffect, useState } from "react";
import { Modal, Button} from "react-bootstrap";
import {putUpdateDocs} from "../services/UserService";
import { toast } from 'react-toastify';
import { update } from "lodash";
const ModalEditDocs=(props)=>{
    const{show, handleClose,dataDocsEdit, handleEditDocsFromModal,isEqualId,idDocHandle}=props;
    const[name,setName]=useState("");
    const[author,setAuthor]=useState("");
    const[created_at,setCreatedAt]=useState("");
    const[group_rack_id,setGroupRackID] = useState("");
    const[rack_id_Document,setRackID]=useState("");
    const[id,setID]=useState("");
   
    const handleEditDocs=async()=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let updateTime = date+'T'+time+'Z'

        let updateDocs ={id ,name, author,group_rack_id: idDocHandle, rack_id_Document, created_at:updateTime}
    
       let res= await putUpdateDocs(props.dataUserDocs.id,updateDocs)
       console.log(">>> check thong tin chua update:", props)
       console.log(">>>CheckupDateDocs:",updateDocs)
       if(res && res.updatedAt){
        //success
        handleEditDocsFromModal({
            name: dataDocsEdit.name,
            id: dataDocsEdit.id,
            
        })
       }
       handleClose();
       toast.success("Upload user succeed!")}
    
    useEffect(()=>{
        if(show){
            setName(dataDocsEdit.name)
        }
        
    },[dataDocsEdit])
    console.log(">>>Check edit numbebr", isEqualId)
    return(<div>
                {isEqualId === 1 ?(<>
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
                                <label className="form-label">ID</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // placeholder =
                                    value={id}
                                    onChange={(event)=>setID(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // placeholder =
                                    value={name}
                                    onChange={(event)=>setName(event.target.value)}
                                />

                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Author</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={author}
                                    onChange={(event)=>setAuthor(event.target.value)}
                                />
                            </div>
                            {/* <div className="mb-3">
                                <label className="form-label">Number Rack Group:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={group_rack_id}
                                    onChange={(event)=>setGroupRackID(event.target.value)}
                                /> */}
                            {/* </div> */}
                            <div className="mb-3">
                                <label className="form-label">Number Rack:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={rack_id_Document}
                                    onChange={(event)=>setRackID(event.target.value)}
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
                </>)
                :(<>
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
                                <label className="form-label">This document is is located at Group rack number {idDocHandle}. 
                                Please move to this group rack to edit the document.</label>
                                
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
    </div>)
}



export default ModalEditDocs