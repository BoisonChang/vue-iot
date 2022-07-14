<template>
    <div class="wrapper wrapper d-flex w-100 align-items-stretch">
        <div class="container-fluid container-fluid-main w-100 mh-100 px-md-3 px-lg-5 my-3">
            <middlebar />
            <filterbar />
            <devicecard :originaldata="apidata" />
            <f-pagination class="pagination mt-5" :show-all-page-number="false" @afterDataUpdate="afterDataUpdate" :axiosConfigOpts="axiosConfigOpts" :serverSide="true" :key="getPageKey" />    
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from "vuex";
import middlebar from '@/components/deviceMonitor/middlebar'
import filterbar from '@/components/deviceMonitor/filterbar'
import devicecard from '@/components/deviceMonitor/devicecard'
import FPagination from '@/components/comm/FPagination';

const store = useStore();
let apidata = ref({})

const axiosConfigOpts = computed(() => {
    return{
        url: `${window.__env.url.CN_URL}api/dashboard/device/info/`, //config
        method: 'post',
        data: {
            field: getSearchData.value,
            groupBy: 'date',
            sort: getSortData.value?.sortByDevId ? 'devId' : 'status',
            direction: getSortData.value?.sortByLow ? 'asc' : 'desc',
        },
        headers: { ContentType: 'application/json; charset=utf-8' },   
    }          
})

const afterDataUpdate = api => {
    apidata.value = api.dataSource
}

const getSortData = computed(()=>{
    return store.state.sort;     
})

const getSearchData = computed(()=>{
    return store.state.search;     
})

const getPageKey = computed(() => {
    return store.state.pageKey; 
})

</script>

<style >
  .main{
      width: 100%;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
    } 
    body {
        position: relative;
        background-color: #F5F9FC;
        font-family: 'Noto Sans TC','微軟正黑體','Microsoft JhengHei',Arial,sans-serif;
        color: #23595E;
    }
    body .container-fluid-main {
        max-width: 1366px;
    }
    body .tertiary-color {
        color: #4ACBD6;
    }
    .wrapper{
        padding: 0 15px;
    }
    .container-fluid {
        padding-top: 10px;
        margin: 16px 0;
    }

    .btn-primary{
        background-color: #18a689;
        border-color: #18a689;
    }
    .btn-primary:hover{
        background-color: #198f77;
        border-color: #198f77; 
    }
    .card-effect {
        position: relative;
        border: none;
        -webkit-box-shadow: 0 1px 3px rgb(93 169 189 / 24%), 0 1px 2px rgb(93 169 189 / 24%);
        box-shadow: 0 1px 3px rgb(93 169 189 / 24%), 0 1px 2px rgb(93 169 189 / 24%);
        -webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .card-effect:hover {
        -webkit-box-shadow: 0 14px 28px rgb(96 185 209 / 24%), 0 10px 10px rgb(93 169 189 / 24%);
        box-shadow: 0 14px 28px rgb(96 185 209 / 24%), 0 10px 10px rgb(93 169 189 / 24%);
    }
</style>

