<template>
    <div>
        <div id="map"></div>
        <a :href="'https://www.google.com/maps/dir/?api=1&destination=' + address" target='_blank'
        class="flex justify-center h-12 items-center my-5 mx-3 border rounded-md border-bordercol font-semibold text-primary">
            
            <client-only>
                <unicon name="location-arrow" fill="grey" class="pr-2" width="20" height="20" />
            </client-only>
            Navigate me to the spot
        </a>
    </div>
</template>

<script>
import axios from 'axios'
import { Loader } from 'google-maps'
export default {
    name: 'GMap',
    data() {
        return {
            spotId: this.$route.params.spotId,
            address: '',
            gmapsApiKey: process.env.gmapsApiKey,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        if (window.google) {
            window.google = {}
        }

        // getting address data
        try {
            var self = this
            const response = await axios.get('/api/spot-additional/gmap', {
                params: {
                    spotId: this.spotId
                }
            })
            self.address = response.data.address
        } catch (error) {
            console.log(error)
        }

        // displaying the gmap
        var map
        var service
        var infowindow
        const loader = new Loader(this.gmapsApiKey, {libraries: ['places']})
        const google = await loader.load()
        var bratislava = new google.maps.LatLng(48.148598, 17.107748)
        infowindow = new google.maps.InfoWindow()
        map = new google.maps.Map(
            document.getElementById('map'),
            { center: bratislava, zoom: 17 }
        )
        var request = {
            query: this.address,
            fields: ['name', 'geometry']
        }
        service = new google.maps.places.PlacesService(map)
        service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[i].geometry.location
                    })
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(results[i].name)
                        infowindow.open(map, this)
                    })
                }
                map.setCenter(results[0].geometry.location)
            }
        })

        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    }
}
</script>

<style scoped>
#map {
    height: 23rem;
}
</style>