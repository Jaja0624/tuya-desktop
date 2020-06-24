<template>
    <div>
        <el-row class='deviceRow addDevice' style='float:right; text-align:center;' v-on:click="addDeviceDialogVisible = true">
            <el-button type="text" @click="addDeviceDialogVisible = true">Add device<i class="el-icon-plus" style='margin-left:6px; font-size: 20px;'></i></el-button>
        </el-row>
        <el-dialog
            class='addDeviceDialog'
            :visible.sync="addDeviceDialogVisible"
            width="30%">
            <span slot='title'>Add device to — <span style='font-weight: bold'>{{ room.name }}</span></span>
            <AddDeviceDialogForm :room='room'/>
        </el-dialog>
    </div>
</template>

<script>
    import AddDeviceDialogForm from './AddDeviceDialogForm.vue'
    export default {
        name: 'AddDeviceCard',
        components: {
            AddDeviceDialogForm
        },
        props: {
            room: Object
        },
        data () {
            return {
                addDeviceDialogVisible: false,
            }
        },
        methods: {

        },
        computed: {

        }
    }

</script>

<style lang='scss' scoped>
    .addDeviceDialog {
        padding-top:5px;
    }

    .addDevice {
        position:absolute;
        bottom:0;
        width:100%;
	}

</style>