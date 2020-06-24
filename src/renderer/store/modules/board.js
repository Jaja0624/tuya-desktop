import { v4 as uuidv4 } from 'uuid';
import { makeDevice, makeDeviceFake } from '../../utils/makeDevice'
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
		console.log(device)
		const room = state.rooms.find(room => room.id === roomId)
		console.log(makeDevice(device))
		room.devices.push(makeDevice(device))
	},
	deleteDevice: (state, deviceId) => {
		const room = state.rooms.find(room => room.devices.find(device => device.id === deviceId))
		room.devices.splice(room.devices.findIndex(device => device.id === deviceId), 1)
	}


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


}

export default {
  state,
  mutations,
  actions
}
