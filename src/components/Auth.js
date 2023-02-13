import {reactLocalStorage} from 'reactjs-localstorage';
//local storage guide https://stackoverflow.com/questions/70832675/losing-usestate-value-on-refresh-in-react-js

//called by account class to set localstorage session : logged in?
class Authenticate {
    constructor() {
    console.log('reconstructing auth');
      this.authenticated = false;
      //reactLocalStorage.set('auth', true);
      //reactLocalStorage.get('auth', true);
      if (reactLocalStorage.getObject('Auth')===undefined){
       
        reactLocalStorage.setObject('Auth', {'logged': false})

      }


    }

    login() {
      this.authenticated = true;
      console.log('login - this.auth is ',this.authenticated);
      reactLocalStorage.setObject('Auth', {'logged': true})
      //getRole of user
    }
  
    logout() {
      this.authenticated = false;
      console.log('logout - this.auth is ',this.authenticated);
      reactLocalStorage.setObject('Auth', {'logged': false})
      reactLocalStorage.setObject('Role', {'role': ''})
      reactLocalStorage.setObject('Loading', {'load': false})
      console.log('after logout status...',reactLocalStorage.getObject('Auth'));
    }

    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Authenticate();