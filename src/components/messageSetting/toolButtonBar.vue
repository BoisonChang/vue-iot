<template>
    <div class="pt-3 px-3 px-sm-0 edit-action-row" id="toolBar">
        <div id="toolBtnGroup" class="col-md-12 d-xs-none btn-group px-0" role="group">
            <button v-on:click="switchToolBtn('edit')" :class="{ disabled: !store.state.toolbtn.edit}" type="button" id="btnMsgEdit" class="btn  btn-white editAction">
                <i class="material-icons text-secondary">edit</i>
                <span data-i18n="editData">{{  $t('editData')  }}</span>
            </button>
            <button v-on:click="switchToolBtn('delete')" :class="{ disabled: !store.state.toolbtn.delete}"  type="button" id="btnMsgDelete" class="btn btn-white editAction">
                <i class="material-icons text-danger">delete_forever</i>
                <span data-i18n="deleteTmpl">{{  $t('deleteTmpl')  }}</span>
            </button>
            <!-- 畫面跟資料分成兩個 event 獨立處理 -->
            <button v-on:click="switchToolBtn('save') ; saveMessage()"  :class="{ disabled: !store.state.toolbtn.save}"  type="button" id="btnMsgSave" class="btn btn-white saveAction" >
                <i class="material-icons">save</i>
                <span data-i18n="saveData">{{  $t('saveData')  }}</span>
            </button>
            <!-- 畫面跟資料分成兩個 event 獨立處理 -->
            <button v-on:click="switchToolBtn('cancel') ; cancelAction()" :class="{ disabled: !store.state.toolbtn.cancel}"  type="button" id="btnMsgCancel" class="btn btn-white cancelAction">
                <i class="material-icons">settings_backup_restore</i>
                <span data-i18n="editCancel">{{  $t('editCancel')  }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore()

const switchToolBtn = (btnStatus) => {
    store.commit("setToolBtn", btnStatus)
}

// 將 saveStatus 切換到 true 辨識已儲存過 content 資料，若是儲存資料後切換類別則下次切換回原類別載入暫存過的資料
const saveMessage = () => {
    store.commit('setState',  {'key': 'saveStatus', 'value': true});
}

const cancelAction = () => {
    store.commit("clearUnsavedData")  
}

</script>

<style >
.btn-group > .btn:first-child {
    border-radius: 50px;
}

.btn-group > .btn:last-child {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
}
.btn-white {
    color: #23595E;
    background-color: #fff;
    border-color: #F6F7FB;
    -webkit-box-shadow: 0px 4px 12px rgb(0 0 0 / 8%);
    box-shadow: 0px 4px 12px rgb(0 0 0 / 8%);
}
.btn-white.disabled, .btn-white:disabled {
    color: #C4C4C4;
    background-color: #fff;
    border-color: #ECECEC;
}
.btn-white:hover {
    color: #fff;
    background-color: #4ACBD6;
    border-color: #4ACBD6;
}
.btn-white:not(:disabled):hover > i {
    color: #fff !important;
}


#toolBtnGroup{
    width: 100%;
}

@media screen and (max-width: 576px){
    body .sideBar_container, .d-xs-none {
        display: none;
    }
}

</style>