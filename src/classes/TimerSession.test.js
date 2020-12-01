import { TimerSession, TIMER_SESSION_TYPE } from './TimerSession';

describe('test constructor of TimerSession', () => {
    test('successful instantiation of customized constructor', () => {
        let currentTime = Date.now();
        let offset = 25 * 60 * 1000
        let startTime = new Date(currentTime);
        let endTime = new Date(currentTime + offset);
        let task = "test";
        let type = TIMER_SESSION_TYPE.LONG_REST;

        const timerSession = new TimerSession(startTime, endTime, type, task);

        expect(timerSession.startTime).toEqual(timerSession.startTime);
        expect(timerSession.endTime).toEqual(timerSession.endTime);
        expect(timerSession.type).toEqual(timerSession.type);
        expect(timerSession.task).toEqual(timerSession.task);
    })

    test('successful instantiation of default constructor', () => {
        let currentTime = Date.now();
        let offset = 25 * 60 * 1000
        let startTime = new Date(currentTime);
        let endTime = new Date(currentTime + offset);

        const timerSession = new TimerSession(startTime, endTime);

        expect(timerSession.startTime).toEqual(timerSession.startTime);
        expect(timerSession.endTime).toEqual(timerSession.endTime);
        expect(timerSession.type).toEqual(timerSession.type);
        expect(timerSession.task).toEqual(timerSession.task);
    })

    test('invalid startTime for constructor', () => {
        let currentTime = '2020-1-1';

        expect(()=> new TimerSession(currentTime, currentTime)).toThrow();
    })

    test('invalid session type (string) for constructor', () => {
        let currentTime = Date.now();
        let type = 'TIMER_SESSION_TYPE.POMODORO';

        expect(()=> new TimerSession(currentTime, currentTime, type)).toThrow();
    })

    test('invalid session type (other number) for constructor', () => {
        let currentTime = Date.now();
        let type = 10;

        expect(()=> new TimerSession(currentTime, currentTime, type)).toThrow();
    })
});

describe('test getDuration()', () => {
    test('operation success', () => {
        let currentTime = Date.now();
        let offset = 25 * 60 * 1000
        let startTime = new Date(currentTime);
        let endTime = new Date(currentTime + offset);

        const timerSession = new TimerSession(startTime, endTime);

        expect(timerSession.getDuration()).toEqual(offset);
    })
});
