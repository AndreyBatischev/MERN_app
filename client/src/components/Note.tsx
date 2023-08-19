import style from '../styles/Note.module.css'
import styleUtils from '../styles/utils.module.css'
import { Card } from "react-bootstrap"
import { formateDate } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'
import {NoteProps} from '../types/interfaces'



const Note = ({note, className, onNoteClicked, onDeleteNoteClicked}: NoteProps) => {
    const {title, text, createdAt, updatedAt} = note

let createdUpdatedText: string

if(updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formateDate(updatedAt)}`
} else {
    createdUpdatedText = `Created: ${formateDate(createdAt)}`
}

return(
    <Card 
    className={`${style.noteCard} ${className}`}
    onClick={() => onNoteClicked(note) }
    >
        <Card.Body className={style.cardBody}>
            <Card.Title className={ styleUtils.flexCenter }>
                {title}
                <div className='ms-auto'>
                    <MdDelete 
                        className='text-muted '
                        onClick={(e) => {
                            onDeleteNoteClicked(note)
                            e.stopPropagation()
                        }}
                    />
                </div>
            </Card.Title>
            <Card.Text className={style.cardText}>
                {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>
            { createdUpdatedText }
        </Card.Footer>
    </Card>
)


}

export default Note