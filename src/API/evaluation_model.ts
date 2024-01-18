import BackendAPI from "./baseAPI";

export default class EvaluationModel{
    backendApi: BackendAPI;
  user_id: number
  constructor(user_id:number){
    this.backendApi = new BackendAPI(`users/${user_id}/`)
    this.user_id = user_id
  }

  random_note(tags_id :Array<number>, nbr: number){
    if(!tags_id || tags_id.length === 0)
        return this.random_note_from_all(nbr)
    let tags_string = `tag_ids=${tags_id[0]}`
    for(let i=1;i<tags_id.length;i++)
        tags_string= tags_string + `&tag_ids=${tags_id[i]}`
    return this.backendApi.get(`random-notes/?${tags_string}&count=${nbr}`)
  }

  random_note_from_all(nbr: number){
    return this.backendApi.get(`random-notes-from-all/?count=${nbr}`)
  }
}