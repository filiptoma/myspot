<template>
    <div class="w-11/12 mx-auto">
        <div id="afterLoading">
            <div id="popdown">
                <div class="flex justify-between py-3 sticky top-0">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center" id="hideCloseBtn">
                        <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center" id="emphasizeNextBtn">
                        <button class="material-icons text-secondary font-light focus:outline-none" id="emphasizeNextBtnText" @click="finish">done</button>
                    </div>
                </div>

                <div class="mb-5 mt-1 bg-orange-100 border-t-4 border-orange-500 rounded-b-md text-orange-800 shadow-md px-2 py-1">
                    <div class="flex">
                        <i class="material-icons py-1">error_outline</i>
                        <div class="px-2">
                            <h1 class="font-semibold">Important</h1>
                            <h1 class="text-xs">Please fill this section only if you are sure of the corectness of the information</h1>
                        </div>
                    </div>
                </div>

                <div class="pb-20">
                    <h1 class="text-sm text-primary font-semibold mt-10">About</h1>
                    <div class="flex items-start w-full rounded-md border border-bordercol px-2 my-1 mb-3" id="aboutContainer">
                        <textarea name="about" id="aboutInput" v-model="about" placeholder="Write spot's about text..."
                        @input="aboutInput" @focus="aboutFocus" @blur="aboutBlur"
                        class="about-input text-sm w-full h-10 focus:outline-none"></textarea>
                        <button class="material-icons md-18 pl-2 focus:outline-none" id="clearAboutInput" @click="clearAboutInput">close</button>
                    </div>

                    <div class="my-3">
                        <h1 class="text-sm text-primary font-semibold">Phone number for reservations</h1>
                        <input type="text" placeholder="+421 912 345 678" v-model="phone"
                        class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 infoInput">
                    </div>

                    <div class="my-3">
                        <h1 class="text-sm text-primary font-semibold">Website</h1>
                        <input type="text" placeholder="yourspotpage.sk" v-model="web"
                        class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 infoInput">
                    </div>

                    <div class="my-3">
                        <h1 class="text-sm text-primary font-semibold">Instagram page</h1>
                        <input type="text" placeholder="instagram.com/yourspotpage" v-model="instagram"
                        class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 infoInput">
                    </div>

                    <div class="my-3 pb-10 border-b border-divide">
                        <h1 class="text-sm text-primary font-semibold">Facebook page</h1>
                        <input type="text" placeholder="facebook.com/yourspotpage" v-model="facebook"
                        class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 infoInput">
                    </div>
                    
                    <div class="flex justify-between items-center border-b border-divide pb-10 my-3">
                        <div class="w-full">
                            <h1 class="text-sm text-primary font-semibold">Upload spot's profile picture</h1>
                            <h1 class="text-sm text-secondary">I recommend horizontal, it looks better after cropping</h1>
                        </div>
                        <input @change="processImage" type="file" accept="image/*" id="addImage" class="hidden">
                        <label v-if="!picture" for="addImage" class="material-icons pr-3 pl-8 md-icon-inactive">add_a_photo</label>
                        <label v-else for="addImage" class="material-icons pr-3 pl-8 md-imageUploaded">add_a_photo</label>
                    </div>

                    <div class="my-1">
                        <h1 class="text-primary font-semibold text-sm">Opening hours</h1>
                        <h1 class="text-secondary text-sm">Choose two initial values and press 
                            <button class="font-semibold text-primary focus:outline-none" @click="fillOut">FILL OUT</button>
                        </h1>
                    </div>
                    <table class="table-auto text-sm rounded-md">
                        <tbody class="text-secondary">
                            <tr>
                                <td class="pr-4 py-1 text-primary">Monday</td>
                                <td class="pr-3">
                                    <input type="time" id="firstValue" name="from" v-model="openingHrs.monday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" id="secondValue" name="to" v-model="openingHrs.monday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                            <tr>
                                <td class="pr-4 py-1 text-primary">Tuesday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="openingHrs.tuesday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="openingHrs.tuesday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                            <tr>
                                <td class="pr-4 py-1 text-primary">Wednesday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="openingHrs.wednesday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="openingHrs.wednesday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                            <tr>
                                <td class="pr-4 py-1 text-primary">Thursday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="openingHrs.thursday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="openingHrs.thursday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                            <tr>
                                <td class="pr-4 py-1 text-primary">Friday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="openingHrs.friday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="openingHrs.friday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                            <tr>
                                <td class="pr-4 py-1 text-primary">Saturday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="openingHrs.saturday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="openingHrs.saturday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                            <tr>
                                <td class="pr-4 py-1 text-primary">Sunday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="openingHrs.sunday.from"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="openingHrs.sunday.to"
                                    class="rounded-md border border-bordercol h-6 w-20 focus:outline-none pl-1">
                                </td>
                            </tr>
                        </tbody>
                    </table>

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
            spotId: this.$route.params.spotId,
            about: '',
            phone: '',
            web: '',
            instagram: '',
            facebook: '',
            picture: '',
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
            }
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        } else {
            document.getElementById('clearAboutInput').style.opacity = 0
            var aboutInput = document.getElementById('aboutInput')
            aboutInput.oninput = function() {
                if (aboutInput.scrollHeight <= 100) {
                    aboutInput.style.height = ''
                    aboutInput.style.height = Math.min(aboutInput.scrollHeight) + 'px'
                }
            }
        }
        window.addEventListener('scroll', this.setFixedHeader)
        document.getElementById('afterLoading').style.display = 'block'
    },
    destroyed() {
        window.removeEventListener('scroll', this.setFixedHeader)
    },
    methods: {
        async finish() {
            try {
                await axios.post('/api/spot/edit', {
                    picture: this.picture,
                    openingHrs: this.openingHrs,
                    about: this.about,
                    phone: this.phone,
                    web: this.web,
                    instagram: this.instagram,
                    facebook: this.facebook,
                    spotId: this.spotId
                })
                this.$router.push({ name: 'spotId-add-finish', params: {spotId: this.spotId} })
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            picture: this.picture,
                            openingHrs: this.openingHrs,
                            about: this.about,
                            phone: this.phone,
                            web: this.web,
                            instagram: this.instagram,
                            facebook: this.facebook,
                            spotId: this.spotId
                        })
                        this.$router.push({ name: 'spotId-add-finish', params: {spotId: this.spotId} })
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
        aboutInput() {
            if (this.about.length >= 1) {
                document.getElementById('clearAboutInput').style.opacity = 1
            } else if (this.about.length === 0) {
                document.getElementById('aboutContainer').style.borderColor = '#963c61'
                document.getElementById('clearAboutInput').style.opacity = 0
            } else {
                this.firstCommentBlur()
            }
        },
        aboutFocus() {
            document.getElementById('aboutContainer').style.borderColor = '#963c61'
            if (this.about.length >= 1) {
                document.getElementById('clearAboutInput').style.opacity = 1
            }
        },
        aboutBlur() {
            document.getElementById('aboutContainer').style.borderColor = '#cccccc'
            document.getElementById('clearAboutInput').style.opacity = 0
        },
        clearAboutInput() {
            this.about = ''
            document.getElementById('aboutInput').style.height = ''
        },
        setFixedHeader() {
            var hideCloseBtn = document.getElementById('hideCloseBtn')
            var emphasizeNextBtn = document.getElementById('emphasizeNextBtn')
            if (window.scrollY > 0) {
                hideCloseBtn.style.opacity = 0
                emphasizeNextBtn.style.boxShadow = '0 0 10px #bfbfbf'
                emphasizeNextBtnText.style.color = '#4299e1'
            } else {
                hideCloseBtn.style.opacity = 1
                emphasizeNextBtn.style.boxShadow = 'none'
                emphasizeNextBtnText.style.color = '#808080'
            }
        },
        fillOut() {
            var openingHrsFrom = document.querySelectorAll('input[name=from]')
            for (var i = 0; i < openingHrsFrom.length; i++) {
                openingHrsFrom[i].value = document.getElementById('firstValue').value
                if (i === 0) {
                    this.openingHrs.monday.from = openingHrsFrom[i].value
                }
                if (i === 1) {
                    this.openingHrs.tuesday.from = openingHrsFrom[i].value
                }
                if (i === 2) {
                    this.openingHrs.wednesday.from = openingHrsFrom[i].value
                }
                if (i === 3) {
                    this.openingHrs.thursday.from = openingHrsFrom[i].value
                }
                if (i === 4) {
                    this.openingHrs.friday.from = openingHrsFrom[i].value
                }
                if (i === 5) {
                    this.openingHrs.saturday.from = openingHrsFrom[i].value
                }
                if (i === 6) {
                    this.openingHrs.sunday.from = openingHrsFrom[i].value
                }
            }
            var openingHrsTo = document.querySelectorAll('input[name=to]')
            for (var i = 0; i < openingHrsTo.length; i++) {
                openingHrsTo[i].value = document.getElementById('secondValue').value
                if (i === 0) {
                    this.openingHrs.monday.to = openingHrsTo[i].value
                }
                if (i === 1) {
                    this.openingHrs.tuesday.to = openingHrsTo[i].value
                }
                if (i === 2) {
                    this.openingHrs.wednesday.to = openingHrsTo[i].value
                }
                if (i === 3) {
                    this.openingHrs.thursday.to = openingHrsTo[i].value
                }
                if (i === 4) {
                    this.openingHrs.friday.to = openingHrsTo[i].value
                }
                if (i === 5) {
                    this.openingHrs.saturday.to = openingHrsTo[i].value
                }
                if (i === 6) {
                    this.openingHrs.sunday.to = openingHrsTo[i].value
                }
            }
        },
        processImage(event) {
            const picture = event.target.files[0]
            this.createBase64Image(picture)
        },
        createBase64Image(fileObject) {
            const reader = new FileReader()
            reader.onload = (event) => {
                this.picture = event.target.result
            }
            reader.readAsDataURL(fileObject)
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

.about-input {
    resize: none;
    background: transparent;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
}
#clearAboutInput {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    transition: 200ms;
}
#aboutContainer {
    transition: 200ms;
}

#hideCloseBtn {
    transition: 200ms;
}
#emphasizeNextBtnText {
    transition: 300ms;
}
#emphasizeNextBtn {
    transition: 100ms;
}

.infoInput {
    transition: 200ms;
}
</style>