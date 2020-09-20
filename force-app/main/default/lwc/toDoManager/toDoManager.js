import { LightningElement,track } from 'lwc';
import addTask from '@salesforce/apex/toDoController.addTodo';
import getCurrentTodos from '@salesforce/apex/toDoController.getCurrentTodos'

export default class ToDoManager extends LightningElement {
    @track time;
    @track greetings;
    @track tasks=[];
    connectedCallback(){
        this.getTime();
        this.fetchToDo();
        setInterval(() => {
            this.getTime();
        }, 1000);
    }
    

    getTime(){
        const date=new Date();
        const hour=date.getHours();
        const min=date.getMinutes();
        this.time=`${this.getHours(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;
        this.setGreetings(hour);
        
    }
    getHours(hour){
        return (hour===0? 12:hour>12? (hour-12):hour);
    }
    getMidDay(hour){
        return hour<12?"AM":"PM";
    }
    getDoubleDigit(min){
        
           let n = String(min)
            if (n.length == 1)
            {
              n = '0' + n
            return n;
            }

          return n;
    }
    setGreetings(hour){
        if(hour<12){
            this.greetings='Good Morning';
        }else if(hour>=12){
            this.greetings="Good Afternoon";
        }else{
            this.greetings="Good Evening";
        }
    }
    addTaskHandler(){
        const input=this.template.querySelector('lightning-input');
        
        if(input){
            let taskObj={
                value:input.value,
                done:false
            } 
            console.log("data sending--"+JSON.stringify(taskObj));   
            addTask({payload:JSON.stringify(taskObj)}).then(response =>{
                console.log("data inserted");
                this.fetchToDo();
            }).catch(error=>{
                console.log("error --"+ JSON.stringify(error));
            })
           // this.tasks.push(taskObj);
           // console.log(input.value);
            input.value="";
        }
    }
    fetchToDo(){
        getCurrentTodos().then(result=>{
            console.log("fetch todo-"+JSON.stringify(result));
            if(result){
                console.log("fetch call--"+ JSON.stringify(result));
            this.tasks =  result;
            }
        }).catch(error=>{
            console.log("error--"+error);
        })
    }
    get upcomingTask(){
        return this.tasks && this.tasks.length ? this.tasks.filter(task=>!task.done):[];
    }
    get completedTask(){
        return this.tasks && this.tasks.length ? this.tasks.filter(task=>task.done):[];
    }
    handleUpdate(){
        this.fetchToDo();
    }
    handledelete(){
        this.fetchToDo();
    }
}