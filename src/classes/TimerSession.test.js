import {TimerSessionBuilder} from './TimerSessionBuilder';
import {TimerSession, TIMER_SESSION_TYPE} from './TimerSession';

test('test TimerSession get()', () => {
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
    
    expect(timerSession.getStartTime()).toEqual(timerSession.startTime);
    expect(timerSession.getEndTime()).toEqual(timerSession.endTime);
    expect(timerSession.getType()).toEqual(timerSession.type);
    expect(timerSession.getTask()).toEqual(timerSession.task);
})

test('test TimerSession set()', () => {
    let currentTime = Date.now();
    let offset = 25 * 60 * 1000
    let startTime = new Date(currentTime);
    let endTime = new Date(currentTime + offset);
    
    let newStartTime = endTime;
    let newEndTime = new Date(newStartTime + offset);
    let task = "test";
    let type = TIMER_SESSION_TYPE.SHORT_REST;

    const timerSession = new TimerSessionBuilder()
        .withStartTime(startTime)
        .withEndTime(endTime)
        .build();
    
    timerSession.setStartTIme(newStartTime);
    timerSession.setEndTime(newEndTime);
    timerSession.setTask(task);
    timerSession.setType(type);
    
    expect(timerSession.getStartTime()).toEqual(newStartTime);
    expect(timerSession.getEndTime()).toEqual(newEndTime);
    expect(timerSession.getType()).toEqual(type);
    expect(timerSession.getTask()).toEqual(task);
})

test('test TimerSession getDuration()', () => {
    let currentTime = Date.now();
    let offset = 25 * 60 * 1000
    let startTime = new Date(currentTime);
    let endTime = new Date(currentTime + offset);

    const timerSession = new TimerSessionBuilder()
        .withStartTime(startTime)
        .withEndTime(endTime)
        .build();
    
    expect(timerSession.getDuration()).toEqual(offset);
})