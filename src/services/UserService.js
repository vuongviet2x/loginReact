//import axios from "axios";
import { Axios } from 'axios';
import axios from './customize-axios'
import cookies from 'react-cookies'
const fetchAllUser = (page)=>{
    return  axios.get(`/document`);

}

const fetchAllDocs = (page)=>{
    // return  axios.get(`/api/users?page=${page}`);
    return axios.get(`/document/?page=${page}`);
    // return axios.get(`/document/`);

}
const postCreateUser =(name,job)=>{
    return axios.post("/api/users",{name,job})
}
const postCreateDocs =(createDocs)=>{
    return axios.post(`/document/`,createDocs)
}

 const putUpdateUser = (name,job)=>{
     return axios.put("/api/users/2",{name,job})
 }
 const putUpdateDocs = (page,updateDoc)=>{
    return axios.put(`/document/${page}/`,updateDoc)
}

const deleteUser =(id)=>{
    return axios.delete(`api/users/${id}`)
}
const deleteDocs =(id)=>{
    return axios.delete(`api/users/${id}`)
}
// const loginApi=(email,password)=>{
    const loginApi=(accounts)=>{
    return axios.post(`/o/token/`,accounts)
    // return axios.post('/api/login/',{email,password})
}
const borrowUser =(id,borrowinfo)=>{
    return axios.put(`/document/${id}/`,borrowinfo) 
}
const control=(data)=>{
    return axios.post(`/operation/`,data)
}
export {fetchAllUser,postCreateUser,putUpdateUser,deleteUser,loginApi,fetchAllDocs,postCreateDocs,putUpdateDocs,deleteDocs,borrowUser,control};
export let authAPI = axios.create({
    headers: {
        'Authorization':`Bearer ${cookies.load('access_token')}`
    }
})