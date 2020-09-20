import { LightningElement,api } from 'lwc';

export default class ToDoListSubCom extends LightningElement {
    @api task;
    get changeStyle()
    {
        return this.task.done?"completed":"uncomplete";
    }
}