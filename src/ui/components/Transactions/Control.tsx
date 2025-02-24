import MonthSelect from './Inputs/MonthSelect';
import NoteSearchInput from './Inputs/NoteSearchInput';
import StatisticButton from './Buttons/StatisticButton';
import YearSelect from './Inputs/YearSelect';

export default function Control() {
    return(
        <div className='uk-margin-bottom' data-uk-grid>
            <div>
                <StatisticButton />
            </div>

            <div>
                <YearSelect />
            </div>

            <div>
                <MonthSelect />
            </div>

            <div className='uk-width-expand uk-text-right'>
                <div className='uk-inline uk-width-1-2'>
                    <span className='uk-form-icon' data-uk-icon='icon: search; ratio: 1.2' />
                    <NoteSearchInput />
                </div>
            </div>
        </div>
    );
}
