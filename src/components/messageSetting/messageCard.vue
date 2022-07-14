<template>
    <div v-if="store.getters.sampleMsg.length"  class="model-cards-wrapper">
        <div v-on:click="switchMsgId(sampleMsgId)"  class="model-card card-effect my-3">
            <div :class="{ active: store.state.msgUseId ===  sampleMsgId }" class="card-body bg-white shadow-sm rounded" data-fl-notifymsgid="MSG_DEF_ERR" data-fl-isdefault="true">
                <div data-fl-name="notifymsgid" hidden="">MSG_DEF_ERR</div>
                <div data-fl-name="isDefault" hidden="">true</div>
                <div class="model-content text-center">
                    <div class="row">
                        <div class="col-md-4 mb-md-0 mb-3">
                            <span class="model-name-badge auxiliary-bg tertiary-color py-1 px-1 rounded">{{  $t('modelNameBadge')  }}</span >
                        </div>
                        <div class="col-md-8 model-name-wrapper">
                            <span class="model-name tertiary-color px-3" data-fl-name="name">{{ sampleMsgName
                                 }}</span>
                        </div>
                        <hr class="my-3" style="width: 85%"/>
                        <div class="col-md-4 mb-md-0 mb-3">
                            <span class=" model-name-badge auxiliary-bg tertiary-color py-1 px-1 rounded">{{  $t('modelTitleBadge')  }}</span>
                        </div>
                        <div class="col-md-8">
                            <span class="model-title"></span>
                        </div>
                        <div class="col-md-12 text-end sendTypeContainer">
                            <span><i class="fas fa-envelope-square tertiary-color" data-fl-notifyawy="MAIL"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div  v-for="(item, index) in newMsg" :key="index" class="model-cards-wrapper">
        <div v-on:click="switchMsgId(item['id'])"  class="model-card card-effect my-3">
            <div :class="{ active:  store.state.msgUseId ===  item['id'] }" class="card-body bg-white shadow-sm rounded" data-fl-notifymsgid="MSG000000000000000000000000004" data-fl-isdefault="false">
                <button  v-on:click="deleteMsgClick(item['id'])"  :class="{ dnone: store.state.toolbtn.delete || store.state.editStatus }"   type="button"  class="btn btn-danger btn-sm p-0 btn-delete" >
                    <i class="material-icons">delete_forever</i>
                </button>
                <div data-fl-name="notifymsgid" hidden="">
                    MSG000000000000000000000000004
                </div>
                <div data-fl-name="isDefault" hidden="">false</div>
                <div class="model-content text-center">
                    <div class="row">
                        <div class="col-md-4 mb-md-0 mb-3">
                            <span class=" model-name-badge auxiliary-bg tertiary-color py-1  px-1 rounded " >範本名稱</span >
                        </div>
                        <div class="col-md-8 model-name-wrapper">
                            <span class="model-name tertiary-color px-3" data-fl-name="name" >{{ item['name'] }}</span >
                        </div>
                        <hr class="my-3" style="width: 85%" />
                        <div class="col-md-4 mb-md-0 mb-3">
                            <span class=" model-name-badge auxiliary-bg tertiary-color py-1 px-1 rounded " >範本標題</span >
                        </div>
                        <div class="col-md-8">
                            <span class="model-title">{{ item['i18nList'][0]['title'] }}</span>
                        </div>
                        <div class="col-md-12 text-end sendTypeContainer">
                            <span ><i class="fas fa-envelope-square tertiary-color" data-fl-notifyawy="MAIL" ></i ></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";


const store = useStore()


const switchMsgId = (useId) => {
    store.commit('clearMsgAdd')
    store.commit('setState', {'key': 'msgUseId' ,'value': useId})
    store.commit('setState', {'key': 'msgLang' ,'value': 'zh-TW'}) // 切換左側卡片(id)時重置語言到預設的繁中
}


// 將被選去欲刪除的id存到暫存，等到刪除面板確認後取出
// 打開是否確認刪除的面板
// 刪除完讓被選取的回到範本
const deleteMsgClick = (deletedId) => {
    store.commit('setState', {'key': 'msgDelIdTemp' ,'value': deletedId}) 
    store.commit('setState', {'key': 'delModal' ,'value': true}) 
    store.commit('setState', {'key': 'msgUseId' ,'value': store.state[store.state.msgType][0].id}) 
}


const sampleMsgName = computed(() => {
    if(store.getters.sampleMsg !== undefined){
        return store.getters.sampleMsg[0]?.name
    }
    return 'default'
})

const sampleMsgId = computed(() => {
    if(store.getters.sampleMsg !== false){
        return store.getters.sampleMsg[0]?.id
    }
    return 'default'
})

const newMsg = computed(() => {
    if(store.getters.newMsg !== false){
        return store.getters.newMsg
    }
    return 'default'    
})



</script>

<style>
.dnone{
    display: none;
}

.btn-delete {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 1000;
}
</style>






