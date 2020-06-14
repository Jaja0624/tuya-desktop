<template>
	<div id="wrapper">
		<div>Hello</div>
		<el-row class='containerRow'>
			<draggable
				v-model="rooms"
				class='sortable-list'
				style='background:grey;'>
				<el-col :span="6"
					class='roomColumn sortable'
					v-for="room in rooms"
					:key="room.id">
					<el-row class='roomHeader'>
						name: {{ room.name }}
					</el-row>

					<draggable
						group='room'
						:list='room.devices'>
						<el-row
							class='deviceRow'
							v-for='device in room.devices'
							:key='device.id'>
							deviceName: {{ device.name }}

						</el-row>

					</draggable>
				</el-col>
			</draggable>
		</el-row>
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
				value1: true,
				value2: true,
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
			rgba(255, 255, 255, 1) 40%,
			rgba(229, 229, 229, .9) 100%
		);
		height: 100vh;
		padding: 60px 80px;
		width: 100vw;
	}

	#logo {
		height: auto;
		margin-bottom: 20px;
		width: 420px;
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

	.welcome {
		color: #555;
		font-size: 23px;
		margin-bottom: 10px;
	}

	.title {
		color: #2c3e50;
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
		background-color:gray;
		/* background-color: red; */
		.roomHeader {
			background-color: cornsilk;
		}

		.deviceRow {
			padding: 5px;
			margin: 5px;
			background-color: rgb(240, 239, 239)
		}
	}
</style>
