
export class App {

   loginInput:HTMLInputElement;
   passwordInput:HTMLInputElement;
   

   constructor() {
        this.getInputs();
        document.querySelector('#confirm').addEventListener('click',() => this.performLogon())
    }
  
    
    getInputs():void{
        
        this.loginInput = document.querySelector('#login');
        this.passwordInput = document.querySelector('#password');
        
    }

    performLogon():void{
        window.location.assign('managementPage.html');
    }
   
    
}