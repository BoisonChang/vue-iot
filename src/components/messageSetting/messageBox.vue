<template>
  <div class="main-container position-relative">
    <div class=" ribbon py-2 px-1 shadow-sm align-items-center justify-content-center d-none d-sm-flex " >
      <span data-i18n="selectModel">{{$t('selectModel')}}</span>
    </div>
    <div class="my-md-3 px-0 mainWrapper shadow-sm bg-white">
      <div class="row no-gutters pageContent mx-0">
        <div class="col-md-4 p-3 model-select-section border d-none d-sm-block">
			<div
			class="searchModel bg-white border-0 rounded-0 my-3 shadow-sm d-flex align-items-center justify-content-end pr-xl-3">
				<SearchBar @getSearch="setSearchState" />   
			</div>
			<div class="cards-outter-wrapper">
				<messageCard />
			</div>
        </div>
        <div class="col-md-8 p-3 position-relative bg-white">
          <messageContent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '@/components/comm/SearchBar'
import messageContent from '@/components/messageSetting/messageContent.vue';
import messageCard from '@/components/messageSetting/messageCard.vue';
import { useStore } from "vuex";

const store = useStore()


const setSearchState = searchInput => {
    store.commit('setState', {key: 'search', value: searchInput})     
}

</script>

<style lang="scss">

.ribbon {
	position: absolute;
	left: -27px;
	top: 32px;
	background-color: #E7F6FE;
	color: #4ACBD6;
	width: 100px;
	height: 50px;
	z-index: 10;
	&:before {
		content: '';
		position: absolute;
		border-style: solid;
		border-color: #daeaf3 transparent #daeaf3 transparent;
		bottom: -22px;
		left: 0;
		border-width: 22px 0 0 27px;
	}
	&:after {
		content: '';
		position: absolute;
		border-style: solid;
		border-color: transparent transparent transparent #E7F6FE;
		border-width: 3rem 0 0 27px;
		height: 0px;
		width: 0px;
		top: 0px;
		right: -27px;
		height: 100%;
		-webkit-box-shadow: 0px 2px 0px #ebecf0;
		box-shadow: 0px 2px 0px #ebecf0;
	}
}
.mainWrapper {
	.pageContent {
		min-height: 520px;
	}
	.model-select-section {
		background: #f6f7fb;
	}
}
body {
	.container-fluid-main {
		max-width: 1366px;
	}
}
.container-fluid {
	padding-top: 10px;
}
.container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
	width: 100%;
	margin-top: 64px;
	margin-bottom: 64px;
	padding-top: 55px;
	padding-bottom: 55px;
	padding-right: var(--bs-gutter-x,2rem);
	padding-left: var(--bs-gutter-x,2rem);
	margin-right: auto;
	margin-left: auto;
}
#content {
	padding: 8px 28px;
	min-height: 100vh;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	margin-left: 250px;
}

.model-select-section .searchModel {
    height: 49px;
}

.model-select-section .cards-outter-wrapper {
    max-height: 500px;
    overflow: auto;
}

.model-card {
    cursor: pointer;
}

.fa-search{
    margin-left: 10px;
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

.model-card .active {
    border: 1.5px solid #4ACBD6;
}

.card-body[data-fl-isdefault='true'] .model-content {
    background: url("~@/assets/img/SAMPLE.svg") center center no-repeat;
    background-position: 80% 75%;
}

.card-body[data-fl-isdefault='true'] .model-name-badge {
    background: #c4c4c4;
    color: #fff;
    word-break: keep-all;
}
.card-body[data-fl-isdefault='true'] .model-name {
    font-weight: 500;
    color: #7EDBCD;
}

.card-body[data-fl-isdefault='true'] .model-title {
    display: none;
}
.card-body .model-name-badge {
    word-break: keep-all;
}

.auxiliary-bg {
    background: #E7F6FE;
}

.tertiary-color {
    color: #4ACBD6;
}


.btn-danger {
    color: #fff;
    background-color: #F55353;
    border-color: #F55353;
}

.btn-danger:hover {
    color: #fff;
    background-color: #f32f2f;
    border-color: #f22323;
}

.btn-delete .material-icons {
    font-size: 18px;
}


.model-select-section .model-name-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}




@media screen and (min-width: 320px) and (max-width: 842px) and (orientation: landscape){
  #content {
      margin-left: 0;
      margin-top: 4rem !important;
  }
}

@media screen and (max-width: 767px){
  #content {
      padding: 55px 20px;
      max-width: unset;
  }
}


</style>