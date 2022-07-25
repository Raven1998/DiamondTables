import './cookieUtils';
import { getCookie, setCookie } from './cookieUtils';
import { Cost } from './cost';
import { Table } from './table';
import { Reservation } from './reservation'; 

export class App {

    //log
   loginInput:HTMLInputElement;
   passwordInput:HTMLInputElement;

   //notes
   noteInput:HTMLInputElement;

   //change password
   oldPassword:HTMLInputElement
   newPassword:HTMLInputElement

   //cost
   costName:HTMLInputElement;
   costValue:HTMLInputElement;

   //table
   tableName:HTMLInputElement
   tableDesc:HTMLInputElement
   tableAssignedCost:HTMLInputElement;

   //reservation
    bookerName:HTMLInputElement
    resemail:HTMLInputElement
    resphoneNumber:HTMLInputElement
    starthour:HTMLInputElement
    endhour:HTMLInputElement 
    assignedtableID:HTMLInputElement
   
    //dates
    currentDate:Date
    addResDate:string

    //Costname in Table
    CostNameTable:string
   
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
        this.proceedCost();
        this.proceedTable();
        this.proceedReservations()
        
       
        
  
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

        let reservButton:HTMLButtonElement =document.querySelector('#addReserv');
        let reservContent = document.querySelector('.reservation');
        reservButton.onclick = function(){reservContent.classList.add('active')}
        let closeReserv :HTMLButtonElement = document.querySelector('.close-reservation')
        closeReserv.onclick = function(){reservContent.classList.remove('active')}

        let CostButton:HTMLButtonElement = document.querySelector('#addcost');
        CostButton.addEventListener('click', ()=>this.addCost());

        let TableButton:HTMLButtonElement = document.querySelector('#addtable');
        TableButton.addEventListener('click', ()=>this.addTable());

        let ResButton:HTMLButtonElement =document.querySelector('#bookReservation');
        ResButton.addEventListener('click',()=>this.addReservation());
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
        let monthString;
        let day = this.currentDate.getDate().toString();
        let year = this.currentDate.getUTCFullYear().toString();
        
        if(month<10){monthString =`0${month}`}
        if (parseInt(day)<10){day =`0${day}`};

