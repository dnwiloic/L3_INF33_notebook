import type Note from "./note";
import type { test_sttate_enum } from "./test_state_enum";

export default interface Test  {
    statut: test_sttate_enum,
    notes: Array< Note&{user_response?:string} >,
    score: number 
}