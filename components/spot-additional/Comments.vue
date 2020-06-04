<template>
    <div>
        <div class="comments"
        v-for="comment in comments.slice().reverse()"
        :key="comment._id">
            <div class="flex p-3 border-t border-divide">
                <img src="~/assets/images/profile_pics/users/default.png" alt="User's profile photo"
                class="object-cover rounded-full w-10 h-10 border border-divide">
                <div class="text-sm mx-2 w-full">
                    <p class=""><span class="font-semibold text-black">{{ comment.author }} </span>{{ comment.text }}</p>
                    <p class="text-secondary text-xs">
                        <span class="mr-2">{{ calculateCommentTime(comment.date) }}</span>
                        <span v-if="comment.likes == 0"></span>
                        <span v-if="comment.likes == 1">{{ comment.likes }} like</span>
                        <span v-if="comment.likes >= 2">{{ comment.likes }} likes</span>
                    </p>
                </div>
                <div v-if="usr">
                    <input type="checkbox" name="likeBtns" :id="comment._id" @click="likeComment($event)" class="hidden">
                    <label :for="comment._id" class="likeBtn material-icons p-1 md-15 text-secondary"></label>
                </div>
                <div v-else>
                    <button class="material-icons p-1 md-15 md-icon-inactive" disabled>favorite</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Comments',
    data() {
        return {
            comments: [],
            spotId: this.$route.params.spotId,
            usr: '',
            alreadyLiked: []
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })

        // setting username variable
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (usrExists) {
            this.usr = usrExists
        }

        // getting comments data
        try {
            var self = this
            const response = await axios.get('/api/comments/get', {
                params: {
                    spotId: this.spotId
                }
            })
            self.comments = response.data.comments
        } catch (error) {
            console.log(error)
        }

        // getting data of already liked comments by user
        if (this.usr) {
            try {
                const response = await axios.post('/api/comments/already-liked', {
                    user: this.usr
                })
                this.alreadyLiked = response.data.alreadyLiked
                const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                for (var i = 0; i < checkboxes.length; i++) {
                    if (this.alreadyLiked.includes(checkboxes[i].id)) {
                        checkboxes[i].checked = true
                    }
                }
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        const response = await axios.post('/api/comments/already-liked', {
                            user: this.usr
                        })
                        this.alreadyLiked = response.data.alreadyLiked
                        const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                        for (var i = 0; i < checkboxes.length; i++) {
                            if (this.alreadyLiked.includes(checkboxes[i].id)) {
                                checkboxes[i].checked = true
                            }
                        }
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
        }

        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        calculateCommentTime(t) {
            const now = new Date()
            const time = new Date(t)
            const diff = now - time
            if (diff < 5*1000) {
                return 'now'
            }
            if (diff < 60*1000) {
                return 'few seconds ago'
            }
            if (60*1000 <= diff && diff < 60*60*1000) {
                const strDiff = diff.toString()
                if (strDiff.length == 5) {
                    return '1min'
                } else if (diff < 10*60*1000) {
                    const remainer = diff/6
                    const result = remainer.toString().charAt(0)
                    return result + 'min'
                } else if (10*60*1000 <= diff) {
                    const remainer = diff/6
                    const result = remainer.toString().charAt(0) + remainer.toString().charAt(1)
                    return result + 'min'
                }
            }
            if (60*60*1000 <= diff && diff < 24*60*60*1000) {
                if (diff < 10*60*60*1000) {
                    const remainer = diff/36
                    const result = remainer.toString().charAt(0)
                    return result + 'h'
                } else {
                    const remainer = diff/36
                    const result = remainer.toString().charAt(0) + remainer.toString().charAt(1)
                    return result + 'h'
                }
            }
            if (24*60*60*1000 <= diff && diff < 7*24*60*60*1000) {
                const strDiff = diff.toString()
                if (strDiff.length == 8) {
                    return '1d'
                } else if (strDiff.length == 9) {
                    const remainer = parseInt(strDiff)/864
                    const result = remainer.toString().charAt(0)
                    return result + 'd'
                }
            }
            if (7*24*60*60*1000 <= diff && diff < 4*7*24*60*60*1000) {
                const strDiff = diff.toString()
                if (strDiff.length == 9) {
                    return '1w'
                } else if (strDiff.length == 10) {
                    const remainer = parseInt(strDiff)/6048
                    const result = remainer.toString().charAt(0)
                    return result + 'w'
                }
            }
            if (4*7*24*60*60*1000 <= diff) {
                const temp = time
                const parsedDate = temp.toString().split(' ')
                return parsedDate[2] + ' ' + parsedDate[1] + ' ' + parsedDate[3]
            }
        },
        async likeComment(event) {
            if (event.target.checked) {
                try {
                    await axios.post('/api/comments/like', {
                        spotId: this.spotId,
                        commentId: event.target.id,
                        user: this.usr
                    })
                    var commentIndex = null
                    const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                    for (var i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].id === event.target.id) {
                            commentIndex = checkboxes.length - i - 1
                        }
                    }
                    this.comments[commentIndex].likes += 1
                } catch (error) {
                    if (error.response.data.errorMsg === 'Access expired.') {
                        try {
                            await axios.get('/api/renewAccess')
                            await axios.post('/api/comments/like', {
                                spotId: this.spotId,
                                commentId: event.target.id,
                                user: this.usr
                            })
                            var commentIndex = null
                            const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                            for (var i = 0; i < checkboxes.length; i++) {
                                if (checkboxes[i].id === event.target.id) {
                                    commentIndex = checkboxes.length - i - 1
                                }
                            }
                            this.comments[commentIndex].likes += 1
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
            } else {
                try {
                    await axios.post('/api/comments/unlike', {
                        spotId: this.spotId,
                        commentId: event.target.id,
                        user: this.usr
                    })
                    var commentIndex = null
                    const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                    for (var i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].id === event.target.id) {
                            commentIndex = checkboxes.length - i - 1
                        }
                    }
                    this.comments[commentIndex].likes -= 1
                } catch (error) {
                    if (error.response.data.errorMsg === 'Access expired.') {
                        try {
                            await axios.get('/api/renewAccess')
                            await axios.post('/api/comments/unlike', {
                                spotId: this.spotId,
                                commentId: event.target.id,
                                user: this.usr
                            })
                            var commentIndex = null
                            const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                            for (var i = 0; i < checkboxes.length; i++) {
                                if (checkboxes[i].id === event.target.id) {
                                    commentIndex = checkboxes.length - i - 1
                                }
                            }
                            this.comments[commentIndex].likes -= 1
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
            }
        }
    }
}
</script>

<style scoped>
.comments input[type=checkbox]:checked ~ .likeBtn:before {
    content: 'favorite';
    color: #e53e3e;
}
.comments input[type=checkbox] ~ .likeBtn:before {
    content: 'favorite_border';
    color: #808080;
}
</style>