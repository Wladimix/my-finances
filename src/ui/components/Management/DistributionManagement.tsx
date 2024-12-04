import DistributionCard from "../Cards/DistributionCard"
import DistributionService from '../../services/DistributionService'
import React, { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../storage/store"

export default function DistributionManagement() {
    const distribytionTypes = useAppSelector(state => state.data.distributionFinancesTypes);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const changeNameEvent = (e: React.ChangeEvent<HTMLInputElement>): void => { setName(e.target.value) };
    const changeAmountEvent = (e: React.ChangeEvent<HTMLInputElement>): void => { setAmount(e.target.value) };

    const dispath = useAppDispatch();
    const distributionService = new DistributionService(dispath);

    const addDistributionTypeEvent = (): void => {
        distributionService.addDistributionType(name, amount);
        setName("");
        setAmount("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && distributionService.checkDistributionType(name, amount)) {
            addDistributionTypeEvent();
        };
    }

    return (
        <>
            <h3 className="uk-heading-line uk-width-expand">
                <span>Распределение финансов</span>
            </h3>

            <div className="uk-child-width-1-3@s uk-grid-match" data-uk-grid>

                {
                    distribytionTypes.map(distributionType => (
                        <DistributionCard key={distributionType.id} distributionType={distributionType} />
                    ))
                }

                <div>
                    <div className="uk-card uk-card-default uk-card-hover">
                        <div className="uk-card-body">
                            <input
                                className="uk-input uk-margin"
                                onChange={changeNameEvent}
                                onKeyDown={handleKeyDown}
                                spellCheck="false"
                                type="text"
                                value={name}
                            />
                            <input
                                className="uk-input uk-form-large"
                                onChange={changeAmountEvent}
                                onKeyDown={handleKeyDown}
                                spellCheck="false"
                                type="text"
                                value={amount}
                            />
                        </div>
                        <div className="uk-card-footer uk-text-right">
                            <button
                                className="uk-button uk-button-default uk-button-primary uk-button-small"
                                disabled={!distributionService.checkDistributionType(name, amount)}
                                onClick={addDistributionTypeEvent}
                            >
                                ДОБАВИТЬ
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
