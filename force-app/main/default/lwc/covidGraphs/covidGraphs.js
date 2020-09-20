import { LightningElement,api,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import CovidDoc from '@salesforce/resourceUrl/CovidDoc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import chartjs from '@salesforce/resourceUrl/chart';

export default class CovidGraphs extends LightningElement {
    //chartjs=CovidDoc+'/CovidDoc/Chart.js';
    @api chartjsInitialized = false;
    @api caseSeries;
    @track dates=[];
    @track cases=[];
    @track colors=[];
    chart;

    config = {
        type: 'line',
        data: {
            datasets: [{
                fill: false,
                label: 'Line Dataset',
                data: [{  
                    y:100,
                    x:0
                 },
                 {  
                    y:96,
                    x:10
                 },
                 {  
                    y:93,
                    x:20
                 },
                 {  
                    y:89,
                    x:30
                 },
                 {  
                    y:85,
                    x:50
                 },
                 {  
                    y:80,
                    x:60
                 },
                 {  
                    y:71,
                    x:70
                 },
                 {  
                    y:43,
                    x:80
                 },
                 {  
                    y:19,
                    x:90
                 },
                 {  
                    y:9,
                    x:100
                 },
                 {  
                    y:4,
                    x:110
                 },
                 {  
                    y:2,
                    x:120
                 },
                 {  
                    y:0,
                    x:130
                 },
                 {  
                    y: 140,
                    x:140
                 }
                 
                 ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBorderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                fill: false,
                label: 'Line Dataset 2',
                data: [{  
                    y:100,
                    x:0
                 },{  
                    y:98,
                    x:10
                 },{  
                    y:95,
                    x:20
                 },{  
                    y:92,
                    x:30
                 },{  
                    y:88,
                    x:50
                 },{  
                    y:84,
                    x:60
                 },{  
                    y:75,
                    x:70
                 },{  
                    y:50,
                    x:80
                 },{  
                    y:25,
                    x:90
                 },{  
                    y:14,
                    x:100
                 },{  
                    y:8,
                    x:110
                 },{  
                    y:5,
                    x:120
                 },{  
                    y:2,
                    x:130
                 }],
                backgroundColor: [
                    '#80aaff'
                ],
                borderColor: [
                    'blue'
                ],
                pointBackgroundColor: '#80aaff',
                pointBorderColor: 'blue'
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Sand Samples Against Comm Weight %.'
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 140,
                        stepSize: 10
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        autoSkip: true,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        stepSize: 5,
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }]
            },
        }
    };



    renderedCallback(){
        this.init();
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;
        console.log('chartjs loading');
      
    }
    init(){
      //  console.log("series--"+JSON.stringify(this.caseSeries))
        let result = this.caseSeries;
        for (var key in result){
            this.dates.push(result[key].CaseDate);
            this.cases.push(result[key].dailyconfirmed);
            this.colors.push('rgba('+(255-(parseInt(key)*2))+', 0, 22, 1)');
        }
        console.log("series--"+JSON.stringify(this.dates))

        Promise.all([
            loadScript(this,chartjs)
        ]).then(() => {
            this.Initializechartjs();
        }).catch(error => {
            
            console.log("error----"+error);
        });

    }
    
    Initializechartjs(){
        //Get the context of the canvas element we want to select
        console.log("in initi");
        const ctx = this.template.querySelector('canvas.linechart').getContext('2d');

            console.log("ctx--"+ctx);

        // this.chart = new window.Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         labels: this.dates,
        //         datasets: [{
        //             label: 'India cases timeline',
                    
        //             data: this.cases,
        //             borderColor: 'rgba(121, 159, 222, 1)',
                    
                    
        //         }]
        //     },
        //     options: {
        //         tooltips: {
                    
        //             mode: 'nearest'
        //         }
        //     }
        // });
        // console.log("chartt--"+lineChart);

        // var barChartData = {
		// 	labels: this.dates,
		// 	datasets: [{
		// 		label: 'India Cases',
		// 		backgroundColor: 'rgba(121, 159, 222, 1)',
        //         data: this.cases, 

		// 	}]
        // };

        // var dataSet = {
        //     type: 'bar',
        //     data: barChartData,
        //     options: {
        //         responsive: true,
        //         title: {
        //             display: true,
        //             text: 'Chart.js Bar Chart - Multi Axis'
        //         },
        //         tooltips: {
        //             mode: 'index',
        //             intersect: true
        //         },

        //     }
        // }
        if(ctx){
            this.chart = new Chart(ctx, this.config);
            this.chart.canvas.parentNode.style.height = '100%';
            this.chart.canvas.parentNode.style.width = '100%';
                console.log("chartt--"+lineChart);
        }
        

    }

}