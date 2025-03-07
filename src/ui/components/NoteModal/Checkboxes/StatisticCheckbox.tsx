import { $calculateStatisticFlag, $transactionId, changeCalculateStatisticFlag } from '../../../storage/noteStore';
import { editCalculateStatisticFlag } from '../../../storage/transactionStore';
import { useUnit } from 'effector-react';


export default function StatisticCheckbox() {
    const changeCalculateStatisticFlagEvent = useUnit(changeCalculateStatisticFlag);
    const editCalculateStatisticFlagEvent = useUnit(editCalculateStatisticFlag);

    const transactionId = useUnit($transactionId);
    const calculateStatisticFlag = useUnit($calculateStatisticFlag);

    const handler = () => {
        changeCalculateStatisticFlagEvent(Number(!Boolean(calculateStatisticFlag)) as 0 | 1);
        editCalculateStatisticFlagEvent({ id: transactionId, flag: Number(!Boolean(calculateStatisticFlag)) as 0 | 1 });
    };

    return(
        <label>
            <input
                checked={Boolean(calculateStatisticFlag)}
                className='uk-checkbox'
                onChange={handler}
                type='checkbox'
            />
            Расчёт статистики
        </label>
    );
}
