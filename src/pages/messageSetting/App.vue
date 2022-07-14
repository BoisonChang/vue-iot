<template>
    <div class="wrapper d-flex w-100 align-items-stretch">
        <div class="container-fluid container-fluid-main w-100 mh-100 px-md-3 px-lg-5 my-3">
            <switchButtonBar />
            <toolButtonBar />
            <messageBox />
            <modal />
        </div>
    </div>
</template>

<script>
import switchButtonBar from '@/components/messageSetting/switchButtonBar.vue';
import toolButtonBar from '@/components/messageSetting/toolButtonBar.vue';
import messageBox from '@/components/messageSetting/messageBox.vue';
import modal from '@/components/messageSetting/modal.vue';

export default {
    name: 'App',
        components: {
            switchButtonBar,
            toolButtonBar,
            messageBox,
            modal
        },
}
</script>



<script setup>
import {  onMounted } from 'vue'
import { useStore } from "vuex";
const store = useStore()
const init = () => {
    store.dispatch('handInitERR')
    store.dispatch('handInitRUL')
    store.dispatch('handInitMA')
}

onMounted(() => {
    init()
})
</script>

<style >

body {
    color: #23595E;
    background-color: #F5F9FC;
    font-family: 'Noto Sans TC','微軟正黑體','Microsoft JhengHei',Arial,sans-serif;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
}
body .btn-white .material-icons, body .nav-item .tab_icon .material-icons, body .dropdown-item .material-icons {
    font-size: 18px;
    padding-bottom: 4px;
}
body .container-fluid-main {
    max-width: 1366px;
}

.material-icons {
    vertical-align: middle;
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
}

@media screen and (max-width: 1300px){
    .outter-tab-btns .nav-item .tab_icon i {
        display: block;
    }
}



</style>

