import { set } from "lodash";
import { useEffect, useState,useContext } from "react"
import { loginApi } from "../services/UserService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import cookies from 'react-cookies';
import TableDocs from './TableDocs'
const Login =()=>{
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);
    const[email,setEmail]=useState("");
    const[password,setPassWord]=useState("");
    const [isShowPassword,setIsShowPassword]=useState(false)
    const [loadingAPI,setLoadingAPI]=useState(false);

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(token){
            loginContext(email);
            navigate("/");
        }
    },[])
    const handleLogin =async()=>{
       
        alert("me")
        if(!email||!password){
            toast.error("Email/Password is requirred!");
            return;
        }
        setLoadingAPI(true);
        let account = {
            "username": email,
            "password": password,
            "client_id": "mRqMMOQ8EQNATWU4LWgE9t1bVvEKZIsJw7qA7LtJ",
            "client_secret": "2uUhtVahDG0fciCoQrnrVRzIhJj2z57Ewc4Bvr0Weiwr7rfwLC3VZOoJuakN3z6s4Y96raftdfYgA4fJ9JFakznyBqVGEdhOTMHfPjx37xHIYFx9aXNOar0uGaNQiLjs",
            "grant_type": "password"
        }
        let res = await loginApi(account)
        

        // console.log(">>>Check res: ", res)
        // let accessToken = res.access_token
        // console.log(">>>token:",accessToken)
        cookies.save("access_token", res.access_token)
  
        if (res&& res.access_token){
            loginContext(email,res.access_token)
            navigate("/");

        }else{
            //error
            if (res && res.status === 400){
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);

        
    }
    const handleGoBack = ()=>{
        navigate("/") 
    }
    const handlePressEnter =(event)=>{
        if (event && event.key ==="Enter"){
            handleLogin();
        }
    }
    return(<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="text">Username </div>
            <input 
                type="text" 
                placeholder="Email or Username"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                />
            <div className="input-2">
                <input 
                    type={isShowPassword===true?"text":"password" }
                    placeholder="Password..."
                    value={password}
                    onChange={(event)=>setPassWord(event.target.value)}
                    onKeyDown={(event)=>handlePressEnter(event)}
                    />
                <i 
                    className={isShowPassword===true? "fa-solid fa-eye":"fa-solid fa-eye-slash"}
                    onClick={()=>setIsShowPassword(!isShowPassword)}>

                    </i>
            </div>
            
            <button 
                className={email && password? "active":""}
                disabled={email && password? false : true}
                onClick={()=>handleLogin()}>
                {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}&nbsp;Log in</button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={()=>handleGoBack()}>&nbsp;Go back</span>
            </div>
        </div>
      





    </>)
   
}
export default Login