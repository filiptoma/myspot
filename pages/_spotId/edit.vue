<template>
    <div class="">
        <div id="afterLoading">
            <div id="index">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="goBack">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="m-2">
                    <h1 class="text-lg font-semibold">What would you like to edit?</h1>
                    <p class="text-secondary text-sm">
                        Providing better information on the Spot will help others, and moreover, your profile will gain reputation and recognition as well-informed one.
                    </p>
                </div>
                <div class="m-2 text-secondary mt-5">
                    <button @click="indexToName" class="w-full flex justify-between p-3 items-center border-b border-divide focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="map-marker-edit" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Name</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToLocation" class="w-full flex justify-between p-3 items-center border-b border-divide divider focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="location-pin-alt" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Location</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToAbout" class="w-full flex justify-between p-3 items-center border-b border-divide focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="subject" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">About text</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToTags" class="w-full flex justify-between p-3 items-center border-b border-divide divider focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="tag-alt" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Tags and categories</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToContact" class="w-full flex justify-between p-3 items-center border-b border-divide focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="at" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Contact info</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToOhours" class="w-full flex justify-between p-3 items-center border-b border-divide divider focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="clock" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Opening hours</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToImage" class="w-full flex justify-between p-3 items-center focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="image" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Picture</span></h1>
                        </div>
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                </div>
            </div>

            <div id="name">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="nameToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit the name of this spot</h1>
                    <input type="text" placeholder="Enter the name..." v-model="spot.name"
                    class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contentInput">
                </div>
            </div>

            <div id="location">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="locationToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit the location of this spot</h1>
                    <div class="border border-bordercol rounded-md text-sm px-2 mb-6 flex items-center" id="locationInputContainer">
                        <input type="text" v-model="spot.address" id="pac-input" @focus="showMap" @input="showClearLocationBtn" @blur="blurLocationInput"
                        class="w-full focus:outline-none" placeholder="Enter the address / name...">
                        <button class="center-icon pl-2 focus:outline-none" @click="clearLocationInput" id="clearLocationBtn" disabled>
                            <client-only>
                                <unicon name="times" fill="#4299e1" width="18" height="18" />
                            </client-only>
                        </button>
                    </div>
                    <div id="map"></div>
                </div>
            </div>

            <div id="about">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="aboutToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit the about text of this spot</h1>
                    <div class="border border-bordercol rounded-md text-sm px-2 flex items-start" id="aboutInputContainer">
                        <textarea name="aboutText" id="aboutText" @focus="aboutInputFocus" @blur="aboutInputBlur" v-model="spot.about"
                        class="about-input w-full h-56 focus:outline-none" placeholder="Write the about text..."></textarea>
                        <button class="center-icon pl-2 focus:outline-none" @click="clearAboutInput">
                            <client-only>
                                <unicon name="times" fill="#4299e1" width="18" height="18" />
                            </client-only>
                        </button>
                    </div>
                </div>
            </div>

            <div id="tags">
                <div class="flex justify-between p-3 sticky top-0 bg-white">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="tagsToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit categories of this spot</h1>
                    <div class="categories"
                    v-for="(spot, index) in spotsArr"
                    :item="spot"
                    :index="index"
                    :key="index">
                        <div class="text-sm text-primary my-2">
                            <div class="flex justify-between px-3 py-1 border-b border-divide">
                                <h1 class="font-semibold text-theme text-base">
                                    {{ spot.charAt(0).toUpperCase() + spot.slice(1) }} spot
                                </h1>
                            </div>
                            <div class="flex flex-wrap my-2">
                                <div
                                v-for="point in core.categories[spot]"
                                :key="point">
                                    <input type="checkbox" :id="point" :name="spot + '-cbc'" class="hidden">
                                    <div class="mb-2 mr-1 category-container">
                                        <label :for="point" class="category rounded-full bg-uinput border-2 border-uinput px-2 text-xs font-semibold">
                                            {{ point.charAt(0).toUpperCase() + point.slice(1) }} point
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 class="text-center text-secondary italic mt-5 mb-8">OR</h1>
                    <h1 class="font-semibold text-lg text-black">Edit tags of this spot</h1>
                    <div class="tags"
                    v-for="tagCateg in tagsArr"
                    :key="tagCateg">
                        <div class="text-sm text-primary my-2">
                            <div class="flex justify-between px-3 py-1 border-b border-divide">
                                <h1 class="font-semibold text-theme text-base">
                                    {{ tagCateg.charAt(0).toUpperCase() + tagCateg.slice(1) }}
                                </h1>
                            </div>
                            <div class="flex flex-wrap my-2">
                                <div
                                v-for="tag in core.tags[tagCateg]"
                                :key="tag">
                                    <input type="checkbox" :id="tag" :name="tagCateg + '-cbt'" class="hidden">
                                    <div class="mb-2 mr-1 tag-container">
                                        <label :for="tag" class="tag rounded-full bg-uinput border-2 border-uinput px-2 text-xs font-semibold">
                                            {{ tag }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact">
                <div class="flex justify-between p-3 sticky top-0 bg-white">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="contactToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit the contact info of this spot</h1>
                    <div class="my-5">
                        <div class="my-3">
                            <h1 class="text-sm text-primary font-semibold px-2">Phone number for reservations</h1>
                            <input type="text" placeholder="Enter the phone number..." v-model="spot.phone"
                            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contactInput">
                        </div>
                        <div class="my-3">
                            <h1 class="text-sm text-primary font-semibold px-2">Website</h1>
                            <input type="text" placeholder="Enter the web address..." v-model="spot.web"
                            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contactInput">
                        </div>
                        <div class="my-3">
                            <h1 class="text-sm text-primary font-semibold px-2">Email</h1>
                            <input type="text" placeholder="Enter the email..." v-model="spot.email"
                            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contactInput">
                        </div>
                        <div class="my-3">
                            <h1 class="text-sm text-primary font-semibold px-2">Instagram profile</h1>
                            <input type="text" placeholder="Enter the instagram name..." v-model="spot.instagram"
                            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contactInput">
                        </div>
                        <div class="my-3">
                            <h1 class="text-sm text-primary font-semibold px-2">Facebook page</h1>
                            <input type="text" placeholder="Enter the facebook name..." v-model="spot.facebook"
                            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contactInput">
                        </div>
                    </div>
                </div>
            </div>

            <div id="ohours">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="ohoursToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit the opening hours of this spot</h1>
                    <div class="mt-5 mb-3">
                        <h1 class="text-secondary text-sm text-center">Choose two initial values and press 
                            <button class="font-semibold text-primary focus:outline-none" @click="fillOut">FILL OUT</button>
                        </h1>
                    </div>
                    <table class="table-auto text-sm rounded-md w-full">
                        <tbody class="text-secondary">
                            <tr id="div-0" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Monday</td>
                                <td class="pr-3">
                                    <input type="time" id="firstValue" name="from" v-model="spot.openingHrs.monday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" id="secondValue" name="to" v-model="spot.openingHrs.monday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="0" class="hidden">
                                    <label for="0" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                            <tr id="div-1" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Tuesday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="spot.openingHrs.tuesday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="spot.openingHrs.tuesday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="1" class="hidden">
                                    <label for="1" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                            <tr id="div-2" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Wednesday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="spot.openingHrs.wednesday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="spot.openingHrs.wednesday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="2" class="hidden">
                                    <label for="2" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                            <tr id="div-3" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Thursday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="spot.openingHrs.thursday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="spot.openingHrs.thursday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="3" class="hidden">
                                    <label for="3" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                            <tr id="div-4" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Friday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="spot.openingHrs.friday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="spot.openingHrs.friday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="4" class="hidden">
                                    <label for="4" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                            <tr id="div-5" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Saturday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="spot.openingHrs.saturday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="spot.openingHrs.saturday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="5" class="hidden">
                                    <label for="5" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                            <tr id="div-6" class="closedDay-transition">
                                <td class="pl-1 pr-4 py-1 text-primary">Sunday</td>
                                <td class="pr-3">
                                    <input type="time" name="from" v-model="spot.openingHrs.sunday.from"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td class="pr-3">
                                    <input type="time" name="to" v-model="spot.openingHrs.sunday.to"
                                    class="rounded-md border border-bordercol h-6 w-16 focus:outline-none pl-1 bg-white">
                                </td>
                                <td>
                                    <input type="checkbox" name="closedStateController" @click="changeClosedState($event)" id="6" class="hidden">
                                    <label for="6" class="text-xs font-semibold pr-1 py-1">Closed</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="image">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="imageToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg text-black">Edit the picture of the spot</h1>
                    <h1 class="text-sm text-secondary">I recommend horizontal, it looks better after cropping</h1>
                    <div class="flex items-center justify-center my-8">
                        <input type="file" @change="processImage" accept="image/*" id="addImage" class="hidden">
                        <label v-if="updatedPicture == true" for="addImage">
                            <client-only>
                                <unicon name="image-plus" fill="#208325" />
                            </client-only>
                        </label>
                        <label v-else for="addImage">
                            <client-only>
                                <unicon name="image-plus" fill="grey" />
                            </client-only>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import AuthService from '~/server/services/AuthService'
import { Loader } from 'google-maps'
export default {
    components: {
        BeforeLoading
    },
    data() {
        return {
            spotId: this.$route.params.spotId,
            usr: '',
            picture: '',
            updatedPicture: Boolean,
            spot: {
                name: '',
                address: '',
                categories: {
                    drink: [],
                    food: [],
                    chill: [],
                    shop: [],
                    music: []
                },
                tags: {
                    price: [],
                    services: [],
                    atmosphere: [],
                    environment: [],
                    size: [],
                    smoking: [],
                    food: [],
                    beverages: [],
                    events: [],
                    entertainment: [],
                    stock: []
                },
                rating: {
                    sum: null,
                    count: null,
                    avg: null
                },
                comments: [],
                openingHrs: {
                    monday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    tuesday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    wednesday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    thursday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    friday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    saturday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    sunday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    }
                },
                about: '',
                phone: '',
                web: '',
                facebook: '',
                instagram: '',
                email: '',
            },
            gmapsApiKey: process.env.gmapsApiKey,
            categories: {
                drink: [],
                food: [],
                chill: [],
                shop: [],
                music: []
            },
            tags: {
                price: [],
                services: [],
                atmosphere: [],
                environment: [],
                size: [],
                smoking: [],
                food: [],
                beverages: [],
                events: [],
                entertainment: [],
                stock: []
            },
            core: {
                categories: {
                    drink: [],
                    food: [],
                    chill: [],
                    shop: [],
                    music: []
                },
                tags: {
                    price: [],
                    services: [],
                    atmosphere: [],
                    environment: [],
                    size: [],
                    smoking: [],
                    food: [],
                    beverages: [],
                    events: [],
                    entertainment: [],
                    stock: []
                }
            },
            spotsArr: ['drink', 'food', 'chill', 'shop', 'music'],
            tagsArr: ['price', 'services', 'atmosphere', 'environment', 'size', 'smoking', 'food', 'beverages', 'events', 'entertainment', 'stock'],
        }
    },
    async mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (usrExists) {
            this.usr = usrExists
        }
        if (window.google) {
            window.google = {}
        }
        // getting spot's data and storing them
        try {
            const response = await axios.get('/api/spot/profile', {
                params: {
                    spotId: this.spotId
                }
            })
            this.spot = response.data.spot
            if (response.data.picture) {
                this.picture = response.data.picture
            }
        } catch (error) {
            console.log(error)
        }
        // getting core data and storing them
        try {
            const response = await axios.get('/api/core')
            this.core.categories = response.data.core[0].categories
            this.core.tags = response.data.core[0].tags
        } catch (error) {
            console.log(error)
        }
        // checking already assigned tags and categories
        this.$nextTick(() => {
            for (var i = 0; i < this.spotsArr.length; i++) {
                const selectedCateg = document.querySelectorAll('input[name='+ this.spotsArr[i] +'-cbc]')
                for (var j = 0; j < selectedCateg.length; j++) {
                    if (this.spot.categories[this.spotsArr[i]].includes(selectedCateg[j].id)) {
                        selectedCateg[j].checked = true
                    }
                }
            }
            for (var i = 0; i < this.tagsArr.length; i++) {
                const selectedTags = document.querySelectorAll('input[name='+ this.tagsArr[i] +'-cbt]')
                for (var j = 0; j < selectedTags.length; j++) {
                    if (this.spot.tags[this.tagsArr[i]].includes(selectedTags[j].id)) {
                        selectedTags[j].checked = true
                    }
                }
            }
        })
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        goBack() {
            history.go(-1)
        },
        async saveChanges() {
            try {
                await axios.post('/api/spot/edit', {
                    spotId: this.spotId,
                    name: this.spot.name,
                    address: this.spot.address,
                    about: this.spot.about,
                    tags: this.tags,
                    categories: this.categories,
                    phone: this.spot.phone,
                    web: this.spot.web,
                    instagram: this.spot.instagram,
                    facebook: this.spot.facebook,
                    email: this.spot.email,
                    openingHrs: this.spot.openingHrs,
                    picture: this.picture
                })
                location.reload()
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            spotId: this.spotId,
                            name: this.spot.name,
                            address: this.spot.address,
                            about: this.spot.about,
                            tags: this.tags,
                            categories: this.categories,
                            phone: this.spot.phone,
                            web: this.spot.web,
                            instagram: this.spot.instagram,
                            facebook: this.spot.facebook,
                            email: this.spot.email,
                            openingHrs: this.spot.openingHrs,
                            picture: this.picture
                        })
                        location.reload()
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
        async showMap() {
            if (window.google) {
                window.google = {}
            }
            var self = this
            var mapContainer = document.getElementById('map')
            mapContainer.style.height = '21rem'
            document.getElementById('locationInputContainer').style.borderColor = '#963c61'
            if (this.spot.address.length >= 1) {
                document.getElementById('clearLocationBtn').style.opacity = 1
                document.getElementById('clearLocationBtn').disabled = false
            }

            const loader = new Loader(self.gmapsApiKey, {libraries: ['places']})
            const google = await loader.load()
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 48.148598, lng: 17.107748 },
                zoom: 14,
                mapTypeId: 'roadmap'
            })
            const input = document.getElementById('pac-input')
            const searchBox = new google.maps.places.SearchBox(input)
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds())
            })
            var markers = []
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces()
                if (places.length == 0) {
                    return
                }
                markers.forEach(function(marker) {
                    marker.setMap(null)
                })
                markers = []
                var bounds = new google.maps.LatLngBounds()
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log('Returned place contains no geometry')
                        return
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    }
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }))
                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport)
                    } else {
                        bounds.extend(place.geometry.location)
                    }
                })
                self.spot.address = places[0].formatted_address
                map.fitBounds(bounds)
            })
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToName() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('name').style.display = 'block'
        },
        nameToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('name').style.display = 'none'
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToLocation() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('location').style.display = 'block'
        },
        locationToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('location').style.display = 'none'
        },
        clearLocationInput() {
            this.spot.address = ''
            document.getElementById('clearLocationBtn').style.opacity = 0
            document.getElementById('clearLocationBtn').disabled = true
        },
        showClearLocationBtn() {
            if (this.spot.address.length >= 1) {
                document.getElementById('clearLocationBtn').style.opacity = 1
                document.getElementById('clearLocationBtn').disabled = false
            } else {
                document.getElementById('clearLocationBtn').style.opacity = 0
                document.getElementById('clearLocationBtn').disabled = true
            }
        },
        blurLocationInput() {
            document.getElementById('locationInputContainer').style.borderColor = '#cccccc'
        },
