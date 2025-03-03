import DatePicker from 'react-datepicker';

import { editTransactionDate } from '../../../../storage/transactionStore';
import { ru } from 'date-fns/locale/ru';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function DateInput({ transaction }: IProps) {
    const [date, changeDate] = useState<Date>(new Date(transaction.date));

    const editTransactionDateEvent = useUnit(editTransactionDate);

    const handler = (date: Date | null) => {
        if (date) {
            changeDate(date);
            editTransactionDateEvent({ id: transaction.id, date });
        }
    };

    return(
        <DatePicker
            className='custom-input uk-input datepicker'
            dateFormat='dd MMMM YYYY'
            locale={ru}
            onChange={handler}
            onKeyDown={e => e.preventDefault()}
            selected={date}
            popperPlacement='bottom-end'
        />
    );
}

interface IProps {
    transaction: ITransaction
}
