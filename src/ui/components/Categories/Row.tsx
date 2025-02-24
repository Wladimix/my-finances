import DeleteCategoryButton from './Buttons/DeleteCategoryButton';
import CategoryNameInput from './CategoryNameInput';

export default function Row() {
    return(
        <tr>

            <td className='uk-text-large'>
                <CategoryNameInput />
            </td>

            <DeleteCategoryButton />

        </tr>
    );
}
