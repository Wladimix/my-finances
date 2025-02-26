import Heading from './Heading';
import NoCategories from './NoCategories';
import Row from './Row';

import { $allCategories } from '../../storage/categoryStore';
import { useUnit } from 'effector-react';

export default function Categories() {
    const allCategories = useUnit($allCategories);

    const displayCategories = () => allCategories.length
        ? allCategories.map(category =>
            <Row key={category.id} category={category} />
        )
        : <NoCategories />;

    return(
        <>
            <Heading />

            <div className='uk-child-width-expand' data-uk-grid>
                <div>
                    <table>
                        <tbody>
                            {displayCategories()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
