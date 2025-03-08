import { tabFetchNewTask } from "./tabHandler";

const task = {};

function displayFetchDOM(){
    
    task.form = document.querySelector("form");
    task.name = document.querySelector("#task-name");
    task.description = document.querySelector("#task-description");

    displayBind(task.form);
}

function displayBind(form){
    
    form.addEventListener("submit", displayFormSubmit);

}

function displayFormSubmit(event){
    
    event.preventDefault();
    const formData = new FormData(task.form);
    const valuesFromForm = [...formData.values()];
    task.name.value = "";
    task.description.value = "";
    console.log(valuesFromForm);
    tabFetchNewTask(valuesFromForm);
    
}

export function taskAdderINIT(){

    displayFetchDOM();

}


