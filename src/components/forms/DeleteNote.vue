<script setup lang="ts">
import { useUiStore } from '@/stores/ui';
const props = defineProps(['note'])

const ui = useUiStore()
</script>
<template>
<div class="modal fade" :id="ui.deleteNoteConfimationForm" tabindex="-1" :aria-labelledby="ui.deleteNoteConfimationForm" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Supprimer une note </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div v-if="note!==null" class="modal-body">
        Voulez-vous vraiment supprimer <span class="fw-bold">{{ props.note.title }}</span>
      </div>
      <div v-else class="modal-body">
        <span class="text-danger">Aucune note selectioné</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button v-if="note!==null" type="button" class="btn btn-primary">Supprimer</button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>

</style>