import CategoryCard from "../Cards/CategoryCard"
import SpendingCategoryService from "../../services/SpendingCategoryService"

import { useAppDispatch, useAppSelector } from "../../storage/store"
import { useState } from "react"

export default function CategoryManagement() {
    const spendingCategories = useAppSelector(state => state.data.spendingCategories);

    const [name, setName] = useState<string>("");

    const changeName = (e: React.ChangeEvent<HTMLInputElement>): void => { setName(e.target.value) };

    const dispath = useAppDispatch();
    const categoryService = new SpendingCategoryService(dispath);

    const addSpendingCategoryEvent = (): void => {
        categoryService.addSpendingCategory(name);
        setName("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && categoryService.checkSpendingCategory(name)) {
            addSpendingCategoryEvent();
        }
    }

    return (
        <>
            <h3 className="uk-heading-line uk-width-expand">
                <span>Категории расходов</span>
            </h3>

            <div className="uk-child-width-1-3@s uk-grid-match" data-uk-grid>

                {
                    spendingCategories.map(spendingCategory => (
                        <CategoryCard key={spendingCategory.id} spendingCategory={spendingCategory} />
                    ))
                }

                <div>
                    <div className="uk-card uk-card-default uk-card-hover">
                        <div className="uk-card-body">
                            <input
                                className="uk-input uk-form-large"
                                onChange={changeName}
                                onKeyDown={handleKeyDown}
                                spellCheck="false"
                                type="text"
                                value={name}
                            />
                        </div>
                        <div className="uk-card-footer uk-text-right">
                            <button
                                className="uk-button uk-button-default uk-button-primary uk-button-small"
                                disabled={!categoryService.checkSpendingCategory(name)}
                                onClick={addSpendingCategoryEvent}
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
