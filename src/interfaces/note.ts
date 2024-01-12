import  { type note_statut } from "./note_status_enum";
import type Tag from "./tag";

export default interface Note{
    id? :number
    title: string,
    content: string,
    question: string,
    response: string,
    is_favorite: boolean,
    is_draft?:boolean
    statut: note_statut,
    created_date: Date|string
    tags: Array<Tag>
}