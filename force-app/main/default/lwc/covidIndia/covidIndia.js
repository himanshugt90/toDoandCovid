import { LightningElement,api,track } from 'lwc';
import getAllIndiaDistData from '@salesforce/apex/getDataCovid19Lwc.getAllIndiaDistData';


const columnIndia = [
    { label: 'State', fieldName: 'state',cellAttributes: { class: { fieldName: 'headCSSClass' }}},
    { label: 'Cases', fieldName: 'confirmed',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
    { label: 'Recovered', fieldName: 'recovered',cellAttributes: { class: { fieldName: 'greenCSSClass' }}},
    { label: 'Death', fieldName: 'deaths',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
    { label: 'Active Cases', fieldName: 'active',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
];
const columnsDist = [
    { label: 'District', fieldName: 'district',cellAttributes: { class: { fieldName: 'headCSSClass' }}},
    { label: 'Cases', fieldName: 'confirmed',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
    { label: 'Recovered', fieldName: 'recovered',cellAttributes: { class: { fieldName: 'greenCSSClass' }}},
    { label: 'Death', fieldName: 'deceased',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
    { label: 'Active Cases', fieldName: 'active',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
];
export default class CovidIndia extends LightningElement {
    @api indiaData;
    @api options;
    @api distData;
    @track selectedStateData;
    @api showDist;
    columnIndia=columnIndia;
    columnsDist=columnsDist;

    handleChange(event){
        let selectedOptions=event.detail.value;
        if(selectedOptions.toUpperCase()!='TOTAL'){
            this.fetchAllIndiaDistData(selectedOptions);
            this.showDist=false;
          }else{
            this.showDist=true; 
          }
        
    }
    fetchAllIndiaDistData(selectedOptions){
        getAllIndiaDistData({stateName:selectedOptions}).then(result=>{
              //console.log("selectedStateData---"+JSON.stringify(result));
              //this.selectedStateData=result;
              let dist=result;
              let makeData=[];
              for ( var key in dist) {
                makeData.push({
                    district:key,
                    active:dist[key].active,
                    confirmed:dist[key].confirmed,
                    recovered: dist[key].recovered,
                    deceased:dist[key].deceased,
                    headCSSClass:'slds-text-heading_small',
                    redCSSClass:'slds-text-color_error',
                    greenCSSClass:'slds-text-color_success'
                });
               
              }
              console.log("test--"+selectedOptions.toUpperCase())
              
              this.selectedStateData=makeData;
              
              
             // console.log(JSON.stringify(makeData))
          }).catch(error=>{
              console.log("error---"+JSON.stringify(error));
          });
    }
}