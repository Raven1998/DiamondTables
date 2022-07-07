import './cookieUtils';
import { getCookie, setCookie } from './cookieUtils';

export class App {

    //log
   loginInput:HTMLInputElement;
   passwordInput:HTMLInputElement;

   //notes
   noteInput:HTMLInputElement;

   //change password
   oldPassword:HTMLInputElement
   newPassword:HTMLInputElement

   currentDate:Date

   
   constructor() {
        this.getLogonInputs();
        try{
            document.querySelector('#confirm').addEventListener('click',() => this.performLogon())
        }
        catch{
            
        }
         
         window.addEventListener('load',() => this.checkUserSession())
        this.getManagementButtons();
        this.getDate();
        this.LiveClock();
  
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

        let logoutButton:HTMLButtonElement= document.querySelector(".logout");
        logoutButton.addEventListener('click', ()=> this.performLogoff())

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

        let changePasswordButton= document.querySelector('#change');
        changePasswordButton.addEventListener('click', () => this.changePassword());

        this.noteInput = document.querySelector("#notecontent");
        let addNoteButton = document.querySelector("#createNote");
        addNoteButton.addEventListener('click', ()=>this.addNote())
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

    performLogoff(){
        window.location.assign('index.html')
    }
   
    checkUserSession():void{
        if(window.location.pathname =="/managementPage.html" && getCookie('logon-data') ===null ||getCookie('logon-data')==="")
        {
            window.location.assign('index.html');
        }
        else{
            
        }
    }

    changePassword(){
        this.getChangePasswordData();
        let passwords={
            old: this.oldPassword.value,
            new: this.newPassword.value
        }

        let cachedData  =JSON.parse(getCookie('logon-data'));
        
        console.log(cachedData);
        if(passwords.old ==cachedData.password){
            let User={
                login: cachedData.login,
                password: passwords.new
            }

            setCookie('logon-data',JSON.stringify(User));

            document.querySelector('.alert-zone').innerHTML="Password has been changed";
            "Password has been changed";
        }
        else{
            document.querySelector('.alert-zone').innerHTML="<img src='assets/error.svg' class='error-img'> Incorrect password. Try again";
            "Incorrect password. Try Again!";
        }


    }

    getChangePasswordData():void{
        this.oldPassword = document.querySelector('#oldpwd');
        this.newPassword = document.querySelector('#newpwd');
    }

    getDate():void{
        this.currentDate = new Date();
        let month = this.currentDate.getUTCMonth()+1;
        let day = this.currentDate.getUTCDay().toString();
        let year = this.currentDate.getUTCFullYear().toString();
        
        let date = day + "/" +month+ "/" +year;

        document.querySelector(".date").textContent+=""+date+"";
    }

        LiveClock():void{
        this.currentDate=new Date();
        var s = this.currentDate.getSeconds();
        var m = this.currentDate.getMinutes();
        var h = this.currentDate.getHours();

        document.querySelector(".timer").innerHTML= h+":"+m+":"+s;
        setInterval(this.LiveClock,1000);
    }

    addNote():void{
        let noteContent = this.noteInput.value;
        console.log(noteContent);

        this.renderNote(noteContent);
    }

    renderNote(noteContent:string):void{
        let notePane = document.querySelector(".notes");

        let note =document.createElement('div');
        note.setAttribute('class','test')
        note.innerHTML=`${noteContent}`
        notePane.appendChild(note);
        
    }
    
    
}