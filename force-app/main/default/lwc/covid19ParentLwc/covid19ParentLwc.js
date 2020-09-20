import { LightningElement,track } from 'lwc';
import getAllData from '@salesforce/apex/getDataCovid19Lwc.getAllData';
import getAllCovidData from '@salesforce/apex/getDataCovid19Lwc.getAllCovidData';
import getAllCordinate from '@salesforce/apex/getDataCovid19Lwc.getAllCordinate';
import getAllIndiaData from '@salesforce/apex/getDataCovid19Lwc.getAllIndiaData';
import getAllIndiaDistData from '@salesforce/apex/getDataCovid19Lwc.getAllIndiaDistData';
import getAllIndiaDistDailyData from '@salesforce/apex/getDataCovid19Lwc.getAllIndiaDistDailyData';
import getAllIndiaZoneData from '@salesforce/apex/getDataCovid19Lwc.getAllIndiaZoneData';

 
export default class Covid19ParentLwc extends LightningElement {
    @track AllCountryCovid=[];
    @track AllIndiaCovid=[];
    @track caseSeries=[];
    @track options=[];
  
    connectedCallback(){
        this.fetchAllData();
        this.fetchAllIndiaData();
       
    }
    fetchAllData(){
        getAllData().then(result=>{
          //  console.log("getAllData---"+JSON.stringify(result));
            let allData=result;
            for(let i in allData ){
                allData[i].headCSSClass='slds-text-heading_small';
                allData[i].redCSSClass='slds-text-color_error';
                allData[i].greenCSSClass='slds-text-color_success';
                
            }
            this.AllCountryCovid=allData;
        }).catch(error=>{
            console.log("error---"+JSON.stringify(error));
        });
    }
    fetchAllIndiaData(){
        getAllIndiaData().then(result=>{
            let items=[];
          // this.AllIndiaCovid= result.statewise;
          console.log("AllIndiaCovid---"+JSON.stringify(result.cases_time_series));
           
           this.caseSeries=result.cases_time_series;

           let dataStates=result.statewise;
           for(let i in dataStates ){
           
                let state=dataStates[i].state;
                let item={
                    "label": state,
                    "value": state
                };
                dataStates[i].headCSSClass='slds-text-heading_small';
                dataStates[i].redCSSClass='slds-text-color_error';
                dataStates[i].greenCSSClass='slds-text-color_success';
                this.AllIndiaCovid.push(dataStates[i]);
                items.push(item);
            
        }
        this.options=items;

        }).catch(error=>{
            console.log("error---"+JSON.stringify(error));
        });
    }
    
}