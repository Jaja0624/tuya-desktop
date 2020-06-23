<template>
    <div>
        <div  > 
            <el-card class="box-card deviceCard" @click.native.prevent='deviceEditDialogVisible = true'>
                {{ device.name }}
                <el-switch
                    @click.native.prevent.stop
                    style="display: inline block; float: right;"
                    v-model="device.on"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </el-card>
        </div>
        
        <el-dialog
			title="Edit Device"
			:visible.sync="deviceEditDialogVisible"
			width="30%">
			<span>Device: {{ device.name }}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="deviceEditDialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="deviceEditDialogVisible =false">Add</el-button>
			</span>
	    </el-dialog>
    </div>
    
</template>

<script>
    import DeviceEditDialog from './DeviceEditDialog.vue'
    export default {
        name: "DeviceCard",
        components: {  
			DeviceEditDialog,
		},
        props: {
            device: Object
        },
        data () {
            return {
                deviceEditDialogVisible: false
            }
            
        },
        methods: {
            testf () {
                console.log("dadada")
            },
        }
    }

</script>

<style lang='scss'>
    .deviceCard:hover {
        cursor: pointer;
        opacity: 1.0!important;
    }
</style>