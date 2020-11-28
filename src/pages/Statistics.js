import React, {Component} from 'react';
import DateNavigator from "../components/Statistics/DateNavigator";
import TimelineGraph from "../components/Statistics/TimelineGraph";
import DailyLog from "../components/Statistics/DailyLog";

class Statistics extends Component {
    constructor() {
        super();
        this.state = {date: new Date(), timerSessions: []}
    }

    updateDate(oldDate, newDate) {
        this.setState({...this.state, date: newDate})
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
                    "width": "max(min(80%, 50em), 40%)", "height": "auto", "marginTop": "1em"}}
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