        let date = day + "/" +monthString+ "/" +year;
        this.addResDate =date;
        document.querySelector(".date").innerHTML=`${date}`;
    }

        LiveClock():void{
        this.currentDate=new Date();
        var s = this.currentDate.getSeconds().toString();
        var m = this.currentDate.getMinutes().toString();
        var h = this.currentDate.getHours();

        if(parseInt(m)<10){
            m = `0${m}`;
        }
        if(parseInt(s)<10){
            s = `0${s}`;
        }
        document.querySelector(".timer").innerHTML= `${h}:${m}:${s}`;
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

/////////////////////////////////////COST ZONE//////////////////////////////////////


    async getCosts(): Promise<any> {
        const costUrl = `http://localhost:5000/costs`;
        const costResponse = await fetch(costUrl);
        const costData = await costResponse.json();
        return costData;
    }

     async getSingleCost(id:string){
        const costUrl = `http://localhost:5000/costs/${id}`;
        const costResponse = await fetch(costUrl);
        const costData = await costResponse.json();
        return costData;
    }
     async getCostName(id:string,tableID:string){
        
        const cost = await this.getSingleCost(id);
        
        
            let obj;
            obj=cost;
            
            let name = obj.name;

            this.renderName(name,tableID);
        

    }

    renderName(name:string,TableID:string){
        document.querySelector(`.tablecost-${TableID}`).innerHTML =`Cost Type:${name}`

    }

    async proceedCost () {

        let costPane = document.querySelector('.costfieldset');
        costPane.innerHTML='';

        const cost = await this.getCosts();
        
        for(let i=0;i<cost.length;i++)
        {
            let obj;
            obj=cost[i];

            let name = obj.name;
            let id =obj.id;
            let value=obj.costValue;

            let main:Cost = new Cost(value,name,id,);

            console.log(main);

            this.renderCost(main);
        }
        
        
    }

    renderCost(cost:Cost){

        let costPane = document.querySelector('.costfieldset');
        let costslist =document.querySelector('#costslist');
        costslist.innerHTML +=`<option value="${cost.costID}" label="${cost.costName}">`;
        let costslistEdit =document.querySelector('#costslist-edit');
        costslistEdit.innerHTML +=`<option value="${cost.costID}" label="${cost.costName}">`;
        

        let costToAdd =document.createElement('div');
        costToAdd.setAttribute('class','singleCost')
        costToAdd.setAttribute('id',`${cost.costID}`)
        costToAdd.innerHTML=`<div class='costName'>${cost.costName}</div> <div class='costright'>${cost.costValue} zł/h <button type="button" id='edit-${cost.costID}' class="login-button">E</button><button type="button" id='del-${cost.costID}' class="login-button">&times</button></div>`
        costPane.appendChild(costToAdd);

        let deleteButton:HTMLButtonElement= document.querySelector(`#del-${cost.costID}`);
        deleteButton.addEventListener('click', ()=> this.deleteCost(cost.costID));

        let editButton:HTMLButtonElement =document.querySelector(`#edit-${cost.costID}`);
        let editCostContent = document.querySelector('.cost-edit');
        editButton.onclick = function(){
            editCostContent.classList.add('active');
            let editInput:HTMLInputElement = document.querySelector('#costvalue-edit')
            editInput.value = String(cost.costValue);
            let editNameInput:HTMLInputElement = document.querySelector('#costname-edit');
            editNameInput.value =cost.costName;
            let costContent:HTMLButtonElement = document.querySelector('#editcost');
            costContent.value = cost.costID;
            
             }

             let edicCostButton:HTMLButtonElement = document.querySelector(`#editcost`);
             edicCostButton.addEventListener('click',()=> this.updateCost());
           

        let closeReserv :HTMLButtonElement = document.querySelector('.close-cost-edit')
        closeReserv.onclick = function(){editCostContent.classList.remove('active')}

    }

    addCost(){
       
        this.costName = document.querySelector('#costname');
        this.costValue =document.querySelector('#costvalue');
        let newCostName =this.costName.value;
        let newCostValue = this.costValue.value.toString();
        //Weryfikacja inputów
        if(newCostName==null||newCostName==''){document.querySelector('.alert-zone-cost').innerHTML='Provide Cost Name'; }
        else if(newCostValue==null||newCostValue==''){document.querySelector('.alert-zone-cost').innerHTML='Provide Cost Prize'; }
        else{

            const data = new FormData();
        data.append("name", `${newCostName}`);
        data.append("costValue", `${newCostValue}`);
        
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("POST", "http://localhost:5000/costs?Default=40");
        
        xhr.send(data);
    
        setTimeout( () =>this.proceedCost(),2000);
        let costslist =document.querySelector('#costslist');
        costslist.innerHTML =``;

        }
        
        
        
    }

    deleteCost(id:string){
    let idtodelete =id;

        const data :any= null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
    });

    xhr.open("DELETE", `http://localhost:5000/costs/${idtodelete}`);

    xhr.send(data);
    
    setTimeout( () =>this.proceedCost(),2000);
    let costslist =document.querySelector('#costslist');
    costslist.innerHTML =``;


    }

    updateCost(){
        let id:HTMLButtonElement =document.querySelector('#editcost');
        let idtoedit =id.value;
        let editInput:HTMLInputElement = document.querySelector('#costvalue-edit')
        let editNameInput:HTMLInputElement = document.querySelector('#costname-edit')


         //Weryfikacja inputów
         if(editInput.value==null||editInput.value==''){document.querySelector('.alert-zone-cost-edit').innerHTML='Provide Cost Prize'; }
         else if(editNameInput.value==null||editNameInput.value==''){document.querySelector('.alert-zone-cost-edit').innerHTML='Provide Cost Name'; }
        else {

            const data = new FormData();
        data.append("name", `${editNameInput.value}`);
        data.append("costValue", `${editInput.value}`);

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
        console.log(this.responseText);
        }
        });

        xhr.open("PATCH", `http://localhost:5000/costs/${idtoedit}`);

        xhr.send(data);

        setTimeout( ()=>window.location.reload(),2000);

        }

        

}


