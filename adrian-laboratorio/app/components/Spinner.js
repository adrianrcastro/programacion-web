const Spinner = (msg = 'Cargando')=>{
   return`         
      <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
      ${msg} ...
      
   `; 
}

export default Spinner;