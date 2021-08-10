import Navbar from '../components/Navbar.js';
import Button from '../components/Button.js';
import Input from '../components/Input.js';
import Spinner from '../components/Spinner.js';
import AtencionClienteAjax from '../ajax/AtencionClienteAjax.js';
import ClientUl from '../components/ClientUl.js';
import Form from '../components/Form.js';
import Examns from '../components/Examns.js';
import Render from "../components/index.js";

const navbar = Navbar();

const events = () => {
    navbar.events();
    const btnAddClient = document.querySelector('.addClient');
    btnAddClient.onclick = () => {

        // añadiendo cliente
        modalTitle.textContent = 'Registro';

        const inputs = Input('identification', 'number', 'Cédula', 'ingresar usuario', 'userName') +
            Input('name', 'text', 'Nombre', 'ingresar nombre', 'clientName') +
            Input('lastName', 'text', 'Apellido', 'ingresar apellido', 'clientLastName') +
            Input('email', 'email', 'correo', 'ingresar correo', 'clientEmail') +
            Button('mt-2 btn-primary regeditClient', 'Registrar');

        modalBody.innerHTML = Form('Cliente', inputs, 'newUser')
        modal.show();

        const identification = document.querySelector('#identification__formID');
        const identificationLabel = document.querySelector('#identification__formID ~ label');

        identification.oninput = (e) => {
            const value = e.data;
            const regularExp = /^[0-9]$/;

            if (!regularExp.test(value)) {
                e.target.value = "";
                identificationLabel.textContent = 'Solo valores numéricos'
                identification.classList.add('is-invalid');
                return true;
            }
            identificationLabel.textContent = 'Cédula';
            identification.classList.remove('is-invalid');

        }

        document.querySelector('.regeditClient').onclick = (e) => {

            const btnSubmit = e.target;
            const name = document.querySelector('#name__formID');
            const lastName = document.querySelector('#lastName__formID');
            const email = document.querySelector('#email__formID');
            const emailLabel = document.querySelector('#email__formID ~ label');
            emailLabel.textContent = 'correo';

            const locked = (state) => {
                identification.readOnly = state;
                name.readOnly = state;
                lastName.readOnly = state;
                email.readOnly = state;
                btnSubmit.disabled = state;
            }

            identification.classList.remove('is-invalid');
            name.classList.remove('is-invalid');
            lastName.classList.remove('is-invalid');
            email.classList.remove('is-invalid');

            if (!identification.value) {
                identification.classList.add('is-invalid');
                return true;
            }
            if (!name.value) {
                name.classList.add('is-invalid');
                return true;
            }
            if (!lastName.value) {
                lastName.classList.add('is-invalid');
                return true;
            }
            if (!email.value) {
                email.classList.add('is-invalid');
                return true;
            }

            const MailSuccessRegularExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (!MailSuccessRegularExpression.test(email.value)) {
                email.value = "";
                email.classList.add('is-invalid');
                emailLabel.textContent = "Dirección inválida";
                return false;
            }

            identification.classList.add('invalid');
            name.classList.add('invalid');
            lastName.classList.add('invalid');
            email.classList.add('invalid');

            btnSubmit.innerHTML = Spinner('Enviando');
            locked(true)

            AtencionClienteAjax.setClients(({
                cedula: identification.value,
                nombre: name.value,
                apellido: lastName.value,
                correo: email.value
            }), (response) => {

                if (response.code == 1) {
                    const client = ClientUl(response.data, identification.value, name.value, lastName.value, email.value);
                    document.querySelector('.listClients').innerHTML += client;
                    modal.hide();
                    clientsEvents();
                    return false;
                }
                modalBody.innerHTML = response.message;

            })
        }

    }

}