//////////////////////////////////////////////////////////////////////////////////        
        indexToAbout() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('about').style.display = 'block'
        },
        aboutToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('about').style.display = 'none'
        },
        aboutInputFocus() {
            document.getElementById('aboutInputContainer').style.borderColor = '#963c61'
        },
        aboutInputBlur() {
            document.getElementById('aboutInputContainer').style.borderColor = '#cccccc'
        },
        clearAboutInput() {
            this.spot.about = ''
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToTags() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('tags').style.display = 'block'
        },
        tagsToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('tags').style.display = 'none'
        },
//////////////////////////////////////////////////////////////////////////////////     
        indexToContact() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('contact').style.display = 'block'
        },
        contactToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('contact').style.display = 'none'
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToOhours() {
            document.getElementById('index').style.display = 'none'
            for (var i = 0; i < 7; i++) {
                if (i == 0) {
                    if (this.spot.openingHrs.monday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
                if (i == 1) {
                    if (this.spot.openingHrs.tuesday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
                if (i == 2) {
                    if (this.spot.openingHrs.wednesday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
                if (i == 3) {
                    if (this.spot.openingHrs.thursday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
                if (i == 4) {
                    if (this.spot.openingHrs.friday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
                if (i == 5) {
                    if (this.spot.openingHrs.saturday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
                if (i == 6) {
                    if (this.spot.openingHrs.sunday.closed == true) {
                        document.getElementById('div-' + i).classList.add('bg-red-200')
                        document.getElementById(i).checked = true
                    }
                }
            }
            document.getElementById('ohours').style.display = 'block'
        },
        ohoursToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('ohours').style.display = 'none'
        },
        changeClosedState(event) {
            if (event.target.checked) {
                if (event.target.id == 0) {
                    this.spot.openingHrs.monday.closed = true
                    this.spot.openingHrs.monday.from = ''
                    this.spot.openingHrs.monday.to = ''
                }
                if (event.target.id == 1) {
                    this.spot.openingHrs.tuesday.closed = true
                    this.spot.openingHrs.tuesday.from = ''
                    this.spot.openingHrs.tuesday.to = ''
                }
                if (event.target.id == 2) {
                    this.spot.openingHrs.wednesday.closed = true
                    this.spot.openingHrs.wednesday.from = ''
                    this.spot.openingHrs.wednesday.to = ''
                }
                if (event.target.id == 3) {
                    this.spot.openingHrs.thursday.closed = true
                    this.spot.openingHrs.thursday.from = ''
                    this.spot.openingHrs.thursday.to = ''
                }
                if (event.target.id == 4) {
                    this.spot.openingHrs.friday.closed = true
                    this.spot.openingHrs.friday.from = ''
                    this.spot.openingHrs.friday.to = ''
                }
                if (event.target.id == 5) {
                    this.spot.openingHrs.saturday.closed = true
                    this.spot.openingHrs.saturday.from = ''
                    this.spot.openingHrs.saturday.to = ''
                }
                if (event.target.id == 6) {
                    this.spot.openingHrs.sunday.closed = true
                    this.spot.openingHrs.sunday.from = ''
                    this.spot.openingHrs.sunday.to = ''
                }
                document.getElementById('div-' + event.target.id).classList.add('bg-red-200')
                var timeInputsFrom = document.querySelectorAll('input[name=from]')
                timeInputsFrom[event.target.id].value = ''
                var timeInputsTo = document.querySelectorAll('input[name=to]')
                timeInputsTo[event.target.id].value = ''
            } else {
                if (event.target.id == 0) {
                    this.spot.openingHrs.monday.closed = false
                }
                if (event.target.id == 1) {
                    this.spot.openingHrs.tuesday.closed = false
                }
                if (event.target.id == 2) {
                    this.spot.openingHrs.wednesday.closed = false
                }
                if (event.target.id == 3) {
                    this.spot.openingHrs.thursday.closed = false
                }
                if (event.target.id == 4) {
                    this.spot.openingHrs.friday.closed = false
                }
                if (event.target.id == 5) {
                    this.spot.openingHrs.saturday.closed = false
                }
                if (event.target.id == 6) {
                    this.spot.openingHrs.sunday.closed = false
                }
                document.getElementById('div-' + event.target.id).classList.remove('bg-red-200')
            }
        },
        fillOut() {
            var openingHrsFrom = document.querySelectorAll('input[name=from]')
            for (var i = 0; i < openingHrsFrom.length; i++) {
                openingHrsFrom[i].value = document.getElementById('firstValue').value
                if (i === 0) {
                    this.spot.openingHrs.monday.from = openingHrsFrom[i].value
                }
                if (i === 1) {
                    this.spot.openingHrs.tuesday.from = openingHrsFrom[i].value
                }
                if (i === 2) {
                    this.spot.openingHrs.wednesday.from = openingHrsFrom[i].value
                }
                if (i === 3) {
                    this.spot.openingHrs.thursday.from = openingHrsFrom[i].value
                }
                if (i === 4) {
                    this.spot.openingHrs.friday.from = openingHrsFrom[i].value
                }
                if (i === 5) {
                    this.spot.openingHrs.saturday.from = openingHrsFrom[i].value
                }
                if (i === 6) {
                    this.spot.openingHrs.sunday.from = openingHrsFrom[i].value
                }
            }
            var openingHrsTo = document.querySelectorAll('input[name=to]')
            for (var i = 0; i < openingHrsTo.length; i++) {
                openingHrsTo[i].value = document.getElementById('secondValue').value
                if (i === 0) {
                    this.spot.openingHrs.monday.to = openingHrsTo[i].value
                }
                if (i === 1) {
                    this.spot.openingHrs.tuesday.to = openingHrsTo[i].value
                }
                if (i === 2) {
                    this.spot.openingHrs.wednesday.to = openingHrsTo[i].value
                }
                if (i === 3) {
                    this.spot.openingHrs.thursday.to = openingHrsTo[i].value
                }
                if (i === 4) {
                    this.spot.openingHrs.friday.to = openingHrsTo[i].value
                }
                if (i === 5) {
                    this.spot.openingHrs.saturday.to = openingHrsTo[i].value
                }
                if (i === 6) {
                    this.spot.openingHrs.sunday.to = openingHrsTo[i].value
                }
            }
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToImage() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('image').style.display = 'block'
        },
        imageToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('image').style.display = 'none'
        },
        processImage(event) {
            const picture = event.target.files[0]
            this.createBase64Image(picture)
        },
        createBase64Image(fileObject) {
            const reader = new FileReader()
            reader.onload = (event) => {
                this.picture = event.target.result
                this.updatedPicture = true
            }
            reader.readAsDataURL(fileObject)
        },
    }
}
</script>

<style scoped>

/* basic css ------------------------------------------------------------------- */
#afterLoading {
    display: none;
}
.divider {
    background-color: rgb(250, 250, 250);
}
.contentInput {
    transition: 200ms;
}
/* hide sections css ----------------------------------------------------------- */
#name {
    display: none;
}
#location {
    display: none;
}
#about {
    display: none;
}
#tags {
    display: none;
}
#contact {
    display: none;
}
#ohours {
    display: none;
}
#image {
    display: none;
}
/* other css ------------------------------------------------------------------- */
#pac-input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#clearLocationBtn {
    opacity: 0;
    transition: 200ms;
}
#locationInputContainer {
    transition: 200ms;
}

.about-input {
    resize: none;
    background: transparent;
    transition: none;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
}
#aboutInputContainer {
    transition: 200ms;
}

.tags input[type=checkbox]:checked + .tag-container > .tag {
    border-color: #38a169;
}
.tag {
    transition: 200ms;
}
.categories input[type=checkbox]:checked + .category-container > .category {
    border-color: #38a169;
}
.category {
    transition: 200ms;
}

.contactInput {
    transition: 200ms;
}
</style>