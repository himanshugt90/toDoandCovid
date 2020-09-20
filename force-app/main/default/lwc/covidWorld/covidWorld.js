import { LightningElement,api,track } from 'lwc';
const columns = [
    { label: 'Country', fieldName: 'country',cellAttributes: { class: { fieldName: 'headCSSClass' }}},
    { label: 'Cases', fieldName: 'cases',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
    { label: 'Recovered', fieldName: 'recovered',cellAttributes: { class: { fieldName: 'greenCSSClass' }}},
    { label: 'Death', fieldName: 'deaths',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
    { label: 'Active Cases', fieldName: 'active',cellAttributes: { class: { fieldName: 'redCSSClass' }}},
];
export default class CovidWorld extends LightningElement {
    @api worldData;
    columns=columns;
 
    

    
}