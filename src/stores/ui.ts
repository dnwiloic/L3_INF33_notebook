import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const noteFormId = 'noteForm';
  const deleteNoteConfimationForm = 'deleteNoteConfimationForm'
  const deleteTagConfimationForm= 'deleteTagConfimationForm'
  const nbrElementsByTables = 10

  return { noteFormId, deleteNoteConfimationForm, deleteTagConfimationForm, nbrElementsByTables}
})
