import BackendAPI from "./baseAPI";
import type Tag from "@/interfaces/tag";

// Fonction pour générer un tableau d'objets de notes aléatoires
export default class TagsModel{
  backendApi: BackendAPI;
  constructor(user_id: number){
    this.backendApi = new BackendAPI(`users/${user_id}/tags/`)
  }

  addUsserTag(tag: Tag){
    return this.backendApi.post(tag)
  }

  getAllUserTag(){
    return this.backendApi.get()
  }

  getUserTag(tag_id:number){
    return this.backendApi.get(`${tag_id}`)
  }

  update(tag_id:number, tag: Tag){
    const tmp_tag = {content: tag.content}
    return this.backendApi.put(tmp_tag,`${tag_id}`)
  }

  delete(tag_id:number){
    return this.backendApi.delete({},`{note_id}?tag_id=${tag_id}`)
  }

}