const clientsEvents = () => {
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
    document.querySelectorAll('.updateClient').forEach((clientDOM, index) => {


        clientDOM.onclick = (e) => {

            const {id, identification, name, lastname, email} = e.target.dataset;

            modalTitle.textContent = 'Formulario';
            const inputs =
                Input('identification', 'text', 'Cédula', 'ingresar usuario', 'userName inputUpdateClient') +
                Input('name', 'text', 'Nombre', 'ingresar nombre', 'clientName inputUpdateClient') +
                Input('lastName', 'text', 'Apellido', 'ingresar apellido', 'clientLastName inputUpdateClient') +
                Input('email', 'text', 'correo', 'ingresar correo', 'clientEmail inputUpdateClient') +
                Button('mt-2 btn-success updateClientBtn', 'Actualizar');
            modalBody.innerHTML = Form('Cliente', inputs, 'updateClientForm')
            modal.show();


            const [identificationI, nameI, lastNameI, emailI] = document.querySelectorAll('.inputUpdateClient input');
            const [identificationLabel, nameLabel, lastNameLabel, emailLabel] = document.querySelectorAll('.inputUpdateClient input ~ label');
            identificationI.value = identification;
            nameI.value = name;
            lastNameI.value = lastname;
            emailI.value = email;


            const regularExp = /^[0-9]$/;
            emailLabel.textContent = 'correo';

            identificationI.oninput = (e) => {
                if (!regularExp.test(e.data)) {
                    identificationI.value = "";
                    identificationLabel.textContent = 'Solo valores numericos';
                    identificationI.classList.add('is-invalid');
                } else {
                    identificationI.classList.remove('is-invalid');
                    identificationLabel.textContent = 'Cédula';
                }
            }

            document.querySelector('.updateClientBtn').onclick = (e) => {
                // validar

                identificationI.classList.remove('is-invalid');
                nameI.classList.remove('is-invalid');
                lastNameI.classList.remove('is-invalid');
                emailI.classList.remove('is-invalid');
                emailLabel.textContent = 'correo';

                e.target.innerHTML = Spinner('Actualizando');

                if (!identificationI.value) {
                    identificationI.value = "";
                    identificationI.classList.add('is-invalid');
                    return false;
                }
                if (!nameI.value) {
                    nameI.value = "";
                    nameI.classList.add('is-invalid');
                    return false;
                }
                if (!lastNameI.value) {
                    lastNameI.value = "";
                    lastNameI.add('is-invalid');
                    return false;
                }
                if (!emailI.value) {
                    emailI.value = "";
                    emailI.add('is-invalid');
                    return false;
                }

                const MailSuccessRegularExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                if (!MailSuccessRegularExpression.test(emailI.value)) {
                    emailI.classList.add('is-invalid');
                    emailLabel.textContent = 'Dirección inválida';
                    return false;
                }

                const locked = (state) => {
                    identificationI.readOnly = state;
                    nameI.readOnly = state;
                    lastNameI.readOnly = state;
                    emailLabel.readOnly = state;
                    e.target.disabled = state;
                }

                locked(true)

                //
                AtencionClienteAjax.updateClient(({
                    id: id,
                    cedula: identificationI.value,
                    nombre: nameI.value,
                    apellido: lastNameI.value,
                    correo: emailI.value
                }), (response) => {


                    if (response.code == 1) {
                        Render(AtencionCliente());
                    }
                    modalTitle.textContent = 'Mensaje';
                    modalBody.innerHTML = response.message;

                })

            }

        }

        //listar examenes

        document.querySelectorAll('.listExams')[index].onclick = (e) => {
            const idClient = e.target.dataset.id;
            modalTitle.textContent = 'Lista de examenes';
            modalBody.innerHTML = Spinner('Cargando Lista');
            modal.show();


            AtencionClienteAjax.getExams(idClient, (response) => {
                if (response.code == 1) {
                    const exams = Examns(response.data);
                    modalBody.innerHTML = exams.container;
                    exams.events();
                    return true;
                }
                modalBody.innerHTML = response.message;

            })
        }

        //solicitar examen
        document.querySelectorAll('.sendExam')[index].onclick = (e) => {

            const idClient = e.target.dataset.id;

            const inputs = Input('examName', 'text', 'Nombre', 'ingresar nombre de examen', 'examName') +
                Input('examDescription', 'text', 'Descripción', 'ingresar la descripción del examen', 'examDescription') +
                Button('mt-2 btn-primary insertExam', 'Solicitar');

            modalTitle.textContent = 'Registro';
            modalBody.innerHTML = Form('Examen', inputs, 'newExam')
            modal.show();

            const examName = document.querySelector('.examName input');
            const examDescription = document.querySelector('.examDescription input');

            document.querySelector('.insertExam').onclick = (e) => {
                //ajax solicitar examn

                const btnInsertExam = e.target;

                examName.classList.remove('is-invalid');
                examDescription.classList.remove('is-invalid');

                if (!examName.value) {
                    examName.classList.add('is-invalid');
                    return false;
                }

                if (!examDescription.value) {
                    examDescription.classList.add('is-invalid');
                    return true;
                }

                examName.readOnly = true;
                examDescription.readOnly = true;
                btnInsertExam.innerHTML = Spinner();

                btnInsertExam.disable = true;

                //enviando parametros a api

                AtencionClienteAjax.setExam(({

                    nombre: examName.value,
                    descripcion: examDescription.value,
                    clientes_id: idClient

                }), (response) => {
                    modalTitle.textContent = 'Mensaje';
                    if (response.code == 1) {
                        modalBody.innerHTML = response.message;
                        return true;
                    }
                    modalBody.innerHTML = response.message;

                })

            }
        }
    })
}

const AtencionCliente = () => {

    const addClientBtn = Button('btn-primary addClient', 'Agregar cliente');
    const searchByIdentification = Input('searchByCedula', 'text', 'Filtrar por cedula', '11798247', 'w-100');
    const clients = `<div class='listClients d-flex flex-wrap gap-3 w-100 justify-content-md-start justify-content-center '>
                        ${Spinner('Cargando lista de clientes')}
                     </div>`;

    AtencionClienteAjax.getClients((response) => {
        if (response.code == 1) {
            const ListClients = response.data.map(client => ClientUl(client.id, client.cedula, client.nombre, client.apellido, client.correo,false)).join('');
            document.querySelector('.listClients').innerHTML = ListClients;
            clientsEvents();
            return true;
        }

        document.querySelector('.listClients').innerHTML = '';
    })

    const container = `
      ${navbar.html}
      <div class='d-flex flex-wrap gap-3 mt-2'>
         ${addClientBtn}
         ${searchByIdentification}
         ${clients}
      </div>
   `;

    return ({container, events});
}

export default AtencionCliente;