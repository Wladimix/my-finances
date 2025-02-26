import { $allCategories, addCategory } from '../../../storage/categoryStore';
import { useUnit } from 'effector-react';

export default function AddCategoryButton() {
    const allCategories = useUnit($allCategories);

    const categoryAvailability = Boolean(allCategories.find(category => category.name === 'Новая категория'));

    const handler = () => {
        if (!categoryAvailability) {
            addCategory();
        }
    };

    return(
        <>
            {
                !categoryAvailability
                    ?   <button
                            className='uk-icon-link uk-margin-small-left'
                            data-uk-icon='icon:  plus-circle; ratio: 2'
                            onClick={handler}
                        />
                    :   <span
                            className='uk-icon uk-margin-small-left'
                            data-uk-icon='icon: plus-circle; ratio: 2'
                        />
            }
        </>
    );
}
