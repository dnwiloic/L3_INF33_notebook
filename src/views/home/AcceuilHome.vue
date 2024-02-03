<script setup lang="ts">
  import  {computed, ref} from 'vue'
  import NoteCard from '../../components/note/NoteCard.vue'
  import NoteForm from "../../components/forms/NoteForm.vue"
  import DeleteNote from "../../components/forms/DeleteNote.vue"
  import {generateRandomNotesArray} from "../../API/note_model"
  import {useUiStore} from '../../stores/ui'
import type Note from '@/interfaces/note'
import type { FormAction } from '@/components/forms/TagForm.vue'
import { useNoteStore } from '@/stores/notes'
 
const uis = useUiStore()
const noteStore = useNoteStore()
const NBR_NOTE_TO_SHOW=9
const notes = computed(()=> {
   
    return noteStore.allNotes
})

const currentNote = ref({} as Note)
const noteFormAction = ref('add' as FormAction)
  
</script>
<template>
    <div class="container">
        <NoteForm :note="currentNote" :action="noteFormAction" />
        <DeleteNote :note="currentNote"/>
        <div class="grid-container">
            <button class="btn btn-primary" data-bs-toggle="modal" @click="noteFormAction='add'" :data-bs-target="'#'+uis.noteFormId">
                Nouvelle note
            </button>
            <div  
                v-for="note in notes" v-bind:key="note.id" 
                @click="()=>{
                    currentNote=note;
                    noteFormAction='update'
                    }">
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
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1024px){
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>