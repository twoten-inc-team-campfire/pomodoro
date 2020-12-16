import { TIMER_SESSION_TYPE } from "../classes/TimerSession";

const ManagerActionType = {
    NEXT: 'next',
}
//initial state of the manager
const initManager = { 
    type: TIMER_SESSION_TYPE.POMODORO,
    count: 0,
}

//Reducer takes an action and update the state: these are the actions.
const ManagerActions = {
    NEXT: () => ({
        target: 'Manager',
        type: ManagerActionType.NEXT,
    }),
};

// jump to the next pomodoro session
const forward = (state) => {
    var type = state.manager.type;
    var count = state.manager.count;
    var sessionIngterval = state.settings.focusCycleCount;
    
    switch(type) {
        case TIMER_SESSION_TYPE.POMODORO:
            if (count === sessionIngterval - 1) {
                type = TIMER_SESSION_TYPE.LONG_REST;
            }
            else {
                type = TIMER_SESSION_TYPE.SHORT_REST;
            }
            count = (count + 1) % sessionIngterval;
            return {
                type: type,
                count: count,
            }
        case TIMER_SESSION_TYPE.SHORT_REST:
        case TIMER_SESSION_TYPE.LONG_REST:
            type = TIMER_SESSION_TYPE.POMODORO;
            return {
                type: type,
                count: count,
            }
        default:
            throw new Error('Unexpected type');
    }
}

/* manager reducer to work with useReducer Hooks in react
 *
 * Arguments:
 *    @state: the current state of the app (like above, it contains the min and sec)
 *    @action: the "description" about what you want to do with the state
 * 
 * What this function does:
 *        It looks into the "action", understand what the action want us to do with the state, 
 *        and implements the logic for that action
 *
 * Return Value:
 *.       return a new state.
 */
const managerReducer = (state, action) => {
    if (action.type === ManagerActionType.NEXT) {
        return forward(state);
    }
}

export { managerReducer, initManager, ManagerActions, forward }