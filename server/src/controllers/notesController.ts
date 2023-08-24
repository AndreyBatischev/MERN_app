import {  RequestHandler } from 'express'
import NoteModel from '../models/note'
import createHttpError from 'http-errors'
import { CreateNoteBody, UpdateNoteParams } from '../types/requestHandlers'
import mongoose from 'mongoose'
import { assertIsDefined } from '../utils/assertIsDefined'

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId

  try {
      assertIsDefined(authenticatedUserId)
      const notes = await NoteModel.find({userId: authenticatedUserId}).exec()
      res.status(200).json(notes)
    } catch (error) {
      next(error)
    }
  }

export const getNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const authenticatedUserId = req.session.userId
  
    
  try {
    assertIsDefined(authenticatedUserId)
    
    if(!mongoose.isValidObjectId(id)){
        throw createHttpError(400, 'Invalid note id')
    }

    const note = await NoteModel.findById(id).exec()
    if(!note){
        throw createHttpError(404, "Note not found")
    }
    
    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this note')
    }

      res.status(200).json(note)
    } catch (error) {
      next(error)
    }
  }

 
export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const { title, text } = req.body
  const authenticatedUserId = req.session.userId
  try {
      assertIsDefined(authenticatedUserId)
        if(!title){
            throw createHttpError(400, 'Note must have a title')
        }

    const newNote = await NoteModel.create({
      userId: authenticatedUserId,
      title,
      text
    })
       res.status(201).json(newNote)
    } catch (error) {
      next(error)
    }
  }

export const updateNotes: RequestHandler<UpdateNoteParams, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const {title, text} = req.body
    const { id } = req.params
    const authenticatedUserId = req.session.userId
  
    try {
        assertIsDefined(authenticatedUserId)
      
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, 'Invalid note id')
        }

        if(!title){
            throw createHttpError(400, 'Note must have a title')
        }

        const note =  await NoteModel.findByIdAndUpdate(id, {title, text}, {
          new: true,
          includeResultMetadata: false  
        });
        
        if(!note){
            throw createHttpError(404, "Note not found")
      }
      
       if (!note.userId.equals(authenticatedUserId)) {
        throw createHttpError(401, 'You cannot access this note')
      }

        res.status(200).json(note)
    } catch (error) {
      next(error)
    }
  }

export const deleteNotes: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, 'Invalid note id')
        }

        const note = await NoteModel.findByIdAndDelete(id)
        if(!note){
            throw createHttpError(404, "Note not found")
        }
        
        if (!note.userId.equals(authenticatedUserId)) {
          throw createHttpError(401, 'You cannot access this note')
        }

        res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

 