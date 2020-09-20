import { LightningElement,track } from 'lwc';
import getAllTodos from '@salesforce/apex/toDoController.getAllTodos'
export default class ToDoListView extends LightningElement {
    @track tasks=[];

    connectedCallback(){
       this.fetchAllTask();
    }
    fetchAllTask(){
        getAllTodos().then(result=>{
            console.log("all tasks have been fetched from last 7 days");
            
                this.computeTaskValue(result);
            
        }).catch(error=>{
            console.log("error--"+ JSON.stringify(error))
        })

    }
    computeTaskValue(result){
        console.log("test--")
        let todoWrap=new Map();
        const toDoList=[];
        result.forEach((todo) => {
            if(!todoWrap.has(todo.todoDate)){
                todoWrap.set(todo.todoDate,[]);
            }
            todoWrap.get(todo.todoDate).push(todo);
            console.log("test2");
        });
        for(let key of todoWrap.keys()){
            console.log("test3");
            const todoItem = { date: key, items: todoWrap.get(key) };
            toDoList.push(todoItem);
            console.log("test4");

        }
        console.log("test5");

        if(toDoList){
            console.log("test6");

        this.tasks=toDoList;
        }

        console.log("tasks--"+JSON.stringify(this.tasks));
    }
}