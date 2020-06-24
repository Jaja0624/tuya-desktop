<template>
    <div>
        <span>I am EditDeviceDialogForm</span>
        <br>
        <span v-if='device.tuyaDevice'>virtualId: {{ device.tuyaDevice.device.id }}</span>
        <span v-else>virtualId: {{ device.virtualId }} </span>
        <br>
        <span v-if='device.tuyaDevice'>localkey: {{ device.tuyaDevice.device.key }}</span>
        <span v-else>localkey: {{ device.localKey }}</span>
    </div>
</template>

<script>
    // Form for editing device
    export default {
        name: 'EditDeviceDialogForm',
        props: {
            device: Object
        },
        
        data () {
            return {
                // visibleSync: this.visible
            }
        },
        created() {
            console.log(this.device.tuyaDevice.device)
        },
        methods: {
            // closeDialog () {
            //     this.$emit('close')
            // }
        },
        computed: {

        }
    }

</script>

<style lang='scss' scoped>

</style>