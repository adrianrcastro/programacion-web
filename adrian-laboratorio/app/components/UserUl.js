
const UserUl = (id,userName,role_id)=>{

   const roles =  ['Administrador','Atención al cliente','Enfermero'];
   const liRoles = roles.slice(1).map((value,index) => {
      return `<li><a class='dropdown-item roleUpdate' href='#' data-id='${id}' data-roleId='${index+2}'>${value}</a></li>`
   }).join('');

   return `
   
   <ul class='list-group list-group-flush'>
      <li class='list-group-item d-flex justify-content-between gap-2'>
         <div class='d-flex flex-column'>
            <span class='d-inline-block text-truncate' style='max-width: 100px;'>${userName}</span>
            <span class='badge bg-warning text-dark' data-id='${id}'>${roles[role_id -1]}</span>
         </div>

         <div class='btn-group'>
            <button type='button' class='btn btn-danger deleteUser' data-id=${id}>Despedir</button>
            <button type='button' data-bs-toggle='dropdown' aria-expanded='false'
               class='btn btn-secondary dropdown-toggle dropdown-toggle-split'>
               <span class='visually-hidden'>Toggle Dropdown</span>
            </button>
            <ul class='dropdown-menu'>
               <li class='bg-dark'><a href='#' class='dropdown-item text-white'>Cambiar rol</a></li>
               <li>
                  <hr class='dropdown-divider'>
               </li>
               ${liRoles}
            </ul>
         </div>
         
      </li>
   </ul>
   
   `;
}

export default UserUl;