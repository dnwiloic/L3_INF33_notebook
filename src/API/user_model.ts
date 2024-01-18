import type Note from "@/interfaces/note";
import BackendAPI from "./baseAPI";
import type User from "@/interfaces/user";

// Fonction pour générer un tableau d'objets de notes aléatoires
export default class UserModel{
  backendApi: BackendAPI;
  constructor(){
    this.backendApi = new BackendAPI(`users/`)
  }

  create(user: User){
    return this.backendApi.post(user)
  }

  signIn(user: {
    email: string,
    password: string
  }){
    return this.backendApi.post(user,'auth/')
  }
  getAllUser(){
    return this.backendApi.get()
  }



  get(user_id:number){
    return this.backendApi.get(`${user_id}`)
  }

  update(user: User){
    return this.backendApi.put(user,`${user.id}`)
  }

  delete(user_id:number){
    return this.backendApi.delete({},`${user_id}`)
  }

}