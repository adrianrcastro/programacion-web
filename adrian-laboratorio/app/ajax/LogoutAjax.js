import Session from '../Auth/Session.js';
import Ajax from './Ajax.js';

const LogoutAjax = (callBack)=>{
   Ajax('logout/'+Session.getToken(),'POST',callBack);
}

export default LogoutAjax;