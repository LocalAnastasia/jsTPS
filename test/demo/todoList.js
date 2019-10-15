'use strict'

class todoList {

    constructor(key, name, owner, todoItems) {
        this.key = key;
        this.name = name;
        this.owner = owner;
        this.todoItems = todoItems;
    }

    setKey(newKey) {
        this.key = newKey;
    }

    getKey() {
        return this.key;
    }

    setName(newName) {
        this.name = newName;
    }

    getName() {
        return this.name
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    getOwner() {
        return this.owner;
    }

    setTodoItems(newTodoItems) {
        this.todoItems = newTodoItems;
    }

    getTodoItems() {
        return this.todoItems;
    }

    // TODOITEM OPERATIONS
    setItem(key, newItem) {
        this.todoItems[key] = newItem;
    }

    getItem(key) {
        return this.todoItems[key];
    }

    setDescription(key, newDescription) {
        this.todoItems[key].setDescription(newDescription);
    }

    getDescription(key) {
        return this.todoItems[key].getDescription();
    }

    setAssignedTo(key, newAssignedTo) {
        this.todoItems[key].setAssignedTo(newAssignedTo);
    }

    getAssignedTo(key) {
        return this.todoItems[key].getAssignedTo();
    }

    setDueDate(key, newDueDate) {
        this.todoItems[key].setDueDate(newDueDate);
    }

    getDueDate(key) {
        return this.todoItems[key].getDueDate();
    }

    setCompleted(key, newCompleted) {
        this.todoItems[key].setCompleted(newCompleted);
    }

    getCompleted(key) {
        return this.todoItems[key].getCompleted();
    }
}