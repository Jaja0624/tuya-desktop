<template>
	<div id="wrapper">
		<div class='title'>Hello</div>
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
						name: {{ room.name }}
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

							</el-row>
						</transition-group>
					</draggable>
					
					<el-row class='deviceRow addDevice' @click="dialogVisible = true">
						<el-button type="text" @click="dialogVisible = true">Add device +</el-button>
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
	export default {
		name: 'landing-page',
		components: {  
			draggable
		},
		data () {
			return {
				dialogVisible: false,
				dragDevice: false,
				dragRoom: false,
				rooms: [
					{
						id:'1',
						name:'room1',
						devices:[
							{
								id:'1_device1',
								name:'1_device1_name'
							},
							{
								id:'1_device2',
								name:'1_device2_name'
							}
						],
					},
					{
						id:'2',
						name:'room2',
						devices:[
							{
								id:'2_device1',
								name:'2_device1_name'
							},
							{
								id:'2_device2',
								name:'2_device2_name'
							},
						],
					},
					{
						id:'3',
						name:'room3',
						devices:[
							{
								id:'3_device1',
								name:'3_device1_name'
							},
							{
								id:'3_device2',
								name:'3_device2_name'
							},
							{
								id:'3_device3',
								name:'3_device3_name'
							}
						]
					}
				]
			}
		},
		methods: {
			open (link) {
				this.$electron.shell.openExternal(link)
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
		margin:10px;
		min-height: 500px;
		background-color:rgb(240, 239, 239);
		border-radius:4px;
		/* background-color: red; */
		.roomHeader {
			border-radius:4px;
			margin:3px;
			background-color: cornsilk;
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
