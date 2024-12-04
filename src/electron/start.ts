import { ipcMain } from "electron"

function ipcHandle<Channel extends keyof EventPayloadMapping>(
    channel: Channel,
    listener: (_: Electron.IpcMainInvokeEvent, payload: EventPayloadMapping[Channel][0]) => EventPayloadMapping[Channel][1]
): void {
    ipcMain.handle(channel, listener)
}

export function createRouter(): void {



}
