
const ClientUl = (id,identification, userName, lastName, mail,nurse = false)=>{

    if(!nurse){

        return `
       
          <div class='card d-flex justify-content-between gap-2 p-2 clientContainer' data-id='${id}' data-identification='${identification}'>
            <strong>Cédula</strong> 
            <span class='d-block text-truncate text-center'   style='max-width: 100px;'>${identification}</span>
            <hr>
            <strong>Nombre</strong>
            <span class='d-block text-truncate text-center'   style='max-width: 100px;'>${userName}</span>
            <hr>
            <strong>Apellido</strong>
            <span class='d-block text-truncate text-center'   style='max-width: 100px;'>${lastName}</span>
            <hr>
            <button type='button' class='btn  btn-outline-secondary updateClient' 
                data-id=${id} 
                data-identification='${identification}'
                data-name='${userName}' 
                data-lastname='${lastName}'
                data-email='${mail}'
            >Actualizar datos</button>
            <button type='button' class='btn btn-outline-success sendExam' data-id=${id}>Solicitar examen</button>
            <button type='button' class='btn btn-dark listExams' data-id=${id}>Ver examenes</button>
          </div>
       `;
    }

    return `
       
          <div class='card d-flex justify-content-between gap-2 p-2 clientContainer' data-id='${id}' data-identification='${identification}'>
            <strong>Cédula</strong> 
            <span class='d-block text-truncate text-center'   style='max-width: 100px;'>${identification}</span>
            <hr>
            <strong>Nombre</strong>
            <span class='d-block text-truncate text-center'   style='max-width: 100px;'>${userName}</span>
            <hr>
            <strong>Apellido</strong>
            <span class='d-block text-truncate text-center'   style='max-width: 100px;'>${lastName}</span>
            <button type='button' class='btn btn-success listExams' data-id=${id}>Ver examenes</button>
          </div>
       `;
}

export default ClientUl;