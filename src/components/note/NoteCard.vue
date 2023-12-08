<script setup lang="ts">
import { onMounted } from 'vue';

function toggleActive(domElt: HTMLElement|null){
    if(!domElt) return
    if(domElt.classList.contains('d-none')){
      domElt.classList.remove('d-none')
    }
    else{
      domElt.classList.add('d-none')
      
    }
  }

  
  
</script>
<template>
    <div class="card" id="note_card">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on.</p>
        <div id="note_card_action">
          <div class="d-flex justify-content-between " >
              <font-awesome-icon icon="fa-solid fa-star" />
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              <font-awesome-icon icon="fa-solid fa-trash" />
          </div>
        </div>
    </div>
</template>
<style scoped>
#note_card_action{
  display: none;
  transition: all 1s;
}
.card{
    height: 9em;
    padding: 1.2em;
    border-radius: 1.1em
}

.card:hover #note_card_action{
  display: block;
}




</style>