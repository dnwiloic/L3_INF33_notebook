<script setup lang="ts">
import { useTagsStore } from '@/stores/tags';
import { useUiStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';
const props = defineProps(['tag'])

const ui = useUiStore()
const tagStore =useTagsStore()
const user = useUserStore().user

const deleteTag = () => {
  tagStore.deleteTag(user!.id!, props.tag.id)
}
</script>
<template>
<div class="modal fade" :id="ui.deleteTagConfimationForm" tabindex="-1" :aria-labelledby="ui.deleteTagConfimationForm" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Supprimer une note </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div v-if="tag && tag!==null" class="modal-body">
        Voulez-vous vraiment supprimer <span class="fw-bold">{{ props.tag.content }}</span>
      </div>
      <div v-else class="modal-body">
        <span class="text-danger">Aucune note selectioné</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button v-if="tag && tag!==null" type="button" @click="deleteTag" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Supprimer</button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>

</style>