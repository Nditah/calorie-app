
export function toObjectId(baseId = '5951bc91860d8b5ba', mysqlId = 1) {
    const oldId = mysqlId.toString(10);
    const a = '0'.repeat(7 - oldId.length);
    return baseId + a + oldId;
}

export function pmtName(mysqlId) {
    if (mysqlId) {
        const oldId = mysqlId.toString(10);
        const a = '0'.repeat(4 - oldId.length);
        return a + oldId;
    }
    return mysqlId;
}

export function timestamp() {
    return `${new Date().toISOString().slice(0, 22)}Z`;
    //   return new Date().toISOString().slice(0, 19).replace("T", " ")+"Z";
}

export function dateDaysAgo(since = 0) {
    const today = new Date();
    today.setDate(today.getDate() - since);
    return today.toISOString();
}

export function randomNum() {
    return Math.floor(Math.random() * 1000000);
}

export function cloneObject(model, source) {
    return Object.assign(model, source);
}

/**
 * @description getObjectByKey returns the object from an Array of
 * Objects that has the key with a given value or undefined!
 * @param {Array} arrayObject Array of Objects
 * @param {String} key Object key could be a String or Integer
 * @param {String} value Object value could be a String or Integer
 */
export function getObjectByKey(arrayObject, key, value) {
    return arrayObject.find(obj => obj[ key ] === value);
}


/**
 * @description addToArrayOfObjects add a new object item to an array of objects
 * @param {Object} arrayOfObjects the array of object
 * @param {Number} limit maximum number of objects the array should not exceed
 * @param {Object} newObjectElement the new item to be added to the array of objects
 * @returns {Object} the new array of Objects
 */
export function addToArrayOfObjects(arrayOfObjects, limit, newObjectElement) {
    const size = Object.keys(arrayOfObjects).length;
    if (size < limit) {
        arrayOfObjects.push(newObjectElement);
    } else {
    // arr.splice(indexToRemove, numToRemove)
        arrayOfObjects.splice(0, 1);
        arrayOfObjects.push(newObjectElement);
    }
    return arrayOfObjects;
}

/**
 * @description getClientAccess get the Ip Address and TimeSTamp of a request object.
 * @param {String} req the request object
 * @returns {Object} { accessDate, ipAddress } access date and the ip address
 */
export function getClientAccess(req) {
    const ipAddress = req.ip || req._remoteAddress;
    // const lang = req.get("accept-language");
    const accessDate = req._startTime || '';
    return { accessDate, ipAddress };
}

export function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isObjecId(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
    return false;
}

/**
 * @returns a five-digit random number
 */
export function generateOtp() {
    const num = Math.floor(Math.random() * 90000) + 10000;
    return num;
}


export function cleanDeepObject(obj) {
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            cleanDeepObject(obj[ propName ]);
        }
    }
    return obj;
}

let depth = 0;

// eslint-disable-next-line complexity
export function cleanObject(obj) {
    depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (depth <= 3) cleanObject(obj[ propName ]);
        }
    }
    return obj;
}

export function nextDate(d = 1) {
    return new Date(new Date().setDate(new Date().getDate() + d));
}

function genString(length) {
    let text = '';
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const possible = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function daysIntoYear(date = new Date()) {
    // eslint-disable-next-line max-len
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export function genCode(len = 9) {
    let d = new Date().getFullYear().toString().substr(-2);
    d += daysIntoYear();
    if (len - d.length > 0) return d + genString(len - d.length);
    return genString(len);
}

export function hasNull(Obj) {
    const val = Object['values'](Obj);
    if (val.includes(null) || val.includes(undefined) || val.includes('')) return true;
    return false;
}

/**
 * @description Set a local storage value with expired date, if expires is not set
 * 24 hours will be set
 * @param {String} name name (key) of the local storagr value
 * @param {any} value value to associate with the name
 * @param {Number} expires number of hours that the key will be available
 */
export function setLocalStorage(name, value, expires) {
    if (expires === undefined || expires === null) {
        expires = (12*60*60*1000);
    } else {
        expires = Math.abs(expires);
    }

    const now = Date.now();
    const schedule = now + expires * 1000;
    try {
        if (typeof value === 'string' || typeof value === 'number') {
            window.localStorage.setItem(name, `${value}`);
        } else {
            window.localStorage.setItem(name, JSON.stringify(value));
        }
        window.localStorage.setItem(`${name}_expiresIn`, schedule.toString(10));
        return true;
    } catch(e) {
        console.log('Error: ' + e);
        return false;
    }
}

/**
 *
 * @param {String} name name (key) to retrieve the data set
 */
export function getLocalStorage(name) {
    const now = Date.now();

    let expiresIn = parseInt(window.localStorage.getItem(`${name}_expiresIn`), 10);
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) {
        removeLocalStorage(name);
        return null;
    } else {
        if (propsExist(name, window.localStorage)) {
            const getItem = window.localStorage.getItem(name);
            try {
                return JSON.parse(getItem);
            } catch (e) {
                return getItem;
            }
        } else {
            return false;
        }
    }
}

/**
 *
 * @param {String} name name (key) to be remove
 */
export function removeLocalStorage(name) {
    try{
        window.localStorage.removeItem(name);
        window.localStorage.removeItem(`${name}_expiresIn`);
    } catch (e) {
        console.log('Error: ', e);
        return false;
    }
    return true;
}


/**
 *
 * @param {String} name
 * @param {Object} objectData
 */
export function propsExist(name, objectData) {
    return Object.prototype.hasOwnProperty.call(objectData, name);
}


export function getSettings(arrObj: Array<any>, value: string) {
    if ( Object.keys(arrObj).length > 1 && arrObj) {
        const Obj = arrObj.find(item => item.name === value);
        const result = Obj.value;
        return result;
    }
    return null;
}

export function  formatDate(date) {
    return new Date(date).toDateString();
}

export function  formatTime(time) {
    return new Date(time).toLocaleTimeString();
}
