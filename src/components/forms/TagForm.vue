<script setup lang="ts">
import type Tag from '@/interfaces/tag';
import { useTagsStore } from '@/stores/tags';
import { useUserStore } from '@/stores/user';
import {computed, ref, type ComputedRef, watch, type Ref} from 'vue'

export type FormAction = 'add' | 'update'

const userStore = useUserStore()
const tagStore =  useTagsStore()
const props = defineProps(['tag'])
const action = defineModel('action') as Ref<FormAction>
const tag = ref(props.tag)


const formTitle = ref('Ajouter une Categorie')

watch(action, ()=>{
    if(action.value === 'update'){
        tag.value = props.tag
        formTitle.value = 'Modifier une Categorie'
    }else{
        tag.value = {
            content : ''
        }
        formTitle.value = 'Ajouter une Categorie'
    }
})
const saveTag = () => {
    if(action.value === 'update')
    {
        tagStore.updateTag(userStore.user!.id!, tag.value)
        return
    }
    if(action.value === 'add'){
        tagStore.createTag(userStore.user!.id!, tag.value)
        return
    }

}
</script>
<template>
<button class="btn btn-primary" @click="action='add'"  data-bs-toggle="modal"  data-bs-target="#tag_form">Ajouter</button>
 <div class="modal fade" id="tag_form" tabindex="-1" aria-labelledby="tag_form" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ formTitle }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <label for="tag-content" class="col-form-label">libelle:</label>
                        <input type="text" class="form-control" id="tag-content" v-model="tag.content">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" @click="saveTag" class="btn btn-primary" data-bs-dismiss="modal">Valider</button>
            </div>
        </div>
  </div>
</div>
</template>

<style scoped>

</style>