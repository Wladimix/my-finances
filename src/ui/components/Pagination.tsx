import CalculationService from "../services/CalculationService"
import ReactPaginate from "react-paginate"
import TransactionService from "../services/Transaction/TransactionService"

import { setPage } from "../storage/paginationSlice"
import { useAppDispatch, useAppSelector } from "../storage/store"
import { useEffect, useState } from "react"

export default function Pagination() {
    const allTransactions = useAppSelector(state => state.data.transactions);
    const transaction = useAppSelector(state => state.transaction);
    const date = useAppSelector(state => state.date);
    const currentPage = useAppSelector(state => state.pagination);

    const [pageCount, setPageCount] = useState<number>(currentPage + 1);

    useEffect(() => { CalculationService.calculatePageCount(setPageCount, {
        year: date.selectedYear,
        month: date.selectedMonth,
        note: transaction.requiredNote
    }) }, [allTransactions]);

    const dispatch = useAppDispatch();

    const pageChangeEvent = ({ selected }: { selected: number }): void => {
        dispatch(setPage(selected));
        new TransactionService(dispatch).loadTransactions({
            year: date.selectedYear,
            month: date.selectedMonth,
            note: transaction.requiredNote,
            page: selected
        });
    }

    return (
        <ReactPaginate
            initialPage={currentPage}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            onPageChange={pageChangeEvent}
            disableInitialCallback={true}
            containerClassName="uk-pagination uk-flex-center"
            activeClassName="uk-active"
            breakLinkClassName="uk-disabled"
            previousLabel={<span data-uk-pagination-previous />}
            nextLabel={<span data-uk-pagination-next />}
        />
    );
}
