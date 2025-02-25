import { ipcRenderer, contextBridge } from 'electron';

function ipcInvoke<Channel extends keyof EventPayloadMapping>(
    key: Channel,
    payload?: EventPayloadMapping[Channel][0]
): EventPayloadMapping[Channel][1] {
    return ipcRenderer.invoke(key, payload);
}

contextBridge.exposeInMainWorld('electron', {

    getAllAccounts: () => ipcInvoke('getAllAccounts'),
    addAccount: () => ipcInvoke('addAccount')

} satisfies Window['electron']);
