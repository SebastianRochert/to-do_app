let startTime:number = 0.0;
let getTime: number = 0.0;
let deleteTime:number = 0.0;
let testGetTime: number = 0.0;
let testCreateTime: number = 0.0;

export function setStartTime(newStartTime: number) {
    startTime = newStartTime;
}
export function getStartTime() {
    return startTime;
}

export function setGetTime(newGetTime: number) {
    getTime = newGetTime;
}
export function getGetTime() {
    return getTime;
}

export function setDeleteTime(newDeleteTime: number) {
    deleteTime = newDeleteTime;
}
export function getDeleteTime() {
    return deleteTime;
}

export function setTestGetTime(newTestGetTime: number) {
    testGetTime = newTestGetTime;
}

export function getTestGetTime() {
    return testGetTime;
}

export function setTestCreateTime(newTestCreateTime: number) {
    testCreateTime = newTestCreateTime;
}

export function getTestCreateTime() {
    return testCreateTime;
}