/////////////////////////////////////TABLE ZONE//////////////////////////////////////

async getTables(): Promise<any> {
    const tableUrl = `http://localhost:5000/pooltables`;
    const tableResponse = await fetch(tableUrl);
    const tableData = await tableResponse.json();
    return tableData;
}


async proceedTable () {

    let tablePane = document.querySelector('.tablefieldset');
    tablePane.innerHTML='';

    let schedule =document.querySelector('.schedule');
    schedule.innerHTML=' <div class="hour-line"> <div class="hourbox"></div><div class="hourbox">10:00</div><div class="hourbox">11:00</div><div class="hourbox">12:00</div><div class="hourbox">13:00</div><div class="hourbox">14:00</div><div class="hourbox">15:00</div><div class="hourbox">16:00</div><div class="hourbox">17:00</div><div class="hourbox">18:00</div><div class="hourbox">19:00</div><div class="hourbox">20:00</div><div class="hourbox">21:00</div><div class="hourbox">22:00</div><div class="hourbox">23:00</div><div class="hourbox">24:00</div>';

    const table = await this.getTables();
    
    for(let i=0;i<table.length;i++)
    {
        let obj;
        obj=table[i];


        let name = obj.name;
        let id =obj.id;
        let desc=obj.description;
        let assignedCost=obj.costId

        let main:Table = new Table(desc,name,id,assignedCost);

        console.log(main);

        this.renderTable(main);
    }
    
    
}

renderTable(Table:Table){

    let tablePane = document.querySelector('.tablefieldset');
      
    let tableslist =document.querySelector('#tablelist');
        tableslist.innerHTML +=`<option value="${Table.tableID}" label="${Table.tableName}">`;
        let tableslistEdit =document.querySelector('#tablelist-edit');
        tableslistEdit.innerHTML +=`<option value="${Table.tableID}" label="${Table.tableName}">`;
    
    //CostName
    
    this.getCostName(Table.assignedCost, Table.tableID);
    
    

    
    

    let tableToAdd =document.createElement('div');
    tableToAdd.setAttribute('class','singleTable')
    tableToAdd.setAttribute('id',`${Table.tableID}`)
    tableToAdd.innerHTML=`<div class='tableName'>${Table.tableName}</div><br><div class='tablecost tablecost-${Table.tableID}'>Cost Type:</div> <div class='tableright'>${Table.tableDesc}  <button type="button" id='edit-${Table.tableID}' class="login-button">E</button><button type="button" id='del-${Table.tableID}' class="login-button">&times</button></div>`
    tablePane.appendChild(tableToAdd);

    //Tables in schedule

    let schedule =document.querySelector('.schedule');
    let tableInSchedule =document.createElement('div');
    tableInSchedule.setAttribute('class','table-schedule');
    tableInSchedule.innerHTML=`<div class="hourbox">${Table.tableName}</div><div class="reservbox" id="10-${Table.tableID}"></div><div class="reservbox" id="11-${Table.tableID}"></div><div class="reservbox" id="12-${Table.tableID}"></div><div class="reservbox" id="13-${Table.tableID}"></div><div class="reservbox" id="14-${Table.tableID}"></div><div class="reservbox" id="15-${Table.tableID}"></div><div class="reservbox" id="16-${Table.tableID}"></div><div class="reservbox" id="17-${Table.tableID}"></div><div class="reservbox" id="18-${Table.tableID}"></div><div class="reservbox" id="19-${Table.tableID}"></div><div class="reservbox" id="20-${Table.tableID}"></div><div class="reservbox" id="21-${Table.tableID}"></div><div class="reservbox" id="22-${Table.tableID}"></div><div class="reservbox" id="23-${Table.tableID}"></div><div class="reservbox" id="00-${Table.tableID}"></div>`
    schedule.appendChild(tableInSchedule);
    //end 

    let deleteButton:HTMLButtonElement= document.querySelector(`#del-${Table.tableID}`);
    deleteButton.addEventListener('click', ()=> this.deleteTable(Table.tableID));

    let editButton:HTMLButtonElement =document.querySelector(`#edit-${Table.tableID}`);
    let editTableContent = document.querySelector('.table-edit');
    editButton.onclick = function(){
        editTableContent.classList.add('active');
        let editDescInput:HTMLInputElement = document.querySelector('#tabledesc-edit')
        editDescInput.value = Table.tableDesc;
        let editNameInput:HTMLInputElement = document.querySelector('#tablename-edit');
        editNameInput.value =Table.tableName;
        //let editAssignedCost:HTMLInputElement =document.querySelector('#assignedcost-edit');
        //editAssignedCost.value =Table.assignedCost;
        let tableContent:HTMLButtonElement = document.querySelector('#edittable');
        tableContent.value = Table.tableID;
        
         }

         let editTableButton:HTMLButtonElement = document.querySelector(`#edittable`);
         editTableButton.addEventListener('click',()=> this.updateTable());
       

    let closeReserv :HTMLButtonElement = document.querySelector('.close-table-edit')
    closeReserv.onclick = function(){editTableContent.classList.remove('active')}

}

