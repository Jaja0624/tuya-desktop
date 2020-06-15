const state = {
  main: 0,
	// rooms: [
	// 	{
	// 		id:'1',
	// 		name:'All',
	// 		devices:[]
	// 	}
	// ],
	rooms: [
		{
			id:'1',
			name:'room1',
			devices:[
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
			id:'2',
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
			id:'3',
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
		}
	]
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
