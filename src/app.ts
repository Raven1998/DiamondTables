import './cookieUtils';
import { getCookie, setCookie } from './cookieUtils';

export class App {

   loginInput:HTMLInputElement;
   passwordInput:HTMLInputElement;
   
   

   
   constructor() {
        this.getLogonInputs();
        try{
            document.querySelector('#confirm').addEventListener('click',() => this.performLogon())
        }
        catch{
            
        }
         
         window.addEventListener('load',() => this.checkUserSession())
        this.getManagementButtons();
    }
  
    
    getLogonInputs():void{
        
        this.loginInput = document.querySelector('#login');
        this.passwordInput = document.querySelector('#password');   
    }

    getManagementButtons():void{
        let accountButton :HTMLButtonElement= document.querySelector('.account');
        accountButton.onclick = function(){accountButton.classList.toggle('active')}
        let statsButton :HTMLButtonElement= document.querySelector('.stats');
        statsButton.onclick = function(){statsButton.classList.toggle('active')}

        let tableButton :HTMLButtonElement= document.querySelector('.table-button');
        let tableContent = document.querySelector('.table');
        tableButton.onclick = function(){tableContent.classList.add('active')}
        let closeTable :HTMLButtonElement = document.querySelector('.close-table')
        closeTable.onclick = function(){tableContent.classList.remove('active')}

        let costButton :HTMLButtonElement= document.querySelector('.cost-button');
        let costContent = document.querySelector('.cost');
       costButton.onclick = function(){costContent.classList.add('active')}
        let closeCost :HTMLButtonElement = document.querySelector('.close-cost')
        closeCost.onclick = function(){costContent.classList.remove('active')}
       
        let pwdButton:HTMLButtonElement= document.querySelector(".changePWD");
        let pwdContent = document.querySelector('.pwd');
        pwdButton.onclick = function(){pwdContent.classList.add('active')}
        let closePwd :HTMLButtonElement = document.querySelector('.close-pwd')
        closePwd.onclick = function(){pwdContent.classList.remove('active')}

        let dailyButton:HTMLButtonElement= document.querySelector(".dailyst");
        let dailyContent = document.querySelector('.daily');
        dailyButton.onclick = function(){dailyContent.classList.add('active')}
        let closeDaily :HTMLButtonElement = document.querySelector('.close-daily')
        closeDaily.onclick = function(){dailyContent.classList.remove('active')}

        let weeklyButton:HTMLButtonElement= document.querySelector(".weeklyst");
        let weeklyContent = document.querySelector('.weekly');
        weeklyButton.onclick = function(){weeklyContent.classList.add('active')}
        let closeWeekly :HTMLButtonElement = document.querySelector('.close-weekly')
        closeWeekly.onclick = function(){weeklyContent.classList.remove('active')}




    }
    performLogon():void{
        let User={
            login: this.loginInput.value,
            password: this.passwordInput.value
        }
        document.querySelector('.alert-zone').innerHTML="";
        

        let cachedData  =JSON.parse(getCookie('logon-data'));
        
        console.log(cachedData);
        if(User.login ==cachedData.login && User.password==cachedData.password){
            window.location.assign('managementPage.html');
        }
        else{
            document.querySelector('.alert-zone').innerHTML="<img src='assets/error.svg' class='error-img'> Incorrect username or password";
            "Incorrect username or password";
        }
        
        
    }
   
    checkUserSession():void{
        if(window.location.pathname =="/managementPage.html" && getCookie('logon-data') ===null ||getCookie('logon-data')==="")
        {
            window.location.assign('index.html');
        }
        else{
            
        }
    }
}