<script setup lang="ts">
  import NoteCard from '../../components/note/NoteCard.vue'
  import NoteForm from "../../components/forms/NoteForm.vue"
  import {generateRandomNotesArray} from "../../API/notes.ts"

  const notes = generateRandomNotesArray();
</script>
<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="noteForm" aria-hidden="true">
        <NoteForm />
    </div>
    <div class="grid-container">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#noteForm">Ajouter</button>
        <div v-for="note in notes" v-bind:key="note.id">
            <NoteCard />
        </div>
    </div>
</template>
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: auto;
    gap:1em;
    padding :1em;
}

@media (min-width: 700px){
    .grid-container {
        display: grid;
        grid-template-columns: auto auto;
    }
}
@media (min-width: 1024px){
    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
    }
}
</style>