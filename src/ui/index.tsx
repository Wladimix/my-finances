import App from './components/App';
import Icons from 'uikit/dist/js/uikit-icons';
import UIkit from 'uikit';

import { createRoot } from 'react-dom/client';

import './styles.css';
import 'uikit/dist/css/uikit.css';

UIkit.use(Icons);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <App />
);
