const Session = (()=>{

      //let storage = window.localStorage;
      let getToken      = ()=> localStorage.getItem('token');
      let getUserName   = () => localStorage.getItem('userName');
      let getRolesId    = ()  => localStorage.getItem('roles_id');

      const init = ({token,userName,roles_id}) => {
         localStorage.setItem('token',token)
         localStorage.setItem('userName',userName)
         localStorage.setItem('roles_id',roles_id)
      }
      const check    = () => localStorage.getItem('token')? true:false;
      const logout = () => {
         localStorage.clear();
      };
   
      return({
         init,
         logout,
         getRolesId,
         getToken,
         getUserName,
         check
      })
   }
)();

export default Session;
