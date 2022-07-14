<template>
    <div class="mobileTitle col-12 d-block d-sm-none py-3">
        <div class="row mx-3 my-2">
            <div class="col-12 ps-0">
                <label data-i18n="messageSetting" class="title"> {{$t('messageSetting')}}</label>
                <hr class="title_border border_blue">
            </div>
        </div>
    </div> 
    <div class="wrapper wrapper d-flex w-100 align-items-stretch justify-content-center">
        <div class="row w-75">
            <nav class="col-12 px-3 outter-tab-btns">
                <div class="nav nav-tabs nav-pill nav-justified nav-tabs-color" id="nav-tab" role="tablist">
                    <!--tab links section -->
                    <a v-on:click="switchMsgType('ERR')" :class="{ active: store.state.msgType === 'ERR' }" class="nav-item nav-link text-center mw-25 py-3" id="nav-error-tab" data-bs-toggle="tab" href="#" data-fl-type="ERR">
                        <div class="tab_icon">
                            <i class="material-icons    ">error</i>
                            <span data-i18n="errorCode">{{  $t('errorCode')  }}</span>
                        </div>
                    </a>
                    <a v-on:click="switchMsgType('RUL')"  :class="{ active: store.state.msgType === 'RUL' }" class="nav-item nav-link text-center mw-25 py-3" id="nav-rules-tab" data-bs-toggle="tab" href="#" data-fl-type="RUL">
                        <div class="tab_icon">
                            <i class="material-icons d-xs-icon">chrome_reader_mode</i>
                            <span data-i18n="ruleBase">{{  $t('ruleBase')  }}</span>
                        </div>
                    </a>
                    <a v-on:click="switchMsgType('MA')"  :class="{ active:store.state.msgType === 'MA' }" class="nav-item nav-link text-center mw-25 py-3" id="nav-maintenance-tab" data-bs-toggle="tab" href="#" data-fl-type="MA">
                        <div class="tab_icon">
                            <i class="material-icons d-xs-icon">build</i>
                            <span data-i18n="preventiveMaintenance">{{  $t('preventiveMaintenance')  }}</span>
                        </div>
                    </a>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore()

const switchMsgType = (type) => {
    if(!store.state.toolbtn.edit){ 
        // 當修改狀態下想要切換選單，不能直接切換要詢問確認因此先把切換值暫存
        store.commit('setState', {'key': 'msgTypeTemp' ,'value': type})   
        // 辨識此次 cancel modal 之觸發是由 msgType 改變造成的。 
        store.commit('setState', {'key': 'msgTypeStatus' ,'value': true}) 
        // 觸發 cancel modal ，但要整個執行完才觸發！！！！
        store.commit('setState', {'key': 'cancelcheck' ,'value': true})  
    } else {
         // 非修改狀態下直接切換選單
        store.commit('setState', {'key': 'msgType' ,'value': type}) 
        // 重置上方按鈕，但是否要用這個參數重置有待商榷
        store.commit('setToolBtn', 'save') 
    }
        // 切換類別時重置選取為範本即為陣列之 id
        store.commit('setState', {'key': 'msgUseId' ,'value': store.state[store.state.msgType][0].id}) 
        // 切換類別時重置語言為繁體中文
        store.commit('setState', {'key': 'msgLang' ,'value': 'zh-TW'}) 
        // 重置暫存內容，讀取 api 打回之初始內容
        store.commit('setState', {'key': 'msgChanged' ,'value': false}) 
        // 重置暫存內容，讀取 api 打回之初始內容
        store.commit('clearMsgAdd')
}

</script>

<style>
.nav-tabs .nav-link.active, .nav-tabs .nav-link:hover {
    color: #fff;
    background-color: #24AEDF;
    border-color: #dee2e6 #dee2e6 #24AEDF;
}

.nav-tabs .nav-link {
    color: #C4C4C4;
    background: #FAFAFA;
    -webkit-box-shadow: 0px 4px 12px rgb(0 0 0 / 8%);
    box-shadow: 0px 4px 12px rgb(0 0 0 / 8%);
    border: 1px solid transparent;
    border-radius: 0rem;
}

.title {
    font-weight: 900;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.06em;
    text-shadow: 0px 4px 4px rgb(0 0 0 / 25%); 
}

.border_blue {
    border-color: #24AEDF;
}

.title_border {
    border-bottom: 3px solid;
    width: 47.5px;
    -webkit-margin-start: 0% !important;
    margin-inline-start: 0% !important;
}

@media screen and (min-width: 320px) and (max-width: 842px) and (orientation: landscape){
    .mobileTitle, #index-nav {
        display: block !important;
    }
}

</style>