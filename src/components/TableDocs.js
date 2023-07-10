import Table from 'react-bootstrap/Table';
import {cloneElement, useEffect, useState} from 'react';
import ModalConfirmDocs from './ModalConfirmDocs';
import ModalBorrow from './ModalBorrowDocs';
import { fetchAllDocs, fetchAllUser, borrowDocs ,fetchDocsRackGroup} from '../services/UserService';
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
  const [numberPageUser,serNumberPageUser]= useState(1);
  const [userAddNew,setUserAddNew]= useState([])
  const [listDocs, setListDocs] = useState([]);
  const [listBorrow,setListBorrow] = useState([]);
  const [totalUsers,setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalBorrow,setIsShowModalBorrow] = useState(false);
  const [dataDocsBorrow,setDataDocsBorrow] = useState({});
  const [idUserRack,setIdUserRack] = useState({});
  const [idDocHandle,setIdDocsHandle] = useState({});
  const [isEqualId,setIsEqualId] = useState(0);
  const [isBorrowing,setIsBorrowing] = useState(0);
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
    // let idDocHandle = docs.group_rack_id
    // setIdDocsHandle(idDocHandle)
    // console.log(">>>Print idDocHandle111=",idDocHandle)
    cloneListDocs[index].first_name = docs.first_name;
    setListDocs(cloneListDocs);
  }
  // useEffect(() => 
    
  //   { setIdDocsHandle(idDocHandle)}, [])
  // console.log(">>>Print ai di cua tu=",idDocHandle)
  useEffect(() => {
    // eslint-disable-next-line no-undef
      getDocs(1); getUsers();getBorrow(1);getDocsRack();
              },[] )
              const getUsers = async(numberPageUser)=>{
                if (numberPageUser !== 0) {
                  let response = await fetchAllUser(numberPageUser)
                let resUser = await response
                return resUser;
                }
                
                
              }
             console.log(">>List resUser = ",getUsers())
              
            useEffect(()=>{getUsers(numberPageUser).then(resUser=> {
                resUser.results.map((item,index) => {
                if (item.username === props.user)
                  {let idUserRack = item.id - 5
                    setIdUserRack(idUserRack)
                  }
                 if (props.user === 'vuongvi')
                 {let userAddNew=1
                  setUserAddNew(userAddNew)}
                if (props.user !== 'vuongvi')
                {let userAddNew=0
                    setUserAddNew(userAddNew)}
                  
                 
              },_); 
              } )}) 
             
            useEffect(()=>{
              
            }) 
              async function getDocsRack(idUserRack) {
                console.log('calling');
                const resultDocs = await fetchDocsRackGroup(idUserRack);
                console.log(">>>Check Table Docs:",resultDocs);
                // Expected output: "resolved"
                return resultDocs
              }
            
            //const data9 = getDocsRack(idUserRack).then (data => {console.log(">>> 9 thanh phan",data)})

            //console.log(">>>data9",data9)
             
           // console.log(">>>>resultDocs 9 thanh phan please",resultDocs) 
  // const getDocsRack = async (idUserRack) =>{
  //   if (idUserRack>0){
  //     let ress = await fetchDocsRackGroup(idUserRack)
  //     console.log("List Docs Racks::^^^",ress)
  //   }
  // }
              
              
              
              
  //console.log(">>>idUserRack:::::",idUserRack)
             // console.log(">>>resultsDoccs:::::",resultDocs)
  const getDocs = async (page)=>{
    if (props.user === 'vuongvi')
    {
      let res = await fetchAllDocs(page)
      console.log(">>>check res20033333: ",res)
    if (res && res.results){
        console.log(res)
        setTotalDocs(res.count)
        setListDocs(res.results)
        total_pages = Math.ceil(res.count/res.length)
        setTotalPages(total_pages)
    }
}
// else{ setListDocs(resultDocs)}
  if (props.user !== 'vuongvi')
  {getDocsRack(idUserRack).then (data => {
    console.log(">>> 9 thanh phan",data)
    setListDocs(data)
    total_pages = Math.ceil(data.length/6)
    setTotalPages(total_pages)
    setTotalDocs(6)
})
console.log(">>>1112312123",listDocs)}
    
  }
  //console.log("ListDOcs:::::::",listDocs)
  //console.log(">>> props:",props.user)

  const getBorrow = async(page)=>{
    let response = await borrowDocs(page)
    let resborrow = await response
    if (resborrow && resborrow.results){
      console.log(resborrow)
      setListBorrow(resborrow.results)
  
  }
    return resborrow;
  }
  // resborrow.results.map((item,index) => {
  //   if (item.document_id === idDocHandle)
  //     {let isBorrowing = 1
  //       setIsBorrowing(isBorrowing)
  //     }},)
    
  // getBorrow().then(resborrow=> {
  //   resborrow.results.map((item,index) => {
  //   if (item.document_id === idDocHandle)
  //     {let isBorrowing = 1
  //       setIsBorrowing(isBorrowing)
  //     }
    
     
  // },); 
  // } )


   //console.log(">>List resborrow = ",resborrow)
