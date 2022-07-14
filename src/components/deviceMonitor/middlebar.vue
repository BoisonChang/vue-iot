<template>
reloadData: {{reloadData}}
    <div class="mobileTitle col-12 d-block d-lg-none py-3">
        <div class="row mx-3 my-2">
            <div class="col-12 pl-0">
                <label class="title">
                    <span data-i18n="monitoringDevice">{{$t('monitoringDevice')}}</span>
                    <p class="title_border border_blue mt-4"></p>
                </label>
            </div>
        </div>
    </div>
    <div class="row middle-bar ">
        <!-- [section]search-bar -->
        <div class="col-md-6 col-sm-5 col-12">
            <div class="card card-effect mx-3 mx-md-0 h-100">
                <div class="card-body py-3 card-search">
                    <SearchBar @getSearch="setSearchState" />   
                </div>
            </div>  
        </div>
        <!--更新倒數 START-->
        <div class="col-md-6 col-sm-5 col-12">
            <Timer  
            :countdownStart="countdownStart"
            @getCountdownResult="reloadData" /> 
        </div>
    </div>   
    <!-- <h2> {{ search }} </h2>  -->
</template>

<script setup>
import SearchBar from '@/components/comm/SearchBar'
import Timer from '@/components/comm/Timer'
import { useStore } from 'vuex';
import { ref } from 'vue'

const store = useStore()
const countdownStart = ref(15)

const setSearchState = searchInput => {
    store.commit('setState', {key: 'search', value: searchInput})     
}
const reloadData = ref(0)



</script>

<style>
    .middle-bar{
        margin-top: 20px;
    }
    .card-search{
        border-left: 6px solid #24AEDF;
    }
    .card-count{
        border-left: 6px solid #FFCB00;
    }
    .timerColor {
        background: transparent !important;
        color: #067a8f !important;
        border-color: transparent !important;
        width: 100%;
        font-family: sans-serif;
        font-size: 28px;
        font-weight: bold;
        border-style: solid;
    }
    .border_blue {
        border-color: #24AEDF;
    }
    .title {
        font-weight: 900;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0.06em;
        text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    }
    .title_border {
        border-bottom: 3px solid;
        width: 47.5px;
        -webkit-margin-start: 0% !important;
        margin-inline-start: 0% !important;
    }

@media screen and (max-width: 768px){
    #m_timer {
        font-size: 18px;
    }
}

@media screen and (max-width: 576px){
    .time-card {
        margin-top: 1rem;
        white-space:nowrap;
    }
    body .sideBar_container, .d-xs-none {
        display: none;
    }
    #m_timer {
        font-size: 28px;
    }
}



</style>