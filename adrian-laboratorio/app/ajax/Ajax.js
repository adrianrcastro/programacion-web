import server from '../const/index.js';

const Ajax = (url,method = 'GET',callBack = null,formData = null)=>{
   const headers = new Headers();
   const requestOptions = {
      method: method,
      headers: headers,
      body: formData,
      redirect: 'follow'
   };

   fetch(server + url, requestOptions)
   .then(response => {
      if (typeof response !=='object')
         return {
            code:-1,
            message:'se ha presentado un incoveniente al intentar procesar la solicitud, reintente de nuevo',
            data: null
         };
      return response.json();
   })
   .then(result => callBack(result))
   .catch(error => console.log('error', error));
}

export default Ajax;