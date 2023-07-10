import Table from 'react-bootstrap/Table';
import {cloneElement, useEffect, useState} from 'react';
import ModalConfirmDocs from './ModalConfirmDocs';
import { fetchHistory} from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNewDocs from './ModelAddNewDocs';
import ModalEditDocs from './ModalEditDocs';
import _, { clone, debounce, result } from "lodash"
import './TableDocs.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const History = (props)=> {

  const [listDocs, setListDocs] = useState([]);
  const [totalUsers,setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
    let res = await fetchHistory(page)
    //console.log(">>>Check res fetchHistory",res.results)
    if (res && res.results ){
      console.log(">>>check res",res)

      //total_pages = Math.ceil(res.count/res.length)
      // setTotalPages(total_pages)  
      // ....

        setTotalDocs(res.count)
        let listDocs = res.results
        setListDocs(listDocs)
        let  totalPages = Math.ceil(res.count/res.length)
        setTotalPages(totalPages)
    }
    
  }

  //console.log(">>>Check res listDocs:",listDocs)

  const handlePageClick =(event)=>{
  getDocs(+event.selected +1);
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
        cloneListDocs = cloneListDocs.filter(item =>item.email.includes(term))
        setListDocs(cloneListDocs)
      }
      else{
        getDocs(1);
      }
    },500)
 

    const getDocsExport = (event,done)=>{
      let result = [];
      if (listDocs && listDocs.length > 0){
        result.push(["Id","Action","Created at"]);
        listDocs.map((item,index) => {
          let arr = [];
          arr[0]=index+1;
          arr[1]=item.action;
          arr[2]=item.createdAt;
          result.push(arr)
        })
        setDataExport(result);
        done();
      }
    }
   // console.log(">>>Check list history:",listDocs)
    // const handleImportCSV = (event)=>{
    //   if (event.target && event.target.files && event.target.files[0]){
    //       let file = event.target.files[0];
    //       if (file.type !== "text/csv"){
    //         toast.error("Only accept csv files...")
    //         return;
    //       }
    //       // Parse local CSV file
    //       Papa.parse(file, {
    //         //header: true,
    //         complete: function(results) {
    //           let rawCSV = results.data;
    //           if (rawCSV.length>0){
    //             if(rawCSV[0]&& rawCSV[0].length ===3){
    //                 if(rawCSV[0][0] !== "Id"
    //                 ||rawCSV[0][1]!== "Action"
    //                 ||rawCSV[0][2]!== "Created At"
    //                 ){
    //                   toast.error("Wrong format Header's CSV file!")
    //                 }else{
    //                   let result=[];
    //                   console.log(rawCSV)
    //                   rawCSV.map((item,index)=>{
    //                     if(index>0 && item.length ===3){
    //                       let obj={};
    //                       obj.id = item[0]
    //                       obj.title=item[1];
    //                       obj.createdAt=item[2];
                          
    //                       result.push(obj);

    //                     }
    //                   })
    //                   setListDocs(result)
    //                   console.log(">>>check result: ",result)
    //                 }

    //             }else{
    //               toast.error("Wrong format CSV file!")
    //             }

    //           }else
    //           toast.error("Not found data on CSV file!")
    //           console.log("Finished:", results.data);
    //           }
    //       });
    //   }
      


    // }
  return (<>

    <div className="my-3 add-new d-sm-flex">

            <span><b>History list:</b> </span>
            <div className='group-btns mt-sm-0 mt-2'>
              {/* <label htmlFor="test" className='btn btn-warning'><i className="fa-solid fa-file-import"></i> Import</label>
              <input id="test" type='file'hidden
              onChange={(event)=>handleImportCSV(event)}

              /> */}
              <CSVLink 
                data={dataExport}
                asyncOnClick={true}
                onClick={getDocsExport}
                filename={"history.csv"}
                className="btn btn-primary"
                target="_blank">
              <i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
              {/* <button className='btn btn-success' 
                  onClick={()=> setIsShowModalAddNew(true)}>
                  <i className="fa-solid fa-circle-plus"></i>
                    Add new 
              </button> */}
            </div>
            
    </div>

      {/* search  */}

    {/* <div className='col-12 col-sm-4 my-3'> 
      <input 
      className='form-control' 
      placeholder='search docs by Title...'
      //value={keyWord}
      onChange={(event)=>handleSearch(event)}
      />
    </div> */}
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
                  
                  <th >
                    <div className='sort-header'>
                        {/* //first_name */}
                      <span>Action</span> 
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
                    <th >Date created</th>
                  {/* <th >Created at</th>
                  <th>Location</th>
                  <th >Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {listDocs && listDocs.length>0 && listDocs.map((item,index)=>{
                  return (
                    <tr key={`docs-${index}`}>
                  <td>{index+1}</td>
                  <td>{item.action}</td>
                  <td>{item.created_at}</td>
                  
                  {/* <td>{item.createdAt}</td>
                  <td>{item.location}</td>
                  <td>
                    <button className='btn btn-success mx-6'>Borrow</button>
                    <button className='btn btn-warning mx-3'
                    onClick={()=>handleEditDocs(item)}>Edit</button>
                    <button 
                    onClick={()=>handleDeleteDocs(item)}
                    className='btn btn-danger'
                    >Delete</button>
                  </td> */}
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
       
      
      
    </>
  );
}

export default History