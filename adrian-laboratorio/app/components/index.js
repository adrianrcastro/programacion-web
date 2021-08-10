
import Login from '../views/Login.js';
import Session from '../Auth/Session.js';
import Administrador from '../views/Administrador.js';
import AtencionCliente from '../views/AtencionCliente.js';
import Enfermero from '../views/Enfermero.js';

const home = ()=>{

   if(Session.check){ 
      const roles_id = Session.getRolesId();
      if(roles_id == 1)
         return Administrador();
      if(roles_id == 2)
      	return AtencionCliente();
      if(roles_id == 3)
      	return Enfermero();
   }

   return Login()
};

const Render = (html = home()) =>{
   document.querySelector('#root').innerHTML = (html.container);
   html.events();
}

export default Render;