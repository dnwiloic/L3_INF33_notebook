<script setup lang="ts">
  import { useUiStore } from '@/stores/ui';
  import { defineProps } from 'vue';

  const props = defineProps(['note'])
  const {note} = props
  const uis = useUiStore()
</script>
<template>
    <div v-if="note" class="card" id="note_card">
        <h5 class="card-title">{{ note.title }}</h5>
        <p class="card-text">{{ note.content }}</p>
        <div id="note_card_action">
          <div class="d-flex justify-content-between " >
              <button class="btn"><font-awesome-icon icon="fa-solid fa-star" /></button>
              <button class="btn" data-bs-toggle="modal" :data-bs-target="'#'+uis.noteFormId">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
              <button class="btn" data-bs-toggle="modal" :data-bs-target="'#'+uis.deleteNoteConfimationForm">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
          </div>
        </div>
    </div>
</template>
<style scoped>
#note_card_action{
  display: block;
  visibility: hidden;
  margin-top: auto;
}
.card{
    height: 9em;
    padding: 1.2em;
    border-radius: 1.1em;
}

.card:hover #note_card_action{
  visibility: visible;
}




</style>