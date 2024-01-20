<script setup lang="ts">
import { useTestStore } from '@/stores/test';
import {ref, watch} from 'vue';
const testStore = useTestStore()
const score = ref(0)

watch(score,async ()=>{
    testStore.setQuestionScore(score.value)
    console.log(testStore.notes)
})

</script>
<template>
    <div id="correction-card">
        <div class="mb-3">
            <table>
                <tbody>
                    <tr>
                        <th>Titre</th>
                        <td>{{ testStore.currentNote.title }}</td>
                    </tr>
                    <tr>
                        <th>Contenu</th>
                        <td>{{ testStore.currentNote.content }}</td>
                    </tr>
                    <tr>
                        <th>Question</th>
                        <td>{{ testStore.currentNote.question }}</td>
                    </tr>
                    <tr>
                        <th>Reponse Correct</th>
                        <td>{{ testStore.currentNote.response }}</td>
                    </tr>
                    <tr>
                        <th>Votre Reponse </th>
                        <td>{{ testStore.currentNote.user_response }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div> 
            <p> Au vue de ces informations, quel est votre niveau d'acquisition de cette notion</p>
            <div class="d-flex justify-content-between">
                <div class="radio_eval">
                    <input id="non_aquis_radio" type="radio" v-model="score" name="score" :value="-1" class="form-check-input" >
                    <label for="non_aquis_radio" class="form-label text-danger">Non acquis</label>
                </div >
                <div class="radio_eval">
                    <input id="en_cours_radio" v-model="score" type="radio" name="score" :value="0" class="form-check-input" >
                    <label for="en_cours_radio" class="form-label text-warning"> En Cours d'Acquis</label>
                </div>
                <div class="radio_eval">
                    <input id="aquis_radio" type="radio" v-model="score" name="score" :value="1" class="form-check-input" >
                    <label for="aquis_radio" class="form-label text-success"> Acquis</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

#correction-card{
    
}

label{
    text-wrap: nowrap;
}
.radio_eval{
    padding: 1rem;
    border-radius: 1rem;
    border: 1px rgb(125, 125, 125) solid;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    align-content: center;
    justify-content: space-between;
}

.radio_eval label{
    margin: 0;
}

input[type="radio"] {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #3498db;
  background-color: #fff;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: #3498db;
  border-color: #3498db;
  color: #fff; /* Couleur du texte si nécessaire */
}

table{
    width: 100%;
    border-collapse: collapse;
}

th,td{
    border-bottom: 2px solid ;
    padding: 1em;
}

tr:nth-child(even){
    background-color: rgb(237, 237, 237);
}

tr:hover{
    background-color: rgb(191, 189, 189);
}

</style>