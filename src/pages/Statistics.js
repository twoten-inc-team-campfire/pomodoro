import React, {Component} from 'react';
import DateNavigator from "../components/Statistics/DateNavigator";
import {TimelineGraph} from "../components/Statistics/TimelineGraph";
import DailyLog from "../components/Statistics/DailyLog";
import {TimerSession, TIMER_SESSION_TYPE} from "../classes/TimerSession";

const timerSessionsTestToday = [
    new TimerSession (
        new Date((new Date()).setHours(-1, 55, 0, 0)),
        new Date((new Date()).setHours(0, 20, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Testing component's ability to handle samples that straddle two dates"
    ),
    new TimerSession (
        new Date((new Date()).setHours(0, 20, 0, 0)),
        new Date((new Date()).setHours(0, 25, 0, 0)),
        TIMER_SESSION_TYPE.SHORT_REST,
        "Whew, base cases are hard work!"
    ),
    new TimerSession(
        new Date((new Date()).setHours(13, 35, 0, 0)),
        new Date((new Date()).setHours(14, 0,0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Making sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(14, 0, 0, 0)),
        new Date((new Date()).setHours(14, 5, 0, 0)),
        TIMER_SESSION_TYPE.SHORT_REST,
        "Making sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(14, 7, 0, 0)),
        new Date((new Date()).setHours(14, 17, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Making samples of sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(14, 20, 30, 0)),
        new Date((new Date()).setHours(14, 29, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Making samples of sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(14, 30, 0, 0)),
        new Date((new Date()).setHours(14, 35, 0, 0)),
        TIMER_SESSION_TYPE.SHORT_REST,
        "Sampling the samples of sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(14, 35, 0, 0)),
        new Date((new Date()).setHours(15, 0, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Sampling sample dates for samples of sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(15, 0, 0, 0)),
        new Date((new Date()).setHours(15, 15, 0, 0)),
        TIMER_SESSION_TYPE.LONG_REST,
        "Whew, sampling sample sample data wears me out"
    ),
    new TimerSession (
        new Date((new Date()).setHours(15, 30, 0, 0)),
        new Date((new Date()).setHours(15, 55, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Confusing people trying to read my sample data"
    ),
    new TimerSession (
        new Date((new Date()).setHours(22, 57, 45, 0)),
        new Date((new Date()).setHours(23, 22, 15, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Testing component's ability to handle samples that straddle two dates"
    ),
    new TimerSession (
        new Date((new Date()).setHours(23, 30, 0, 0)),
        new Date((new Date()).setHours(23, 35, 0, 0)),
        TIMER_SESSION_TYPE.SHORT_REST,
        "Testing component's ability to handle samples that straddle two dates"
    ),
    new TimerSession (
        new Date((new Date()).setHours(23, 40, 0, 0)),
        new Date((new Date()).setHours(24, 5, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Testing component's ability to handle samples that straddle two dates"
    ),
];

const timerSessionsTestYesterday = [
    new TimerSession (
        new Date((new Date()).setHours(-14, 24, 0, 0)),
        new Date((new Date()).setHours(-14, 32, 36, 4)),
        TIMER_SESSION_TYPE.POMODORO,
        "Testing page's ability to switch between days"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-14, 36, 36, 4)),
        new Date((new Date()).setHours(-14, 53, 36, 4)),
        TIMER_SESSION_TYPE.POMODORO,
        "Page, you are the chosen one to switch between days!"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-14, 58, 30, 164)),
        new Date((new Date()).setHours(-13, 3, 30, 934)),
        TIMER_SESSION_TYPE.SHORT_REST,
        "Pfft, the log doesn't show tasks during breaks"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-13, 5, 36, 4)),
        new Date((new Date()).setHours(-13, 24, 36, 4)),
        TIMER_SESSION_TYPE.POMODORO,
        "Lololol, duplicate tasks!"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-13, 32, 36, 4)),
        new Date((new Date()).setHours(-13, 38, 36, 4)),
        TIMER_SESSION_TYPE.POMODORO,
        "Lololol, duplicate tasks!"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-12, 10, 36, 4)),
        new Date((new Date()).setHours(-12, 25, 36, 4)),
        TIMER_SESSION_TYPE.POMODORO,
        "I'm all alone in el mundo!"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-1, 14, 36, 4)),
        new Date((new Date()).setHours(-1, 34, 14, 463)),
        TIMER_SESSION_TYPE.POMODORO,
        "Ha, you'll see me but not the task below me!"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-1, 42, 8, 901)),
        new Date((new Date()).setHours(-1, 47, 36, 4)),
        TIMER_SESSION_TYPE.POMODORO,
        "Well, okay, maybe you'll see me too, but definitely not the next one!"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-1, 48, 30, 164)),
        new Date((new Date()).setHours(-1, 53, 30, 934)),
        TIMER_SESSION_TYPE.SHORT_REST,
        "The invisible task, stealthy and sleek"
    ),
    new TimerSession (
        new Date((new Date()).setHours(-1, 55, 0, 0)),
        new Date((new Date()).setHours(0, 20, 0, 0)),
        TIMER_SESSION_TYPE.POMODORO,
        "Testing component's ability to handle samples that straddle two dates"
    )
];

class Statistics extends Component {
    constructor() {
        super();
        this.state = {date: new Date(), timerSessions: timerSessionsTestToday}
    }

    updateDate(oldDate, newDate) {
        //this.setState({...this.state, date: newDate})
        if (oldDate > newDate)
            this.setState({timerSessions: timerSessionsTestYesterday, date: newDate})
        else if (oldDate < newDate) {
            this.setState({timerSessions: timerSessionsTestToday, date: newDate})
        }
    }

    render() {
        let updateDate = this.updateDate.bind(this)
        return (
            <div className="Summary" style={{
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center"
            }}>
                Statistics Page
                <div style={{
                    "marginTop": "1em"
                }}>
                    <DateNavigator
                        date={this.state.date}
                        onDateChange={updateDate}
                    />
                </div>
                <br/>
                <div style={{
                    "width": "min(max(50em,50%), 80%)", "height": "auto", "marginTop": "1em"}}
                >
                    <TimelineGraph
                        date={this.state.date}
                        timerSessions={this.state.timerSessions}
                    />
                </div>
                <br/>
                <div style={{"width": "75%", "height": "auto", "marginTop": "1em"}}>
                    <DailyLog date={this.state.date} timerSessions={this.state.timerSessions}/>
                </div>
            </div>
        )
    }
}

export default Statistics;