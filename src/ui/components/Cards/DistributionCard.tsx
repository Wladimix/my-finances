import DistributionService from "../../services/DistributionService"

import { useAppDispatch, useAppSelector } from "../../storage/store"
import { useState } from "react"
import { convertAmountToNumber } from '../../../electron/lib/utils'
import { checkAmount } from '../../lib/utils'

type DistributionCardProps = {
    distributionType: GetDistributionTypeDTO
}

export default function DistributionCard({ distributionType }: DistributionCardProps) {
    const date = useAppSelector(state => state.date);
    const requiredNote = useAppSelector(state => state.transaction.requiredNote);
    const currentPage = useAppSelector(state => state.pagination);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const changeNameEvent = (e: React.ChangeEvent<HTMLInputElement>): void => { setName(e.target.value) };
    const changeAmountEvent = (e: React.ChangeEvent<HTMLInputElement>): void => { setAmount(e.target.value) };

    const dispatch = useAppDispatch();
    const distributionService = new DistributionService(dispatch);

    const editDistributionTypeEvent = (): void => {
        const distributionTypeName = name ? name : distributionType.name;
        const distributionTypeAmount = amount ? amount : distributionType.amount;

        distributionService.editDistributionType(
            distributionType.id,
            distributionTypeName,
            distributionTypeAmount,
            {
                year: date.selectedYear,
                month: date.selectedMonth,
                note: requiredNote,
                page: currentPage
            }
        );

        setName("");
        setAmount("");
    }

    const deleteDistributionTypeEvent = (): void => {
        distributionService.deleteDistributionType(
            distributionType.id,
            distributionType.name,
            distributionType.amount,
            {
                year: date.selectedYear,
                month: date.selectedMonth,
                note: requiredNote,
                page: currentPage
            }
        );
    }

    return (
        <div>
            <div className="uk-card uk-card-default uk-card-hover">
                <div className="uk-card-body" data-uk-tooltip={`title: ${distributionType.name}: ${distributionType.amount}; pos: top; delay: 200`}>
                    <input
                        className="uk-input uk-margin"
                        onChange={changeNameEvent}
                        placeholder={distributionType.name}
                        spellCheck="false"
                        type="text"
                        value={name}
                    />
                    <input
                        className="uk-input uk-form-large"
                        onChange={changeAmountEvent}
                        placeholder={distributionType.amount}
                        spellCheck="false"
                        type="text"
                        value={amount}
                    />
                </div>
                <div className="uk-card-footer uk-text-right">
                    <button
                        className="uk-button uk-button-default uk-button-small"
                        disabled={!checkAmount(amount)}
                        onClick={editDistributionTypeEvent}
                    >
                        РЕДАКТИРОВАТЬ
                    </button>
                    <button
                        className="uk-button uk-button-default uk-button-small"
                        disabled={convertAmountToNumber(distributionType.amount) > 0}
                        onClick={deleteDistributionTypeEvent}
                    >
                        УДАЛИТЬ
                    </button>
                </div>
            </div>
        </div>
    );
}
