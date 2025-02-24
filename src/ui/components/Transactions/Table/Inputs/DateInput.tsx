import DatePicker from 'react-datepicker';

import { ru } from 'date-fns/locale/ru';

export default function DateInput() {
    return(
        <DatePicker
            className='custom-input uk-input'
            dateFormat='dd MMMM YYYY'
            locale={ru}
            onChange={() => {}}
            selected={new Date()}
            popperPlacement='bottom-end'
        />
    );
}
