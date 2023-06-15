import Table from 'react-bootstrap/Table';
import {cloneElement, useEffect, useState} from 'react';
import ModalConfirm from './ModalConfirm';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddNew';
import ModalEditUser from './ModalEditUser';
import _, { clone, debounce, result } from "lodash"
import './TableUser.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const TableUsers = (props)=> {

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers,setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

   const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit,setIsShowModalEdit] = useState(false);
  const [dataUserEdit,setDataUserEdit] = useState({});

  const [isShowModalDelete,setIsShowModalDelete] = useState(false);
  const [dataUserDelete,setDataUserDelete]=useState({});

  const [sortBy,setSortBy]=useState("asc");
  const [sortField,setSortField] = useState("id");

  const[keyWord,setKeyWord] = useState("");
  const [dataExport,setDataExport]=useState([]);
  const handleClose= ()=>{
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
  // call apis
  const handleUpdateTable = (user)=>{
    setListUsers([user,...listUsers])
  }
  const handleEditUserFromModal =(user)=>{
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id ===user.id)

    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  }


  useEffect(() => {
    // eslint-disable-next-line no-undef
      getUsers(1);
              },[] )

  const getUsers = async (page)=>{
    let res = await fetchAllUser(page)
    
    if (res && res.data ){
        console.log(res)
        setTotalUsers(res.total)
        setListUsers(res.data)
        setTotalPages(res.total_pages)
    }
    
  }



  const handlePageClick =(event)=>{
  getUsers(+event.selected +1);
  }

  const   handleEditUser=(user)=>{
     setDataUserEdit(user);
    setIsShowModalEdit(true);

    
  }
  const handleDeleteUser = (user)=>{
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  }
  const handleDeleteUserFromModal = (user)=>{
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setListUsers(cloneListUsers);
  }
  const handleSort = (sortBy,sortField)=>{
    setSortBy(sortBy);
    setSortField(sortField)
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]); 
    setListUsers(cloneListUsers) }

    const handleSearch = debounce((event)=>{
      let term= event.target.value;
      console.log(">>> run search term...",term)
      if (term){
        
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item =>item.email.includes(term))
        setListUsers(cloneListUsers)
      }
      else{
        getUsers(1);
      }
    },500)
 

    const getUsersExport = (event,done)=>{
      let result = [];
      if (listUsers && listUsers.length > 0){
        result.push(["Id","Email","First name","Last name"]);
        listUsers.map((item,index) => {
          let arr = [];
          arr[0]=item.id;
          arr[1]=item.email;
          arr[2]=item.first_name;
          arr[3]=item.last_name;
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
                if(rawCSV[0]&& rawCSV[0].length ===4){
                    if(rawCSV[0][0] !== "Id"
                    ||rawCSV[0][1]!== "Email"
                    ||rawCSV[0][2]!== "First name"
                    ||rawCSV[0][3]!== "Last name"){
                      toast.error("Wrong format Header's CSV file!")
                    }else{
                      let result=[];
                      console.log(rawCSV)
                      rawCSV.map((item,index)=>{
                        if(index>0 && item.length ===4){
                          let obj={};
                          obj.id = item[0]
                          obj.email=item[1];
                          obj.first_name=item[2];
                          obj.last_name=item[3];
                          result.push(obj);

                        }
                      })
                      setListUsers(result)
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

            <span><b>List Users:</b> </span>
            <div className='group-btns mt-sm-0 mt-2'>
              <label htmlFor="test" className='btn btn-warning'><i className="fa-solid fa-file-import"></i> Import</label>
              <input id="test" type='file'hidden
              onChange={(event)=>handleImportCSV(event)}

              />
              <CSVLink 
                data={dataExport}
                asyncOnClick={true}
                onClick={getUsersExport}
                filename={"users.csv"}
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
      placeholder='search user by email...'
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
                  <th >Email</th>
                  <th >
                    <div className='sort-header'>
                      <span>First Name</span>
                      <span>
                              <i 
                                  className="fa-solid fa-arrow-down-long"
                                  onClick={()=>handleSort("desc","first_name") }
                              ></i>
                              <i 
                                  className="fa-solid fa-arrow-up-long"
                                  onClick={()=>handleSort("asc","first_name")}
                              ></i>
                            </span>
                    </div>
                    </th>
                  <th >Last Name</th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length>0 && listUsers.map((item,index)=>{
                  return (
                    <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className='btn btn-warning mx-3'
                    onClick={()=>handleEditUser(item)}>Edit</button>
                    <button 
                    onClick={()=>handleDeleteUser(item)}
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

      />
       <ModelAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      /> 
      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal ={handleEditUserFromModal}
        handleUpdateTable={handleUpdateTable}
      /> 
      <ModalConfirm
        show={isShowModalDelete}
        handleClose ={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
}

export default TableUsers