//   const getUsers = async(numberPageUser)=>{
//     if (numberPageUser !== 0) {
//       let response = await fetchAllUser(numberPageUser)
//     let resUser = await response
//     return resUser;
//     }
    
    
//   }
//  console.log(">>List resUser = ",getUsers())
  
// useEffect(()=>{getUsers(numberPageUser).then(resUser=> {
//     resUser.results.map((item,index) => {
//     if (item.username === props.user)
//       {let idUserRack = item.id - 5
//         setIdUserRack(idUserRack)
//       }
//      if (props.user === 'vuongvi')
//      {let userAddNew=1
//       setUserAddNew(userAddNew)}
//     if (props.user !== 'vuongvi')
//     {let userAddNew=0
//         setUserAddNew(userAddNew)}
      
     
//   },_); 
//   } )}) 
 
  
//   async function getDocsRack(idUserRack) {
//     console.log('calling');
//     const resultDocs = await fetchDocsRackGroup(idUserRack);
//     console.log(">>>Check Table Docs:",resultDocs);
//     // Expected output: "resolved"
//     return resultDocs
//   }

// const resultDocs= getDocsRack(idUserRack)
  
  
  
  
//   console.log(">>>idUserRack:::::",idUserRack)
  // console.log(">>>Check idUserRacks=",getUsers().then())

  // const getUsers = async() => {
  //   let response = await fetch(`http://127.0.0.1:8000/users/`)
  //   let data = await response.json();
  //   return data;
  // }
  // getUsers().then(data =>{
  //   console.log(">>> Check get data: ", data)
  //   let idUserRack = data
  // })
  // console.log(">>> Check get data1: ", idUserRack)
  
 // console.log(">>> idUserRack =", idUserRack)
  //return 
 
  
 // console.log(">>> idUserRack out =", getUsers)
 
  //let rackUser = resUser -5; 
  const handlePageClick =(event)=>{
  getDocs(+event.selected +1);
  }

  const   handleEditDocs=(docs)=>{
    setDataDocsEdit(docs);
    setIsShowModalEdit(true);
    let idDocHandle = docs.group_rack_id
    setIdDocsHandle(idDocHandle)
    // docs.id <5 ? ( let numberPageUser =1):( let  numberPageUser = Math.floor(docs.id / 5))
    if (docs.group_rack_id <=2)
    {let numberPageUser =1
      serNumberPageUser(numberPageUser)}
    if (docs.group_rack_id >=3 && docs.group_rack_id <=7)
      {let numberPageUser =2
        serNumberPageUser(numberPageUser)}
    console.log(">>.Number page:",numberPageUser)
    
    
    
  } 
  console.log(">>>idDocHandle::",idDocHandle)
 
       //isEqualId =1
  useEffect(() =>  {
    if (idUserRack === idDocHandle ||props.user=== 'vuongvi' )
    {setIsEqualId(isEqualId => isEqualId =1)}
    else {setIsEqualId(isEqualId => isEqualId =0)} })  
 
  
    
  
  // useEffect(() => 
    
  //   { setIsEqualId(isEqualId)}, [])
    console.log(">>>Check equal::",isEqualId)
  // // useEffect(() => 
    
  //   { setIdDocsHandle(idDocHandle)}, [])
  // console.log(">>>Print ai di cua tu=",idDocHandle)
  
    
    
   

  console.log(">>>Print isEqual=",isEqualId)
  const   handleBorrowDocs=(docs)=>{
    setDataDocsBorrow(docs);
   setIsShowModalBorrow(true);
   //console.log("id borrow===",docs.id)
   let idDocHandle = docs.group_rack_id
    setIdDocsHandle(idDocHandle)

   
 }
 const handleBorrowDocsFromModal = (docs)=>{
  let cloneListDocs = _.cloneDeep(listDocs);
  cloneListDocs = cloneListDocs.filter(item => item.id !== docs.id)
  setListDocs(cloneListDocs);
}
  const handleDeleteDocs = (docs)=>{
    setIsShowModalDelete(true);
    setDataDocsDelete(docs);
    let idDocHandle = docs.group_rack_id
    setIdDocsHandle(idDocHandle)
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
        result.push(["Id","Title","Author","Created at","Rack group","Rack"]);
        listDocs.map((item,index) => {
          let arr = [];
          arr[0]=item.id;
          arr[1]=item.name;
          arr[2]=item.author;
          arr[3]=item.created_at;
          arr[4]=item.group_rack_id;
          arr[5]=item.rack_id_Document;
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
                if(rawCSV[0]&& rawCSV[0].length ===6){
                    if(rawCSV[0][0] !== "Id"
                    ||rawCSV[0][1]!== "Title"
                    ||rawCSV[0][2]!== "Author"
                    ||rawCSV[0][3]!== "Created At"
                    ||rawCSV[0][4]!=="Group Rack"
                    ||rawCSV[0][5]!==" Rack"){
                      toast.error("Wrong format Header's CSV file!")
                    }else{
                      let result=[];
                      console.log(rawCSV)
                      rawCSV.map((item,index)=>{
                        if(index>0 && item.length ===5){
                          let obj={};
                          obj.id = item[0]
                          obj.name=item[1];
                          obj.author=item[2];
                          obj.created_at=item[3];
                          obj.rack_id_Document=item[5];
                          obj.group_rack_id =item[4];
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
              { props.user==='vuongvi'?
              <input id="test" type='file'hidden
              onChange={(event)=>handleImportCSV(event)}/>
              :<></>
              }
              
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
                  <th >Group Rack</th>
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
                {listDocs && listDocs.length>0 && listDocs.map((item,index) =>{
                  return (
                    <tr key={`docs-${index}`}>
                      {/*  <tr key={`docs`}> */}
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.created_at}</td>
                  <td>{item.group_rack_id}</td>
                  <td>{item.rack_id_Document}</td>
                  <td>
                    {isBorrowing===1 ? (<button className='btn btn-success mx-6' >Borrowing</button>):(<button className='btn btn-success mx-6' onClick={()=>handleBorrowDocs(item)}>Borrow</button>)}
                    
                    <button className='btn btn-warning mx-3'
                    onClick={()=>handleEditDocs(item)}>Edit</button>
                    <button 
                    onClick={()=>handleDeleteDocs(item)}
                    className='btn btn-danger'
                    >Unactive</button>
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
        userAddNew={userAddNew}
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      /> 
      <ModalEditDocs
        idDocHandle={idDocHandle}
        isEqualId ={isEqualId}
        idUserRack ={idUserRack}
        show={isShowModalEdit}
        dataUserDocs={dataDocsEdit}
        handleClose={handleClose}
        handleEditDocsFromModal ={handleEditDocsFromModal}
        handleUpdateTable={handleUpdateTable}
      /> 
      <ModalConfirmDocs
       idDocHandle={idDocHandle}
       isEqualId ={isEqualId}
       idUserRack ={idUserRack}
        show={isShowModalDelete}
        handleClose ={handleClose}
        dataDocsDelete={dataDocsDelete}
        handleDeleteDocsFromModal={handleDeleteDocsFromModal}
      />
      <ModalBorrow
        idDocHandle={idDocHandle}
        isEqualId ={isEqualId}
        idUserRack ={idUserRack}
        show={isShowModalBorrow}
        handleClose ={handleClose}
        dataDocsBorrow={dataDocsBorrow}
        handleBorrowDocsFromModal={handleBorrowDocsFromModal}
      />
    </>
  );
}

export default TableDocs