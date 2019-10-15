'use strict'

class todoItem {

    constructor(key, description, assignedTo, dueDate, completed) {
        this.key = key;
        this.description = description;
        this.assignedTo = assignedTo;
        this.dueDate = dueDate;
        this.completed = completed;
    }

    setKey(newKey) {
        this.key = key;
    }

    getKey() {
        return this.key;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getDescription() {
        return this.description;
    }

    setAssignedTo(newAssignedTo) {
        this.assignedTo = newAssignedTo;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    setCompleted(newCompleted) {
        this.completed = newCompleted;
    }

    getCompleted() {
        return this.completed;
    }

    toString() {
        var item = "Item: {";
        item += "description: " + this.description + ", ";
        item += "assigned_to: " + this.assignedTo + ", ";
        item += "due_date: " + this.dueDate + ", ";
        item += "completed: " + this.completed + "}";
        
        return item;
    }
}