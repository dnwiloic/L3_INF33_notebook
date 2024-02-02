import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import TagsModel from '@/API/tag_model';
import type Tag from '@/interfaces/tag';
import { useUserStore } from './user';
import { toast } from 'vue3-toastify';


export const useTagsStore = defineStore('tags', () => {
  const userTags = ref([] );
  const user = useUserStore().user

  const fetchUserTags =async (user_id: number) => {
    const tagModel = new TagsModel(user_id)
    console.log(user_id)
    tagModel.getAllUserTag().then( res => {
      res.json().then( tags => {
        userTags.value = tags
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  const createTag = (user_id: number, tag: Tag) => {
    const tagModel = new TagsModel(user_id)
    delete(tag.nbr_notes)
    tagModel.addUsserTag(tag).then(
      res => {
        res.json().then( ()=>{ 
          toast.success(`Le tag  ${tag.content} à été créé`)
          fetchUserTags(user_id)
        })
        .catch(err => {
          toast.error(`Erreur lors de la création du tag`)
        })
      }
    )
    .catch(err => toast.error(`Erreur lors de la création du tag`))
  }

  const updateTag = (user_id: number, tag: Tag) => {
    const tagModel = new TagsModel(user_id)
    tagModel.update(tag.id!, tag).then(
      res => {
        res.json().then( ()=>{ 
          toast.success(`Le tag  ${tag.content} à été mis à jour `)
          fetchUserTags(user_id)
        })
        .catch(err => toast.error(`Erreur lors de la mise à jour du tag`))
      }
    ).catch(err => toast.error(`Erreur lors de la mise à jour du tag`))
  }

  const deleteTag = (user_id: number, tag_id: number) => {
    const tagModel = new TagsModel(user_id)
    tagModel.delete(tag_id).then(
      res => {
        res.json().then( ()=>{
          toast.success(`Le tag  à été supprimé`)
          fetchUserTags(user!.id!)
        })
        .catch(err => toast.error(`Erreur lors de la suppression du tag`))
      }
    ).catch(err => toast.error(`Erreur lors de la suppression du tag`))
  }

  


  return { userTags, fetchUserTags, createTag, deleteTag, updateTag }
})
