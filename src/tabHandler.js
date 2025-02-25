const tab = {
    
    activeTab : 1,
    defaultTabCount: 3,

    dataList : [

        [
            ["TestName1", "TestDescription1"],
            ["TestName2", "TestDescription2"],
        ],

        [
            ["TestName3", "TestDescription3"],
            ["TestName4", "TestDescription4"],
        ],

        [
            ["TestName5", "TestDescription5"],
            ["TestName6", "TestDescription6"],
        ],

    ],

    DOMList : [],

};

function tabFetchDom(){
    
    tab.parent = document.querySelector("nav");
    tab.defaultButtons = [...document.querySelectorAll("nav button:not(#add)")];
    tab.addButton = document.querySelector("#add");

    
}

function tabBindDefaults(){
    
    tab.addButton.addEventListener("click", tabCreate);
    
    for(let i = 0; i < tab.defaultTabCount; i++){
        
        tab.defaultButtons[i].addEventListener("click", tabSwitchDefault);
    }
}

function tabCreate(){

    const newTab = document.createElement("button");
    newTab.textContent = "Sample";
    tab.parent.appendChild(newTab);
    tab.DOMList.push(newTab);

    console.log(tab.DOMList);
}

function tabINIT(){

    tabFetchDom();
    tabBindDefaults();

}

export function tabFetchNewTask(newTask){
    
    tab.dataList.push(newTask);
    console.table(tab.dataList);
}


export{tabINIT, tabCreate};
