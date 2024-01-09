<script setup lang="ts">
import { generateRandomNotesArray } from '@/API/note_model';
import EvaluationCard from '@/components/evaluation/EvaluationCard.vue';
import { useTestStore } from '@/stores/test';
import {computed, onMounted, onUpdated, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { test_status_enum } from '@/interfaces/test_state_enum'
import CorrectionCard from '@/components/evaluation/CorrectionCard.vue'


// onMounted(()=>{
//     window.addEventListener('beforeunload',function(event){
//     event.preventDefault();
//     router.push({name: 'eval_config'})
//     })
// })

const router=useRouter()
const route = useRoute()
const testStore = useTestStore()
const nbrNotes = route.params.nbrNotes as number 

  

testStore.initTest(nbrNotes)
const test = computed(()=>testStore.test)

const showForm = ref(true)

function next(){
    let timeout;
    if(testStore.statut === test_status_enum.halfway){
        terminer()
        return
    }
    if(!testStore.isLastNote) {
        showForm.value=false
        timeout = setTimeout(() => {
            testStore.changeNote()
            showForm.value=true
            
        }, 300);
    }
    console.log(test.value)
}


function terminer(){
    if(testStore.statut === test_status_enum.finish)
    {
        router.push({name:'accueil'})
    }
    console.log(testStore.statut)
   testStore.changeStep()
   console.log(testStore.statut)
}
</script>
<template>
    <div id="question">
        <Transition>
            <div v-if="showForm" class="question-card-form">
                <EvaluationCard  v-if="testStore.statut === test_status_enum.in_test"/>
                <div v-else-if="testStore.statut === test_status_enum.halfway">
                    <p> Maintenant, vous pouvez verifier vos reponces</p>
                </div>
                <CorrectionCard  v-else-if="testStore.statut === test_status_enum.in_correction"/>
                <div v-else-if="testStore.statut === test_status_enum.finish">
                    <p> Score final: {{ testStore.score }} <br>
                        Vous pouvez retourner a l'accueil en cliquant sur le boutton terminer
                    </p>
                </div>
                <div class="m-3" >
                    <div class="d-flex justify-content-end">
                        <button v-if="!testStore.isLastNote" @click="next" class="btn btn-primary ms-auto" >
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
    max-width: 25em;
    margin-inline: auto;
    transform: translateY(-50%);
}
</style>@/interfaces/test_state_enum