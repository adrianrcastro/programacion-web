import Navbar from '../components/Navbar.js';
import Spinner from '../components/Spinner.js';
import AdministradorAjax from '../ajax/AdministradorAjax.js';
import Button from '../components/Button.js';
import Input from '../components/Input.js';
import UserUl from '../components/UserUl.js';
import Card from '../components/Card.js';
import Form from '../components/Form.js';
import Select from '../components/Select.js';


const nav = Navbar();;

const events = () => {

   nav.events();

   const addUser = document.querySelector('.addUser');
   const usersContainer = document.querySelector('.listUsers');

   document.querySelector('#searchUsersByName__formID').oninput = (e)=>{
      let userName = e.target.value;

      document.querySelectorAll('.userContainer .text-truncate').forEach((value,index)=>{
         
         if(!userName)
            document.querySelectorAll('.userContainer')[index].hidden = true;

         if(value.textContent.slice(0,userName.length).toLocaleLowerCase() == userName.toLocaleLowerCase()){
            document.querySelectorAll('.userContainer')[index].hidden = false;
         }else{
            document.querySelectorAll('.userContainer')[index].hidden = true;
         }
      })


   }

   addUser.onclick = ()=>{
      modalTitle.textContent = 'Registro';
      
      const options = [
         {
           "id": 1,
           "nombre": "seleccione un rol"
         },
         {
           "id": 2,
           "nombre": "atención al cliente"
         },
         {
           "id": 3,
           "nombre": "enfermero"
         }
       ];

      const inputs = Input('name','text','usuario','ingresar usuario','userName')+
                     Input('pass','password','Contraseña','ingrese la clave','password')+
                     Select(options,'rolesSelect')+
                     Button('mt-2 btn-primary regeditUser','Registrar');

      modalBody.innerHTML  = Form('Trabajador',inputs,'newUser')
      modal.show();


      const btnRegedit = document.querySelector('.regeditUser');
      const inputUserName = document.querySelector('.name__form');
      const inputUserPass = document.querySelector('.pass__form');
      const roles_id      = document.querySelector('.rolesSelect');
      

      btnRegedit.onclick = ()=> {
         
         roles_id.classList.remove('is-invalid');
         inputUserName.classList.remove('is-invalid');
         inputUserPass.classList.remove('is-invalid');

         if(!inputUserName.value){
            inputUserName.classList.add('is-invalid');
            return false;
         }
         if(!inputUserPass.value){
            inputUserPass.classList.add('is-invalid');
            return false;
         }

         if(roles_id.value == 1){
            roles_id.classList.add('is-invalid');
            return false;
         }
         
         const lockForm = lock =>{
            btnRegedit.disabled = lock;
            inputUserName.disabled = lock;
            inputUserPass.disabled = lock;
            roles_id.disabled = lock;
            
            if(!lock)
               btnRegedit.innerHTML = 'Registrar';

         }

         lockForm(true);

         
         btnRegedit.innerHTML = Spinner('Registrando');
         
         //name,pass,roles_id,callBack
         const userName = inputUserName.value;
         const userPass = inputUserPass.value;
         const role_id  = roles_id.value;
         AdministradorAjax.newUser(userName,userPass,role_id,(response)=>{
            
            inputUserName.classList.remove('is-invalid');

            if(response.code == -1){
               document.querySelector('#name__formID ~ label').textContent = response.message;
               inputUserName.classList.add('is-invalid');
               lockForm(false);
               inputUserName.onclick = (e)=>{
                  e.target.classList.remove('is-invalid');
                  document.querySelector('#name__formID ~ label').textContent = 'usuario';
               }

               return false;
            }
            const userCardHtml = Card('Usuario', UserUl(response.data.id, response.data.userName, response.data.roles_id),response.data.id,'userContainer')
            usersContainer.innerHTML += userCardHtml;
            crudUsers();
            modal.hide();
         });

      }
   }

}

const crudUsers = ()=>{

   const userContainer  = document.querySelectorAll('.userContainer');
   const btnDeletUser   = document.querySelectorAll('.deleteUser');
   const spanRols        = document.querySelectorAll('.userContainer .badge');
   const roles = {2:'Atención al cliente',3:'Enfermero'};

   btnDeletUser.forEach(user => {
      user.onclick = (e) => {
         
         const id = e.target.dataset.id;
         
         user.innerHTML = Spinner('');

         
         AdministradorAjax.deleteUser(id,(response=>{

            if(response.code == -1){
               modalTitle.textContent = 'Mensaje';
               modalBody.innerHTML  = response.message;
            }

            
            if(response.code == 1){
               userContainer.forEach(user => {
                  if(user.dataset.id == id){
                     user.remove();
                     return true;
                  }
               })

               modalTitle.textContent = 'Mensaje';
               modalBody.innerHTML  = response.message;
            }

            modal.show();
            
            user.innerHTML = 'Despedir';

         }))
         

      }
   })

   document.querySelectorAll('.roleUpdate').forEach(user => {
      user.onclick = e => {
         const id = e.target.dataset.id;
         const role_id = e.target.dataset.roleid;
         const btn = [... btnDeletUser].filter(user => user.dataset.id == id)[0];
         const spanRol = [... spanRols].filter(rols => rols.dataset.id == id)[0];
         btn.innerHTML = Spinner('');
         
         AdministradorAjax.updateUser(id,role_id,(response)=>{
            btn.innerHTML = 'Eliminar';

            if(response.code == -1){
               return false;
            }  
            spanRol.innerHTML = roles[role_id];
         });

      }
   })
};

const Administrador = () => {

   const addUsersBtn = Button('btn-primary addUser', 'Agregar usuario');
   const searchUserByName = Input('searchUsersByName', 'text', 'Filtrar por usuario', 'carlos', 'w-100');
   const users = `<div class='listUsers d-flex flex-wrap gap-3 w-100 justify-content-md-start justify-content-center '>
                        ${Spinner('Cargando lista de usuarios')}</div>`;

   AdministradorAjax.listUsers((response) => {
      let usersContainer = document.querySelector('.listUsers');
      
      if(response.code == -1){
         usersContainer.innerHTML = '';
         return false;
      }
      if (response.code == 1) {
         
         const usersData = response.data;
         const usersHtml = usersData.map(user => {
            return Card('Usuario', UserUl(user.id, user.name, user.roles_id),user.id,'userContainer');
         }).join("");
         usersContainer.innerHTML = usersHtml;

         crudUsers();
      }
   });

   const container = `
      ${nav.html}
      <div class="d-flex flex-wrap gap-3 mt-2">
         ${addUsersBtn}
         ${searchUserByName}
         ${users}
      </div>
   `;

   return ({ container, events });
};

export default Administrador;