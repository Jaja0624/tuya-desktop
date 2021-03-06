export function getRoomById(rooms, roomId) {
    return rooms.find(room => room.id === roomId)
}

export function getRoomByDeviceId(rooms, deviceId) {
    return rooms.find(room => room.devices.find(device => device.id === deviceId))
}

export function getDeviceById(rooms, deviceId) {
    const room = rooms.find(room => room.devices.find(device => device.id === deviceId))
    if (room) {
        return room.devices.find(device => device.id === deviceId)
    }
}

export function getAllDevices(rooms) {
    devices = []
    for (room of rooms) {
        for (device of rooms.devices)
        devices.push_back(device)
    }
    return devices
}