import Form from './Form.js';
import Input from './Input.js';
import Button from './Button.js';

const LoginRegedit = (title = 'Inicio de sessión',btnLogin = 'Entrar')=>{
      
      const inputs = Input('name','text','Usuario')+
                     Input('pass','password','Contraseña');
      
      const Buttons = 
      '<div class="d-flex flex-column">'+
         Button('btn-primary',btnLogin)
      '</div>';
      
      const form   = Form(title,(inputs+Buttons), 'login');

      return form;
};

export default LoginRegedit;