// Fonction pour générer un tableau d'objets de notes aléatoires
export function generateRandomNotesArray() {
    const notes = [];
  
    for (let i = 0; i < 5; i++) {
      const note = {
        title: `Note ${i + 1}`,
        content: `Contenu de la note ${i + 1}`,
        question: `Question de la note ${i + 1}`,
        tags: [
          { id: 1, libelle: 'TagA' },
          { id: 2, libelle: 'TagB' },
          { id: 3, libelle: 'TagC' }
        ]
      };
  
      notes.push(note);
    }
  
    return notes;
  }
  
  