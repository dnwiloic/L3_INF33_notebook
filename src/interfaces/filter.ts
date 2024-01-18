import type { note_statut } from "./note_status_enum";
import type Tag from "./tag";

export default interface FilterOption{
    favorite?: boolean,
    not_favorite?: boolean,
    title?: string,
    content?: string,
    question?: string,
    response?: string,
    tags?: Array<Tag>
    created_at?: {
        debut?: Date|string,
        fin?: Date|string
    },
    statut?: Array<note_statut>
}