import type Note from "@/interfaces/note";
import BackendAPI from "./baseAPI";
import type User from "@/interfaces/user";
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
    return this.backendApi.put(tag,`${tag_id}`)
  }

  delete(tag_id:number){
    return this.backendApi.delete({},`${tag_id}`)
  }

}