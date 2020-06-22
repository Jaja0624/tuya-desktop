<template>
	<div id="wrapper">
		<div class='title'>TUYA-CLIENT</div>
		<el-row>
			<el-col :span='6' id='addRoomCol' style='display:flex;'>
				<el-input placeholder="Add room" v-model="addRoomInput" style='float:left;' @keyup.enter='addRoom'></el-input>
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
				style='background:grey;'>
				<transition-group type='transition' :name='!dragRoom ? "flip-list" : null'>
					<el-col :span="6"
						class='roomColumn sortable'
						v-for="room in rooms"
						:key="room.id"
						v-bind='dragRoomOptions'
						@start='dragRoom = true'
						@end='dragRoom = false'>
						<el-row class='roomHeader'>
							{{ room.name }}
							<RoomDropdown 
								:room="room"
								@edit='dropdowntest'
								@delete='dropdowntest'/> 
							
		
							<el-row>
								<span>Toggle All</span>
								<el-button type="primary" size='mini' icon="el-icon-sunny" style='float:right;'></el-button>
								<el-button type="danger" size='mini' icon="el-icon-moon" style='float:right;'></el-button>
							</el-row> 
						</el-row>
						
						
						<draggable
							group='room'
							ghost-class="ghost"
							:list='room.devices'
							v-bind='dragDeviceOptions'
							@start='dragDevice = true'
							@end='dragDevice = false'>
							<transition-group type='transition' :name='!dragDevice ? "flip-list" : null'>
								<el-row
									class='deviceRow'
									v-for='device in room.devices'
									:key='device.id'>
									deviceName: {{ device.name }}
									<el-switch
										style="display: inline block; float: right;"
										v-model="device.on"
										active-color="#13ce66"
										inactive-color="#ff4949">
									</el-switch>

								</el-row>
							</transition-group>
						</draggable>
						
						<el-row class='deviceRow addDevice' v-on:click="dialogVisible = true">
							<el-button type="text" @click="dialogVisible = true">Add device</el-button>
						</el-row>
					</el-col>
				</transition-group>
			</draggable>
		</el-row>

		<el-dialog
			title="Add device"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<span>This is a message</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false">Add</el-button>
			</span>
		</el-dialog>
	</div>

	
</template>

<script>
	import draggable from 'vuedraggable'
	import RoomDropdown from './RoomDropdown.vue'
	export default {
		name: 'landing-page',
		components: {  
			draggable,
			RoomDropdown
		},
		data () {
			return {
				selectedRoom: null,
				tmp_toggle_1:false,
				addRoomInput: '',
				dialogVisible: false,
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
			dropdowntest (room) {
				console.log(room)
			}

		},
		computed: {
			dragDeviceOptions() {
				return {
					animation: 200,
					group: "room",
					disabled: false,
					ghostClass: "ghost"
				};
			},
			dragRoomOptions() {
				return {
					animation: 200,
					disabled: false,
					ghostClass: "ghost"
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

		}
	}
</script>

<style lang='scss'>
	@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

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
	.el-col {
		border-radius: 4px;
	}

	.roomColumn {
		padding:10px;
		margin-top:10px;
		margin-right:13px;
		margin-bottom:10px;
		min-height: 500px;
		background-color:rgb(240, 239, 239);
		border-radius:4px;

		.roomHeader {
			font-size:24px;
			border-radius:4px;
			margin:3px;
		}
		.addDevice {
			background-color: rgb(149, 201, 149)!important;
		}

		.deviceRow {
			border-radius:4px;
			padding: 5px;
			margin: 5px;
			background-color: rgb(180, 180, 180)
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

</style>
