
const Input = (name,type,label,placeholder = '',className = '')=>{

   return `

   <div class='form-floating mb-3 ${className}'>
      <input type='${type}' 
      class='form-control ${name}__form' 
      id='${name}__formID' 
      placeholder='${placeholder}'>
      <label for='${name}__formID'>${label}</label>
   </div>
   
   `;

};

export default Input;