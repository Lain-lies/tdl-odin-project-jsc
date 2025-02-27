
const dbState = {
    
    loadCount : 3,
}

export function dbFetchLoadCount(){
    
    
    return dbState.loadCount;

}

export function dbLoadAll(key){


    return JSON.parse(localStorage.getItem(`${key}`));

}

export function dbSync(key, value){

    console.log(`key: ${key}, value: ${value}`);
    localStorage.setItem(`${key}`, JSON.stringify(value));
    
}

export function dbSyncLoadCount(){

    dbState.loadCount++;
    localStorage.setItem("load", JSON.stringify(dbState.loadCount));

}

export function dbINIT(){

    
    const load = JSON.parse(localStorage.getItem("load"));

    // If on initial state or OOB
    if(load !== null) dbState.loadCount = load; 


}


