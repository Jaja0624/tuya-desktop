import { v4 as uuidv4 } from 'uuid';

export function makeDevice(device) {
    return {
        id: uuidv4(),
        name: device.name,
        description: device.description,
        localKey: device.localKey,
        deviceIp: device.deviceIp,

    }
}

export function makeDeviceFake() {
    return makeDevice({
        name: makeid(5),
        description: makeid(10),
        localKey: makeid(25),
        deviceIp: makeid(12)
    })
    
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
