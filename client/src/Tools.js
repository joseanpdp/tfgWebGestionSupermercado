function isEmptyString(thing) {
    return thing.trim() == "";
}

function isPositiveIntegerString(thing) {
    return /^\d+$/.test(thing);
}

function isPositiveNumberString(thing) {
    return /^\d+(?:\.\d+)?$/.test(thing);
}

///////////////////////////////////////////////////////////////////////////

function today() {
    const d = new Date();
    const rfc3339 = d.getFullYear() 
                   + "-" + String(d.getMonth()).padStart(2,"0") 
                   + "-" + String(d.getDate()).padStart(2,"0");
    return rfc3339;
}

///////////////////////////////////////////////////////////////////////////

async function sleep(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}

///////////////////////////////////////////////////////////////////////////

export { isEmptyString, isPositiveIntegerString, isPositiveNumberString,
         today, sleep };
