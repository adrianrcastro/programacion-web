const DropDown = (header, options ,className = '')=>{

   const _options = options.map(value => {
      return `
         <li><a class="dropdown-item ${className}" data-id='${value.id}' href="#">${value.nombre}</a></li>
      `;
   }).join("");

   return `
      <ul class="dropdown-menu">
         <li><h6 class="dropdown-header">${header}</h6></li>
         ${_options}
      </ul>
   
   `;
}

export default DropDown;