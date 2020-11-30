import React from 'react'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Settings from './Settings'
import { renderHelper } from '../utils/TestHelper'

const customSettings = {
    settings: {
        autoBreak: true,
        autoFocus: false,
        focusLength: 25,
        shortBreakLength: 5,
        longBreakLength: 20,
        focusCycleCount: 4,
        pause: true,
        fastForward: true,
        cancel: false,
        taskSelection: false,
    }
}

function basicSetup() {
    renderHelper(<Settings/>, customSettings);
}

test ("Setting Headers are Visible", () => {
    basicSetup();
    const generalHeader = screen.getByRole('heading', {name: /general settings/i});
    const homeSettingHeader = screen.getByRole('heading', {name: /home page settings/i})
    expect(generalHeader).toBeInTheDocument();
    expect(homeSettingHeader).toBeInTheDocument();
}) 

describe("Setting Switches and CheckBoxes", () => {

    test("Auto Break Switch Functions Properly", () => {
        basicSetup();
        // Initial Condition
        var autoBreakSwitch = screen.getByRole('checkbox', {name: /auto break checkbox/i});
        expect(autoBreakSwitch.checked).toEqual(customSettings.settings.autoBreak);

        // Change after user event
        userEvent.click(autoBreakSwitch);
        expect(autoBreakSwitch.checked).not.toEqual(customSettings.settings.autoBreak);
    })

    test("Auto Focus Switch Functions Properly", () => {
        basicSetup();

        // Initial Condition
        var autoFocusSwitch = screen.getByRole('checkbox', {name: /auto focus checkbox/i});
        expect(autoFocusSwitch.checked).toEqual(customSettings.settings.autoFocus);

        // Change after user event
        userEvent.click(autoFocusSwitch);
        expect(autoFocusSwitch.checked).not.toEqual(customSettings.settings.autoFocus);
    })

    test("Pause Checkbox functions correctly", () => {
        basicSetup();

        var pauseButtonCheckbox = screen.getByRole('checkbox', {name: /pause button checkbox/i});
        expect(pauseButtonCheckbox.checked).toEqual(customSettings.settings.pause);

        userEvent.click(pauseButtonCheckbox);
        expect(pauseButtonCheckbox.checked).not.toEqual(customSettings.settings.pause);
    })

    test("Cancel Checkbox functions correctly", () => {
        basicSetup();

        var cancelButtonCheckbox = screen.getByRole('checkbox', {name: /cancel button checkbox/i});
        expect(cancelButtonCheckbox.checked).toEqual(customSettings.settings.cancel);
       
        userEvent.click(cancelButtonCheckbox);
        expect(cancelButtonCheckbox.checked).not.toEqual(customSettings.settings.cancel);
    })

    test("Fast Forward Checkbox functions correctly", () => {
        basicSetup();

        var fastForwardCheckbox = screen.getByRole('checkbox', {name: /fast forward button checkbox/i});
        expect(fastForwardCheckbox.checked).toEqual(customSettings.settings.fastForward);
        
        userEvent.click(fastForwardCheckbox);
        expect(fastForwardCheckbox.checked).not.toEqual(customSettings.settings.fastForward);
    })

    test("Task Selector Checkbox functions correctly", () => {
        basicSetup();

        var taskSelectorCheckbox = screen.getByRole('checkbox', {name: /task selector checkbox/i});
        expect(taskSelectorCheckbox.checked).toEqual(customSettings.settings.taskSelection);
        
        userEvent.click(taskSelectorCheckbox);
        expect(taskSelectorCheckbox.checked).not.toEqual(customSettings.settings.taskSelection);
    })

});

