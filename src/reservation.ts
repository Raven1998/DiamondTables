export class Reservation{

    reservationID:string;
    bookerName:string
    email:string
    phoneNumber:string
    reservationDate:string
    starthour:string
    endhour:string
    tableID:string
    tableName:string
    cost:string

    constructor(reservationId:string,reservationName:string,email:string,phone:string,reservationDate:string,start:string,end:string,table:string,tablename:string,cost:string) {
        this.reservationID =reservationId
        this.bookerName = reservationName;
        this.email=email;
        this.phoneNumber=phone;
        this.reservationDate=reservationDate
        this.starthour =start;
        this.endhour =end;
        this.tableID=table;
        this.tableName=tablename;
        this.cost=cost;

        
       
    }


}