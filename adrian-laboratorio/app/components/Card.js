
const Card = (title,content,id='',className='')=>{
   return `
   <div class='card w-100 ${className}' style='max-width: 18rem;' data-id='${id}'>
   <div class='card-header'>
      ${title}
   </div>
      ${content}
   </div>
   `;
}


export default Card;