<template>
    <div>
        <div  > 
            <el-card class="box-card deviceCard" @click.native.prevent='deviceEditDialogVisible = true'>
                {{ device.name }}
                <el-switch
                    @click.native.prevent.stop='toggleDevice'
                    style="display: inline block; float: right;"
                    v-model="device.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
                <!-- :disabled='device.status ? false : true' -->

            </el-card>
        </div>
        
        <el-dialog
			:visible.sync="deviceEditDialogVisible"
			width="30%">
			<span slot='title'>Edit Device — <span style='font-weight: bold'>{{ device.name }}</span></span>
            <EditDeviceDialogForm :device='device'/>
            <!-- Having elements that show/hide the dialog here means we do not have to pass around visible property -->
			<span slot="footer" class="dialog-footer">
                <el-button type="danger" style='float:left;' @click='deleteDevice(device.id)'>Delete</el-button>
				<el-button @click="deviceEditDialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="deviceEditDialogVisible = false" disabled>Save</el-button>
			</span>
	    </el-dialog>
    </div>
    
</template>

<script>
    import EditDeviceDialogForm from './EditDeviceDialogForm.vue'
    export default {
        name: "DeviceCard",
        components: {  
			EditDeviceDialogForm,
		},
        props: {
            device: Object
        },
        data () {
            return {
                deviceEditDialogVisible: false,
            }
            
        },
        created: function() {
            
        },
        methods: {
            toggleDevice () {
                this.$store.dispatch('toggleDeviceStatus', this.device.id)
                console.log("dadada")
            },
            deleteDevice(deviceId) {
                this.$store.dispatch('deleteDevice', deviceId)
            }
        },
    }

</script>

<style lang='scss'>
    .deviceCard:hover {
        cursor: pointer;
        opacity: 1.0!important;
    }
</style>