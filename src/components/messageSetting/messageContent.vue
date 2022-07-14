<template>
  <div class="setBoard_cube cube_topleft">
    <div class="setBoard_cube cube_topright"></div>
    <div class="setBoard_cube cube_middle"></div>
    <div class="setBoard_cube cube_bottom"></div>
  </div>
  <div class="msg-section">
     <div class="messageContent mx-auto px-md-5 px-3 position-relative">
      <div class="msg-lang-switcher d-flex justify-content-end my-4">
        <div class="btn-group lang-tabs" role="group" aria-label="lang-tabs">
          <button
            v-on:click="switchMsgLang('zh-TW')"
            :class="{ active: store.state.msgLang === 'zh-TW' }"
            type="button"
            class="btn langSwitchBtn"
            value="zh-TW"
          >
            正
          </button>
          <button
            v-on:click="switchMsgLang('zh-CN')"
            :class="{ active: store.state.msgLang === 'zh-CN' }"
            type="button"
            class="btn langSwitchBtn"
            value="zh-CN"
          >
            简
          </button>
          <button
            v-on:click="switchMsgLang('en')"
            :class="{ active: store.state.msgLang === 'en' }"
            type="button"
            class="btn langSwitchBtn"
            value="en"
          >
            EN
          </button>
        </div>
      </div>
      <div class="msg-content">
        <div data-fl-name="i18nId" hidden="">I18N007</div>
        <div class="msg-head click2edit mb-2">
          <div v-show="!store.state.editStatus"  class="card-title font-weight-bold mb-0" data-fl-name="title">
            {{ editTitle }}
          </div>
          <input @paste="onPasteUpload" v-show="store.state.editStatus" v-model="editTitle" class="card-title font-weight-bold mb-0">
          <div contenteditable>You can paste the image here</div>
        </div>
        <hr class="my-4" />
        <div class="text-content" data-fl-name="content">
          <div class="text-area" style="margin-bottom: 0.5rem;">
              <div class="msg-body" style="margin:0 0 1rem 0">
                <div class="uneditable" style="margin:0 0 3rem 0">
                  <div v-html="uneditContentTop"></div>
                </div>
                <span class="click2edit" style="">
                  <div v-show="!store.state.editStatus" v-html="editorContent"></div>
                  <div v-show="store.state.editStatus"><ckeditor :editor="editor" v-model="editorContent"   :config="editorConfig"></ckeditor></div>
                </span>
              </div>
              <div class="msg-footer">
                  <div v-html="uneditContentFooter"></div>
              </div>
          </div>
        </div>
        <div class="deco-wrapper p-0">
          <i class="fas fa-exclamation-triangle fa-10x"></i>
        </div>
      </div>
      <div class="sendBy-wrapper mt-3">
        <div class="row g-0">
          <div class="col-lg-8 col-md-6">
            <hr />
          </div>
          <div class="col-lg-4 col-md-6 sendBy text-center">
            <span class="text-muted">
              <i class="fas fa-paper-plane pe-1"></i> {{$t('sendBy')}}:
            </span>
            <button
              v-on:click="switchSendTypeList()"
              class="btn p-0 btn-notify active position-relative"
              :class ="{disabled: !store.state.editStatus}"
              data-fl-notifyway="MAIL"
            >
              <div v-show="store.state.msgAdd.sendTypeList !== '[]'" class="active-mark rounded-circle text-center">
                <i class="fas fa-check"></i>
              </div>
              <i class="fas fa-envelope-square tertiary-color fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="store.state.editStatus" class="btn-wrapper w-100 text-center my-3 d-block">
          <button  v-on:click="openModal()" class="btnSetModel btn btn-primary rounded-0 px-4 py-2">
              <span class="material-icons"> dashboard </span> {{$t('setModel')}}
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import Editor from "ckeditor5-custom-build-full/build/ckeditor.js" // 安裝網路上有人整理好的非官方包
import '@ckeditor/ckeditor5-build-classic/build/translations/pt';
const store = useStore();
const editor = ref(Editor);
const editorConfig = ref({
    removePlugins: ["ImageToolbar"],
    toolbar: {
      items: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'undo', 'redo',]
    },
});
const switchMsgLang = (lang) => {
  store.commit('setState',  {'key': 'msgLang', 'value': lang}, );
};
const openModal = () => {
  store.commit('setState', { 'key': 'addModal', 'value': true});
};
const switchSendTypeList = () => {
  if(store.state.msgAdd.sendTypeList === '[]'){
    store.commit('setStateObject', {'key1': 'msgAdd', 'key2': 'sendTypeList' , 'value':  '["MAIL"]'  });
  } else if (store.state.msgAdd.sendTypeList === '["MAIL"]'){
    store.commit('setStateObject', {'key1': 'msgAdd', 'key2': 'sendTypeList' , 'value':  '[]'});
  }
};
const getPartFromApiData = string => {
   if (store.getters.showMsg?.i18nList) {
    let part = ''
    const apiData = store.getters.showMsg?.i18nList.filter((item) => item.lang === store.state.msgLang)[0].content;
    const parser = new DOMParser().parseFromString(apiData, 'text/html');
    const apiDataContent = parser.getElementsByClassName(string)[0]?.innerHTML;
    part = apiDataContent || ' ';
    return part
  }
}
const setStateObjectLayer = (key2, value) => {
  store.commit('setStateObjectLayer', {'key1': 'msgAdd', 'key2': key2 , 'key3': store.state.msgLang, 'value': value});
}
const editTitle = computed({
  get: () => {
    if(store.state.msgAdd.title[store.state.msgLang]){
      return store.state.msgAdd.title[store.state.msgLang]
    } else {
      return store.getters.showMsg?.i18nList.filter((item) => item.lang === store.state.msgLang)[0].title;
    }
  },
  set: title => {
    setStateObjectLayer('title', title)
  }
})
const editorContent = computed({
  get: () => {
    if(store.state.msgAdd.content[store.state.msgLang]){
      return store.state.msgAdd.content[store.state.msgLang]
    } else {
      return getPartFromApiData('click2edit')
    }
  },
  set: content => {
    if(store.state.editStatus){
      setStateObjectLayer('content', content)
    }
  }
})
const uneditContentTop = computed(() => {
  setStateObjectLayer('contentTop', getPartFromApiData('uneditable'))
  return getPartFromApiData('uneditable')
})
const uneditContentFooter = computed(() => {
  setStateObjectLayer('contentFooter', getPartFromApiData('msg-footer'))
  return getPartFromApiData('msg-footer')
})
watch(
  ()=> store.state.saveStatus,
  ()=> {
    if(store.state.saveStatus){
      store.dispatch('handSave')
      // 將 saveStatus 切換到 false 關閉進入此迴圈。
      store.commit('setState',  {'key': 'saveStatus', 'value': false}, );  
    }
  }
)



