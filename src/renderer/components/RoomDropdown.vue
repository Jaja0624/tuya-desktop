<template>
    <el-dropdown @command="handleRoomDropdown">
        <i class="el-icon-setting room-setting" style='opacity:0.7'></i>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='edit'>Edit</el-dropdown-item>
            <el-dropdown-item command='delete'>Delete</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        name:"Room-Dropdown",
        props: {
            room: Object
        },

        methods: {
            handleRoomDropdown (cmd) {
				if (cmd === 'delete') {
                    console.log('delete' + this.room)
                    this.$emit('delete', this.room)
				} else if (cmd === 'edit') {
                    console.log('edit' + this.room)
                    this.$emit('edit', this.room)
				}
			}
        }
    }

</script>

<style lang='scss'>
    .room-setting:hover {
        cursor: pointer;
        opacity: 1.0!important;
    }
</style>