export class Table{

    
    tableName:string
    tableDesc:string
    tableID:string
    assignedCost:string

    constructor(tableDesc:string,name:string,id:string,assigned:string) {
        
        this.tableName=name;
        this.tableDesc=tableDesc;
        this.tableID=id;
        this.assignedCost=assigned;
       
    }


}