import App from './components/App'
import Icons from 'uikit/dist/js/uikit-icons'
import UIkit from 'uikit'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './storage/store'

import 'uikit/dist/css/uikit.css'

UIkit.use(Icons);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
