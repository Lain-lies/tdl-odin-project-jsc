
const dbState = {
    
    operation : false,
    loadCount : 3,
}

export function dbUpdateLoadCount(){
    
    dbState.loadCount++;

    console.log(`Load Count: ${dbState.loadCount}`);
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

