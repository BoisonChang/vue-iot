<template >
  <div v-if="store.state.delModal">
    <div
      class="bootbox modal fade cnutil-modal confirm show"
      role="dialog"
      style="z-index: 2050 !important; padding-right: 17px; display: block"
      aria-modal="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="bootbox-body">
              <h5 class="text-center">
                <div class="text-center mt-1">
                  <i class="fas fa-exclamation-circle fa-2x"></i>
                </div>
                <div class="mt-4">{{$t('alertConfirmDeleteNotifyTmpl')}}?</div>
              </h5>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-on:click="deleteConfirm('no')"
              type="button"
              class="btn btn-secondary btn-default bootbox-cancel"
            >
              <i class="fa fa-times"></i> {{$t('cancel')}}</button
            ><button
              v-on:click="deleteConfirm('yes')"
              type="button"
              class="btn btn-primary bootbox-accept"
            >
              <i class="fa fa-check"></i> {{$t('confirm')}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-backdrop fade show modal-stack"
      style="z-index: 2049 !important"
    ></div>
  </div>

  <!-- 此處 cancelModal 觸發條件有 2，因此無法設置單一變數觸發 -->
  <div v-if="store.state.cancelcheck && !store.state.toolbtn.edit">
    <div
      class="bootbox modal fade cnutil-modal confirm show"
      role="dialog"
      style="z-index: 2050 !important; padding-right: 17px; display: block"
      aria-modal="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="bootbox-body">
              <h5 class="text-center">
                <div class="text-center mt-1">
                  <i class="fas fa-exclamation-circle fa-2x"></i>
                </div>
                <div class="mt-4">
                  {{$t('alertConfirmChangesNotSave')}}
                </div>
              </h5>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-on:click="cancelConfirm('no')"
              type="button"
              class="btn btn-secondary btn-default bootbox-cancel"
            >
              <i class="fa fa-times"></i>{{$t('cancel')}}</button
            ><button
              v-on:click="cancelConfirm('yes')"
              type="button"
              class="btn btn-primary bootbox-accept"
            >
              <i class="fa fa-check"></i> {{$t('confirm')}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-backdrop fade show modal-stack"
      style="z-index: 2049 !important"
    ></div>
  </div>
  <div v-if="store.state.addModal">
    <div
      class="bootbox modal fade cnutil-modal show"
      role="dialog"
      aria-modal="true"
      style="z-index: 2050 !important; padding-right: 17px; display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('modelNameEntry')}}</h5>
            <button
              type="button"
              class="bootbox-close-button close"
              aria-hidden="true"
              style="display: none"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="bootbox-body">
              <form id="validNotifyMessage" index="">
                <div class="row px-md-5 mt-2 align-items-start">
                  <div class="col-md-4 col-5 pr-0 pl-0 pl-md-3 my-2">
                    <label class="text-dark" data-i18n="modelNameBadge"
                      >{{$t('modelNameBadge')}}</label
                    >
                  </div>
                  <div class="col-md-8 col-7 pl-0 my-2">
                    <input
                      v-model="msgName"
                      type="text"
                      name="tmplName"
                      id="tmplName"
                      :class="['form-control', 'required', {error: warn}]"
                      maxlength="20"
                      placeholder=""
                    />
                    <label v-show="warn" class="error" for="tmplName"> 必須填寫</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-on:click="addConfirm('yes')"
              type="button"
              class="
                btn
                justify-content-center
                btn-primary
                cn-btn
                border-0
                bootbox-accept
              "
            >
              {{$('create')}}</button
            ><button
              v-on:click="addConfirm('no')"
              type="button"
              class="
                btn
                justify-content-center
                btn-secondary
                cn-btn
                border-0
                bootbox-cancel
              "
            >
              {{$t('cancel')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup>
import { useStore } from "vuex";
import { ref } from 'vue'

const store = useStore();
const msgName = ref('')
const warn = ref(false)

const deleteConfirm = (answer) => {
    store.commit("deleteConfirm", answer);
};

const cancelConfirm = (answer) => {   
    store.commit("cancelConfirm", answer);
};

const addConfirm = (answer) => {
  store.commit('setStateObject', {'key1': 'msgAdd', 'key2': 'name' , 'value':  msgName});
  if(msgName.value){
    store.commit("addConfirm", answer);
    store.dispatch('handAdd')
  } else if(answer === 'no'){
    warn.value = false
    store.commit("addConfirm", answer);
  } else {
    warn.value = true
  }
};

</script>


<style scoped>

.error {
    border-color: red;
    color: red;
}

.dnone {
  display: none;
}

.bootbox {
  z-index: 2050 !important;
  padding-right: 17px;
  display: block;
}

.modal-open .modal.cnutil-modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal.cnutil-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: none;
  overflow: hidden;
  outline: 0;
}

.modal-backdrop.show {
  opacity: 0.5;
}

.modal-backdrop.fade {
  opacity: 0;
}

.modal.cnutil-modal .modal-content {
  margin-top: auto;
  margin-bottom: auto;
  border: none;
}

.modal.cnutil-modal .modal-body {
  position: relative;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 1.75rem;
}

.modal.cnutil-modal .modal-footer {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 1.75rem;
  border-top: 1px solid #f1f2f3;
  font-family: 微軟正黑體, "Microsoft JhengHei", "Open Sans", Arial, sans-serif;
  font-size: 0.9375rem;
  font-weight: 300;
  line-height: 1.9;
  color: #757575;
  text-align: left;
}

.modal.show .modal-dialog {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}

.modal.cnutil-modal .modal-dialog {
  position: relative;
  width: auto;
}

.modal.cnutil-modal .modal-dialog {
  display: -webkit-box;
  display: flex;
  max-height: 100%;
  -webkit-transform: translate(0, -50%);
  -o-transform: translate(0, -50%);
  transform: translate(0, -50%);
  top: 50%;
  margin: 0 auto;
}

.modal.cnutil-modal .modal-content {
  margin-top: auto;
  margin-bottom: auto;
  border: none;
}

.modal.cnutil-modal .modal-content {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  max-height: 95vh;
  overflow: auto;
  color: #23595e;
  background-color: #f5f9fc;
}

.cnutil-modal.alert .modal-footer .btn i,
.cnutil-modal.confirm .modal-footer .btn i {
  margin-right: 0.5rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}

.modal-backdrop.show {
  opacity: 0.5;
}

.cnutil-modal.alert h5 i,
.cnutil-modal.confirm h5 i {
  color: #7b67fe;
}

.modal.cnutil-modal .btn:not(.input-group-append button) {
  font-size: 14pt;
  padding: 8px 26px 6px;
  letter-spacing: 1.7px;
  text-transform: uppercase;
  border-radius: 2px;
  outline: none;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
}

.cnutil-modal.alert .modal-footer .btn,
.cnutil-modal.confirm .modal-footer .btn {
  width: 140px;
}

.modal.cnutil-modal .btn.btn-primary {
  background-color: #3c96ff;
}

.modal.cnutil-modal .modal-header,
.modal.cnutil-modal .modal-footer {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.btn-secondary {
  color: #fff;
  background-color: #4acbd6;
  border-color: #4acbd6;
}

@media (min-width: 576px) {
  .modal.cnutil-modal .modal-dialog {
    max-width: 540px;
    /* margin: 1.75rem auto; */
  }
}
</style>