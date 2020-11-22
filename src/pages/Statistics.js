import React, {Component} from 'react';
import DateNavigator from "../components/Statistics/DateNavigator";

class Statistics extends Component {
    constructor() {
        super();
        this.state = {date: new Date(), timerSessions:[]}
    }

    updateDate(oldDate, newDate) {
        this.setState({...this.state, date: newDate})
    }

    render() {
        let updateDate = this.updateDate.bind(this)
        return (
            <div className="Summary">
                Statistics page for visualizing app usage.
                <DateNavigator date={this.state.date} onDateChange={updateDate}/>
            </div>
        )
    }
}

export default Statistics;