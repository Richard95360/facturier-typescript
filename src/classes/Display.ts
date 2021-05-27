import { hasRender } from '../interfaces/hasRender';
import { hasHtmlFormat } from '../interfaces/hasHtmlFormat';
import { Storage } from './Storage';


export class Display implements hasRender  {

    formContainer:HTMLDivElement;

    constructor(
        private container:HTMLDivElement,
        private hiddenDiv:HTMLDivElement,
        private btnPrint:HTMLButtonElement
        
        
        ){
        this.formContainer = document.getElementById('form-container') as HTMLDivElement;
    }

  render(docObj:hasHtmlFormat,docType:string){
      const htmlString : string = docObj.htmlFormat()
      this.container.innerHTML = htmlString;

      new Storage(docType,htmlString);
      
      if(docType === 'invoice'){
            this.btnPrint.innerText = 'Imprimer la facture';
      }else {
        this.btnPrint.innerText = 'Imprimer le devis';
      }

      this.hiddenDiv.classList.remove('invisible');
      this.formContainer.innerHTML ="";

  }
}