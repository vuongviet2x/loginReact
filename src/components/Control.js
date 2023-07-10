import Table from 'react-bootstrap/Table';
import {cloneElement, useEffect, useState} from 'react';
import ModalConfirmDocs from './ModalConfirmDocs';
import { control ,fetchAllUser,history} from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNewDocs from './ModelAddNewDocs';
import ModalEditDocs from './ModalEditDocs';
import _, { clone, debounce, result } from "lodash"
import './TableDocs.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";

import { toast } from 'react-toastify';

const Control = (props)=> {
  console.log(">>>>Check props control:",props)
  const [idUserControl,SetIdUserControl]= useState([]);
  const [superuserPickGroup,SetSuperuserPickGroup]=useState("");
  const [listRacks, setListRacks]=useState([]);
  const [numberPageUser,serNumberPageUser]= useState(1);
  const [listDocs, setListDocs] = useState([]);
  const [totalUsers,setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

   const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit,setIsShowModalEdit] = useState(false);
  const [dataDocsEdit,setDataDocsEdit] = useState({});

  const [isShowModalLeft,setIsShowLeft] = useState(false);
  const [dataDocsLeft,setDataDocsLeft]=useState({});
  const [isShowModalRight,setIsShowRight] = useState(false);
  const [dataDocsRight,setDataDocsRight]=useState({});
  const [isShowModalHome,setIsShowHome] = useState(false);
  const [dataDocsHome,setDataDocsHome]=useState({});
  const [isShowModalLightOn,setIsShowLightOn] = useState(false);
  const [dataDocsLightOn,setDataDocsLightOn]=useState({});
  const [isShowModalLightOff,setIsShowLightOff] = useState(false);
  const [dataDocsLightOff,setDataDocsLightOff]=useState({});
  var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let operationTime = date+'T'+time+'Z'
  const handleClose= ()=>{
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowLeft(false);
  };
  // call apis
  useEffect(() => {
    // eslint-disable-next-line no-undef
      getUsers();
              },[] )
  const getUsers = async(numberPageUser)=>{
    let response = await fetchAllUser(numberPageUser)
    let resUser = await response
    return resUser;
  }
 console.log(">>List resUser = ",getUsers())
console.log(">>>.Check superuserPickGroup",superuserPickGroup)
useEffect(()=>{getUsers(1).then(resUser=> {

    resUser.results.map((item,index) => {
    if (item.username === props.user)
      {let idUserControl = item.id - 5
       
        if (idUserControl >0){SetIdUserControl(idUserControl)}
      }
  },_); 
  } )}) 
  useEffect(()=>{getUsers(2).then(resUser=> {
    resUser.results.map((item,index) => {
    if (item.username === props.user)
      {let idUserControl = item.id - 5
      if (idUserControl >0){SetIdUserControl(idUserControl)}
        
      }
  },_); 
  } )}) 

console.log(">>>Id User Control===",idUserControl)

// HashMap<String, String> listRacks = news HashMap<>(6);
  
  const   listRackss =[1+6*(idUserControl-1),2+6*(idUserControl-1),3+6*(idUserControl-1),4+6*(idUserControl-1),5+6*(idUserControl-1),6+6*(idUserControl-1)]
  
  const handleSearch = debounce((event)=>{
    let term= event.target.value;
    console.log(">>> run search term...",term)
    if (term){
      
      let listRacks =[1+6*(term-1),2+6*(term-1),3+6*(term-1),4+6*(term-1),5+6*(term-1),6+6*(term-1)]
      setListRacks(listRacks)
      let idUserControl = term
      SetIdUserControl(idUserControl)
      // console.log(">>Docs:",listDocs)
      console.log(">>>List racks in: ", listRacks)
    }

  },500)
  console.log(">>>List racks out: ", listRacks)
 

  const handleLeft = (item)=>{
    // setIsShowLeft(true);
    // setDataDocsLeft(docs);
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 1,
    "ventilate": false,
    "guide_light": 0,
    "group_id": 1
  }
    const dataHistory ={'action': 'Tủ số  '+ item + ' dịch sang trái!',"created_at":operationTime}
    let res =  history(dataHistory)
    console.log(">>>check item dataHistory:", res)
    control(data)
    toast.success('Tủ số '+ item + 'dịch sang trái!');
  }
  const handleRight = (item)=>{
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 2,
    "ventilate": false,
    "guide_light": 0,
    "group_id": 1
  }
  const dataHistory ={'action': 'Tủ số  '+ item + ' dịch sang phải!',"created_at":operationTime}
    let res =  history(dataHistory)
    console.log(">>>check item:", item)
    control(data)
    toast.success('Tủ số '+ item + 'dịch sang phải!');
  }
  const handleHome = (item)=>{
    const id_group_rack = Math.floor(item /5)+1
    const data ={"rack_id_Operation": id_group_rack,
    "open_specific_rack": 0,
    "handlemoving": 3,
    "ventilate": false,
    "guide_light": 0,
    "group_id": 1
  }
  const dataHistory ={'action': 'Tủ số  '+ item + ' về home!',"created_at":operationTime}
    let res =  history(dataHistory)
  control(data)
  toast.success('Tủ số '+ item + 'về vị trí ban đầu!');}
  const handleLightOn = (item)=>{
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 0,
    "ventilate": false,
    "guide_light": 1,
    "group_id": 1
  }
  const dataHistory ={'action': 'Đèn của tủ số  '+ item + ' đã bật!',"created_at":operationTime}
    let res =  history(dataHistory)
  control(data)
  toast.success('Đèn của tủ số '+ item + 'bật!');
}
  const handleLightOff = (item)=>{
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 0,
    "ventilate": false,
    "guide_light": 2,
    "group_id": 1
  }
  const dataHistory ={'action': 'Đèn của tủ số  '+ item + ' đã tắt!',"created_at":operationTime}
  let res =  history(dataHistory)
  control(data)
  toast.success('Đèn của tủ số '+ item + 'tắt!');
  }
  const handleHongKhoStart = (item)=>{
    //var item_group_rack = Math.floor(item/5) +1
    console.log("?????",item)
    const data ={"rack_id_Operation": 1,
    "open_specific_rack": 0,
    "handlemoving": 0,
    "ventilate": true,
    "guide_light": 0,
    "group_id": item,
  }
  const dataHistory ={'action': 'Nhóm tủ số   '+ item + ' kích hoạt hong khô!',"created_at":operationTime}
  let res =  history(dataHistory)
  control(data)
  toast.success('Bật chế độ hong khô!');
  }
  const handleHongKhoStop = (item)=>{

    //let item_group_rack = Math.floor(item/5) +1
   // console.log(">>check item group rack===",item_group_rack)
    const data ={"rack_id_Operation": 1,
    "open_specific_rack": 0,
    "handlemoving": 0,
    "ventilate": false,
    "guide_light": 0,
    "group_id": item
  }
  const dataHistory ={'action': 'Nhóm tủ số   '+ item + '  dừng kích hoạt hong khô!',"created_at":operationTime}
  let res =  history(dataHistory)
  control(data)
  toast.success('Chế độ hong khô dừng!');
  }

 


  return ( <div>
    { (props.user === 'vuongvi')?(<>
        <span>
          <b> Handle Control</b>
        </span>
        
        <div className='col-12 col-sm-4 my-3'> 
      <input 
      className='form-control' 
      placeholder='Enter the group rack to control...'
      //value={keyWord}
      onChange={(event)=>handleSearch(event)}
      />
    </div>
        <div className='customize-table'>
        <Table striped bordered hover >
              <thead>
                <tr>
                  <th >
                    <div className='sort-header'>
                            <span>Rack ID</span>


                    </div>
                    
                  
                  </th>
                  
                  <th >
                    <div className='sort-header'>
                        {/* //first_name */}
                      <span>Moving</span> 
                    
                    </div>
                    </th>
                    <th >Action</th>
                  {/* <th >Created at</th>
                  <th>Location</th>
                  <th >Actions</th> */}
                </tr>
              </thead>
              <tbody>
                { listRacks.map((item,index)=>{
                  return (
                    <tr key={`racks-${index}`}>
                      <td>{index+1+6*(idUserControl-1)}</td>
                      <td>
                          <button onClick={()=>handleLeft(item) }className='btn btn-warning mx-3'>Left</button>
              
                          <button 
                              onClick={()=>handleRight(item)}
                              className='btn btn-danger mx-3' 
                              >Right</button>
                          <button 
                              onClick={()=>handleHome(item)}
                              className='btn btn-success mx-3' 
                              >Home</button>
                        
                        </td>
                        
                    
                        
                        <td>
                          <button onClick={()=>handleLightOn(item)}className='btn btn-success mx-3'>Light on</button>
                
                          <button 
                          onClick={()=>handleLightOff(item)}
                          className='btn btn-danger mx-3' 
                          >Light off</button>
                        </td> 
                      </tr>

                  )
                })}
                
                
              </tbody>
            </Table>
        <span><b>Hong Kho Mode</b> </span>
        <div>
          <button 
                      onClick={()=>handleHongKhoStart(idUserControl)}
                      className='btn btn-success mx-3' 
                      >Start</button>
          <button
                    onClick={()=>handleHongKhoStop(idUserControl)}
                    className='btn btn-danger mx-3' 
                    >Stop</button>
                     
    </div>
    
        </div>
        
  
      
    </>):(<>
        <span>
          <b> Handle Control</b>
        </span>
        
        <div className='customize-table'>
        <Table striped bordered hover >
              <thead>
                <tr>
                  <th >
                    <div className='sort-header'>
                            <span>Rack ID</span>


                    </div>
                    
                  
                  </th>
                  
                  <th >
                    <div className='sort-header'>
                        {/* //first_name */}
                      <span>Moving</span> 
                    
                    </div>
                    </th>
                    <th >Action</th>
                  {/* <th >Created at</th>
                  <th>Location</th>
                  <th >Actions</th> */}
                </tr>
              </thead>
              <tbody>
                { listRackss.map((item,index)=>{
                  return (
                    <tr key={`racks-${index}`}>
                      <td>{index+1+6*(idUserControl-1)}</td>
                      <td>
                          <button onClick={()=>handleLeft(item) }className='btn btn-warning mx-3'>Left</button>
              
                          <button 
                              onClick={()=>handleRight(item)}
                              className='btn btn-danger mx-3' 
                              >Right</button>
                          <button 
                              onClick={()=>handleHome(item)}
                              className='btn btn-success mx-3' 
                              >Home</button>
                        
                        </td>
                        
                    
                        
                        <td>
                          <button onClick={()=>handleLightOn(item)}className='btn btn-success mx-3'>Light on</button>
                
                          <button 
                          onClick={()=>handleLightOff(item)}
                          className='btn btn-danger mx-3' 
                          >Light off</button>
                        </td> 
                      </tr>

                  )
                })}
                
                
              </tbody>
            </Table>
        <span><b>Hong Kho Mode</b> </span>
        <div>
          <button 
                      onClick={()=>handleHongKhoStart(idUserControl)}
                      className='btn btn-success mx-3' 
                      >Start</button>
          <button
                    onClick={()=>handleHongKhoStop(idUserControl)}
                    className='btn btn-danger mx-3' 
                    >Stop</button>
                     
    </div>
    
        </div>
        
  
      
    </>)

    }
  </div>
  
  );
}

export default Control