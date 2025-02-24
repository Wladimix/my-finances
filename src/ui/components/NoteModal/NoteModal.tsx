import NoteInput from './NoteInput';
import NoteCheckbox from './NoteCheckbox';
import CostDiagram from './Diagrams/CostDiagram';
import InflationDiagram from './Diagrams/InflationDiagram';

export default function NoteModal() {
    return(
        <div id='note-modal' className='uk-modal-container' data-uk-modal data-container='false'>
            <div className='uk-modal-dialog uk-modal-body'>

                <button className='uk-modal-close-default' data-uk-close></button>

                <h2 className='uk-modal-title'>
                    <NoteInput />
                </h2>

                <NoteCheckbox />

                <h3 className='uk-heading-divider'><span>Стоимость за 2024 год</span></h3>
                <CostDiagram />

                <h3 className='uk-heading-divider'><span>Инфляция за 2024 год</span></h3>
                <InflationDiagram />

            </div>
        </div>
    );
}
