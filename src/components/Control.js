import Table from 'react-bootstrap/Table';
import {cloneElement, useEffect, useState} from 'react';
import ModalConfirmDocs from './ModalConfirmDocs';
import { control } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNewDocs from './ModelAddNewDocs';
import ModalEditDocs from './ModalEditDocs';
import _, { clone, debounce, result } from "lodash"
import './TableDocs.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";

import { toast } from 'react-toastify';

const Control = (props)=> {

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
  const handleClose= ()=>{
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowLeft(false);
  };
  // call apis





// HashMap<String, String> listRacks = news HashMap<>(6);
  const listRacks =[1,2,3,4,5,6]
 

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
    console.log(">>>check item:", item)
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
    console.log(">>>check item:", item)
    control(data)
    toast.success('Tủ số '+ item + 'dịch sang phải!');
  }
  const handleHome = (item)=>{
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 3,
    "ventilate": false,
    "guide_light": 0,
    "group_id": 1
  }
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
  control(data)
  toast.success('Đèn của tủ số '+ item + 'tắt!');
  }
  const handleHongKhoStart = (item)=>{
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 0,
    "ventilate": true,
    "guide_light": 0,
    "group_id": 1
  }
  control(data)
  toast.success('Bật chế độ hong khô!');
  }
  const handleHongKhoStop = (item)=>{
    const data ={"rack_id_Operation": item,
    "open_specific_rack": 0,
    "handlemoving": 0,
    "ventilate": false,
    "guide_light": 0,
    "group_id": 1
  }
  control(data)
  toast.success('Chế độ hong khô dừng!');
  }

 


  return (<>


      {/* search  */}

    {/* <div className='col-12 col-sm-4 my-3'> 
      <input 
      className='form-control' 
      placeholder='search docs by Title...'
      //value={keyWord}
      onChange={(event)=>handleSearch(event)}
      />
    </div> */}
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
                { listRacks.map((item,index)=>{
                  return (
                    <tr key={`racks-${index}`}>
                      <td>{index+1}</td>
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
                      onClick={()=>handleHongKhoStart()}
                      className='btn btn-success mx-3' 
                      >Start</button>
          <button
                    onClick={()=>handleHongKhoStop()}
                    className='btn btn-danger mx-3' 
                    >Stop</button>
                     
    </div>
    
        </div>
        
    {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'

      />  */}
      
    </>
  );
}

export default Control