<script setup lang="ts">
import SelectTags from '@/components/forms/SelectTags.vue';
import type Tag from '@/interfaces/tag';
import { useTagsStore } from '@/stores/tags';
import { onMounted, ref } from 'vue';


const tagStore = useTagsStore()
const selected_tags = [] as Array<Tag>

const questionNumber = ref(10)
</script>
<template>
    <div id="connfig-eval">
        <div class="config-eval-form">
            <div class="mb-3">
                <label for="note-title" class="col-form-label">numbre de notes :</label>
                <input type="number" class="form-control" id="note-title" v-model="questionNumber">
            </div>
            <div class="mb-3">
                <SelectTags v-model:tags_selected="selected_tags" v-model:tags_list="tagStore.userTags" />
            </div>
            <div class="d-flex justify-content-end">
                <RouterLink :to="{name:'evaluation', params:{nbrNotes: questionNumber}}" class="btn btn-primary ms-auto">
                    Demarrer
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
#connfig-eval{
    height: 100vh;
    justify-content: center;
    align-content: center;
}

.config-eval-form{
    background-color: white;
    padding: 2em;
    margin-top: 3em;
    max-width: 25em;
    margin-inline: auto;
}
</style>