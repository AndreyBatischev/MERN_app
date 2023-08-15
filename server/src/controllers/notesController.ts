import {  RequestHandler } from 'express'
import NoteModel from '../models/note'
import createHttpError from 'http-errors'
import { CreateNoteBody, UpdateNoteParams } from '../types/requestHandlers'
import mongoose from 'mongoose'

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
      const notes = await NoteModel.find().exec()
      res.status(200).json(notes)
    } catch (error) {
      next(error)
    }
  }

export const getNote: RequestHandler = async (req, res, next) => {
    const {id} = req.params
    
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, 'Invalid note id')
        }

        const note = await NoteModel.findById(id).exec()
        if(!note){
            throw createHttpError(404, "Note not found")
        }
      res.status(200).json(note)
    } catch (error) {
      next(error)
    }
  }

 
export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const {title, text} = req.body
    try {
        if(!title){
            throw createHttpError(400, 'Note must have a title')
        }

       const newNote = await NoteModel.create({title, text})
       res.status(201).json(newNote)
    } catch (error) {
      next(error)
    }
  }

export const updateNotes: RequestHandler<UpdateNoteParams, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const {title, text} = req.body
    const {id} = req.params
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, 'Invalid note id')
        }

        if(!title){
            throw createHttpError(400, 'Note must have a title')
        }

        const note = await NoteModel.findByIdAndUpdate(id, {title, text})

        if(!note){
            throw createHttpError(404, "Note not found")
        }

        res.status(200).json(note)
    } catch (error) {
      next(error)
    }
  }

export const deleteNotes: RequestHandler = async (req, res, next) => {
    const {id} = req.params
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, 'Invalid note id')
        }

        const note = await NoteModel.findByIdAndDelete(id)
        if(!note){
            throw createHttpError(404, "Note not found")
        }
        res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

 