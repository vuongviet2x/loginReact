import { Switch,Route,Link,Routes} from "react-router-dom";
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import TableDocs from "../components/TableDocs";
import Maintenance from "../components/Maintenance";
import Control from "../components/Control";
import Login from '../components/Login';
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
// import Connection from "mysql2/typings/mysql/lib/Connection";

// const cors = require('cors')
// const app = express();

// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123500000"

// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// app.use(cors());

// app.get('/posts', (req, res) => {
//   connection.query("SELECT * FROM 'inventorysystem.api_user';", (err, results, fields) => {
//     if(err) throw err;
//     res.send(results);
//   });
// });

// app.listen(3000, (error) => {
//   if (err) throw err;
//   console.log(`App listening on port ${port}!`)
// });
// //get the client
//     const mysql = require('mysql2');
// //test connection
//     const connection = mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         port:'3306',
//         database:'inventorysystem',
//         password:'123500000'
//     });
//     //simple query
//     connection.query(
//         'SELECT * FROM inventorysystem.api_user',
//         function(err,results,fields){
//             console.log(">>> results= ",results);
//             console.log(">>> fields=", fields);
//         }

//     )
const AppRoutes =(props)=>{
    console.log(">>>appRoutes:",props.userRack.email)
    return(
        <>
            <Routes>
              <Route path ="/" element={<Home />}/>
              
              <Route path ="/login" element={<Login />}/>
              {/* <PrivateRoute path1="/users">
                <TableUsers/>
            </PrivateRoute> */}
            <Route
                path="/history"
                element={
                    <PrivateRoute path1="/history">
                    <TableUsers/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/docs"
                element={
                    <PrivateRoute path2="/docs">
                    <TableDocs user={props.userRack.email}/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/maintenance"
                element={
                    <PrivateRoute path3="/maintenance">
                    <Maintenance/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/control"
                element={
                    <PrivateRoute path4="/control">
                    <Control user={props.userRack.email}/>
                    </PrivateRoute>
                }
            />
            <Route path="*" element ={<NotFound/>} />
             
            </Routes>
            
        </>
    )
}
export default AppRoutes;