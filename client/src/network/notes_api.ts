import { Note } from "../models/note"
import { User } from "../models/user"
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

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", {method: "GET"})
    return response.json()
}

export interface SingUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function singUp(credentials: SingUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/singup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredentials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData('/api/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData('/api/notes/', {method: 'GET'})
    return response.json()
}

export async function logout() {
        await fetchData('/api/users/logout', {method: 'POST'})
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