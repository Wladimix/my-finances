import CostDiagram from './Diagrams/CostDiagram';
import InflationDiagram from './Diagrams/InflationDiagram';
import NoteCheckboxes from './Checkboxes';
import NoteInput from './NoteInput';
import NotesButtons from './NotesButtons';

import { $selectedYear } from '../../storage/dateStore';
import { useUnit } from 'effector-react';

export default function NoteModal() {
    const selectedYear = useUnit($selectedYear);

    return(
        <div id='note-modal' className='uk-modal-container' data-uk-modal data-container='false'>
            <div className='note-modal-container uk-modal-dialog uk-modal-body' data-uk-overflow-auto>

                <button className='uk-modal-close-default' data-uk-close></button>

                <h2 className='uk-modal-title'>
                    <NoteInput />
                </h2>

                <NotesButtons />
                <NoteCheckboxes />

                {
                    selectedYear
                        ?   <div className='uk-margin-top'>

                                <h3 className='uk-heading-divider'><span>Стоимость за {selectedYear} год</span></h3>
                                <CostDiagram />

                                <h3 className='uk-heading-divider'><span>Инфляция за {selectedYear} год</span></h3>
                                <InflationDiagram />

                            </div>

                        :   ''
                }

            </div>
        </div>
    );
}
