<script setup lang="ts">
import { ref , computed, onMounted, watch, type Ref, onUpdated, type ComputedRef} from 'vue';
import {useTagsStore} from "../../stores/tags"
import { useUserStore } from '@/stores/user';
import type Tag from '@/interfaces/tag';

const taggMotif = ref('')
const tagStore = useTagsStore();
const userStore = useUserStore();

const props = defineProps(['enableCreation',])
const tags_selected =  defineModel('tags_selected') as Ref<Array<Tag>>
const tags_list = computed(()=>tagStore.userTags) as ComputedRef<Array<Tag>>

    onUpdated(()=>{
        console.log('updated tag selector')
        console.log(tags_list.value)
    })

const tags = computed(()=> tags_list.value.map(elt=>{elt
    const tags_selected_ids = tags_selected.value.map(tg=>tg.id)
    return {
        ...elt,
        selected : tags_selected_ids.includes(elt.id)
    }
}))

const update_tags = (tag: Tag&{selected: boolean}) => {
    if(tag.selected && !tags_selected.value.includes(tag)){
        console.log()
        tags_selected.value.push(tag)
    }
    else
        tags_selected.value = tags_selected.value.filter(tg => tg.id !== tag.id)
}
// watch(tags.value,()=>{
//     console.log("change")
//     const selected_tags = [] as Array<Tag>
//     tags.value.forEach(elt => {
//         if(elt.selected)  selected_tags.push({id:elt.id, content: elt.content})
//     })
//     tags_selected.value = selected_tags
// })


const quick_create_tag = () => {
    const tag = {
        content: taggMotif.value
    } as Tag
    tagStore.createTag(userStore.user!.id!, tag)
    
}
const showCreateTag = computed(()=>{
    if(!props.enableCreation){
        return false
    }else if(
        tagsResult.value.filter(elt=> (elt.content===taggMotif.value)).length === 0 
        && taggMotif.value!==''
        ) return true
    else  return false
})

const selectAll = ref(false)
const select_deselect_all = ()=>{
    for( const tg of tags.value){
        tg.selected = !selectAll.value
        update_tags(tg)
    }
    selectAll.value = !selectAll.value
}

const tagsResult = computed(()=>{
    console.log(taggMotif.value)
    return tags.value.filter( elt =>(elt.content.includes(taggMotif.value)))
})

const selectedTags = computed(()=>{
    return tags.value.filter( elt=>elt.selected )
})

onMounted(()=>{
    let tagInputIsFocus = false;
    let tagsResultHaveMouse = false
    function showTagList(){
        
        if(tagInputIsFocus || tagsResultHaveMouse)
            document.getElementById('tags-result')?.classList.add('active')
        else
            document.getElementById('tags-result')?.classList.remove('active')
    }
    document.querySelector('#tag-input')?.addEventListener('focus', function(){
        tagInputIsFocus = true
        showTagList()
    })
    document.querySelector('#tag-input')?.addEventListener('blur', function(){
        tagInputIsFocus = false
        showTagList()
    })
    document.querySelector('#tags-result')?.addEventListener('mouseover', function(){
        tagsResultHaveMouse = true
        showTagList()
    })
    document.querySelector('#tags-result')?.addEventListener('mouseout', function(){
        tagsResultHaveMouse = false
        showTagList()
    })
})
</script>
<template>
    <label for="note-title" class="col-form-label">Tags:</label>
    <span v-for="tag, index in selectedTags" :key="index" class="tag-flag">{{ tag.content }}</span>
    <div id="select-tags">
        <input type="text" class="form-control" id="tag-input" v-model="taggMotif">
        <div id="tags-result">
            <!--<a href="#" @click="select_deselect_all">
                <span v-if="!selectAll">Tous selectionner</span>
                <span v-else>Tous déselectionner</span>
            </a> -->
            <div class="tagItems" v-for="tag, index in tagsResult" :key="index">
                <input type="checkbox" class="form-check-input" @change="()=>{update_tags(tag)}" :id="''+tag.id" v-model="tag.selected">
                <label :for="''+tag.id" class="form-label">{{ tag.content }}</label>
            </div>
            <button v-if="showCreateTag" @click="quick_create_tag" class="btn border-primary">
                Cree <span class="fw-bold">{{ taggMotif }}</span>
            </button>
        </div>
    </div>
</template>

<style>
#select-tags{
    position: relative;;
}
#tags-result{
    position: absolute;
    width: 90%;
    height: 0em;
    overflow: hidden;
    z-index: 1;
    background-color: white;
    transition: height 1s;
    display: grid;
    grid-template-columns: auto auto ;
    min-width: 25em;
}

#tags-result.active{
    height: auto;
    box-shadow: 0px 0px 3px 0px;
    overflow: auto;
    max-height: 10em;
    transition: all 1s;
    padding: 1em;
}

.tag-flag{
    display: inline-block;
    background-color: rgba(226, 223, 223, 0.675);
    font-size: 0.9rem;
    padding: 0.2rem 0.5rem;
    margin:0 0.5rem ;
}

input[type="checkbox"]{
    border: 0.1em solid rgb(52, 72, 182);
    margin-inline: 1em;
}
</style>