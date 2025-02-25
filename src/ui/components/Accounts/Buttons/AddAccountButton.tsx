import { addAccount } from '../../../storage/accountStore';

export default function AddAccountButton() {
    const handler = () => {
        addAccount();
    };

    return(
        <button
            className='uk-icon-link uk-margin-small-left'
            data-uk-icon='icon:  plus-circle; ratio: 2'
            onClick={handler}
        />
    );
}
