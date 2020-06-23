<template>
	<div id="wrapper">
		<div class='title'>TUYA-CLIENT</div>
		<el-row>
			<el-col :span='6' id='addRoomCol' style='display:flex;'>
				<el-input placeholder="Add room" v-model="addRoomInput" style='float:left;' @keyup.native.enter='addRoom'></el-input>
				<el-button type="primary" size='small' icon="el-icon-plus" style='float:left;margin-left:-6px;' @click='addRoom'></el-button>
			</el-col>
			<el-col :span='6' id='toggleAll' style='margin-left:20px; margin-top:7px'>
				<span style='margin-left:5px; color:white;'>Toggle All</span>
				<el-button type="primary" size='mini' icon="el-icon-sunny"></el-button>
				<el-button type="danger" size='mini' icon="el-icon-moon"></el-button>
			</el-col>
		</el-row>
			
		<el-row class='containerRow'>
			<draggable
				v-model="rooms"
				class='sortable-list'
				style='background:grey;'
				v-bind='dragRoomOptions'
				@start='dragRoom = true'
				@end='dragRoom = false'>
				<transition-group type='transition' :name='dragRoom ? "flip-list" : null'>
					<el-col :span="6"
						class='roomColumn sortable'
						v-for="room in rooms"
						:key="room.id">
						<el-row class='roomHeader'>
							<div>
								<span>{{ room.name }}</span>
								<i class="el-icon-circle-close deleteRoomIcon"  style='opacity:0.7; float:right;' @click='deleteRoom(room)'></i>
							</div>
							<!-- <RoomDropdown 
								:room="room"
								@edit='editRoom'
								@delete='deleteRoom'/> -->
							<el-row class='toggleAllRow' style='margin-top:7px;'>
								<span>Toggle All</span>
								<el-button type="primary" size='mini' icon="el-icon-sunny" style='float:right;'></el-button>
								<el-button type="danger" size='mini' icon="el-icon-moon" style='float:right;'></el-button>
							</el-row> 
						</el-row>
						
						<el-col class='devicesColumn' style='overflow-y: scroll; height:400px;'>
							<draggable
								group='room'
								:list='room.devices'
								v-bind='dragDeviceOptions'
								@start='dragDevice = true'
								@end='dragDevice = false'>
								<transition-group type='transition' :name='!dragDevice ? "flip-list" : null'>
									<el-row
										style='margin-top:5px;'
										class='deviceRow'
										v-for='device in room.devices'
										:key='device.id'>
										<DeviceCard :device='device'/>
				
									</el-row>
								</transition-group>
							</draggable>
						</el-col>
						<AddDeviceCard :room='room'/>
					</el-col>
				</transition-group>
			</draggable>
		</el-row>

	</div>

	
</template>

<script>
	import draggable from 'vuedraggable'
	import DeviceCard from './DeviceCard.vue'
	import AddDeviceCard from './AddDeviceCard.vue'
	export default {
		name: 'landing-page',
		components: {  
			draggable,
			DeviceCard,
			AddDeviceCard,
		},
		data () {
			return {
				selectedRoom: null,
				tmp_toggle_1:false,
				addRoomInput: '',
				addDeviceDialogVisible: false,
				dragDevice: false,
				dragRoom: false,
				
			}
		},
		mounted: function() {
			console.log('mounted')
		},
		methods: {
			open (link) {
				this.$electron.shell.openExternal(link)
			},
			swag () {
				console.log("hello")
				this.dialogVisible = true
			},
			addRoom () {
				this.$store.dispatch('addRoom', this.addRoomInput)
			},
			deleteRoom (room) {
				this.$store.dispatch('deleteRoom', room.id)
			},
			editRoom (room) {
				console.log("TBD. editRoom dialog = true")
			}

		},
		computed: {
			dragDeviceOptions() {
				return {
					animation: 200,
					group: "room",
					disabled: false,
				};
			},
			dragRoomOptions() {
				return {
					animation: 200,
					disabled: false,
				};
			},
			rooms: {
				get() {
            		return this.$store.state.board.rooms
				},
				set(rooms) {
					this.$store.dispatch('updateRooms', rooms)
				}
			}

		},
		watch: {

		}
	}
</script>

<style lang='scss'>
	@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
	$default-font: sans-serif;

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	body { font-family: 'Source Sans Pro', sans-serif; }

	#wrapper {
		background:
		radial-gradient(
			ellipse at top left,
			rgb(48, 48, 48) 40%,
			rgba(27, 27, 27, 0.9) 100%
		);
		height: 100vh;
		padding: 60px 80px;
		width: 100vw;
	}

	main {
		display: flex;
		justify-content: space-between;
	}

	main > div { flex-basis: 50%; }

	.left-side {
		display: flex;
		flex-direction: column;
	}

	.title {
		color: #c7c7c7;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 6px;
	}

	.toggleAllRow {
		font-size: 16px;
		font: $default-font;
	}

	.el-col {
		border-radius: 4px;
	}

	.roomColumn {
		opacity: 1;
		// -webkit-transition: opacity 1000ms linear;
		// transition: opacity 1000ms linear;
		overflow: hidden!important;
		padding:10px;
		margin-top:10px;
		margin-right:13px;
		margin-bottom:10px;
		min-height: 500px;
		background-color: rgb(240, 240, 240);
		position:relative;
		
		border-radius:4px;

		.roomHeader {
			font-size:24px;
			border-radius:4px;
			margin:3px;

			.deleteRoomIcon {
				margin-top:5px;
			}
		}
		

		.deviceRow {
			border-radius:4px;
			padding: 3px;
			background-color:rgb(240, 239, 239);

			.deviceCard {
				font: $default-font;
				border-radius:4px;
			}
		} 
	}

	.flip-list-move {
		transition: transform 0.5s;
	}

	.no-move {
		transition: transform 0s;
	}

	.ghost {
		border-radius:0px;
		opacity: 0.8;
		background: #c8ebfb;
	}
	

	.deleteRoomIcon:hover {
        cursor: pointer;
        opacity: 1.0!important;
    }

</style>
