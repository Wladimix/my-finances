import DeleteCategoryButton from './Buttons/DeleteCategoryButton';
import CategoryNameInput from './CategoryNameInput';

export default function Row({ category }: IProps) {
    return(
        <tr>

            <td className='uk-text-large'>
                <CategoryNameInput category={category} />
            </td>

            <DeleteCategoryButton category={category} />

        </tr>
    );
}

interface IProps {
    category: ICategory
}
