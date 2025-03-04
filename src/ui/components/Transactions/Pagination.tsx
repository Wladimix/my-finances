import ReactPaginate from 'react-paginate';

import { $currentPage, $numberOfPages, changePage } from '../../storage/paginationStore';
import { useUnit } from 'effector-react';
import { getAllTransations } from '../../storage/transactionStore';

export default function Pagination() {
    const changePageEvent = useUnit(changePage);
    const getAllTransationsEvent = useUnit(getAllTransations);

    const numberOfPages = useUnit($numberOfPages);
    const currentPage = useUnit($currentPage);

    const handler = ({ selected }: { selected: number }) => {
        changePageEvent(selected);
        getAllTransationsEvent();
    };

    return(
        <nav>
            <ReactPaginate

                disableInitialCallback={true}
                initialPage={currentPage}
                marginPagesDisplayed={1}
                onPageChange={handler}
                pageCount={numberOfPages}
                pageRangeDisplayed={5}

                containerClassName='uk-pagination uk-flex-center'
                activeClassName='uk-active'
                breakLinkClassName='uk-disabled'
                previousLabel={<span data-uk-pagination-previous />}
                nextLabel={<span data-uk-pagination-next />}

            />
        </nav>
    );
}
