import Spinner from "./Spinner.js";
import Session from "../Auth/Session.js";
import LogoutAjax from "../ajax/LogoutAjax.js";
import Render from "./index.js";

const events = ()=>{

   document.querySelector('#navbarDarkDropdownMenuLink').textContent = Session.getUserName();

    document.querySelector('#logout').onclick = () => {
        document.querySelector('#navbarDarkDropdownMenuLink').innerHTML = Spinner(Session.getUserName());

        LogoutAjax((response) => {
            Session.logout();
            Render();
        })
    }
}



const Navbar = ()=>{

   const html = `
   <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div class='container-fluid'>
      <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDarkDropdown' aria-controls='navbarNavDarkDropdown' aria-expanded='false' aria-label='Toggle navigation'>
         <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarNavDarkDropdown'>
         <ul class='navbar-nav'>
            <li class='nav-item dropdown'>
            <a class='nav-link dropdown-toggle' href='#' id='navbarDarkDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            </a>
            <ul class='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarDarkDropdownMenuLink'>
               <li id='logout'><a class='dropdown-item' href='#'>Cerrar sessión</a></li>
            </ul>
            </li>
         </ul>
      </div>
      <a class='navbar-brand' href='#'>Laboratorio</a>
      </div>
   </nav>
   `;
   return({html,events});
}

export default Navbar;