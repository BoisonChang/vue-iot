<template>
    <div class="content-socket row">
        <div id="" class="col-md-6 col-12 mt-3" v-for="(item, index) in props.originaldata" :key="index">
            <!--設備卡牌-->
            <div class="card card-effect container">
                <div class="setBoard_cube cube_topleft">
                    <div class="setBoard_cube cube_topright"></div>
                    <div class="setBoard_cube cube_middle"></div>
                    <div class="setBoard_cube cube_bottom"></div>
                </div>
                <!--內容-->
                <div class="row p-3">
                    <!--左側裝置圖片-->
                    <div class="col-md-4 col-sm-5 col-12">
                        <div class="devMonitorThumb">
                            <img :src="item.imageSrc ? `${BASEURL}${item.imageSrc}` : require('@/assets/img/defaultPic.png')" alt="裝置圖">
                        </div>
                    </div>
                    <!--// 左側裝置圖片 END-->
                    <!--右側資訊-->
                    <div class="col-md-8 col-sm-5 col-12">
                        <div class="eqip-content-wrapper mx-auto">
                            <p :class="setStatus(item.status).statusClass" class="EquipStatus ms-3 pb-2 mt-2 border-bottom"><span class="statusText font-weight-bold px-2 py-1 rounded" >{{ setStatus(item.status).statusName }}</span></p>
                            <ul class="ist-group list-group-flush ms-4 lmb-0 ps-0 ">
                                <li class="list-group-item border-0 ps-2 py-0"><span class="font-weight-bold tertiary-color text-justify" data-i18n="deviceType">{{$t('deviceType')}}: </span> {{ item.deviceType}}</li>
                                <li class="list-group-item border-0 ps-2 py-0"><span class="font-weight-bold tertiary-color text-justify" data-i18n="gatewayNo">{{$t('gatewayNo')}}: </span> </li>
                            </ul>
                        </div>
                    </div>
                    <!--// 右側資訊 END-->
                </div>
                <!--// 內容 END-->
                <!--右下標籤-->
                <div class="EquipName">
                    <div class="tagTri"></div>
                    <p class="equipTag p-2 font-weight-bold mb-0 align-middle text-center text-white">
                        {{ item.identifier }}
                    </p><div class="tagTri_upside"></div>
                    <p></p>
                    <!--<div class="tagBody">
                        <p class="p-3 font-weight-bold mb-0 align-middle text-center text-white">M25h-2021Type0707</p>
                    </div>-->
                </div>
                <!--// 右下標籤 END-->
            </div>
            <!--// 設備卡牌 END-->
        </div>
    </div>
    <!-- <h2> {{ filterItem() }} </h2> -->
</template>

<script setup> 
import { ref, defineProps, onMounted } from 'vue'
const BASEURL = ref('')
const props = defineProps({      
    originaldata: {
        type: Object,
		default:  () => ({})
    }
})


const setStatus = itemStatus => {
	let statusName = ''
	let statusClass = ''
	switch (itemStatus) {
		case 'ready':
			statusName = 'Ready'
			statusClass = 'status-ready'
			break
		case 'running':
			statusName = 'running'
			statusClass = 'status-running'
			break
		case 'warning':
			statusName = 'Warning'
			statusClass = 'status-warning'
			break
		case 'alarm':
			statusName = 'Alarm'
			statusClass = 'status-alarm'
			break	
		default:
			statusName = 'N.A.'
			statusClass = ''
			break
	}
	return {statusName, statusClass}
}

onMounted(()=>{
	BASEURL.value = window.__env.url.CN_URL
})

</script>




<style scoped lang="scss">
.EquipStatus {
	& > .statusText {
		color: #fff;
		background-color: #b8b8b8;
		font-family: 'Roboto', 'Arial', sans-serif;
		letter-spacing: 1px;
	}
	&.status-ready {
		& > .statusText {
			background-color: #1f91ba;
		}
		&:before {
			color: #1f91ba;
		}
	}
	&.status-running {
		& > .statusText {
			background-color: #62ba3a;
		}
		&:before {
			color: #62ba3a;
		}
	}
	&.status-warning {
		& > .statusText {
			background-color: #f6b73d;
		}
		&:before {
			color: #f6b73d;
		}
	}
	&.status-alarm {
		& > .statusText {
			background-color: #f55353;
		}
		&:before {
			color: #f55353;
		}
	}
}

.devMonitorThumb {
	height: 100px;
	margin-top: 8px;
	padding: 10px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	>img {
		max-height: 100%;
		vertical-align: middle;
	}
}
.content-socket .col-12{
    padding-left: 15px;
    padding-right: 15px;
}
.setBoard_cube {
	width: 16px;
	height: 16px;
	background: rgba(74, 203, 214, 0.6);
	position: absolute;
}
.cube_topleft {
	top: 0%;
	left: 0%;
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

.EquipName {
	position: absolute;
	right: 0;
	bottom: -51px;
	p {
		position: relative;
		max-height: 38px;
		top: -48px;
		right: -20px;
		white-space: nowrap;
		background-color: #4acbd6;
		min-width: 120px;
		max-width: 280px;
		overflow: hidden;
		text-overflow: ellipsis;
		box-shadow: -2px 4px 8px rgb(74 203 214 / 50%);
	}
	.tagTri {
		position: absolute;
		right: -20px;
		top: -10px;
		width: 0;
		height: 0;
		z-index: -1;
		border-style: solid;
		border-width: 13px 30px 0 0;
		border-color: #067a8f transparent transparent transparent;
		line-height: 0px;
	}
	.tagTri_upside {
		position: absolute;
		right: -20px;
		top: -10px;
		width: 0;
		height: 0;
		z-index: -1;
		border-style: solid;
		border-width: 13px 30px 0 0;
		border-color: #067a8f transparent transparent transparent;
		line-height: 0px;
		z-index: 1;
		min-height: 38px;
		min-width: 15px;
		top: -48px;
		left: 5px;
		border-width: 0 0 38px 15px;
		border-color: transparent transparent #4acbd6 transparent;
		line-height: 0px;
	}
}

@media screen and (max-width: 767px){
    .content-socket > div:nth-child(odd) {
        padding-left: 15px;
    }
}


</style>