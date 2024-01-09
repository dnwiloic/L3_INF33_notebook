import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', () => {
  const userTags = [
    { id: 1, libelle: 'TagA' },
    { id: 2, libelle: 'TagB' },
    { id: 3, libelle: 'TagC' },
    { id: 4, libelle: 'motifA' },
    { id: 5, libelle: 'motifB' },
    { id: 6, libelle: 'motifC' },
    { id: 7, libelle: 'motifD' },
    { id: 8, libelle: 'motifE' },
    { id: 9, libelle: 'motifF' },
    { id: 10, libelle: 'motifG' },
    { id: 11, libelle: 'motifH' },
    { id: 12, libelle: 'motifI' },
    { id: 13, libelle: 'motifJ' },
    { id: 14, libelle: 'motifK' },
    { id: 15, libelle: 'motifL' },
    { id: 16, libelle: 'motifM' },
    { id: 17, libelle: 'motifN' },
    { id: 18, libelle: 'motifO' },
    { id: 19, libelle: 'motifP' },
  ]

  return { userTags }
})
