import NoteModal from '../../../NoteModal/NoteModal';

export default function OpenNoteButton() {
    return(
        <>
            <div
                className='note'
                data-uk-toggle='target: #note-modal
            '>
                сырок глазированный из магазина 'пятёрочка' 'белая поляна'
            </div>

            <NoteModal />
        </>
    );
}
