<script setup lang="ts">
    import { useUiStore } from '@/stores/ui';
    import SelectTags from './SelectTags.vue';
import { useTagsStore } from '@/stores/tags';
import type Tag from '@/interfaces/tag';


    const props = defineProps(['note'])
    const ui = useUiStore()
    const tagStore = useTagsStore()
    const selected_tags = [] as Array<Tag>

</script>
<template>
<div class="modal fade" :id="ui.noteFormId" tabindex="-1" :aria-labelledby="ui.noteFormId" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Nouvelle note</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <label for="note-title" class="col-form-label">Titre:</label>
                        <input type="text" class="form-control" id="note-title" :value="props.note?.title">
                    </div>
                    <div class="mb-3">
                        <label for="content-text" class="col-form-label">Contenu</label>
                        <textarea class="form-control" id="content-text" :value="props.note?.content"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="question-text" class="col-form-label">Question</label>
                        <textarea class="form-control" id="question-text" :value="props.note?.question"></textarea>
                    </div>
                    <div class="mb-3">
                        <SelectTags v-model:tags_selected="selected_tags" v-model:tags_list="tagStore.userTags" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary">Valider</button>
            </div>
        </div>
  </div>
</div>
</template>
<style scoped>

</style>