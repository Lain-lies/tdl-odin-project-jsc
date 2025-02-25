const tab = {
    
    activeTab : 0,
    defaultTabCount : 3,
    dataList : [[], [], []]

};

function createTask (name, description) {return {name, description};}

function tabFetchDom(){
    
    tab.parent = document.querySelector("nav");
    tab.buttonList = [...document.querySelectorAll("nav button:not(#add)")];
    tab.addButton = document.querySelector("#add");
    
    tabBindDefaults();
}

function tabBindDefaults(){
    
    tab.addButton.addEventListener("click", tabCreate);
    tab.buttonList.forEach(button => button.addEventListener("click", tabSwitchDefault)); 

}

function tabSwitchDefault(event){

    tab.activeTab = tab.buttonList.indexOf(event.target);
    console.log(`active tab : ${tab.activeTab}`);
}

function tabCreate(){

    const newTab = document.createElement("button");
    newTab.textContent = "Sample";

    newTab.addEventListener("click", tabSwitchDefault);
    tab.parent.appendChild(newTab);
    tab.buttonList.push(newTab);
    tab.dataList.push([]);

}

function init(){

    tabFetchDom();
}

export function tabFetchNewTask(newTask){
    
    tab.dataList[tab.activeTab].push(createTask(...newTask));
    console.table(tab.dataList);
    
}

init();
