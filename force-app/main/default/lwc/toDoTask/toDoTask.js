import { LightningElement,track,api } from 'lwc';
import updateTodo from '@salesforce/apex/toDoController.updateTodo';
import deleteTodo from '@salesforce/apex/toDoController.deleteTodo';
import getCurrentTodos from '@salesforce/apex/toDoController.getCurrentTodos'

export default class ToDoTask extends LightningElement {
@api task;
get changeStyle(){

    return this.task.done?"todo completed":"todo upcoming";
}
get buttonicon(){
    return this.task.done?"utility:check":"utility:add";
}
tastCompletedHandler(){
    let taskObj={
        todoId:this.task.todoId,
        value:this.task.value,
        done:!this.task.done
    }
    updateTodo({payload:JSON.stringify(taskObj)}).then(response =>{
        console.log("data updated");
        
        this.dispatchEvent(new CustomEvent("update"));
    }).catch(error=>{
        console.log("error --"+ JSON.stringify(error));
    })
}
taskRemoveHandler(){
    deleteTodo({todoId:this.task.todoId}).then(response =>{
        console.log("data deleted");
        
        this.dispatchEvent(new CustomEvent("delete"));
    }).catch(error=>{
        console.log("error --"+ JSON.stringify(error));
    })
}

}