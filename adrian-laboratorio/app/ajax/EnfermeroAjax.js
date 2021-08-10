import Ajax from "./Ajax.js";
import Session from "../Auth/Session.js";

const EnfermeroAjax = (()=>{

    const getClients = (callBack)=>{
        Ajax('clients?token='+Session.getToken(),'GET',callBack);
    }
    const getExams = (idClient,callBack) => {
        Ajax('examenes/' + idClient + '?token=' + Session.getToken(),'GET',callBack);
    }

    const sendMail = (idClient,idExam,callBack) =>{
        Ajax('sendMail/'+idClient+'/'+idExam+'?token='+Session.getToken(),'POST',callBack);
    }

    const insertResults = (id,idclient,result,callback) => {

        const formData = new FormData();
        formData.append('id',id);
        formData.append('resultado',result);

        Ajax('examenInsertResults?token='+Session.getToken(),'POST',(response)=>{

            if(response.code == 1){
                 sendMail(idclient,id,(response)=>{
                    callback(response);
                })
                return true;
            }

            callback(response);

        },formData);
    }

    return ({getClients,getExams,sendMail,insertResults});

})();


export default EnfermeroAjax;