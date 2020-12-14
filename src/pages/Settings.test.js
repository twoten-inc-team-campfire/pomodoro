import React from 'react'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Settings from './Settings'
import { renderHelper } from '../utils/TestHelper'

const initialSettings = {
    settings: {
        autoStartBreaks: true,
        autoStartPomodoros: false,
        pomodoroLength: 25,
        shortBreakLength: 5,
        longBreakLength: 20,
        numPomodorosInCyle: 4,
        displayPauseButton: true,
        displayFastForwardButton: true,
        displayCancelButton: false,
        displayTaskSelector: false,
    }
}

function basicSetup() {
    renderHelper(<Settings/>, initialSettings);
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
        const autoBreakSwitch = screen.getByRole('checkbox', {name: /auto break checkbox/i});
        expect(autoBreakSwitch.checked).toEqual(initialSettings.settings.autoBreak);

        // Change after user event
        userEvent.click(autoBreakSwitch);
        expect(autoBreakSwitch.checked).not.toEqual(initialSettings.settings.autoBreak);
    })

    test("Auto Focus Switch Functions Properly", () => {
        basicSetup();

        // Initial Condition
        const autoFocusSwitch = screen.getByRole('checkbox', {name: /auto focus checkbox/i});
        expect(autoFocusSwitch.checked).toEqual(initialSettings.settings.autoFocus);

        // Change after user event
        userEvent.click(autoFocusSwitch);
        expect(autoFocusSwitch.checked).not.toEqual(initialSettings.settings.autoFocus);
    })

    test("Pause Checkbox functions correctly", () => {
        basicSetup();

        const pauseButtonCheckbox = screen.getByRole('checkbox', {name: /pause button checkbox/i});
        expect(pauseButtonCheckbox.checked).toEqual(initialSettings.settings.pause);

        userEvent.click(pauseButtonCheckbox);
        expect(pauseButtonCheckbox.checked).not.toEqual(initialSettings.settings.pause);
    })

    test("Cancel Checkbox functions correctly", () => {
        basicSetup();

        const cancelButtonCheckbox = screen.getByRole('checkbox', {name: /cancel button checkbox/i});
        expect(cancelButtonCheckbox.checked).toEqual(initialSettings.settings.cancel);
       
        userEvent.click(cancelButtonCheckbox);
        expect(cancelButtonCheckbox.checked).not.toEqual(initialSettings.settings.cancel);
    })

    test("Fast Forward Checkbox functions correctly", () => {
        basicSetup();

        const fastForwardCheckbox = screen.getByRole('checkbox', {name: /fast forward button checkbox/i});
        expect(fastForwardCheckbox.checked).toEqual(initialSettings.settings.fastForward);
        
        userEvent.click(fastForwardCheckbox);
        expect(fastForwardCheckbox.checked).not.toEqual(initialSettings.settings.fastForward);
    })

    test("Task Selector Checkbox functions correctly", () => {
        basicSetup();

        const taskSelectorCheckbox = screen.getByRole('checkbox', {name: /task selector checkbox/i});
        expect(taskSelectorCheckbox.checked).toEqual(initialSettings.settings.taskSelection);
        
        userEvent.click(taskSelectorCheckbox);
        expect(taskSelectorCheckbox.checked).not.toEqual(initialSettings.settings.taskSelection);
    })

});

describe("Value Selectors on Settings Page", () => {

    test("Pomodoro Length Selector", () => {
        basicSetup();

        const selectButton = screen.getByRole('button', {name: /pomodoro length selector/i})
        expect(selectButton.innerHTML).toMatch(/25:/i);

        // Open ListBox to display all the values
        userEvent.click(selectButton);

        // Find Option in the listbox that we want to select
        const optionButton = screen.getByTestId("focusLength15");
        userEvent.click(optionButton);

        // Verify that the new value appears for the user.
        expect(selectButton.innerHTML).toMatch(/15:/i);

    });

    test("Short Break Length Selector", () => {
        basicSetup();

        const selectButton = screen.getByRole('button', {name: /short break length selector/i})
        expect(selectButton.innerHTML).toMatch(/5:/i);

        // Open ListBox to display all the values
        userEvent.click(selectButton);

        // Find Option in the listbox that we want to select
        const optionButton = screen.getByTestId("shortLength4");
        userEvent.click(optionButton);

        // Verify that the new value appears for the user.
        expect(selectButton.innerHTML).toMatch(/4:/i);

    });

    test("Long Break Length Selector", () => {
        basicSetup();

        const selectButton = screen.getByRole('button', {name: /long break length selector/i})
        expect(selectButton.innerHTML).toMatch(/20:/i);

        // Open ListBox to display all the values
        userEvent.click(selectButton);

        // Find Option in the listbox that we want to select
        const optionButton = screen.getByTestId("longLength25");
        userEvent.click(optionButton);

        // Verify that the new value appears for the user.
        expect(selectButton.innerHTML).toMatch(/25:/i);

    });

    test("Pomodoro Count Selector", () => {
        basicSetup();

        const selectButton = screen.getByRole('button', {name: /pomodoro count selector/i})
        expect(selectButton.innerHTML).toMatch(/4/i);

        // Open ListBox to display all the values
        userEvent.click(selectButton);

        // Find Option in the listbox that we want to select
        const optionButton = screen.getByTestId("pomocount1");
        userEvent.click(optionButton);

        // Verify that the new value appears for the user.
        expect(selectButton.innerHTML).toMatch(/1/i);

    });

});

