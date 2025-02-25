import { tabFetchNewTask } from "./tabHandler";

const task = {};

function displayFetchDOM(){
    
    const form = document.querySelector("form");
    console.log(form);
    task.DOM = form;
    displayBind(form);
}

function displayBind(form){
    
    form.addEventListener("submit", displayFormSubmit);

}

function displayFormSubmit(event){
    
    event.preventDefault();
    const formData = new FormData(task.DOM);
    const valuesFromForm = [...formData.values()];
    
    tabFetchNewTask(valuesFromForm);
}

export function taskAdderINIT(){
    
    displayFetchDOM();

}

