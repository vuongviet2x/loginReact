import { Switch,Route,Link,Routes} from "react-router-dom";
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import Login from '../components/Login';
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
const AppRoutes =()=>{
    return(
        <>
            <Routes>
              <Route path ="/" element={<Home />}/>
              
              <Route path ="/login" element={<Login />}/>
              {/* <PrivateRoute path1="/users">
                <TableUsers/>
            </PrivateRoute> */}
            <Route
                path="/users"
                element={
                    <PrivateRoute path1="/users">
                    <TableUsers/>
                    </PrivateRoute>
                }
            />
            <Route path="*" element ={<NotFound/>} />
             
            </Routes>
            
        </>
    )
}
export default AppRoutes;