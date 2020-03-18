<template>
    <div class="global-messages-container">
        <div class="global-message" v-for="(message, index) in messages" :key="index" :class="getClass(message)">
            <div class="global-message__close" @click="removeMessage(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><g><g><path class="fill" d="M20.942.82a1.5 1.5 0 0 1 2.121 0l2.122 2.122a1.5 1.5 0 0 1 0 2.121l-7.94 7.939 7.94 7.94a1.5 1.5 0 0 1 0 2.121l-2.122 2.122a1.5 1.5 0 0 1-2.121 0l-7.94-7.94-7.939 7.94a1.5 1.5 0 0 1-2.121 0L.82 23.063a1.5 1.5 0 0 1 0-2.121l7.939-7.94L.82 5.063a1.5 1.5 0 0 1 0-2.121L2.943.82a1.5 1.5 0 0 1 2.121 0l7.939 7.939z"/></g></g></svg>
            </div>
            <div class="global-message__icons">
                <svg class="danger" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><g><g><g><path fill="#fff" d="M10.682 1.48l4.837 7.703a3.14 3.14 0 0 1-1.006 4.338 3.174 3.174 0 0 1-1.677.479H3.163A3.156 3.156 0 0 1 0 10.852c0-.59.167-1.169.48-1.67L5.318 1.48a3.172 3.172 0 0 1 5.365 0z"/></g><g><path fill="#ff004b" d="M8.843 11.185c.2-.21.3-.465.3-.765 0-.307-.1-.56-.3-.761a1.041 1.041 0 0 0-.772-.302c-.313 0-.57.1-.77.302-.2.2-.301.454-.301.76 0 .3.1.556.3.766.2.21.458.315.771.315.314 0 .571-.105.772-.315zm-1.486-2.9h1.429L9.143 4H7z"/></g></g></g>
                </svg>
                <svg class="warn" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17"><g><g><g><path fill="#251b01" d="M9 17A8.5 8.5 0 1 0 9 0a8.5 8.5 0 0 0 0 17z"/></g><g><path fill="#ffcb3e" d="M9.743 12.185c.2-.21.3-.465.3-.765 0-.307-.1-.56-.3-.761a1.041 1.041 0 0 0-.772-.302c-.313 0-.57.1-.77.302-.2.2-.301.454-.301.76 0 .3.1.556.3.766.2.21.458.315.771.315.314 0 .571-.105.772-.315zm-1.486-2.9h1.429L10.043 5H7.9z"/></g></g></g>
                </svg>
                <svg class="info" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17"><g><g><g><path fill="#fff" d="M9 17A8.5 8.5 0 1 0 9 0a8.5 8.5 0 0 0 0 17z"/></g><g><path fill="#209ce0" d="M10.67 3.843a1.066 1.066 0 0 0-.796-.343c-.31 0-.577.114-.8.343a1.143 1.143 0 0 0-.333.825c0 .322.112.596.334.822.222.227.488.34.8.34.31 0 .575-.113.795-.34.22-.226.33-.5.33-.822 0-.321-.11-.597-.33-.825zm-.106 8.695a1.361 1.361 0 0 1-.39.066c-.245 0-.417-.044-.517-.133-.1-.089-.149-.256-.149-.501 0-.098.015-.242.047-.432.03-.19.065-.36.103-.509l.473-1.846c.046-.17.078-.356.095-.56.017-.202.025-.344.025-.425 0-.39-.123-.705-.37-.95-.248-.243-.6-.365-1.056-.365-.254 0-.522.05-.806.15-.285.1-.582.219-.892.358L7 7.963c.093-.038.203-.078.332-.12.128-.042.254-.064.377-.064.25 0 .419.047.507.14.089.093.133.259.133.495 0 .131-.014.277-.043.435-.029.159-.065.327-.107.505l-.474 1.854c-.042.195-.073.369-.093.524-.019.154-.028.306-.028.454 0 .38.127.695.382.943.255.247.612.371 1.072.371.299 0 .561-.043.787-.13.226-.087.53-.213.909-.378l.126-.571a2.045 2.045 0 0 1-.316.117z"/></g></g></g>
                </svg>
                <svg class="success" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17"><g><g><g><path fill="#fff" d="M9 17A8.5 8.5 0 1 0 9 0a8.5 8.5 0 0 0 0 17z"/></g><g><path fill="none" stroke="#0cb957" stroke-miterlimit="50" stroke-width="1.5" d="M4.7 8.1v0l3.075 3.075v0L12.849 6.1v0"/></g></g></g>
                </svg>
            </div>
            <div class="global-message__title">{{$te(message.title) ? $t(message.title) : $t('server_error_default_title')}}</div>
            <div class="global-message__body">{{$te(message.message) ? $t(message.message) : $t('server_error_default')}}</div>
        </div>
    </div>
</template>

<script>
import  {mapState} from 'vuex';

export default {
    name: "GlobalMessages",
    computed: {
        ...mapState(['messages'])
    },
    methods: {
        getClass(message) {
            return message.type
        },
        removeMessage(messageIndex) {
            this.$store.dispatch('removeMessage', messageIndex)
        }
    }
}
</script>