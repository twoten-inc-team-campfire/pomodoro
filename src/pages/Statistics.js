import React, {Component} from 'react';
import DateNavigator from "../components/Statistics/DateNavigator";
import {TimelineGraph} from "../components/Statistics/TimelineGraph";
import {DailyLog} from "../components/Statistics/DailyLog";
import {loadTimerSessionListByDate} from "../services/DefaultDataService";
import {fitTimerSessionsIntoRange} from "../utils/StatisticsPageUtil";

export const statisticsLogMaxGap = 20;
export const statisticsTimelineMaxGap = 10;

export class Statistics extends Component {
    constructor({date = new Date(), maxDate = new Date()}) {
        super();
        this.state = {date, maxDate, timerSessions: []}
    }

    async componentDidMount() {
        await this.fetchTimerSessionsForDate(this.state.date);
    }

    async updateDate(oldDate, newDate) {
        await this.fetchTimerSessionsForDate(newDate);
    }

    async fetchTimerSessionsForDate(date) {
        let startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        endDate.setHours(0, 0, 0, -1);
        let timerSessions = await loadTimerSessionListByDate(startDate, endDate);
        timerSessions.sort((t1, t2) => t1.startTime - t2.startTime);
        timerSessions = fitTimerSessionsIntoRange(timerSessions, startDate, endDate);
        this.setState({...this.state, date, timerSessions});
    }

    render() {
        let updateDate = this.updateDate.bind(this)
        return (
            <div className="Summary"
                 style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                     "width": "90%"
                }}
            >
                Statistics Page
                <div style={{
                    "marginTop": "1em"
                }}>
                    <DateNavigator
                        date={this.state.date}
                        maxDate={this.state.maxDate}
                        onDateChange={updateDate}
                    />
                </div>
                <br/>
                <div
                    style={{
                        "width": "min(30em, 80%)",
                        "height": "auto",
                        "marginTop": "1em"
                    }}
                >
                    <TimelineGraph
                        date={this.state.date}
                        timerSessions={this.state.timerSessions}
                        maxGap={statisticsTimelineMaxGap}
                    />
                </div>
                <br/>
                <div
                    style={{
                        "width": "75%",
                        "height": "auto",
                        "marginTop": "1em"
                    }}
                >
                    <DailyLog
                        date={this.state.date}
                        timerSessions={this.state.timerSessions}
                        maxGap={statisticsLogMaxGap}
                    />
                </div>
            </div>
        )
    }
}