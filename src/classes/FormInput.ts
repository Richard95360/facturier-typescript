import {Datas} from '../classes/Datas'
import { hasHtmlFormat } from '../interfaces/hasHtmlFormat';
import { hasPrint } from '../interfaces/hasPrint';
import { hasRender } from '../interfaces/hasRender';
import { Display } from './Display';
import { Print } from './Print';
import { bind } from '../decorators/bind';


export class FormInput {

    form: HTMLFormElement;
    type:HTMLSelectElement;
    firstName:HTMLInputElement;
    lastName:HTMLInputElement;
    address:HTMLInputElement;
    country:HTMLInputElement;
    town:HTMLInputElement;
    zip:HTMLInputElement;
    product:HTMLInputElement;
    price:HTMLInputElement;
    quantity:HTMLInputElement;
    tva:HTMLInputElement;

    docContainer:HTMLDivElement;
    hiddenDiv:HTMLDivElement;
    storedEl:HTMLDivElement

    btnPrint:HTMLButtonElement;
    btnReload:HTMLButtonElement;
    btnStoredInvoices:HTMLButtonElement;
    btnStoredEstimates:HTMLButtonElement;



    constructor(){

         this.form = document.getElementById('form') as HTMLFormElement;
         this.type = document.getElementById('type') as HTMLSelectElement;
         this.firstName = document.getElementById('firstName') as HTMLInputElement;
         this.lastName = document.getElementById('lastName') as HTMLInputElement;
         this.address = document.getElementById('address') as HTMLInputElement;
         this.country = document.getElementById('country') as HTMLInputElement;
         this.town = document.getElementById('town') as HTMLInputElement;
         this.zip = document.getElementById('zip') as HTMLInputElement;
         this.product = document.getElementById('product') as HTMLInputElement;
         this.price = document.getElementById('price') as HTMLInputElement;
         this.quantity = document.getElementById('quantity') as HTMLInputElement;
         this.tva = document.getElementById('tva') as HTMLInputElement;

         this.docContainer = document.getElementById('document-container')as HTMLDivElement
         this.hiddenDiv = document.getElementById('hiddenDiv')as HTMLDivElement
         this.storedEl =document.getElementById('stored-data')as HTMLDivElement

         this.btnPrint = document.getElementById('print') as HTMLButtonElement
         this.btnReload = document.getElementById('reload') as HTMLButtonElement
         this.btnStoredInvoices = document.getElementById('stored-invoices') as HTMLButtonElement
         this.btnStoredEstimates = document.getElementById('stored-estimates') as HTMLButtonElement

         this.submitFormListener()
         this.printListener(this.btnPrint,this.docContainer);
         this.deleteListener(this.btnReload);
         this.getStoredDocsListener();

         
    }
    //Listener
    private submitFormListener():void {
        this.form.addEventListener('submit', this.handleFormSubmit )
    }

    private printListener(btn:HTMLButtonElement, docContainer:HTMLDivElement):void {
        btn.addEventListener('click', (e:Event) => {
           let aviableDoc: hasPrint;
           aviableDoc = new Print(docContainer);
           aviableDoc.print()
        })
    }

    private deleteListener(btn:HTMLButtonElement):void {
        btn.addEventListener('click' , ()=> {
            document.location.reload();
            window.scrollTo(0,0);
        })
    }
    private getStoredDocsListener():void {
        this.btnStoredInvoices.addEventListener('click',() => this.getItems('invoice'));
        this.btnStoredEstimates.addEventListener('click',() => this.getItems('estimate'))
    }

    private getItems(docType: string){
        console.log(this);
        
        if(this.storedEl.hasChildNodes()){
            this.storedEl.innerHTML = "";
        }
        if(localStorage.getItem(docType)){
            let array: string | null;
            array = localStorage.getItem(docType);

            if(array !== null && array.length > 2){
                let arrayData:string[];
                arrayData = JSON.parse(array)

                arrayData.map((doc:string):void => {
                    let card:HTMLDivElement = document.createElement('div');
                    let cardBody:HTMLDivElement = document.createElement('div');
                    let cardClasses:Array<string> = ['card','mt-5'];
                    let cardBodyClasses:string = 'card-body';
                    card.classList.add(...cardClasses)
                    cardBody.classList.add(cardBodyClasses)

                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedEl.append(card);
                })
            }else{

                this.storedEl.innerHTML = '<div class="p-5">Aucune data disponible !</div>'
            }

        }
    }
    @bind
    private handleFormSubmit(e:Event) {
          e.preventDefault();
          
      const inputs =  this.inputData()

      if(Array.isArray(inputs)){
          const [type, firstName, lastName, address,country,town, zip, product, price,quantity,tva] = inputs

         
          let docData: hasHtmlFormat;
          let date:Date = new Date();
          
         docData = new Datas(type, firstName, lastName, address,country,town, zip, product, price,quantity,tva,date);

          let template:hasRender

          template = new Display(this.docContainer, this.hiddenDiv,this.btnPrint)
          template.render(docData,type);
         
      }

    }

    private inputData():[string, string, string, string,string, string,number, string, number,number,number] | void {
        
         const type = this.type.value 
         const firstName = this.firstName.value
         const lastName=  this.lastName.value 
         const address =this.address.value 
         const country = this.country.value
         const town = this.town.value 
         const zip = this.zip.valueAsNumber 
         const product = this.product.value
         const price = this.price.valueAsNumber
         const quantity =this.quantity.valueAsNumber
         const tva = this.tva.valueAsNumber
         
         if( zip > 0 && price > 0 && quantity >0 && tva > 0){
             
             return [type, firstName, lastName, address,country,town, zip, product, price,quantity,tva]
            
         }else {
             alert("Les valeurs num??riques doivent ??tre > 0 !")
             return ;
         }

        
    }
}