import Ajax from "./Ajax.js";
import Session from "../Auth/Session.js";

const AtencionClienteAjax = (
    ()=>{
        const getClients = (callBack)=>{
            Ajax('clients?token='+Session.getToken(),'GET',callBack);
        }
        const getExams = (idClient,callBack) => {
            Ajax('examenes/' + idClient + '?token=' + Session.getToken(),'GET',callBack);
        }
        const setClients = (client,callBack) => {

            const {cedula,nombre,apellido,correo} = client;

            const formData = new FormData();
            formData.append('cedula',cedula);
            formData.append('nombre',nombre);
            formData.append('apellido',apellido);
            formData.append('correo',correo);

            Ajax('newClient?token='+Session.getToken(),'POST',callBack,formData);
        }

        const setExam = (exam,callBack) => {

            const {nombre,descripcion,clientes_id} = exam;

            const formData = new FormData();
            formData.append('nombre',nombre);
            formData.append('descripcion',descripcion);
            formData.append('clientes_id',clientes_id);

                
            Ajax('submitExam?token='+Session.getToken(),'POST',callBack,formData);

        }

        const updateClient = (client,callBack)=>{
            const {id,cedula,nombre,apellido,correo} = client;

            const formData = new FormData();
            formData.append('id',id);
            formData.append('cedula',cedula);
            formData.append('nombre',nombre);
            formData.append('apellido',apellido);
            formData.append('correo',correo);

            Ajax('client-update?token='+Session.getToken(),'POST',callBack,formData);

        }

        return ({getClients,getExams,setClients,setExam,updateClient});
    }
)();

export default AtencionClienteAjax;