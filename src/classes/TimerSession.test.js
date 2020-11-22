import {TimerSession, TIMER_SESSION_TYPE} from './TimerSession';

test('test customized constructor of TimerSession', () => {
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

test('test default constructor of TimerSession', () => {
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

test('test TimerSession getDuration()', () => {
    let currentTime = Date.now();
    let offset = 25 * 60 * 1000
    let startTime = new Date(currentTime);
    let endTime = new Date(currentTime + offset);

    const timerSession = new TimerSession(startTime, endTime);
    
    expect(timerSession.getDuration()).toEqual(offset);
})