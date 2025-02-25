const adder = {
    
    name : "Test",
};

function fetchDOM(){
    
    const form = document.querySelector("form");

    console.log(form);

    adder.DOM = form;
    bind(form);
}

function bind(form){
    
    form.addEventListener("submit", formSubmit);

}

function formSubmit(event){
    
    event.preventDefault();
    const formData = new FormData(adder.DOM);
    const valuesFromForm = [...formData.values()];

    console.log(valuesFromForm);
}

export function getName(){
    
    return adder.name;
}

export function init(){
    
    fetchDOM(); 
}

