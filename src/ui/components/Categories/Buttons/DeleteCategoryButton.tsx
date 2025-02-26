import { editCategoryDeletionField } from '../../../storage/categoryStore';

export default function DeleteCategoryButton({ category }: IProps) {
    const handler = () => {
        editCategoryDeletionField({ id: category.id, isDeleted: 1 });
    };

    return(
        <td className='uk-text-large uk-text-center'>
            <button
                className='uk-button uk-button-small uk-button-danger'
                onClick={handler}
            >
                Удалить
            </button>
        </td>
    );
}

interface IProps {
    category: ICategory
}
