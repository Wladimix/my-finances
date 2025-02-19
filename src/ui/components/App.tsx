import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

Chart.register(CategoryScale);

export default function App() {
    return (
        <div className='uk-container uk-container-large uk-margin-top uk-margin-bottom'>

            <div className='uk-card uk-card-default uk-card-body uk-margin-bottom'>
                <div data-uk-grid>
                    <h1 className='uk-width-expand uk-text-primary'>Всего в наличии</h1>
                    <h1 className='uk-text-primary'>10 000 000 ₽</h1>
                </div>
            </div>


            <div className='uk-child-width-expand' data-uk-grid>
                <div>
                    <div className='uk-card uk-card-default uk-card-body uk-background-muted'>
                        <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: 5%</div>
                        <h2>2024</h2>
                        <div className='uk-margin-remove' data-uk-grid>
                            <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-left'>Доходы</div>
                            <div className='uk-text-large'>20 000 ₽</div>
                        </div>
                        <div className='uk-margin-remove' data-uk-grid>
                            <div className='uk-width-expand uk-padding-remove uk-text-large'>Расходы</div>
                            <div className='uk-text-large'>5 000 ₽</div>
                        </div>
                        <div className='uk-margin-remove' data-uk-grid>
                            <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-success'>Экономия</div>
                            <div className='uk-text-large uk-text-large uk-text-success'>15 000 ₽</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='uk-card uk-card-default uk-card-body uk-background-muted'>
                        <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: 5%</div>
                        <h2>Сентябрь</h2>
                        <div className='uk-margin-remove' data-uk-grid>
                            <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-left'>Доходы</div>
                            <div className='uk-text-large'>20 000 ₽</div>
                        </div>
                        <div className='uk-margin-remove' data-uk-grid>
                            <div className='uk-width-expand uk-padding-remove uk-text-large'>Расходы</div>
                            <div className='uk-text-large'>5 000 ₽</div>
                        </div>
                        <div className='uk-margin-remove' data-uk-grid>
                            <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-success'>Экономия</div>
                            <div className='uk-text-large uk-text-large uk-text-success'>15 000 ₽</div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='uk-heading-divider'><span>Транзакции</span></h1>

            <div className='uk-margin-bottom' data-uk-grid>
                <div>
                    <button className='uk-button uk-button-primary' uk-toggle="target: #yearly-statistic">СТАТИСТИКА</button>
                </div>

                <div>
                    <select className='uk-select'>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                </div>
                <div>
                    <select className='uk-select'>
                        <option>За весь год</option>
                        <option>Сентябрь</option>
                        <option>Октябрь</option>
                    </select>
                </div>
                <div className='uk-width-expand uk-text-right'>
                    <div className='uk-inline uk-width-1-2'>
                        <span className='uk-form-icon' data-uk-icon='icon: search; ratio: 1.2' />
                        <input
                            className='uk-input'
                            placeholder='примечание'
                            type='text'
                        />
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='uk-text-secondary'>Дата</th>
                        <th className='uk-text-secondary'>Источник</th>
                        <th className='uk-text-secondary'>Адрес / Категория</th>
                        <th className='uk-text-secondary'>Сумма</th>
                        <th className='uk-text-secondary'>Примечание</th>
                        <th>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon:  plus-circle; ratio: 1.2'
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>25 сентября</td>
                        <td>Карта МИР Открытие</td>
                        <td>Карта МИР ВТБ</td>
                        <td>500 ₽</td>
                        <td>Молоко</td>
                        <td>
                            <button
                                className='uk-icon-link'
                                data-uk-icon='icon: trash; ratio: 1.2'
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <nav>
                <ul className='uk-pagination uk-flex-center'>
                    <li><a href='#'><span data-uk-pagination-previous></span></a></li>
                    <li><a href='#'>1</a></li>
                    <li className='uk-disabled'><span>…</span></li>
                    <li><a href='#'>4</a></li>
                    <li><a href='#'>5</a></li>
                    <li><a href='#'>6</a></li>
                    <li className='uk-active'><span aria-current='page'>7</span></li>
                    <li><a href='#'>8</a></li>
                    <li><a href='#'>9</a></li>
                    <li><a href='#'>10</a></li>
                    <li className='uk-disabled'><span>…</span></li>
                    <li><a href='#'>20</a></li>
                    <li><a href='#'><span data-uk-pagination-next></span></a></li>
                </ul>
            </nav>

            <h1 className='uk-heading-divider'><span>Управление счетами / категориями</span></h1>

            <div className='uk-child-width-expand' data-uk-grid>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='uk-text-secondary' colSpan={2}>Счета</th>
                                <th>
                                    <button
                                        className='uk-icon-link'
                                        data-uk-icon='icon: plus-circle; ratio: 1.2'
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Карта МИР ВТБ</td>
                                <td>3000</td>
                                <td>
                                    <button
                                        className='uk-icon-link'
                                        data-uk-icon='icon: trash; ratio: 1.2'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Карта МИР ВТБ</td>
                                <td>3000</td>
                                <td>
                                    <button
                                        className='uk-icon-link'
                                        data-uk-icon='icon: trash; ratio: 1.2'
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='uk-text-secondary'>Категории</th>
                                <th>
                                    <button
                                        className='uk-icon-link'
                                        data-uk-icon='icon: plus-circle; ratio: 1.2'
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Продукты</td>
                                <td>
                                    <button
                                        className='uk-icon-link'
                                        data-uk-icon='icon: trash; ratio: 1.2'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Одежда</td>
                                <td>
                                    <button
                                        className='uk-icon-link'
                                        data-uk-icon='icon: trash; ratio: 1.2'
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h1 className='uk-heading-divider'><span>Общая статистика по годам</span></h1>

            <Bar
                data={{
                    labels: [2022, 2023, 2024],
                    datasets: [
                        {
                            data: [100, 200, 300],
                            label: 'Доходы',
                            backgroundColor: 'rgba(50, 200, 100, 0.5)'
                        },
                        {
                            data: [100, 200, 300],
                            label: 'Расходы',
                            backgroundColor: 'rgba(200, 50, 50, 0.5)'
                        }
                    ]
                }}
                options={{
                    animation: {
                        duration: 0
                    }
                }}
            />

            <div id="yearly-statistic" className="uk-modal-container" data-uk-modal>
                <div className="uk-modal-dialog uk-modal-body">
                    <button className="uk-modal-close-default" data-uk-close></button>
                    <h2 className="uk-modal-title">Статистика за 2024 год</h2>
                    <div className="uk-container uk-container-xsmall">
                        <Doughnut
                            data={{
                                labels: ['test1', 'test2'],
                                datasets: [{
                                    data: [200, 400],
                                    backgroundColor: ["#CB4335", "#1F618D", "#F1C40F", "#27AE60", "#884EA0", "#D35400"]
                                }]
                            }}
                            options={{
                                animation: {
                                    duration: 0
                                },
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                        onHover: (evt, item, legend): void => {
                                            const backgroundColor = legend.chart.data.datasets[0].backgroundColor as string[];
                                            backgroundColor.forEach((color, index, colors) => {
                                                colors[index] = index === item.index || color.length === 9 ? color : color + "4D";
                                            });
                                            legend.chart.update();
                                        },
                                        onLeave: (evt, item, legend): void => {
                                            const backgroundColor = legend.chart.data.datasets[0].backgroundColor as string[];
                                            backgroundColor.forEach((color, index, colors) => {
                                                colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                                            });
                                            legend.chart.update();
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <hr></hr>
                    <div className="uk-grid-small" data-uk-grid>
                        <div className='uk-width-expand uk-text-large' data-uk-leader>
                            Продукты
                        </div>
                        <div className="uk-text-large">500</div>
                    </div>
                    <div className="uk-grid-small" data-uk-grid>
                        <div className='uk-width-expand uk-text-large' data-uk-leader>
                            Одежда
                        </div>
                        <div className="uk-text-large">500</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
