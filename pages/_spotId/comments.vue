<template>
    <div>
        <div id="afterLoading">
            <div class="flex justify-start m-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <!-- <button class="material-icons text-secondary font-light focus:outline-none" @click="goBack">arrow_back</button> -->
                    <client-only>
                        <button class="focus:outline-none center-icon" @click="goBack">
                            <unicon name="arrow-left" fill="grey" />
                        </button>
                    </client-only>
                </div>
            </div>
            <Comments :key="reload" />
            <div v-if="usr" class="flex w-screen comment-container-div text-sm mx-auto items-end p-2 relative border-t border-divide">
                <img src="~/assets/images/profile_pics/users/default.png" alt="User's profile picture"
                class="object-cover rounded-full w-10 h-10 border border-divide mr-2">
                <div class="flex w-full border border-divide comment-div items-end">
                    <textarea name="commentText" id="commentText" v-model="text" @focus="commentFocus" @blur="commentBlur" @input="commentInput"
                    class="comment-text-div px-3 focus:outline-none w-full h-10 self-center" :placeholder="'Write comment as ' + usr + '...'"></textarea>
                    <button class="comment-post-btn text-blue-500 font-semibold mr-3 focus:outline-none" id="comment-post-btn" @click="postComment">Post</button>
                </div>
            </div>
            <div v-else class="flex w-screen comment-container-div text-sm mx-auto items-end p-2 relative border-t border-divide justify-center h-12 items-center">
                <nuxt-link to="/a" class="text-red-600 font-semibold flex items-center justify-center">
                    If you wish to comment, please sign in.
                    <client-only>
                        <unicon name="sign-in-alt" fill="#e53e3e" width="18" height="18" class="pl-2" />
                    </client-only>
                </nuxt-link>
            </div>
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import Comments from '~/components/spot-additional/Comments'
export default {
    components: {
        BeforeLoading, Comments
    },
    data() {
        return {
            text: '',
            reload: null,
            usr: '',
            spotId: this.$route.params.spotId
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (usrExists) {
            this.usr = usrExists
            this.$nextTick(() => {
                document.getElementById('comment-post-btn').style.opacity = 0
                var commentText = document.getElementById('commentText')
                commentText.oninput = function() {
                    if (commentText.scrollHeight <= 100) {
                        commentText.style.height = ''
                        commentText.style.height = Math.min(commentText.scrollHeight) + 'px'
                    }
                }
            })
        }
    },
    methods: {
        async postComment() {
            try {
                await axios.post('/api/comments/post', {
                    spotId: this.spotId,
                    user: this.usr,
                    text: this.text
                })
                this.reload += 1
                this.text = ''
                this.commentBlur()
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/comments/post', {
                            spotId: this.spotId,
                            user: this.usr,
                            text: this.text
                        })
                        this.reload += 1
                        this.text = ''
                        this.commentBlur()
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
        goBack() {
            history.go(-1)
        },
        commentFocus() {
            if (this.text.length >= 1) {
                document.getElementById('comment-post-btn').style.opacity = 1
            }
        },
        commentBlur() {
            if (this.text.length == 0) {
                document.getElementById('comment-post-btn').style.opacity = 0
            }
        },
        commentInput() {
            if (this.text.length >= 1) {
                document.getElementById('comment-post-btn').style.opacity = 1
            } else if (this.text.length == 0) {
                document.getElementById('comment-post-btn').style.opacity = 0
            }
        }
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
.comment-container-div {
    position: fixed;
    bottom: 0%;
    background-color: rgb(250, 250, 250);
}
.comment-div {
    border-radius: 1.2rem;
    background-color: white;
}
.comment-text-div {
    resize: none;
    background: transparent;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    transition: none;
}
.comment-post-btn {
    padding-top: 0.55rem;
    padding-bottom: 0.55rem;
}
#comment-post-btn {
    transition: 200ms;
}
</style>