import { Note } from "../modules/note"
import { NoteInput } from "../types/interfaces"

async function fetchData(input:RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)

    if(response.ok) {
        return response
    }else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        throw Error(errorMessage)
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData('/api/notes/', {method: 'GET'})
    return response.json()
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })

    return response.json()
}

export async function updateNote(note: NoteInput, id: string): Promise<Note> {
    const response = await fetchData('/api/notes/' + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
        
        
    })
    return response.json()
}

export async function deleteNote(id:string) {
    await fetch('/api/notes/' + id, {method: 'DELETE'})
    
}