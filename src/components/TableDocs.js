import Table from 'react-bootstrap/Table';
import {cloneElement, useEffect, useState} from 'react';
import ModalConfirmDocs from './ModalConfirmDocs';
import ModalBorrow from './ModalBorrowDocs';
import { fetchAllDocs } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNewDocs from './ModelAddNewDocs';
import ModalEditDocs from './ModalEditDocs';
import _, { clone, debounce, result } from "lodash"
import './TableDocs.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';
import React from 'react'
import axios from "axios";


const TableDocs = (props)=> {
  var total_pages
  const [listDocs, setListDocs] = useState([]);
  const [totalUsers,setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalBorrow,setIsShowModalBorrow] = useState(false);
  const [dataDocsBorrow,setDataDocsBorrow] = useState({});

  const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit,setIsShowModalEdit] = useState(false);
  const [dataDocsEdit,setDataDocsEdit] = useState({});

  const [isShowModalDelete,setIsShowModalDelete] = useState(false);
  const [dataDocsDelete,setDataDocsDelete]=useState({});

  const [sortBy,setSortBy]=useState("asc");
  const [sortField,setSortField] = useState("id");

  const[keyWord,setKeyWord] = useState("");
  const [dataExport,setDataExport]=useState([]);
  const handleClose= ()=>{
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
    setIsShowModalBorrow(false);
  };
  // call apis
  const handleUpdateTable = (docs)=>{
    setListDocs([docs,...listDocs])
  }
  const handleEditDocsFromModal =(docs)=>{
    let cloneListDocs = _.cloneDeep(listDocs);
    let index = listDocs.findIndex((item) => item.id ===docs.id)

    cloneListDocs[index].first_name = docs.first_name;
    setListDocs(cloneListDocs);
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
      getDocs(1);
              },[] )

  const getDocs = async (page)=>{
    let res = await fetchAllDocs(page)
     console.log(">>>check res: ",res)
    if (res && res.results){
        console.log(res)
        setTotalDocs(res.count)
        setListDocs(res.results)
        total_pages = Math.ceil(res.count/res.length)
        setTotalPages(total_pages)
    }

  }
  console.log(listDocs)
  

  const handlePageClick =(event)=>{
  getDocs(+event.selected +1);
  }

  const   handleEditDocs=(docs)=>{
    setDataDocsEdit(docs);
    setIsShowModalEdit(true);
    
  }
  const   handleBorrowDocs=(docs)=>{
    setDataDocsBorrow(docs);
   setIsShowModalBorrow(true);

   
 }
 const handleBorrowDocsFromModal = (docs)=>{
  let cloneListDocs = _.cloneDeep(listDocs);
  cloneListDocs = cloneListDocs.filter(item => item.id !== docs.id)
  setListDocs(cloneListDocs);
}
  const handleDeleteDocs = (docs)=>{
    setIsShowModalDelete(true);
    setDataDocsDelete(docs);
  }
  const handleDeleteDocsFromModal = (docs)=>{
    let cloneListDocs = _.cloneDeep(listDocs);
    cloneListDocs = cloneListDocs.filter(item => item.id !== docs.id)
    setListDocs(cloneListDocs);
  }
  const handleSort = (sortBy,sortField)=>{
    setSortBy(sortBy);
    setSortField(sortField)
    let cloneListDocs = _.cloneDeep(listDocs);
    cloneListDocs = _.orderBy(cloneListDocs, [sortField], [sortBy]); 
    setListDocs(cloneListDocs) }

    const handleSearch = debounce((event)=>{
      let term= event.target.value;
      console.log(">>> run search term...",term)
      if (term){
        
        let cloneListDocs = _.cloneDeep(listDocs);
        cloneListDocs = cloneListDocs.filter(item =>item.name.includes(term))
        setListDocs(cloneListDocs)
        // console.log(">>Docs:",listDocs)
      }
      else{
        getDocs(1);
      }
    },500)
 

    const getDocsExport = (event,done)=>{
      let result = [];
      if (listDocs && listDocs.length > 0){
        result.push(["Id","Title","Author","Created at","Location: Number rack"]);
        listDocs.map((item,index) => {
          let arr = [];
          arr[0]=item.id;
          arr[1]=item.name;
          arr[2]=item.author;
          arr[3]=item.created_at;
          arr[4]=item.rack_id_Document;
          result.push(arr)
        })
        setDataExport(result);
        done();
      }
    }
    const handleImportCSV = (event)=>{
      if (event.target && event.target.files && event.target.files[0]){
          let file = event.target.files[0];
          if (file.type !== "text/csv"){
            toast.error("Only accept csv files...")
            return;
          }
          // Parse local CSV file
          Papa.parse(file, {
            //header: true,
            complete: function(results) {
              let rawCSV = results.data;
              if (rawCSV.length>0){
                if(rawCSV[0]&& rawCSV[0].length ===5){
                    if(rawCSV[0][0] !== "Id"
                    ||rawCSV[0][1]!== "Title"
                    ||rawCSV[0][2]!== "Author"
                    ||rawCSV[0][3]!== "Created At"
                    ||rawCSV[0][4]!=="Location"){
                      toast.error("Wrong format Header's CSV file!")
                    }else{
                      let result=[];
                      console.log(rawCSV)
                      rawCSV.map((item,index)=>{
                        if(index>0 && item.length ===4){
                          let obj={};
                          obj.id = item[0]
                          obj.name=item[1];
                          obj.author=item[2];
                          obj.created_at=item[3];
                          obj.rack_id_Document=item[4];
                          result.push(obj);

                        }
                      })
                      setListDocs(result)
                      console.log(">>>check result: ",result)
                    }

                }else{
                  toast.error("Wrong format CSV file!")
                }

              }else
              toast.error("Not found data on CSV file!")
              console.log("Finished:", results.data);
              }
          });
      }
      


    }
  return (<>

    <div className="my-3 add-new d-sm-flex">

            <span><b>List Documments:</b> </span>
            <div className='group-btns mt-sm-0 mt-2'>
              <label htmlFor="test" className='btn btn-warning'><i className="fa-solid fa-file-import"></i> Import</label>
              <input id="test" type='file'hidden
              onChange={(event)=>handleImportCSV(event)}

              />
              <CSVLink 
                data={dataExport}
                asyncOnClick={true}
                onClick={getDocsExport}
                filename={"documents.csv"}
                className="btn btn-primary"
                target="_blank">
              <i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
              <button className='btn btn-success' 
                  onClick={()=> setIsShowModalAddNew(true)}>
                  <i className="fa-solid fa-circle-plus"></i>
                    Add new 
              </button>
            </div>
            
    </div>

      {/* search  */}

    <div className='col-12 col-sm-4 my-3'> 
      <input 
      className='form-control' 
      placeholder='search docs by Title...'
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
                            <span>ID</span>
                            <span>
                              <i 
                                  className="fa-solid fa-arrow-down-long"
                                  onClick={()=>handleSort("desc","id") }
                              ></i>
                              <i 
                                  className="fa-solid fa-arrow-up-long"
                                  onClick={()=>handleSort("asc","id")}
                              ></i>
                            </span>

                    </div>
                    
                  
                  </th>
                  <th >Title</th>
                  <th >
                    <div className='sort-header'>
                        {/* //first_name */}
                      <span>Author</span> 
                      
                    </div>
                    </th>
                  <th >Created at</th>
                  <th>
                    <div className='sort-header'>
                      <span> Location: Number Rack</span>
                      <span>
                              <i 
                                  className="fa-solid fa-arrow-down-long"
                                  onClick={()=>handleSort("desc","rack_id_Document") }
                              ></i>
                              <i 
                                  className="fa-solid fa-arrow-up-long"
                                  onClick={()=>handleSort("asc","rack_id_Document")}
                              ></i>
                            </span>
                    </div>
                   </th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody>
                {listDocs && listDocs.length>0 && listDocs.map((item,index)=>{
               
                  return (
                    <tr key={`docs-${index}`}>
                      {/*  <tr key={`docs`}> */}
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.created_at}</td>
                  <td>{item.rack_id_Document}</td>
                  <td>
                    <button className='btn btn-success mx-6' onClick={()=>handleBorrowDocs(item)}>Borrow</button>
                    <button className='btn btn-warning mx-3'
                    onClick={()=>handleEditDocs(item)}>Edit</button>
                    <button 
                    onClick={()=>handleDeleteDocs(item)}
                    className='btn btn-danger'
                    >Delete</button>
                  </td>
                </tr>
                  )
                })}
                
                
              </tbody>
            </Table>

    </div>
    
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={10}
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

      />
       <ModelAddNewDocs
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      /> 
      <ModalEditDocs
        show={isShowModalEdit}
        dataUserDocs={dataDocsEdit}
        handleClose={handleClose}
        handleEditDocsFromModal ={handleEditDocsFromModal}
        handleUpdateTable={handleUpdateTable}
      /> 
      <ModalConfirmDocs
        show={isShowModalDelete}
        handleClose ={handleClose}
        dataDocsDelete={dataDocsDelete}
        handleDeleteDocsFromModal={handleDeleteDocsFromModal}
      />
      <ModalBorrow
        show={isShowModalBorrow}
        handleClose ={handleClose}
        dataDocsBorrow={dataDocsBorrow}
        handleBorrowDocsFromModal={handleBorrowDocsFromModal}
      />
    </>
  );
}

export default TableDocs