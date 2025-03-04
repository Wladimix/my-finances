import { $selectedMonth, $selectedYear } from '../../../storage/dateStore';
import { addTransaction } from '../../../storage/transactionStore';
import { useUnit } from 'effector-react';
import { getLastMonthDay } from '../../../utils';

export default function AddTransactionButton() {
    const addTransactionEvent = useUnit(addTransaction);

    const selectedYear = useUnit($selectedYear);
    const selectedMonth = useUnit($selectedMonth);

    const handler = () => {

        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();

        if (selectedYear) {
            year = Number(selectedYear);
            month = selectedMonth ? Number(selectedMonth) : 11;
            day = getLastMonthDay(month);
        }

        addTransactionEvent(new Date(year, month, day, 0, 0, 0));
    };

    return(
        <button
            className='uk-icon-link uk-margin-small-left'
            data-uk-icon='icon: plus-circle; ratio: 2'
            onClick={handler}
        />
    );
}
