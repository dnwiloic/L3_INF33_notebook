<script setup lang="ts">
import {ref, computed, onUpdated, onMounted} from 'vue'
import { useTestStore } from '@/stores/test';
import CorrectionCard from '@/components/evaluation/CorrectionCard.vue';
import { useRouter } from 'vue-router';
import { test_sttate_enum } from '@/interfaces/test_state_enum';

const router = useRouter()
const testStore = useTestStore();
const notes = computed(()=>testStore.notes)


const nbrNotes = notes.value.length
const showForm = ref(true)

// onMounted(()=>{
//     window.addEventListener('beforeunload',function(event){
//     event.preventDefault();
//     router.push({name: 'eval_config'})
//     })
// })
function next(){
    let timeout;
    console.log(currentNumber.value , nbrNotes)
    if(currentNumber.value < nbrNotes-1) {
        showForm.value=false
        timeout = setTimeout(() => {
            currentNumber.value ++
            showForm.value=true
        }, 300);
    }
}

function terminer(){

}
</script>
<template>
    <div id="question">
        <Transition>
            <div v-if="showForm" class="question-card-form">
                <CorrectionCard :note="notes[currentNumber]" :index="currentNumber"/>
                <div class="m-3" >
                    <div class="d-flex justify-content-end">
                        <button v-if="currentNumber< nbrNotes-1" @click="next" class="btn btn-primary ms-auto" >
                            Suivant
                        </button>
                        <button v-else @click="terminer" class="btn btn-success ms-auto" >
                            Terminer
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
#question{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.question-card-form{
    background-color: white;
    padding: 2em;
    margin-top: 3em;
    max-width: 70vw;
    margin-inline: auto;
    transform: translateY(-50%);
}
</style>@/interfaces/test_state_enum