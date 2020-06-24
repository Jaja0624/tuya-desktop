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
			devices: [
				{
					id:'1_device1',
					name:'1_device1_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
				{
					id:'1_device2',
					name:'1_device2_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
					
				}
			],
			
		},
		{
			id: uuidv4(),
			name:'room2',
			devices:[
				{
					id:'2_device1',
					name:'2_device1_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
				{
					id:'2_device2',
					name:'2_device2_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
			],
		},
		{
			id: uuidv4(),
			name:'room3',
			devices:[
				{
					id:'3_device1',
					name:'3_device1_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
				{
					id:'3_device2',
					name:'3_device2_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
				{
					id:'3_device3',
					name:'3_device3_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				}
			]
		},
		{
			id: uuidv4(),
			name:'room4',
			devices:[
				{
					id:'4_device1',
					name:'4_device1_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
				{
					id:'4_device2',
					name:'4_device2_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				},
				{
					id:'4_device3',
					name:'4_device3_name',
					description:'test description',
					localKey:'test localkey',
					deviceIp:'test device ip',
					on: true
				}
			]
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

	// add device, delete device, modify device (delete then add)

}

export default {
  state,
  mutations,
  actions
}