addTable(){
    
        this.tableName = document.querySelector('#tablename');
        this.tableDesc =document.querySelector('#tabledesc');
        this.tableAssignedCost =document.querySelector('#assignedcost');

        let newTableName =this.tableName.value;
        let newTableDesc = this.tableDesc.value;
        let newTableAssignedCost = this.tableAssignedCost.value;

        //Weryfikacja inputów
        if(newTableName==null||newTableName==''||newTableAssignedCost==null ||newTableAssignedCost==''){document.querySelector('.alert-zone-table').innerHTML='Name and Cost fields cannot be empty'; }
        
        else{
        
        console.log(newTableAssignedCost);

        const data = new FormData();
        data.append("name", `${newTableName}`);
        data.append("description", `${newTableDesc}`);
        data.append("costGuid", `${newTableAssignedCost}`);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("POST", "http://localhost:5000/pooltables");
        
        xhr.send(data);

        setTimeout( ()=>window.location.reload(),2000);
        }
}


deleteTable(id:string){
    let idtodelete =id;

        const data :any= null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
    });

    xhr.open("DELETE", `http://localhost:5000/pooltables/${idtodelete}`);

    xhr.send(data);
    
    setTimeout( ()=>window.location.reload(),2000);
    

    }


    updateTable(){
        let id:HTMLButtonElement =document.querySelector('#edittable');
        let idtoedit =id.value;
        let editDescInput:HTMLInputElement = document.querySelector('#tabledesc-edit')
        let editNameInput:HTMLInputElement = document.querySelector('#tablename-edit')
        let editAssignedCost:HTMLInputElement = document.querySelector('#assignedcost-edit');
        //weryfikacja inputow
        if(editNameInput.value==null||editNameInput.value==''||editAssignedCost.value==null ||editAssignedCost.value==''){document.querySelector('.alert-zone-table-edit').innerHTML='Name and Cost fields cannot be empty'; }
        
        else{
        const data = new FormData();
    data.append("name", `${editNameInput.value}`);
    data.append("description", `${editDescInput.value}`);
    data.append("costId", `${editAssignedCost.value}`);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("PATCH", `http://localhost:5000/pooltables/${idtoedit}`);

xhr.send(data);

setTimeout( ()=>window.location.reload(),2000);
        }

}

/////////////////////////////////////Reservation ZONE//////////////////////////////////////

