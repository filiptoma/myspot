<template>
    <div class="w-11/12 mx-auto">
        <div id="afterLoading">
            <div id="popdown">
                <div class="flex justify-between my-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <button class="material-icons text-secondary font-light focus:outline-none" @click="nextDetail">arrow_forward</button>
                    </div>
                </div>

                <div class="my-5 pb-12 text-sm">
                    <h1 class="font-semibold text-lg">What is your experience with this spot?</h1>
                    <h1 class="text-secondary">With your personal opinion, you can help others to build up their expectations</h1>
                    <div class="flex items-center mt-8 mb-4 justify-center">
                        <h1 class="text-primary text-base font-semibold pr-2">Rate the spot:</h1>
                        <button class="material-icons focus:outline-none md-icon-inactive" id="1" @click="gaveRating1" name="rating">star_border</button>
                        <button class="material-icons focus:outline-none md-icon-inactive" id="2" @click="gaveRating2" name="rating">star_border</button>
                        <button class="material-icons focus:outline-none md-icon-inactive" id="3" @click="gaveRating3" name="rating">star_border</button>
                        <button class="material-icons focus:outline-none md-icon-inactive" id="4" @click="gaveRating4" name="rating">star_border</button>
                        <button class="material-icons focus:outline-none md-icon-inactive" id="5" @click="gaveRating5" name="rating">star_border</button>
                    </div>
                    <div class="flex items-start w-full rounded-md border border-bordercol px-2" id="firstCommentContainer">
                        <textarea name="firstComment" id="firstCommentInput" v-model="firstComment" :placeholder="'Write first comment as ' + usr + '...'"
                        @input="firstCommentInput" @focus="firstCommentFocus" @blur="firstCommentBlur"
                        class="firstComment-input text-sm w-full h-10 focus:outline-none"></textarea>
                        <button class="material-icons md-18 pl-2 focus:outline-none" id="clearCommentInput" @click="clearCommentInput">close</button>
                    </div>
                </div>
            </div>
            <AuthPopup id="auth-popup" />
        </div>
        <Footer />
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import AuthPopup from '~/components/popups/AuthPopup'
import Footer from '~/components/nav/Footer'
export default {
    components: {
        BeforeLoading, AuthPopup, Footer
    },
    data() {
        return {
            usr: '',
            spotId: this.$route.params.spotId,
            rating: null,
            firstComment: '',
            canClear: false
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        } else {
            this.usr = usrExists
            document.getElementById('clearCommentInput').style.opacity = 0
            var firstCommentInput = document.getElementById('firstCommentInput')
            firstCommentInput.oninput = function() {
                if (firstCommentInput.scrollHeight <= 100) {
                    firstCommentInput.style.height = ''
                    firstCommentInput.style.height = Math.min(firstCommentInput.scrollHeight) + 'px'
                }
            }
        }
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        async nextDetail() {
            try {
                await axios.post('/api/spot/edit', {
                    rating: this.rating,
                    firstComment: this.firstComment,
                    user: this.usr,
                    spotId: this.spotId
                })
                this.$router.push({ name: 'spotId-add-i', params: {spotId: this.spotId} })
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            rating: this.rating,
                            firstComment: this.firstComment,
                            user: this.usr,
                            spotId: this.spotId
                        })
                        this.$router.push({ name: 'spotId-add-i', params: {spotId: this.spotId} })
                    } catch (error) {
                        try {
                            if (error.response.data.errorMsg === 'You have to be logged in.' || error.response.data.errorMsg === 'Invalid or expired access key.') {
                                await AuthService.logoutUser()
                                document.cookie = 'at=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                document.cookie = 'usr=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                document.cookie = 'rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                this.$router.push('/')
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
        },
        close() {
            this.$router.push('/')
        },
        colorStars() {
            var stars = document.querySelectorAll('button[name=rating]')
            for (var i = 0; i < stars.length; i++) {
                stars[i].classList.add('md-star')
                stars[i].textContent = 'star_border'
                stars[i].innerText = 'star_border'
            }
            for (var i = 0; i < stars.length; i++) {
                if (stars[i].id <= this.rating) {
                    stars[i].textContent = 'star'
                    stars[i].innerText = 'star'
                }
            }
        },
        gaveRating1() {
            this.rating = 1
            this.colorStars()
        },
        gaveRating2() {
            this.rating = 2
            this.colorStars()
        },
        gaveRating3() {
            this.rating = 3
            this.colorStars()
        },
        gaveRating4() {
            this.rating = 4
            this.colorStars()
        },
        gaveRating5() {
            this.rating = 5
            this.colorStars()
        },
        firstCommentInput() {
            if (this.firstComment.length >= 1) {
                document.getElementById('clearCommentInput').style.opacity = 1
            } else if (this.firstComment.length === 0) {
                document.getElementById('firstCommentContainer').style.borderColor = '#963c61'
                document.getElementById('clearCommentInput').style.opacity = 0
            } else {
                this.firstCommentBlur()
            }
        },
        firstCommentFocus() {
            document.getElementById('firstCommentContainer').style.borderColor = '#963c61'
            if (this.firstComment.length >= 1) {
                document.getElementById('clearCommentInput').style.opacity = 1
            }
        },
        firstCommentBlur() {
            document.getElementById('firstCommentContainer').style.borderColor = '#cccccc'
            document.getElementById('clearCommentInput').style.opacity = 0
        },
        clearCommentInput() {
            this.firstComment = ''
            document.getElementById('firstCommentInput').style.height = ''
        }
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
#auth-popup {
    display: none;
}
.firstComment-input {
    resize: none;
    background: transparent;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
}
#clearCommentInput {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    transition: 200ms;
}
#firstCommentContainer {
    transition: 200ms;
}
</style>