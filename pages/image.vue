<template>
    <div>
        <form enctype="multipart/form-data">
            <input type="file" ref="file" @change="onSelect" class="hidden" id="fileInput" />
            <label for="fileInput" class="text-center my-10 font-semibold text-lg">Select file</label>
            <h1 class="text-red-700 font-semibold">{{ message }}</h1>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            message: '',
            file: '',
        }
    },
    methods: {
        onSelect() {
            const file = this.$refs.file.files[0]
            this.file = file
            this.onSubmit()
        },
        async onSubmit() {
            const formData = new FormData()
            formData.append('username', 'admin')
            formData.append('file', this.file)
            
            try {
                await axios.post('/api/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                this.message = 'Uploaded!'
            } catch (error) {
                console.log(error)
                this.message = 'Something went wrong :('
            }
        }
    }
}
</script>

<style>

</style>