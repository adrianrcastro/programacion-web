// events


const list = [ // ejemplo
   {
      id: 'home',
      name:'Inicio',
      content:'1'
   }
]

const Menu = (element = list)=>{

   const options = element.map((option,index) => {
      const active = index == 0? 'active' : '' ;
      const button = `
         <button class='nav-link ${active}'
                 id='v-pills-${option.id}-tab'
                 data-bs-toggle='pill'
                 data-bs-target='#v-pills-${option.id}'
                 type='button' role='tab'
                 aria-controls='v-pills-${option.id}' 
                 aria-selected='${active != '' + ""}'>
                 ${option.name}
         </button>
      `;
      return button;
   }).join("");

   const content = element.map((option,index) => {
      const active = index == 0? 'show active' : '' ;
      const container = `
         <div class='tab-pane fade ${active}' 
            id='v-pills-${option.id}' 
            role='tabpanel' 
            aria-labelledby='v-pills-${option.id}-tab'>
            ${option.content}
         </div>
      `;
      return container;
   }).join("");
   
   const container = `
      <div class='d-flex align-items-start'>
         <div class='nav flex-column nav-pills me-3' 
            id='v-pills-tab' 
            role='tablist' 
            aria-orientation='vertical'>
            ${options}
         </div>
         
         <div class='tab-content' id='v-pills-tabContent'>
            ${content}
         </div>
      </div>
      `;
   
   return container;

};

export default Menu;