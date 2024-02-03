<script setup lang="ts">
  import { useUiStore } from '@/stores/ui';
import star from '@/assets/img/star.png';
import plain_star from '@/assets/img/plain-start.png';
import { useNoteStore } from '@/stores/notes';
import { useUserStore } from '@/stores/user';
import type Note from '@/interfaces/note';

const noteStore = useNoteStore()
const uuserStore = useUserStore()
  const props = defineProps(['note'])
  const uis = useUiStore()
  const change_fav = ()=>{
    const note = props.note as Note
    note.is_favorite = !note.is_favorite
    noteStore.updateNote(uuserStore.user!.id!, note)
  }
</script>
<template>
    <div v-if="note" class="card" id="note_card">
      <div>
         <h5 class="card-title overflow-auto mb-1">{{ props.note.title }}</h5>
      </div>
       
        <p class="card-text overflow-auto">{{ props.note.content }}</p>
        <div id="note_card_action">
          <div class="d-flex justify-content-between " >
              <button @click="change_fav" class="btn">
                <img v-if="props.note.is_favorite" :src="plain_star"/>
                <img v-else :src="star"/>
              </button>
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
    height: 11em;
    padding: 1em;
    border-radius: 1.1em;
   
}

.card:hover{
  box-shadow: 0rem 0.05rem 0.25rem 0.1rem rgb(143, 141, 141);
  transition: all 0.5s;
}
.card:hover #note_card_action{
  visibility: visible;
}




</style>