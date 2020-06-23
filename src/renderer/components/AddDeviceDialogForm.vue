<template>
    
    <el-form :model="device" ref="addDeviceForm" label-width="120px">
        <el-form-item label="Name" required=true>
            <el-input v-model="device.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Local Key" required=true>
            <el-input v-model="device.localKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Device IP" required=true>
            <el-input v-model="device.deviceIp"></el-input>
        </el-form-item>
        <el-form-item label="Description">
            <el-input v-model="device.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">Submit</el-button>
            <el-button @click='clearForm()'>Clear</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    // TODO: Validate local key / device ip
    export default {
        name: 'AddDeviceDialogForm',
        props: {
            room: String
        },
        data () {
            return {
                device: {
                    name: '',
                    localKey: '',
                    deviceIp: '',
                    description:''
                }
            }
        },
        methods: {
            submitForm() {

            },
            clearForm() {
                this.device = {
                    name: '',
                    localKey: '',
                    deviceIp: '',
                    description:''
                }
            }

        },
        computed: {

        }
    }

</script>

<style lang='scss' scoped>

</style>