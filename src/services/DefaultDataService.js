import { Store, get, set, clear, keys } from 'idb-keyval';
import { clearHistoryWithStore } from './BasicDataService';

let timerSessionStore = new Store('IndexedDB', 'TimerSessionStore');
let pomodoroSettingsStore = new Store('IndexedDB', 'PomodoroSettingsStore');
let uiSettingsStore = new Store('IndexedDB', 'UISettingsStore');

async function clearAllHistory() {
    return Promise.all(
        [
            clearHistoryWithStore(timerSessionStore),
            clearHistoryWithStore(pomodoroSettingsStore),
            clearHistoryWithStore(uiSettingsStore)
        ]);
}

export {
    clearAllHistory
}