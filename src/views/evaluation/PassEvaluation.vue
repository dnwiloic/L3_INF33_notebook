<script setup lang="ts">
import { generateRandomNotesArray } from '@/API/note_model';
import EvaluationCard from '@/components/evaluation/EvaluationCard.vue';
import { useTestStore } from '@/stores/test';
import {computed, onMounted, onUpdated, ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { test_status_enum } from '@/interfaces/test_state_enum'
import CorrectionCard from '@/components/evaluation/CorrectionCard.vue'
import { faBold } from '@fortawesome/free-solid-svg-icons';
import { idText } from 'typescript';


// onMounted(()=>{
//     window.addEventListener('beforeunload',function(event){
//     event.preventDefault();
//     router.push({name: 'eval_config'})
//     })
// })

const router=useRouter()
const route = useRoute()
const testStore = useTestStore()
const tmpNbrNotes: string | string[] = route.params.nbrNotes;
const tmpTag: string | string[] = route.params.tags
// Utilisez une assertion de type pour indiquer à TypeScript que vous savez que c'est une chaîne
const nbrNotesAsString: string = Array.isArray(tmpNbrNotes) ? tmpNbrNotes[0] : tmpNbrNotes;
const tagsArray :Array<string> =  Array.isArray(tmpTag) ? tmpTag: [tmpTag]
// Maintenant, vous pouvez utiliser parseInt en toute sécurité
const nbrNotes: number = parseInt(nbrNotesAsString);

const tags = tagsArray.map((tg)=> parseInt(tg))
  
const test_is_loaded = ref(false)
 testStore.initTest(tags, nbrNotes).then((res)=>{
    test_is_loaded.value = res
    if(!test_is_loaded.value){
        router.push({name: 'config_evaluation'})
    }
 })
const test = computed(()=>testStore.test)

watch([test_is_loaded],()=>{
    goToHomeafter()
})
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

const evaluationStage = computed(()=>{
    switch(testStore.statut){
        case test_status_enum.canceled: 
            return "Annulé";
        case test_status_enum.finish: 
            return "Terminé";
        case test_status_enum.halfway: 
            return "A mis chemin";
        case test_status_enum.in_correction: 
            return "Correction";
        case test_status_enum.in_test: 
            return "Evaluation";
        case test_status_enum.not_started: 
            return "Non démarrer";
        default:
            return "Incommu";
    }
})
function goToHomeafter(){
    console.log("Call")
        router.push({name: 'config_evaluation'})
}

function terminer(){
    if(testStore.statut === test_status_enum.finish)
    {
        router.push({name:'accueil'})
    }
   testStore.changeStep()
}
</script>
<template>
    <header class="bg-white w-100 p-2">
        <div class="d-flex flex-row justify-content-around align-items-center">
            <div class="text-center fw-bold d-none d-lg-block">
                Votre évaluation est en cours
            </div>
            <div class="text-center fw-bold">
                Etape: <span class="text-success fw-bold">{{ evaluationStage }}</span>
            </div>
            <div class="text-center fw-bold">
                Progression: <span class="text-warning fw-bold">{{ testStore.currentNoteIndex+1 }}/{{ testStore.test.length }}</span>
            </div>
        </div>
    </header>
    <div v-if="test_is_loaded" id="question">
        <Transition v-if="testStore.test.length >= 1">
            <div v-if="showForm" class="question-card-form">
                <EvaluationCard  v-if="testStore.statut === test_status_enum.in_test"/>
                <div v-else-if="testStore.statut === test_status_enum.halfway">
                    <p> Maintenant, vous pouvez verifier vos reponces</p>
                </div>
                <CorrectionCard  v-else-if="testStore.statut === test_status_enum.in_correction"/>
                <div v-else-if="testStore.statut === test_status_enum.finish">
                    <p> Score final: {{ testStore.score +"/"+testStore.notes.length }} <br>
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
        <div v-else class="d-flex vh-100 justify-content-center align-items-center">
            <div class="bg-white p-5 text-center text-danger">
                Nous n'avons pas pu charger les questions. 
                <RouterLink :to="{name: 'accueil'}"> retourner a l'accueil</RouterLink>
            </div>
        </div>
    </div>
    <div v-else @change="goToHomeafter" class="d-flex vh-100 justify-content-center align-items-center">
        <div  class="bg-white p-5 text-center">
            loading...
        </div>
    </div>
</template>
<style scoped>
#question{
    display: flex;
    height: 80vh;
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
    /* margin-top: 3em; */
    max-width: 60%;
    margin-inline: auto;
    transform: translateY(-10%);
}
</style>