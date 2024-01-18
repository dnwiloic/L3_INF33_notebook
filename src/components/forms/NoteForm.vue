<script setup lang="ts">
import { useUiStore } from '@/stores/ui';
import SelectTags from './SelectTags.vue';
import { useTagsStore } from '@/stores/tags';
import type Tag from '@/interfaces/tag';
import { computed, ref, watch } from 'vue';
import type Note from '@/interfaces/note';
import type { FormAction } from './TagForm.vue';
import { useNoteStore } from '@/stores/notes';
import { useUserStore } from '@/stores/user';


    const props = defineProps(['note', 'action']) as {note: Note, action: FormAction}
    const ui = useUiStore()
    const tagStore = useTagsStore()
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const userTags=computed( ()=>{
        return tagStore.userTags
    })
   
    const tmp_note =ref({
        tags: [] as Array<Tag>
    } as Note)

    const note = computed(()=>{
        if(props.action === 'add')
            return {
                tags: [] as Array<Tag>
            } as Note
        else return props.note
    })

    watch(note, ()=>{
        tmp_note.value = {
            ...note.value
        }
    })

    const formTitle = computed(()=>{
        if( props.action === 'update')
            return 'Modifier une Note'
        return 'Ajouter une Note'
    })

    const submit = () => {
        if(props.action === 'update')
            noteStore.updateNote(userStore.user!.id!, tmp_note.value)
        else
            noteStore.createNote(userStore.user!.id!, tmp_note.value)
    }
</script>
<template>
<div class="modal fade" :id="ui.noteFormId" tabindex="-1" :aria-labelledby="ui.noteFormId" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ formTitle }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <label for="note-title" class="col-form-label">Titre:</label>
                        <input type="text" class="form-control" id="note-title" v-model="tmp_note.title">
                    </div>
                    <div class="mb-3">
                        <label for="content-text" class="col-form-label">Contenu</label>
                        <textarea class="form-control" id="content-text" v-model="tmp_note.content"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="question-text" class="col-form-label">Question</label>
                        <textarea class="form-control" id="question-text" v-model="tmp_note.question"></textarea>
                    </div>
                    <div class="mb-3">
                        <input class="form-check-input" type="checkbox"  id="favorite" v-model="tmp_note.is_favorite">
                        <label for="favorite" class="col-form-label">Favorie </label>
                    </div>
                    <div class="mb-3">
                        <SelectTags  :enableCreation="true" v-model:tags_selected="tmp_note.tags" :tags_list="userTags" /> 
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button"  class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button"  @click="submit" class="btn btn-primary" data-bs-dismiss="modal">Valider</button>
            </div>
        </div>
  </div>
</div>
</template>
<style scoped>

</style>