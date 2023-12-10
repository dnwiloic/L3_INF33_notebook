<script setup lang="ts">
import { ref , computed, onMounted} from 'vue';
import {useTagsStore} from "../../stores/tags"

const taggMotif = ref('')
const tagStore = useTagsStore();
const tags = ref( tagStore.userTags.map(elt=>{
    return {
        ...elt,
        selected : false
    }
}))
const showAll = ref(false)

const tagsResult = computed(()=>{
    console.log(taggMotif.value)
    return tags.value.filter( elt =>(elt.libelle.includes(taggMotif.value)))
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
    <span v-for="tag, index in selectedTags" :key="index" class="p-1">{{ tag.libelle }}</span>
    <div id="select-tags">
        <input type="text" class="form-control" id="tag-input" v-model="taggMotif">
        <div id="tags-result">    
            <div class="tagItems" v-for="tag, index in tagsResult" :key="index">
                <input type="checkbox" class="form-check-input" :id="''+tag.id" v-model="tag.selected">
                <label :for="''+tag.id" class="form-label">{{ tag.libelle }}</label>
            </div>
            <button v-if="tagsResult.length===0" class="btn border-primary">
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

input[type="checkbox"]{
    border: 0.1em solid rgb(52, 72, 182);
    margin-inline: 1em;
}
</style>