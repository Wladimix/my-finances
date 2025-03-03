
import { useUnit } from 'effector-react';

export default function AddTransactionButton() {


    const handler = () => {

    };

    return(
        <button
            className='uk-icon-link uk-margin-small-left'
            data-uk-icon='icon:  plus-circle; ratio: 2'
            onClick={handler}
        />
    );
}
