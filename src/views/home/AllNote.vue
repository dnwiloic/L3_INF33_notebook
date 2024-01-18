<script setup lang="ts">
import  {computed, ref} from 'vue'
  import NoteCard from '../../components/note/NoteCard.vue'
  import NoteForm from "../../components/forms/NoteForm.vue"
  import DeleteNote from "../../components/forms/DeleteNote.vue"
  import NoteTable from "../../components/note/NoteTable.vue"
  import {generateRandomNotesArray} from "../../API/note_model"
  import {useUiStore} from '../../stores/ui'
import { useNoteStore } from '@/stores/notes'
  const uis = useUiStore()
  const noteStore = useNoteStore()

const notes = computed(()=> useNoteStore().allNotes)

  const currentNote = ref(null)
</script>
<template>
    <NoteTable :notes="notes" />
</template>
<style>

</style>