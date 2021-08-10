import Navbar from "../components/Navbar.js";
import Input from "../components/Input.js";
import Spinner from "../components/Spinner.js";
import EnfermeroAjax from "../ajax/EnfermeroAjax.js";
import ClientUl from "../components/ClientUl.js";
import Examns from "../components/Examns.js";



const nav = Navbar();

const events = ()=>{
	nav.events();
}

const clientsEvents = ()=>{
	//seleccionar por cedula
	const searchClientByIdentification = document.querySelector('#searchByCedula__formID');
	searchClientByIdentification.onkeydown = (e) => {
		if (e.key == 'Enter') {
			document.querySelectorAll('.clientContainer').forEach(client => {
				client.classList.remove('d-none');
				if (client.dataset.identification != e.target.value && e.target.value) {
					client.classList.add('d-none');
				}
			})
		}
	}
	searchClientByIdentification.oninput = (e) => {
		if (!e.target.value) {
			document.querySelectorAll('.clientContainer').forEach(client => client.classList.remove('d-none'));
		}
	}
	// ---

	document.querySelectorAll('.listExams').forEach( (showExam,index) =>{
		showExam.onclick = (e)=>{
			const idClient = e.target.dataset.id;
			modalTitle.textContent = 'Lista de examenes';
			modalBody.innerHTML = Spinner('Cargando Lista');
			modal.show();


			EnfermeroAjax.getExams(idClient, (response) => {
				if (response.code == 1) {
					const exams = Examns(response.data,true);
					modalBody.innerHTML = exams.container;
					exams.events();
					return true;
				}
				modalBody.innerHTML = response.message;

			})
		}
	})

}

const Enfermero = ()=>{

	const searchByIdentification = Input('searchByCedula', 'text', 'Filtrar por cedula', '11798247', 'w-100');
	const clients = `<div class='listClients d-flex flex-wrap gap-3 w-100 justify-content-md-start justify-content-center '>
                        ${Spinner('Cargando lista de clientes')}
                     </div>`;

	EnfermeroAjax.getClients((response) => {
		if (response.code == 1) {
			const ListClients = response.data.map(client => ClientUl(client.id, client.cedula, client.nombre, client.apellido, client.correo,true)).join('');
			document.querySelector('.listClients').innerHTML = ListClients;
			clientsEvents();
			return true;
		}

		document.querySelector('.listClients').innerHTML = '';
	})


	const container = `
      ${nav.html}
      <div class='d-flex flex-wrap gap-3 mt-2'>
         ${searchByIdentification}
         ${clients}
      </div>
   `;

	return ({container,events});
}

export default Enfermero;