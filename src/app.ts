export class App {

   loginInput:HTMLInputElement;
   passwordInput:HTMLInputElement;
  

   constructor() {
        this.getInputs();
        try{
            document.querySelector('#confirm').addEventListener('click',() => this.performLogon())
        }
        catch{

        }
         
         window.addEventListener('load',() => this.checkUserSession())
        
    }
  
    
    getInputs():void{
        
        this.loginInput = document.querySelector('#login');
        this.passwordInput = document.querySelector('#password');
        
    }

    performLogon():void{
        let User={
            login: this.loginInput.value,
            password: this.passwordInput.value
        }
        document.querySelector('.alert-zone').innerHTML="";
        
        let cachedData  =JSON.parse(sessionStorage.getItem("logon-data"));
        
        if(User.login ==cachedData.login && User.password==cachedData.password){
            window.location.assign('managementPage.html');
        }
        else{
            document.querySelector('.alert-zone').innerHTML="<img src='assets/error.svg' class='error-img'> Incorrect username or password";
            "Incorrect username or password";
        }
        
        
    }
   
    checkUserSession():void{
        if(window.location.pathname =="/managementPage.html" && sessionStorage.getItem('logon-data') ===null ||sessionStorage.getItem('logon-data')==="")
        {
            window.location.assign('index.html');
        }
        else{
            
        }
    }
}