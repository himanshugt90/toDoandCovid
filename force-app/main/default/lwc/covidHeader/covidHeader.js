import { LightningElement,track } from 'lwc';
import CovidDoc from '@salesforce/resourceUrl/CovidDoc';
export default class CovidHeader extends LightningElement {
    
    @track headerImage = CovidDoc+'/CovidDoc/header.jpg';
connectedCallback(){
    console.log("url0---"+ this.headerImage);
}
}