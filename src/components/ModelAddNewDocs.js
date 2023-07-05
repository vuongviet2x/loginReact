import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import {postCreateDocs} from "../services/UserService";
import { toast } from 'react-toastify';
import { create } from "lodash";
const ModelAddNewDocs=(props)=>{
    const{show, handleClose,handleUpdateTable,userAddNew}=props;
    const[name,setName]=useState("");
    const[author,setAuthor]=useState("");
    const[rack,setRack] = useState("");
    const[ID,setID]=useState("");
    const[group_id,setGroupRack]=useState("");
    
    const handleSaveDocs = async () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(">>day:",date)
    console.log(">>time:",time)
    let createTime = date+'T'+time+'Z'
        let createDoc = {id:ID,name,author,rack_id_Document:rack,created_at:createTime,group_rack_id:group_id}
        let res = await postCreateDocs(createDoc);
        console.log(">>> check res:",res)
        if (res && res.id) {
            handleClose();
            setName('');
            setAuthor('');
            setRack('');
            setID('');
            setGroupRack('');
            toast.success(" A Doccumment is created succeed!");
            props.handleUpdateTable(createDoc);
            //success
        }
        else {
            //error
            toast.error(" An Error!")

        }
        console.log(createDoc)
    }
    return(<div>
        {userAddNew===1?( <>
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
                        <label className="form-label">ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={ID}
                            onChange={(event)=>setID(event.target.value)}
                        />
                    </div>
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
                        <label  className="form-label">Author</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={author}
                            onChange={(event)=>setAuthor(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> Group Rack</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={group_id}
                            onChange={(event)=>setGroupRack(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Location: Number Rack</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={rack}
                            onChange={(event)=>setRack(event.target.value)}
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
        </>):(<>
                    <Modal 
                        show={show} 
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Documment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='body-add-new'>
                            <div className="mb-3">
                                <label className="form-label">You don't have permission to add new a document.</label>
                                
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

export default ModelAddNewDocs