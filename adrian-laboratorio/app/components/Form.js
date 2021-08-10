const Form = (title,inputs,className = '')=>{

   return `
   <form class='mt-5 form ${className}'>
   <h5 class='mb-5 card-title text-center'>${title}</h5>
      ${inputs}
   </form>
   `;

}
export default Form;

