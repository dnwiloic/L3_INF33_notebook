<script setup lang="ts">
import {ref} from 'vue';
const props = defineProps(['question'])

const response = ref('')
</script>
<template>
    <div id="question-card">
        <div class="question-card-form">
            <div class="mb-3">
                <label for="note-title" class="col-form-label">numbre de notes :</label>
                <input type="number" class="form-control" id="note-title" v-model="response">
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary ms-auto">
                    Suivant
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#question-card{
    height: 100vh;
    justify-content: center;
    align-content: center;
}

.question-card-form{
    background-color: white;
    padding: 2em;
    margin-top: 3em;
    max-width: 25em;
    margin-inline: auto;
}
</style>