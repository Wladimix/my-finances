import { $allCategories, $name, changeName, editCategoryName } from '../../storage/categoryStore';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function CategoryNameInput({ category }: IProps) {
    const changeNameEvent = useUnit(changeName);

    const allCategories = useUnit($allCategories);
    const name = useUnit($name);

    const [localName, changeLocalName] = useState<string>(category.name);
    const [inputFocus, changeInputFocus] = useState<boolean>(false);

    const isEmptyName = localName === '';
    const categoryAvailability = Boolean(allCategories.find(category => category.name === localName));
    const editingCondition = !isEmptyName && !categoryAvailability;

    const blurHandler = () => {

        changeInputFocus(false);

        if (editingCondition) {
            editCategoryName({ id: category.id, name });
        } else {
            changeLocalName(category.name);
        }

    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeLocalName(e.target.value);
        changeNameEvent(e.target.value);
    };

    const focusHandler = () => {
        changeInputFocus(true);
    }

    const getDangerColor = () => {
        if (inputFocus && !editingCondition) {
            return ' uk-text-danger';
        } else if (inputFocus && editingCondition) {
            return ' uk-text-success';
        } else {
            return '';
        }
    };

    return(
        <input
            className={'custom-input uk-input' + getDangerColor()}
            onBlur={blurHandler}
            onChange={changeHandler}
            onFocus={focusHandler}
            onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
            spellCheck={false}
            value={localName}
        />
    );
}

interface IProps {
    category: ICategory
}
