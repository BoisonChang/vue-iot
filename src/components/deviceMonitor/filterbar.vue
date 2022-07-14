<template>
    <div class="row content-toolbar p-3">
        <div class="col-md-12 btn-group px-0" >
            <button type="button" class="btn btn-white d-xs-none"  disabled="">
                <i class="fas fa-table"></i>
                <span data-i18n="switchTable">{{$t('switchTable')}}</span>
            </button>
            <span v-if="toolbarStatus" ref="addToolbarDOM" class="content-toolbar-action"><div class="curtain" style="top: 36.5px;">
                <div class="row curtain-head py-2 px-3">
                    <div class="col-10">
                        <div class="curtain-clssify-head text-left fs-18 mt-1">
                            <label class="curtain-class-label align-middle mb-0 tertiary-color"><span class="dropdown_border-left pe-3"></span>{{$('orderBasis')}}</label>
                        </div>
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn-curtain-close p-1 mt-1" v-on:click="toggleToolbar"><i class="fas fa-times"></i> </button>
                    </div>
                </div>
                <div class="curtain-body mx-3">
                    <div class="curtain-clssify">
                        <div class="curtain-clssify-body pl-3">
                            <button @click="sortByDevIdOrStatus(true)" :class="{ disabled: sort.status }"  type="button" class="curtain-filter " > {{$t('deviceNo')}} </button>
                            <button @click="sortByDevIdOrStatus(false)" :class="{ disabled: sort.devId }" type="button" class="curtain-filter " >{{$t('deviceStatus')}}</button>
                        </div>
                    </div>
                    <div class="curtain-clssify-head fs-18 text-left py-3">
                        <label class="curtain-class-label align-middle mb-0 tertiary-color"><span class="dropdown_border-left pe-3"></span>{{$t('order')}}</label>
                    </div>
                    <div class="curtain-clssify">
                        <div class="curtain-clssify-body">
                            <button v-on:click="sortByHighOrLow(false)" :class="{ disabled: sort.low }"  type="button" class="curtain-filter"><i class="fas fa-sort-amount-down"></i>{{$t('descending')}}</button>
                            <button v-on:click="sortByHighOrLow(true)" :class="{ disabled: !sort.low }" type="button" class="curtain-filter"><i class="fas fa-sort-amount-up"></i>{{$t('ascending')}}</button>
                        </div>
                    </div>
                </div>
                <div class="curtain-foot">
                    <button @click="resetOrder" type="button" class="btn primary-bg btn-lg rounded-0 text-white mx-2">{{$t('重設')}}</button>
                    <button @click="setSortState" type="button" class="btn tertiary-bg btn-lg rounded-0 text-white mx-2">{{$t('套用')}}</button>
                </div>
            </div></span>
            <button type="button" class="btn btn-white btn-sort mx-3 mx-md-0" v-on:click="toggleToolbar" ref="addToolbarBtnDOM">
                <i class="fas fa-sort-amount-down pe-2"></i>
                <span>{{$t('sortBy')}}</span>
            </button>
        </div>  
    </div>
</template>
<script setup>
import { onMounted, ref, nextTick} from 'vue'
import { useStore } from "vuex";

const store = useStore()
const sort = ref({
    devId: true,
    status: false,
    low: true,
})
const sortSave =ref({
    devId: true,
    status: false,
    low: true,
})

const toolbarStatus = ref(false)
const addToolbarDOM = ref(null)
const addToolbarBtnDOM = ref(null)

const toggleToolbar = () => {
    toolbarStatus.value = !toolbarStatus.value
    keepNowOrder()
}
const detectClick = (e) => {
    if (addToolbarDOM.value && !addToolbarDOM.value.contains(e.target) && !addToolbarBtnDOM.value.contains(e.target) ) {
        toolbarStatus.value = false;
        keepNowOrder()
    }
}
const setSortState= () => {
    store.commit("setState", { key: 'sort', value: { 
            'sortByDevId': sort.value.devId,
            'sortByStatus': sort.value.status,
            'sortByLow': sort.value.low,                      
        }                   
    });
    toolbarStatus.value = false
    saveNewOrder()
}

const sortByDevIdOrStatus = status => {
    sort.value.devId = status
    sort.value.status = !status
}

const sortByHighOrLow = status => {
    sort.value.low = status
}

const resetOrder = () => {
    sort.value.devId = true
    sort.value.status = false
    sort.value.low = true 
}

const keepNowOrder = () => {
    sort.value = {...sortSave.value}
}

const saveNewOrder = () => {
    sortSave.value =  {...sort.value}
}

onMounted(()=>{
    nextTick(() => {
        document.addEventListener("click", e => { 
            detectClick(e);    
        });
    });   
})

</script>

<style scoped lang="scss">
body {
	.primary-bg {
		background: #7EDBCD;
	}
	.tertiary-bg {
		background: #4ACBD6;
	}
}
.curtain {
	position: absolute;
	width: 49%;
	background-color: #fff;
	-webkit-box-shadow: rgb(0 0 0 / 20%) 0px 8px 16px 0px;
	box-shadow: rgb(0 0 0 / 20%) 0px 8px 16px 0px;
	padding: 0px 16px;
	z-index: 999;
	.curtain-body {
		border-top: 1px solid #dee2e6;
		border-bottom: 1px solid #dee2e6;
		max-height: 350px;
		overflow-y: auto;
		.curtain-clssify-head {
			border-bottom: 1px solid #dee2e6;
		}
	}
	.curtain-head {
		padding: 0.25rem;
		.btn-curtain-close {
			background: #24AEDF;
			color: #fff;
			border: 0;
			width: 30px;
		}
	}
	.curtain-clssify {
		text-align: left;
		padding: 1rem;
		.curtain-clssify-body {
			padding-top: 1rem;
			padding-bottom: 1rem;
		}
	}
	.curtain-filter.disabled {
		opacity: 0.45;
		color: #5F5F5F !important;
		background-color: #C4C4C4 !important;
		border: none !important;
	}
	.curtain-filter {
		&:disabled {
			opacity: 0.45;
			color: #5F5F5F !important;
			background-color: #C4C4C4 !important;
			border: none !important;
		}
		background: #24AEDF;
		color: #fff;
		border-radius: 18px;
		margin: 0.25rem;
		min-width: calc(25% - 1rem);
		border: none;
		word-break: break-word;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: inline-block;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		padding: 3px 16px;
		font-size: 1rem;
		line-height: 1.5;
		-webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
	}
	.curtain-foot {
		text-align: center;
		padding: 1rem;
	}
}
.dropdown_border-left {
	border-left: 5px solid #FFCB00;
}
.btn-group {
	>.btn {
		&:first-child {
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
		}
		&:last-child {
			border-top-right-radius: 50px;
			border-bottom-right-radius: 50px;
		}
	}
}
.btn-white {
	color: #23595E;
	background-color: #fff;
	border-color: #F6F7FB;
	-webkit-box-shadow: 0px 4px 12px rgb(0 0 0 / 8%);
	box-shadow: 0px 4px 12px rgb(0 0 0 / 8%);
	&:disabled {
		color: #C4C4C4;
		border-color: #ECECEC;
	}
	&:hover {
		color: #fff;
		background-color: #4ACBD6;
		border-color: #4ACBD6;
	}
}
.btn-white.disabled {
	color: #C4C4C4;
	background-color: #fff;
	border-color: #ECECEC;
}

@media screen and (max-width: 576px){
    .curtain {
        width: 100%;
    }
    .btn-group {
        >.btn {
            &:last-child {
                margin-top: 20px;
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
            }
        }
    }
}
</style>