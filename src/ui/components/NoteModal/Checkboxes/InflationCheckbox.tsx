import { $calculateInflationFlag, $transactionId, changeCalculateInflationFlag } from '../../../storage/noteStore';
import { editCalculateInflationFlag } from '../../../storage/transactionStore';
import { useUnit } from 'effector-react';

export default function InflationCheckbox() {
    const changeCalculateInflationFlagEvent = useUnit(changeCalculateInflationFlag);
    const editCalculateInflationFlagEvent = useUnit(editCalculateInflationFlag);

    const transactionId = useUnit($transactionId);
    const calculateInflationFlag = useUnit($calculateInflationFlag);

    const handler = () => {
        changeCalculateInflationFlagEvent(Number(!Boolean(calculateInflationFlag)) as 0 | 1);
        editCalculateInflationFlagEvent({ id: transactionId, flag: Number(!Boolean(calculateInflationFlag)) as 0 | 1 });
    };

    return(
        <label>
            <input
                checked={Boolean(calculateInflationFlag)}
                className='uk-checkbox uk-margin-left'
                onChange={handler}
                type='checkbox'
            />
            Рассчёт инфляции
        </label>
    );
}
