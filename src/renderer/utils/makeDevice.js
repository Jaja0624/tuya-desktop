import { v4 as uuidv4 } from 'uuid';
const TuyaDevice = require('tuyapi')

export function makeDevice(device) {
    return {
        id: uuidv4(),
        name: device.name,
        description: device.description,
        localKey: device.localKey,
        virtualId: device.virtualId,
        status: null,
        tuyaDevice: new TuyaDevice({
            id: device.virtualId,
            key: device.localKey
        })

    }
}

export function makeDeviceFake() {
    return {
        id: uuidv4(),
        name: makeid(5),
        description: makeid(10),
        localKey: makeid(25),
        virtualId: makeid(12),
        status: null
    }
    
}

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
