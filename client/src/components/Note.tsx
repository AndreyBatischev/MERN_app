import style from '../styles/Note.module.css'
import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../modules/note"
import { formateDate } from '../utils/formatDate'

interface NoteProps {
    note: NoteModel,
    className?: string
}

const Note = ({note, className}: NoteProps) => {
    const {title, text, createdAt, updatedAt} = note

let createdUpdatedText: string

if(updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formateDate(updatedAt)}`
} else {
    createdUpdatedText = `Created: ${formateDate(createdAt)}`
}

return(
    <Card className={`${style.noteCard} ${className}`}>
        <Card.Body className={style.cardBody}>
            <Card.Title>
                {title}
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