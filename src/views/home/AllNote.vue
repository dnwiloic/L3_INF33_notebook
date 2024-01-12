<script setup lang="ts">
import  {ref} from 'vue'
  import NoteCard from '../../components/note/NoteCard.vue'
  import NoteForm from "../../components/forms/NoteForm.vue"
  import DeleteNote from "../../components/forms/DeleteNote.vue"
  import NoteTable from "../../components/note/NoteTable.vue"
  import {generateRandomNotesArray} from "../../API/note_model"
  import {useUiStore} from '../../stores/ui'
  const uis = useUiStore()
  const notes = generateRandomNotesArray(50);

  const currentNote = ref(null)
</script>
<template>
    <NoteTable :notes="notes" />
</template>
<style>

</style>