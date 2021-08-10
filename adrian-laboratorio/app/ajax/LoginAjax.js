import Ajax from './Ajax.js';

// Ajax = (url,method = 'GET',callBack = null,formData = null)=>{

const LoginAjax = (name,pass,callBack)=>{
   let formdata = new FormData();
   formdata.append("name", name);
   formdata.append("pass", pass);
   Ajax('login','POST',callBack,formdata);
}


export default LoginAjax;