async getReservations(): Promise<any> {
    const reservationsUrl = `http://localhost:5000/reservations`;
    const reservationResponse = await fetch(reservationsUrl);
    const reservationData = await reservationResponse.json();
    return reservationData;
}

async proceedReservations () {

    
    const table = await this.getReservations();
    
    for(let i=0;i<table.length;i++)
    {
        let obj;
        obj=table[i];

        console.log(obj);

        let id =obj.reservationId;
        let name = obj.reservationBookerName;
        let email=obj.reservationBookerEmail;
        let phonet=obj.reservationBookerPhoneNumber;
        let reservationDate= obj.reservationStartDate;
        let start=obj.reservationStartDate;
        let end=obj.reservationEndDate;
        let tableID=obj.tableId;
        let tableName=obj.tableName;
        let costPrize=obj.costValue;


        let starttime = start.substring(11,13);
        let endtime =end.substring(11,13);
        
        let main:Reservation = new Reservation(id,name,email,phonet,reservationDate,starttime,endtime,tableID,tableName,costPrize);

        console.log(main);

        this.renderReservation(main);
    }

}

renderReservation(res:Reservation){

    let reservationPlace = document.querySelector(`[id='${res.starthour}-${res.tableID}']`);
    let div = document.createElement('div');
    div.className ='booked';
    div.setAttribute('id',`res-${res.reservationID}`);
    div.innerHTML=`<div class="booked-top">${res.bookerName}</div> <div class="booked-bottom"><button class='' id='view-${res.reservationID}'>O</button><button class='' id='edit-${res.reservationID}'>E</button><button class='' id='del-${res.reservationID}'>X</button></div>`;
    reservationPlace.appendChild(div);
   // reservationPlace.innerHTML=`<div class='booked' id='res-${res.reservationID}'>${res.bookerName}</div>`;
      
   
    let editButton:HTMLButtonElement =document.querySelector(`#edit-${res.reservationID}`);
    let overviewButton:HTMLButtonElement =document.querySelector(`#view-${res.reservationID}`) ;
    let overwiewContent = document.querySelector('.overview');
    let editResContent = document.querySelector('.resDetails');
       editButton.onclick = function(){
             editResContent.classList.add('active');
             let editNameInput:HTMLInputElement = document.querySelector('#bookertname-edit');
            editNameInput.value =res.bookerName;
             let emailInput:HTMLInputElement = document.querySelector('#email-edit')
             emailInput.value = res.email;
             let phoneInput:HTMLInputElement = document.querySelector('#phonenumber-edit')
             phoneInput.value = res.phoneNumber;
             let tableInput:HTMLInputElement =document.querySelector('#assignedtable-edit');
             tableInput.value = res.tableID;
            
            let resContent:HTMLButtonElement = document.querySelector('#editreservation');
            resContent.value = res.reservationID;
            
             }
             //OVERWIEW
            overviewButton.onclick =function(){
                overwiewContent.classList.add('active');
                document.querySelector('.nameofbooker').textContent=`${res.bookerName}`;
                document.querySelector('.phonetel').textContent=`${res.phoneNumber}`;
                document.querySelector('.maila').textContent=`${res.email}`;
                document.querySelector('.st').textContent=`${res.starthour}:00`;
                document.querySelector('.nd').textContent=`${res.endhour}:00`;
                document.querySelector('.money').textContent=`${res.cost} zł`;
                document.querySelector('.resdate').textContent=`${res.reservationDate}`;
            } 
             let edicResButton:HTMLButtonElement = document.querySelector(`#editreservation`);
             edicResButton.addEventListener('click',()=> this.updateReservation());

    
    
     let deleteResButton:HTMLButtonElement = document.querySelector(`#del-${res.reservationID}`);
     deleteResButton.addEventListener('click',()=> this.deleteReservation(res.reservationID));

     let closeReserv :HTMLButtonElement = document.querySelector('.close-resDetails')
     closeReserv.onclick = function(){editResContent.classList.remove('active')}
     let closeov :HTMLButtonElement = document.querySelector('.close-overview')
     closeov.onclick = function(){overwiewContent.classList.remove('active')}

        

        }

        addReservation(){
    
                this.bookerName = document.querySelector('#bookertname');
                this.resemail =document.querySelector('#email');
                this.resphoneNumber =document.querySelector('#phonenumber');
                this.assignedtableID =document.querySelector('#assignedtable');
                this.starthour =document.querySelector('#starthours');
                this.endhour =document.querySelector('#stophours');
        
                let newBookerName = this.bookerName.value;
                let newResEmail = this.resemail.value;
                let newResPhoneNumber = this.resphoneNumber.value;
                let newResAssignedTable =this.assignedtableID.value;
                let newStart =this.starthour.value;
                let newEnd= this.endhour.value;

                if(newBookerName==null||newBookerName==''||newResEmail==null ||newResEmail==''||newResAssignedTable==null||newResAssignedTable==''||newStart==null||newStart==''||newEnd==null||newEnd==''){document.querySelector('.alert-zone-reservation').innerHTML='All fields have to be filled'; }
        
        else{
        
                const data = new FormData();
                data.append("poolTableId", `${newResAssignedTable}`);
                data.append("bookerName", `${newBookerName}`);
                data.append("email", `${newResEmail}`);
                data.append("phoneNumber", `${newResPhoneNumber}`);
                data.append("startDate", `${this.addResDate} ${newStart}:00:00`);
                data.append("endDate", `${this.addResDate} ${newEnd}:00:00`);

                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                
                xhr.addEventListener("readystatechange", function () {
                  if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                  }
                });
                
                xhr.open("POST", "http://localhost:5000/reservations");
                
                xhr.send(data);
        
                window.location.reload();
        }
        }

        deleteReservation(id:string){
            let idtodelete =id;
        
                const data :any= null;
        
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
        
            xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log(this.responseText);
          }
            });
        
            xhr.open("DELETE", `http://localhost:5000/reservations/${idtodelete}`);
        
            xhr.send(data);
            
            setTimeout( ()=>window.location.reload(),1000);
            
        
            }

            updateReservation(){
                let id:HTMLButtonElement =document.querySelector('#editreservation');
                let idtoedit =id.value;
                let bookerame:HTMLInputElement =document.querySelector('#bookertname-edit');
                let editBookerName = bookerame.value;
                let edemail:HTMLInputElement =document.querySelector('#email-edit');
                let editResEmail = edemail.value;
                let edephone:HTMLInputElement =document.querySelector('#phonenumber-edit');
                let editResPhoneNumber = edephone.value;
                let edtable:HTMLInputElement =document.querySelector('#assignedtable-edit');
                let newResAssignedTable =edtable.value;
                let edstart:HTMLInputElement =document.querySelector('#starthours-edit');
                let editStart =edstart.value;
                let edend:HTMLInputElement =document.querySelector('#stophours-edit');
                let editEnd= edend.value;

                if(editBookerName==null||editBookerName==''||editResEmail==null ||editResEmail==''||newResAssignedTable==null||newResAssignedTable==''||editStart==null||editStart==''||editEnd==null||editEnd==''){document.querySelector('.alert-zone-reservation-edit').innerHTML='All fields have to be filled'; }
                else{
                const data = new FormData();
                data.append("poolTableId", `${newResAssignedTable}`);
                data.append("bookerName", `${editBookerName}`);
                data.append("email", `${editResEmail}`);
                data.append("phoneNumber", `${editResPhoneNumber}`);
                data.append("startDate", `${this.addResDate} ${editStart}:00:00`);
                data.append("endDate", `${this.addResDate} ${editEnd}:00:00`);
        
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
        
            xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("PATCH", `http://localhost:5000/reservations/${idtoedit}`);
        
        xhr.send(data);
        
        setTimeout( ()=>window.location.reload(),2000);
        //
    }
        
        
        }

}