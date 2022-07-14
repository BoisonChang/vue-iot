<template>
    <div class="card card-effect mx-3 mx-md-0 time-card h-100">
        <div class="card-body py-3 card-count">
            <div class="row d-flex px-2 mb-0">
                <div class="col-md-6 col-5 d-flex justify-content-center  align-items-center">
                    <label for="m_timer" class="fw-bold">{{$t('refresh')}}</label>
                </div>
                <div class="col-md-6 col-5 ">
                    <div ><span class="timerColor style colorDefinition size_md" id="m_timer">00:{{ count }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, defineEmits, defineProps} from 'vue'
const emit = defineEmits({      
    getCountdownResult: {
        type: Boolean,
        default: false
    }
})
const props = defineProps({      
    countdownStart: {
        type: Number,
        default: 0
    }
})

const count = ref(15)
const countDown = () => {
    setInterval(() => {
        count.value --
        if(count.value === 0){
            emit("getCountdownResult", true)
            count.value = 15
        } 
        if(count.value < 10){
            count.value = '0'+ count.value
        }            
    }, 1000)
}
onMounted(()=>{
    count.value = props.countdownStart
    if(props.countdownStart < 10) count.value = '0' + props.countdownStart
    countDown()      
})
</script>

<style scoped>

</style>