<template>
    <div class='addDeviceForm'>
        <el-form :model="device" ref="device" label-width="120px">
            <el-form-item label="Name" required>
                <el-input v-model="device.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Local Key" required>
                <el-input v-model="device.localKey" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Device IP" required>
                <el-input v-model="device.deviceIp"></el-input>
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="device.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('device')">Submit</el-button>
                <el-button @click='resetForm'>Clear</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // TODO: Validate local key / device ip
    export default {
        name: 'AddDeviceDialogForm',
        props: {
            room: Object
        },
        data () {
            return {
                device: {
                    name: '',
                    localKey: '',
                    deviceIp: '',
                    description:''
                },
                rules: {
                    name: [
                        { required: true, message: 'Name required', trigger:'blur'},
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addDevice', {roomId: this.room.id, device: this.device})
                        this.$emit('closeForm')
                    } else {
                        return false;
                    }
                })
                
            },
            resetForm() {
                console.log(this.$refs.device)
                this.$refs.device.resetFields()
            }

        },
        computed: {
            
        },
    }

</script>

<style lang='scss' scoped>

</style>