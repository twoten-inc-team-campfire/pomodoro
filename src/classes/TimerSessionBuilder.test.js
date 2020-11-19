import {TimerSessionBuilder} from './TimerSessionBuilder';
import {TimerSession, TIMER_SESSION_TYPE} from './TimerSession';

test('default construction with builder', () => {
    let currentTime = Date.now();
    let offset = 25 * 60 * 1000
    let startTime = new Date(currentTime);
    let endTime = new Date(currentTime + offset);

    const timerSession = new TimerSessionBuilder()
        .withStartTime(startTime)
        .withEndTime(endTime)
        .build();
    
    expect(timerSession.getStartTime()).toEqual(startTime);
    expect(timerSession.getEndTime()).toEqual(endTime);
    expect(timerSession.getType()).toEqual(TIMER_SESSION_TYPE.POMODORO);
    expect(timerSession.getTask()).toBe(null);
})

test('customized construction with builder', () => {
    let currentTime = Date.now();
    let offset = 25 * 60 * 1000
    let startTime = new Date(currentTime);
    let endTime = new Date(currentTime + offset);
    let task = "test";
    let type = TIMER_SESSION_TYPE.LONG_REST;

    const timerSession = new TimerSessionBuilder()
        .withStartTime(startTime)
        .withEndTime(endTime)
        .withTask(task)
        .withType(type)
        .build();
    
    expect(timerSession.getStartTime()).toEqual(startTime);
    expect(timerSession.getEndTime()).toEqual(endTime);
    expect(timerSession.getType()).toEqual(type);
    expect(timerSession.getTask()).toEqual(task);
})