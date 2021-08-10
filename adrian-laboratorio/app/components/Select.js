const Select = (options, className = '')=>{
   const _options = options.map((option,index) => {
      return `
         <option data-index='${index}' value='${option.id}'>${option.nombre}</option>
      ` 
   }).join("");
   return `
      <select class="form-select ${className}">
         ${_options}
      </select>
   `;
}

export default Select;