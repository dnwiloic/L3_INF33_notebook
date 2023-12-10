<script setup lang="ts">
  import  {ref} from 'vue'
  import NoteCard from '../../components/note/NoteCard.vue'
  import NoteForm from "../../components/forms/NoteForm.vue"
  import DeleteNote from "../../components/forms/DeleteNote.vue"
  import {generateRandomNotesArray} from "../../API/notes"
  import {useUiStore} from '../../stores/ui'
 
  const uis = useUiStore()
  const notes = generateRandomNotesArray(12);

  const currentNote = ref(null)
  
</script>
<template>
    <div class="container">
        <NoteForm :note="currentNote" />
        <DeleteNote :note="currentNote"/>
        <div class="grid-container">
            <button class="btn btn-primary" data-bs-toggle="modal" @mouseover="currentNote=null" :data-bs-target="'#'+uis.noteFormId">Ajouter</button>
            <div  v-for="note in notes" v-bind:key="note.id" @mouseover="currentNote=note">
                <NoteCard :note="note" />
            </div>
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