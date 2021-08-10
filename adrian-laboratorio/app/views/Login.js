import LoginRegedit from '../components/LoginRegedit.js';
import Spinner from '../components/Spinner.js';
import LoginAjax  from '../ajax/LoginAjax.js';
import Session from '../Auth/Session.js';
import Render from '../components/index.js';
import Administrador from './Administrador.js';
import AtencionCliente from './AtencionCliente.js';
import Enfermero from './Enfermero.js';

const events = ()=> {
   
   const name  = document.querySelector('#name__formID');
   const pass  = document.querySelector('#pass__formID');
   const btn   = document.querySelector('.login .btn-primary');

   btn.onclick = ()=>{

      name.classList.remove('is-invalid');
      pass.classList.remove('is-invalid');

      if(!name.value){
         name.classList.add('is-invalid');
         return false;
      }
      if(!pass.value){
         pass.classList.add('is-invalid');
         return false;
      }
      
      btn.innerHTML = Spinner('Entrando');
      btn.disabled = true;
      name.readOnly = true;
      pass.readOnly = true;
      
      LoginAjax(name.value,pass.value, response =>{
         
         btn.innerHTML = "Inicia sesión";
         btn.disabled  = false;
         name.readOnly = false;
         pass.readOnly = false;

         if(response.code == -1){
            modalTitle.textContent = 'Atención';
            modalBody.textContent  = response.message;
            modal.show();
            return false;
         }

         const token    = response.data.access_token;
         const userName = response.data.name;
         const roles_id = response.data.roles_id;

         Session.init(({token,userName,roles_id}));
         
         /*
            1 : administrador
            2 : atencion al cliente
            3 : enfermero
         */ 

         if(roles_id == 1)
            Render(Administrador());
         if(roles_id == 2)
            Render(AtencionCliente());
         if(roles_id == 3)
            Render(Enfermero());
      });
   };

   name.onkeydown = pass.onkeydown = (e) => e.key =='Enter'? btn.onclick() : null;

}

const Login = ()=>{
   
   const container = LoginRegedit();
   return {container,events};
   
};

export default Login;