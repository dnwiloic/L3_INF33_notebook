import  { type note_statut } from "./note_status_enum";
import type Tag from "./tag";

export default interface Note{
    id? :number,
    user_id?: number,
    title: string,
    content: string,
    question: string,
    response: string,
    is_favorite: boolean,
    is_deleted?: boolean,
    is_draft?:boolean
    statut: note_statut,
    created_at?: Date|string
    updated_at?: Date|string
    tags?: Array<Tag>
}