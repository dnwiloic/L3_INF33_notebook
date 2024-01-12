import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import TagsModel from '@/API/tag_model';
import type Tag from '@/interfaces/tag';

export const useTagsStore = defineStore('tags', () => {
  const userTags = ref([
    { id: 1, content: 'TagA' },
    { id: 2, content: 'TagB' },
    { id: 3, content: 'TagC' },
    { id: 4, content: 'motifA' },
    { id: 5, content: 'motifB' },
    { id: 6, content: 'motifC' },
    { id: 7, content: 'motifD' },
    { id: 8, content: 'motifE' },
    { id: 9, content: 'motifF' },
    { id: 10, content: 'motifG' },
    { id: 11, content: 'motifH' },
    { id: 12, content: 'motifI' },
    { id: 13, content: 'motifJ' },
    { id: 14, content: 'motifK' },
    { id: 15, content: 'motifL' },
    { id: 16, content: 'motifM' },
    { id: 17, content: 'motifN' },
    { id: 18, content: 'motifO' },
    { id: 19, content: 'motifP' },
   
  ] );

  const fetchUserTags = (user_id: number) => {
    const tagModel = new TagsModel(user_id)
    tagModel.getAllUserTag().then( res => {
      res.json().then( tags => {
        userTags.value = tags
      })
    })
  }

  const createTag = (user_id: number, tag: Tag) => {
    const tagModel = new TagsModel(user_id)
    tagModel.addUsserTag(tag).then(
      res => {
        res.json().then( ()=>{ fetchUserTags(user_id)})
      }
    )
  }

  const updateTag = (user_id: number, tag: Tag) => {
    const tagModel = new TagsModel(user_id)
    tagModel.update(tag.id!, tag).then(
      res => {
        res.json().then( ()=>{ fetchUserTags(user_id)})
      }
    )
  }

  const deleteTag = (user_id: number, tag_id: number) => {
    const tagModel = new TagsModel(user_id)
    tagModel.delete(tag_id).then(
      res => {
        res.json().then( ()=>{ fetchUserTags(user_id)})
      }
    )
  }



  return { userTags, fetchUserTags, createTag, deleteTag, updateTag }
})
