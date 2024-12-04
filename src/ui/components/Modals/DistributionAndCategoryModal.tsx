import CategoryManagement from "../Management/CategoryManagement"
import DistributionManagement from "../Management/DistributionManagement"

export default function DistributionAndCategoryModal() {
    return (
        <div id="category-management" className="uk-modal-container" data-uk-modal data-container="false">
            <div className="uk-modal-dialog">

                <button className="uk-modal-close-default" type="button" data-uk-close></button>

                <div className="uk-modal-header">
                    <h2 className="uk-modal-title">Управление категориями</h2>
                </div>

                <div className="uk-modal-body">
                    <DistributionManagement />
                    <CategoryManagement />
                </div>

                <div className="uk-modal-footer uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close">ЗАКРЫТЬ</button>
                </div>

            </div>
        </div>
    );
}
