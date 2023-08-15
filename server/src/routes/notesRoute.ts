import express  from 'express'
import {getNotes, getNote, createNotes, updateNotes, deleteNotes} from '../controllers/notesController'

const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', createNotes)
router.patch('/:id', updateNotes)
router.delete('/:id', deleteNotes)

export default router