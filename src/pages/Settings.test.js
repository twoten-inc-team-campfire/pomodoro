import React from 'react'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Settings from './Settings'
import { renderHelper } from '../utils/TestHelper'
import { UserSettings } from '../classes/settings/UserSettings.js'
import { saveUserSettings } from '../services/DefaultDataService.js'

jest.mock('../services/DefaultDataService');
jest.mock('idb-keyval');

const initialSettings = {
    settings: new UserSettings(
        25, 5, 20, 4, true, true, true, true, true, true)
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
        expect(autoBreakSwitch.checked).toEqual(initialSettings.settings.autoStartBreaks);

        // Change after user event
        userEvent.click(autoBreakSwitch);
        expect(autoBreakSwitch.checked).not.toEqual(initialSettings.settings.autoStartBreaks);
    })

    test("Auto Focus Switch Functions Properly", () => {
        basicSetup();

        // Initial Condition
        const autoFocusSwitch = screen.getByRole('checkbox', {name: /auto focus checkbox/i});
        expect(autoFocusSwitch.checked).toEqual(initialSettings.settings.autoStartPomodoros);

        // Change after user event
        userEvent.click(autoFocusSwitch);
        expect(autoFocusSwitch.checked).not.toEqual(initialSettings.settings.autoStartPomodoros);
    })

    test("Pause Checkbox functions correctly", () => {
        basicSetup();

        const pauseButtonCheckbox = screen.getByRole('checkbox', {name: /pause button checkbox/i});
        expect(pauseButtonCheckbox.checked).toEqual(initialSettings.settings.displayPauseButton);

        userEvent.click(pauseButtonCheckbox);
        expect(pauseButtonCheckbox.checked).not.toEqual(initialSettings.settings.displayPauseButton);
    })

    test("Cancel Checkbox functions correctly", () => {
        basicSetup();

        const cancelButtonCheckbox = screen.getByRole('checkbox', {name: /cancel button checkbox/i});
        expect(cancelButtonCheckbox.checked).toEqual(initialSettings.settings.displayCancelButton);
       
        userEvent.click(cancelButtonCheckbox);
        expect(cancelButtonCheckbox.checked).not.toEqual(initialSettings.settings.displayCancelButton);
    })

    test("Fast Forward Checkbox functions correctly", () => {
        basicSetup();

        const fastForwardCheckbox = screen.getByRole('checkbox', {name: /fast forward button checkbox/i});
        expect(fastForwardCheckbox.checked).toEqual(initialSettings.settings.displayFastForwardButton);
        
        userEvent.click(fastForwardCheckbox);
        expect(fastForwardCheckbox.checked).not.toEqual(initialSettings.settings.displayFastForwardButton);
    })

    test("Task Selector Checkbox functions correctly", () => {
        basicSetup();

        const taskSelectorCheckbox = screen.getByRole('checkbox', {name: /task selector checkbox/i});
        expect(taskSelectorCheckbox.checked).toEqual(initialSettings.settings.displayTaskSelector);
        
        userEvent.click(taskSelectorCheckbox);
        expect(taskSelectorCheckbox.checked).not.toEqual(initialSettings.settings.displayTaskSelector);
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