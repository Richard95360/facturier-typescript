import { hasPrint } from "../interfaces/hasPrint.js";

export class Print implements hasPrint {

    constructor(private el:HTMLDivElement){

    }
    print(){
      document.body.innerHTML =  this.el.innerHTML;
      window.print();
      document.location.reload();
    }
    
}