// eslint-disable-next-line no-unused-vars
const onPasteUpload = (event) => {
  const dT = event.clipboardData || window.clipboardData;
  const file = dT.files[ 0 ];
  console.log( file );
}





</script>

<style  scoped lang="scss">

.msg-head input{
  width: 100%;
  padding: 10px;
  font-weight: 700;
  line-height: 1.5;
  color: #23595E;
  text-align: left;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  border: 1px solid #95a5a6;
}

.click2edit {
  overflow-y: hidden;
}

.cube_topleft {
  top: 0%;
  left: 0%;
}
.setBoard_cube {
  width: 16px;
  height: 16px;
  background: rgba(74, 203, 214, 0.6);
  position: absolute;
  width: 16px;
  height: 16px;
  background: rgba(74, 203, 214, 0.6);
  position: absolute;
  width: 16px;
  height: 16px;
  background: rgba(74, 203, 214, 0.6);
  position: absolute;
  width: 16px;
  height: 16px;
  background: rgba(74, 203, 214, 0.6);
  position: absolute;
}
.cube_topright {
  top: 0%;
  left: 200%;
}
.cube_middle {
  top: 100%;
  left: 100%;
}
.cube_bottom {
  top: 200%;
  left: 0%;
}
.mainWrapper {
  .msg-lang-switcher {
    .btn-group {
      & > .btn {
        &:first-child {
          border-radius: 2px;
        }
        &:last-child {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      }
    }
    .langSwitchBtn {
      color: #4acbd6;
      background-color: #e7f6fe;
      font-weight: bold;
      &.active {
        color: #fff;
        background-color: #4acbd6;
      }
      &:hover {
        background-color: #b2d3e4;
      }
    }
  }
  .text-area {
    max-height: 360px;
    overflow: auto;
  }
  .deco-wrapper {
    color: rgba(83, 187, 245, 0.05);
    position: absolute;
    right: -15%;
    bottom: -13%;
    font-size: 23px;
  }
}
.text-content {
  min-height: 350px;
}
.btn-notify {
  .active-mark {
    width: 16px;
    height: 16px;
    color: #ffffff;
    font-size: 10px;
    line-height: 40px;
    background: #40566e;
    border: 1px solid #ffffff;
    position: absolute;
    top: -6px;
    right: -6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.text-muted {
  color: #95a5a6 !important;
}
.btn-primary {
  color: #fff;
  background-color: #24aedf;
  border-color: #24aedf;
}

.note-editor.note-airframe .note-editing-area .note-editable,
.note-editor.note-frame .note-editing-area .note-editable {
  padding: 10px;
  overflow: auto;
  word-wrap: break-word;
}
</style>


