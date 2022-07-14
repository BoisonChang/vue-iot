import { createStore } from 'vuex'
import * as api from '@/utils/api.js'
import {cloneDeep} from 'lodash';

export default createStore({
  state: {
    search: '',
    ERR: false,
    RUL: false,
    MA: false,
    msgType: 'ERR',
    msgTypeTemp: 'ERR',
    msgTypeStatus: false,
    msgLang: 'zh-TW',
    msgUseId: 0,
    msgDelId: 0,
    msgDelIdTemp: 0,
    msgDelIdAPI: [],
    msgAdd: {
      name: '',
      title: {
        'zh-TW': ``,
        'zh-CN': ``,
        'en': ``
      },
      content: {
        'zh-TW': ``,
        'zh-CN': ``,
        'en': ``
      },
      contentTop: {
        'zh-TW': ``,
        'zh-CN': ``,
        'en': ``
      },
      contentFooter: {
        'zh-TW': ``,
        'zh-CN': ``,
        'en': ``
      },
      sendTypeList: '["MAIL"]',
      sendTypeListTemp: '["MAIL"]'
    },
    msgChanged: false,
    msgChangedTemp: false,
    msgChangedSave: false,
    msgChangedSaveTemp: false,
    delModal: false,
    addModal: false,
    editStatus: false,
    saveStatus: false,
    cancelcheck: false,
    toolbtn: {
      edit: true,
      delete: true,
      save: false,
      cancel: false,
    },
    data: []
  },
  getters: {
    sampleMsg(state){
      if(state.search){
        return state[state.msgType].filter(item => item.id === state[state.msgType][0].id ).filter( msg =>  msg['name'].match(state.search))
      }
      return state[state.msgType] 
    },
    newMsg(state){
      if( state[state.msgType]){
        if(state.search){
          if(state.msgDelId || state.msgChanged){ 
            if (state.msgChanged){                  // 如果已經有元素被刪除時，讀取刪除後的內容
              state.msgChanged = state.msgChanged.filter( msg =>  msg['id'] !== state.msgDelId )
              return  state.msgChanged.slice(1).filter( msg => msg['name'].match(state.search) )  
            }
            state.msgChanged = state[state.msgType].filter( msg => msg['id'] !== state.msgDelId )
            return  state.msgChanged.slice(1).filter( msg =>  msg['name'].match(state.search) )                    
          }
          return state[state.msgType].slice(1).filter( msg =>  msg['name'].match(state.search))
        }
        if(state.msgDelId || state.msgChanged ){
          if (state.msgChanged ){     // 如果已經有元素被刪除或變更時，讀取刪除後的內容
            state.msgChanged = state.msgChanged.filter( msg => msg['id'] !== state.msgDelId )
            return state.msgChanged.slice(1)    // 保留 state.msgChanged 中 msg.msgId 為 0 的內容以便進入判斷式，但回傳時用 slice 篩選掉 msg.msgId 為 0 的範本
          }
          state.msgChanged = state[state.msgType].filter( msg => msg['id'] !== state.msgDelId )
          return  state.msgChanged.slice(1)    
        }
        return state[state.msgType].slice(1)
      }
    },
    showMsg(state) {          // 右側 messageContent 的內容
      if(state[state.msgType]){
        return state[state.msgType].find(msg => msg['id'] > state.msgUseId - 1 )
      } 
    }
  },
  mutations: {
    setState(state, { key, value }){
      state[key] = value
    },
    setStateObject(state, { key1, key2, value }){
      state[key1][key2] = value
    },
    setStateObjectLayer(state, { key1, key2, key3, value }){
      state[key1][key2][key3] = value
    },
    clearUnsavedData(state){
      state.msgDelId = 0
      state.msgDelIdAPI = []
      if(state.msgTypeStatus){        // 辨識此次 cancel modal 之觸發是由 msgType 改變造成的，則重置左側選單之暫存。
        state.msgChanged = false
        state.msgTypeStatus = false  
      }     
    },
    cancelConfirm(state, answer){       // cancel modal 被觸發
      if(answer === 'yes'){
        state.msgType = cloneDeep(state.msgTypeTemp)    // 此時才該讓 modal 暫存的 msgTypeTemp 啟動
        state.msgTypeTemp = cloneDeep(state.msgType)    // 同步
        state.msgUseId = state[state.msgType][0]['id']
        if(state.msgChangedSaveTemp){
          state.msgChanged = cloneDeep(state.msgChangedSaveTemp)
        }
        state.editStatus = false
        this.commit('clearUnsavedData')  // 確定不儲存資料，觸發 resetDeletMsgToolBtn 將暫存 msgDelId  state.msgChanged 清空
        this.commit('setToolBtn', 'save')   // 按 save 後會重置上方功能按鈕到預設狀態
        state.msgChangedSaveTemp = false
        this.commit('clearMsgAdd')
      } else if(answer === 'no'){
        state.cancelcheck = false
      }
    },
    setToolBtn(state, click){
      if(click === 'edit'){
        state.cancelcheck = false
        state.toolbtn.edit = false        // 按下 edit     
        state.toolbtn.delete = false      // 按下 edit   
        state.toolbtn.save = true         // 按下 edit   
        state.toolbtn.cancel = true        // 按下 edit   
        state.editStatus = true
      } else if(click === 'delete'){
        state.cancelcheck = false
        state.toolbtn.edit = false
        state.toolbtn.delete = false
        state.toolbtn.save = true 
        state.toolbtn.cancel = true
      } else if(click === 'save'){      // 此處之 save 不會儲存資料，單純改樣式跟 state，儲存資料的 mutation 分開到 saveMsg 處理
        state.toolbtn.edit = true
        state.toolbtn.delete = true
        state.toolbtn.save = false
        state.toolbtn.cancel = false
        state.editStatus = false
      } else if(click === 'cancel'){
        state.cancelcheck = true       // 觸發 cancel modal
      }
    },
    deleteConfirm(state, answer){
      // 在儲存前先把原本的內容存起來，若是取消時則重新取出
      if(!state.msgChangedSaveTemp){
        state.msgChangedSaveTemp = cloneDeep(state.msgChanged) || cloneDeep(state[state.msgType])
      }
      if(answer === 'yes'){
        state.msgDelId = state.msgDelIdTemp
        state.msgDelIdAPI.push( state[state.msgType].find(msg => msg['id'] >  state.msgDelId - 1 ).notifyMsgId )
        state.delModal = false
      } else if(answer === 'no'){
        state.delModal = false
      }
    },
    addConfirm(state, answer){


    
      if(answer == 'yes'){
        if (!state.msgChanged){  // 如果已經沒有元素被刪除時，讀取原本
          state.msgChanged = cloneDeep(state[state.msgType])
        }
        if(state.saveStatus){
          // eslint-disable-next-line no-unused-vars
          const { gmtCreate, gmtModified, id, ...msgChangedT } 
          = state.msgChanged.find(msg => msg['id'] > state.msgUseId - 1 ) 
          // eslint-disable-next-line no-unused-vars
          msgChangedT.i18nList = msgChangedT.i18nList.map(({gmtCreate, gmtModified, id, ...keepAttrs}) => keepAttrs)
          state.msgChangedTemp = msgChangedT
        } else {
          state.msgChangedTemp = state.msgChanged.find(msg => msg['id'] > state.msgUseId - 1 ) 
        }
        if(!state.msgUseId){
          state.msgUseId = state[state.msgType][0]['id']
        }

        let arrLang = ['zh-TW', 'zh-CN', 'en']
        arrLang.forEach(lang => {
          state.msgAdd.contentTop[lang] = `<div class="text-area" style="margin-bottom: 0.5rem"><div class="msg-body" style="margin:0 0 1rem 0"><div class="uneditable" style="margin:0 0 3rem 0">${state.msgAdd.contentTop[lang]}</div><span class="click2edit" style="">`
          state.msgAdd.contentFooter[lang] = `</span></div><div class="msg-footer">${state.msgAdd.contentFooter[lang]}</div></div>`
        })



        arrLang.forEach( (lang, index) => { 
          if (state.msgAdd.content[lang]){
            state.msgChangedTemp.i18nList[index]['content'] = `${state.msgAdd.contentTop[lang] + state.msgAdd.content[lang] + state.msgAdd.contentFooter[lang]}` 
          }
          state.msgChangedTemp.i18nList[index]['title'] = state.msgAdd.title[lang] ||  state[state.msgType].filter( item => item.id === state.msgUseId )[0]?.i18nList[index]['title']        
        })

        state.msgChangedTemp.name = state.msgAdd.name || state.msgChangedTemp.name
        state.msgChangedTemp.sendTypeList = state.msgAdd.sendTypeList
        state.msgChangedSave = cloneDeep(state.msgChangedTemp)       // 要給 API 使用的與暫存分開來存
        if(!state.saveStatus && state.editStatus){                   // 若是要新增，則需要 push 進左側暫存區
          state.msgChanged.push(cloneDeep(state.msgChangedTemp))
        }

        state.addModal = false
        this.commit('setToolBtn', 'save')   // 重置上方功能按鈕
      } else if(answer == 'no'){
        state.addModal = false
      }      
    },
    initERR(state, payload){
      state.ERR = payload
      console.log('state.ERR', state.ERR)
    },
    initRUL(state, payload){
      state.RUL = payload
    },
    initMA(state, payload){
      state.MA = payload
      console.log('state.MA', state.MA)
    },
    clearMsgAdd(state){
      let arr = ['title', 'content', 'contentTop', 'contentFooter']
      let arr2 = ['zh-TW', 'zh-CN', 'en']
      arr.forEach(element => arr2.forEach(lang => state.msgAdd[element][lang]= ''  ))
      state.msgAdd.name = ''
      state.msgAdd.sendTypeList = '["MAIL"]'
      state.msgAdd.sendTypeListTemp = '["MAIL"]'
    }
  },
  actions: { // 呼叫 api
      async handInitERR({commit}){
        const res = await api.apiGetNotifyMessageByTypeIdERR()
        commit('initERR', res.data.data)     
        return res.data.data
      },
      async handInitRUL({commit}){
        const res = await api.apiGetNotifyMessageByTypeIdRUL()
        commit('initRUL', res.data.data)     
        return res.data.data
      },
      async handInitMA({commit}){
        const res = await api.apiGetNotifyMessageByTypeIdMA()
        commit('initMA', res.data.data)     
        return res.data.data
      },
      async handSave({dispatch, commit, state}){
        if(state.msgDelIdAPI.length){  // 若是陣列中有要被刪除的訊息
          await dispatch('handDel')
        } else if(!state.msgDelIdAPI.length && !state.saveStatus){   // 若是陣列中沒有要被刪除的訊息
          await dispatch('handAdd')
        } else {
          commit('addConfirm', 'yes')

          await dispatch('handUpdate')          
        }
      },
      async handUpdate({state, dispatch}){
        await api.apiUpdateNotifyMessage(state.msgChangedSave)
        dispatch('handInitERR', 'handInitRUL', 'handInitMA')
        // window.location.reload()
        console.log('finish update?')     
      }, 
      async handAdd({state, dispatch}){
        await api.apiInsertNotifyMessage(state.msgChangedSave)
        dispatch('handInitERR', 'handInitRUL', 'handInitMA')
        // window.location.reload()
        console.log('finish add?')     
      }, 
      async handDel({state}){
        await api.apiDeleteNotifyMessageBatch({data: state.msgDelIdAPI})    
        state.msgDelIdAPI = [] 
        console.log('finish del?')    
        // window.location.reload()
      }    
  },
  modules: {
  }
})