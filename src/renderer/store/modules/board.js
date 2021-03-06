import { v4 as uuidv4 } from 'uuid';
import { makeDevice, makeDeviceFake } from '../../utils/makeDevice'
import { getRoomById, getRoomByDeviceId, getDeviceById} from '../../utils/rooms'
const TuyaDevice = require('tuyapi')
const async = require('async')
const state = {
	// rooms: [
	// 	{
	// 		id:'1',
	// 		name:'All',
	// 		devices:[]
	// 	}
	// ],
	rooms: [
		{
			id: uuidv4(),
			name:'room1',
			devices: [makeDeviceFake(), makeDeviceFake()],
			
		},
		{
			id: uuidv4(),
			name:'room2',
			devices:[makeDeviceFake(), makeDeviceFake(), makeDeviceFake()],
		},
		{
			id: uuidv4(),
			name:'room3',
			devices:[makeDeviceFake()]
		},
		{
			id: uuidv4(),
			name:'room4',
			devices:[makeDeviceFake(),makeDeviceFake(),makeDeviceFake(),makeDeviceFake(),makeDeviceFake(),makeDeviceFake(),makeDeviceFake()]
		},
		{
			id: uuidv4(),
			name:'room5',
			devices:[makeDeviceFake(), makeDeviceFake()]
		}
	]
}

const getters = {

}

const mutations = {
	setRooms: (state, rooms) => {
		console.log("setRooms mutation")
		state.rooms = rooms
	},
	addRoom: (state, roomName) => {
		console.log("addRoom mut")
		state.rooms.push({
			id: uuidv4(),
			name: roomName,
			devices:[]
		})
	},
	deleteRoom: (state, roomId) => {
		const index = state.rooms.findIndex(room => room.id == roomId)
		state.rooms.splice(index, 1)
	},
	
	addDevice: (state, {roomId, device}) => {
		console.log("creating: " + device.name)
		const room = getRoomById(state.rooms, roomId)
		room.devices.push(makeDevice(device))
	},
	deleteDevice: (state, deviceId) => {
		const room = getRoomByDeviceId(state.rooms, deviceId)
		room.devices.splice(room.devices.findIndex(device => device.id === deviceId), 1)
	},

	updateDeviceStatus: (state, {deviceId, newStatus}) => {
		if (newStatus === true || newStatus === false) {
			const dev = getDeviceById(state.rooms, deviceId)
			console.log("updated to new status " + newStatus)
			dev.status = newStatus
		} else {
			console.log("failed to update to new status " + newStatus)
		}
		
	},

}

const actions = {
	updateRooms: ({commit}, rooms) => {
		commit('setRooms', rooms)
	},
	addRoom: ({commit}, roomName) => {
		commit('addRoom', roomName)
	},
	deleteRoom: ({commit}, roomId) => {
		commit('deleteRoom', roomId)
	},

	addDevice: ({commit}, {roomId, device}) => {
		commit('addDevice', {roomId, device})
	},
	deleteDevice: ({commit}, deviceId) => {
		commit('deleteDevice', deviceId)
	},
	updateDevice: ({commit}, device) => {
		commit('updateDevice', device)
	},
	toggleDeviceStatus: (context, deviceId) => {
		const dev = getDeviceById(context.state.rooms, deviceId)
		if (dev) {
			// yes this is pretty ugly but it works...
			(async () => {
				const tuyaDevice = new TuyaDevice({
					id: dev.virtualId,
					key: dev.localKey
				})
				await tuyaDevice.find();
				await tuyaDevice.connect();
				let status = await tuyaDevice.get();
				await tuyaDevice.set({set: !status});
				status = await tuyaDevice.get();
				console.log(typeof(status));
				context.commit('updateDeviceStatus', {deviceId: deviceId, newStatus: status})
				tuyaDevice.disconnect();
			})();
			
		} else {
			console.log(dev)
		}
	},
	checkDeviceStatus: (context, deviceId) => {
		const dev = getDeviceById(context.state.rooms, deviceId)
		if (dev) {
			// yes this is pretty ugly but it works...
			(async () => {
				const tuyaDevice = new TuyaDevice({
					id: dev.virtualId,
					key: dev.localKey
				})
				await tuyaDevice.find();
			
				await tuyaDevice.connect();
			
				let status = await tuyaDevice.get();
			
				tuyaDevice.disconnect();
				context.commit('updateDeviceStatus', {deviceId, status})
			})();
			
		} else {
			console.log(dev)
		}
		
	},
	setDeviceStatus: (context, {deviceId, newStatus}) => {
		const dev = getDeviceById(context.state.rooms, deviceId)
		if (dev) {
			// yes this is pretty ugly but it works...
			(async () => {
				const tuyaDevice = new TuyaDevice({
					id: dev.virtualId,
					key: dev.localKey
				})
				await tuyaDevice.find();
				await tuyaDevice.connect();
				let status = await tuyaDevice.get();
				await tuyaDevice.set({set: newStatus});
				status = await tuyaDevice.get();
				console.log(typeof(status));
				context.commit('updateDeviceStatus', {deviceId: deviceId, newStatus: status})
				tuyaDevice.disconnect();
			})();
			
		} else {
			console.log(dev)
		}
	},
	setRoomStatus: (context, {roomId, newStatus}) => {
		const devices = getRoomById(context.state.rooms, roomId).devices
		async.each(devices, function(device, err){
			context.dispatch('setDeviceStatus', {deviceId: device.id, newStatus: newStatus})
		});
	}

}

export default {
  state,
  mutations,
  actions
}
