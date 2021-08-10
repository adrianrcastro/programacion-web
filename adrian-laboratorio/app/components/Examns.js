import server from "../const/index.js";
import Button from "./Button.js";
import EnfermeroAjax from "../ajax/EnfermeroAjax.js";
import Enfermero from "../views/Enfermero.js";


const events = ()=>{
    const exams      = document.querySelectorAll('.examLiContainer');
    const btnPending = document.querySelector('.ExamPending');
    const btnSuccess = document.querySelector('.ExamSuccess');
    const btnAll     = document.querySelector('.ExamAll');

    btnPending.onclick = ()=>{
        exams.forEach((exam => {
            exam.classList.remove('d-none')
            if(exam.dataset.state == '1')
                exam.classList.add('d-none');
        }))
    }
    btnSuccess.onclick =()=>{
        exams.forEach((exam => {
            exam.classList.remove('d-none')
            if(exam.dataset.state != '1')
                exam.classList.add('d-none');
        }))
    }
    btnAll.onclick = ()=>{
        exams.forEach( exam => exam.classList.remove('d-none') );
    }
    document.querySelectorAll('.sendMail').forEach(btnMail =>{
        btnMail.onclick = e =>{
            const {id,idclient} = (e.target.dataset);
            EnfermeroAjax.sendMail(idclient,id,(response)=>{
               if(response.code == 1){
                   alert(response.message);
                   return true;
               }

               alert('No se pudo enviar el correo');
            })
        }
    })
    document.querySelectorAll('.answerExam').forEach( answer =>{
        answer.onclick = (e) => {
            const {id,idclient} = (e.target.dataset);
            const html = `
                <div class='form-floating w-100 mt-2'>
                    <textarea class='form-control answeredExamTextarea-${id}' data-id='${id}' placeholder='Escriba el diagnóstico' style='height: 100px'></textarea>
                    <label >Diagnóstico</label>
                </div>
                <button class='sendMail-${id} btn btn-primary mt-2'>Responder</button>`;

            e.target.parentElement.innerHTML += html;

            document.querySelectorAll('.answerExam').forEach(value => {
                if(value.dataset.id == id){
                    value.remove();
                    return true;
                }
            })

            document.querySelector(`.sendMail-${id}`).onclick = e =>{
                const textarea = document.querySelector(`.answeredExamTextarea-${id}`);
                textarea.oninput = () => {
                     textarea.classList.remove('is-invalid');
                }
                if(!textarea.value){
                    textarea.classList.add('is-invalid');
                    return false;
                }

                EnfermeroAjax.insertResults(id,idclient,textarea.value,(response)=>{

                    if(response.code == 1){
                        alert('Reporte enviado');
                        modal.hide();
                        return true;
                    }

                    alert('Ha ocurrido un incoveniente');
                })
            }

        }
    })
}



const Examns = (examns,nurse = false)=>{

    const makeNurse = (result,id,clientID) => {

        if(nurse){
            if(result)
                return `<button  data-id='${id}' data-idclient='${clientID}' class='sendMail btn btn-outline-primary mt-2'>enviar correo</button>`;
            if(result == null)
                return `<button data-id='${id}' data-idclient='${clientID}' class='answerExam btn btn-outline-danger mt-2'>Responder</button>`;
        }

        return '';
    }

    const html = examns.map(examn => {
        const {id,clientes_id,nombre,resultado} = examn;

        const viewPdf = ()=>{
            if(resultado == null)
                return '';
            return `
                <a href='${server + 'reportPdf/' + clientes_id +'/' +id}' className='card-link'>Abrir</a>
            `
        }
        return `
                <li class='list-group-item d-flex flex-column align-items-start examLiContainer' data-state='${resultado == null? '0':'1'}'>
                <strong className='d-block'>Nombre</strong>
                <span class='d-inline-block text-truncate' style='max-width: 80%;'>
                    ${nombre}
                </span>
                <strong className='d-block'>Resultados</strong>
                <span class='d-inline-block text-truncate' style='max-width: 80%;'>
                    ${resultado == null? 'sin respuesta':resultado}
                </span>
                ${viewPdf()}
                ${makeNurse(resultado,id,clientes_id)}
            </li>
        `
    }).join("");

    const buttons =  Button('ExamAll btn-outline-dark','Todos')+
                     Button('ExamPending btn-secondary','Pendientes')+
                     Button('ExamSuccess btn-success','Revisados');
    const container = `
        <div class='d-flex flex-column flex-wra gap-1'>
        ${buttons}
        </div>
        <div class='list-group'>
            ${html}
        </div>`;


    return {container,events};

}

export default Examns;