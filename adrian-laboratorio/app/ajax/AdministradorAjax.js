import Session from '../Auth/Session.js';
import ajax from './Ajax.js';

const AdministradorAjax = (
   ()=>{

      const listUsers = callBack => ajax('Users?token='+Session.getToken(),'GET',callBack);
      const newUser   = (name,pass,roles_id,callBack) =>{
         
         let formdata = new FormData();
         formdata.append("name", name);
         formdata.append("pass",pass);
         formdata.append("roles_id",roles_id);

         ajax('newAcc?token='+Session.getToken(),'POST',callBack,formdata);
      }

      const deleteUser = (id,callBack) => ajax('deleteUser/'+id+'?token='+Session.getToken(),'DELETE',callBack);

      const updateUser = (id,roles_id,callBack) =>{
         let formdata = new FormData();
         formdata.append("id", id);
         formdata.append("roles_id",roles_id);
         ajax('updateUserRole?token='+Session.getToken(),'POST',callBack,formdata);
      }
      
      return ({listUsers,newUser,deleteUser,updateUser});
   }
)();


export default AdministradorAjax;


