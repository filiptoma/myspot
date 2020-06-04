<template>
    <div class="px-2">
        <div v-if="openedError" class="text-center text-primary text-xl my-5 font-semibold">
            <h1>{{ openedError }}</h1>
        </div>
        <div v-else>
            <div class="text-center text-primary text-xl my-10 font-semibold">
                <h1 v-if="opened == true" class="">This spot is now <span class="text-green-600">open</span></h1>
                <h1 v-if="opened == false" class="">This spot is now <span class="text-red-600">closed</span></h1>
            </div>
            <div class="text-primary"
            v-for="(data, day) in openingHrs"
            :key="day">
                <div v-if="day == today" class="flex justify-between px-3 border-b border-divide py-2 text-black">
                    <h1 class="font-semibold">{{ day.charAt(0).toUpperCase() + day.slice(1) }}</h1>
                    <h1 class="font-semibold">{{ data.from + ' - ' + data.to }}</h1>
                </div>
                <div v-else class="flex justify-between px-3 border-b border-divide py-2">
                    <h1 class="">{{ day.charAt(0).toUpperCase() + day.slice(1) }}</h1>
                    <h1 class="font-semibold">{{ data.from + ' - ' + data.to }}</h1>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'OpeningHrs',
    data() {
        return {
            spotId: this.$route.params.spotId,
            openingHrs: {
                monday: {
                    from: '',
                    to: ''
                },
                tuesday: {
                    from: '',
                    to: ''
                },
                wednesday: {
                    from: '',
                    to: ''
                },
                thursday: {
                    from: '',
                    to: ''
                },
                friday: {
                    from: '',
                    to: ''
                },
                saturday: {
                    from: '',
                    to: ''
                },
                sunday: {
                    from: '',
                    to: ''
                }
            },
            opened: Boolean,
            openedError: '',
            today: ''
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        try {
            var self = this
            const response = await axios.get('/api/spot-additional/opening-hrs', {
                params: {
                    spotId: this.spotId
                }
            })
            self.openingHrs = response.data.openingHrs
            console.log(self.openingHrs)
        } catch (error) {
            console.log(error)
        }
        console.log('laters', this.openingHrs)

        // calculating whether the spot is opened or not
        const weekdays = new Array(
            'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
        )
        const date = new Date()
        const dayIndex = date.getDay()
        const today = weekdays[dayIndex]
        this.today = today
        console.log(this.today, this.openingHrs)
        if (this.openingHrs[today].from && this.openingHrs[today].to) {
            console.log('exist')
            const from = parseInt(this.openingHrs[today].from.split(':')[0] + this.openingHrs[today].from.split(':')[1])
            const to = parseInt(this.openingHrs[today].to.split(':')[0] + this.openingHrs[today].to.split(':')[1])
            const now = parseInt(date.getHours().toString() + (date.getMinutes()<10?'0':'') + date.getMinutes())
            console.log(from, to, now)
            if (from <= now && now <= to) {
                this.opened = true
            } else if (to <= from && now >= to && now >= from) {
                this.opened = true
            } else if (to <= from && now <= to && now <= from) {
                this.opened = true
            } else {
                this.opened = false
            }
        } else {
            this.openedError = 'Opening hours not yet added'
        }
        console.log(this.opened)

        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
}
</script>

<style scoped>

</style>