<template>
    <div>
        <el-row class='deviceRow addDevice' style='float:right;' v-on:click="addDeviceDialogVisible = true">
            <el-button type="text" @click="addDeviceDialogVisible = true">Add device {{ room.name }} <i class="el-icon-plus" style='margin-left:6px;'></i></el-button>
        </el-row>
        <el-dialog
            title="Add Device"
            :visible.sync="addDeviceDialogVisible"
            width="30%">
            <AddDeviceDialogForm :room='room.name'/>
            <span slot="footer" class="dialog-footer">
        </span>
        </el-dialog>
    </div>
</template>

<script>
    // id:'4_device1',
    // name:'4_device1_name',
    // description:'test description',
    // localKey:'test localkey',
    // deviceIp:'test device ip',
    // on: true
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
                addDeviceDialogVisible: false
            }
        },
        methods: {

        },
        computed: {

        }
    }

</script>

<style lang='scss'>

</style>