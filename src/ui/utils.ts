import UIkit from 'uikit';

export function showErrorNotification(message: string) {
    UIkit.notification({
        status: 'danger',
        message
    });
}
