import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskSelector from './TaskSelector'

const defaultTask = 'No Task Selected'

test("At initial start, only the task selector and default task are shown", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);
    
    const selectorButton = screen.getByRole('button', {name: /selector/i});
    const dialog = screen.queryByLabelText('dialog');
    const clearButton = screen.queryByLabelText('clear-button');

    // Verify that default task is shown
    const taskText = screen.getByTestId('taskDescription');
    expect(taskText.innerHTML).toMatch(defaultTask);

    // Verify that the task selector is shown
    expect(selectorButton).toBeInTheDocument();

    // Verify that the dialog and clear button are hidden
    expect(dialog).toBeNull();
    expect(clearButton).toBeNull();
})

test("When the user clicks on the task selector, it is hidden, the \
dialog opens, and the textbox and cancel button are shown", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);

    let selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    // Verify that the selector button is hidden after it is clicked
    selectorButton = screen.queryByLabelText('selector-button');
    expect(selectorButton).toBeNull();

    const dialog = screen.getByRole('dialog', {name: ""});
    const textArea = screen.getByRole('textbox', {name: /task name/i});
    const cancelButton = screen.getByRole('button', {name: /cancel/i});

    // Verify that the dialog, text area, and cancel button are visible
    expect(dialog).toBeTruthy();
    expect(textArea).toBeTruthy();
    expect(cancelButton).toBeTruthy();
})

test("When the user clicks the cancel button and no text is in the text area, \
the dialog closes, and the task selector and default task are shown", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);
    
    let selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    userEvent.click(cancelButton);

    // Verify that the dialog is closed
    const dialog = screen.queryByLabelText('dialog');
    expect(dialog).toBeNull();

    // Verify that the selector button is visible
    selectorButton = screen.queryByLabelText('selector-button');
    expect(selectorButton).toBeInTheDocument();

    // Verify that default task is shown
    const taskText = screen.getByTestId('taskDescription');
    expect(taskText.innerHTML).toMatch(defaultTask);

    // Verify that the callback function is called appropriately.
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
})

test("When the user types in the text area, the confirm button shows", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);

    const selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    const textArea = screen.getByRole('textbox', {name: /task name/i});
    userEvent.type(textArea, 'Work out');

    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    const confirmButton = screen.getByRole('button', {name: /confirm/i});

    // Verify that the cancel and confirm button are visible when text is in
    // the text area
    expect(cancelButton).toBeTruthy();
    expect(confirmButton).toBeTruthy();
})

test("When the user presses the cancel button and text is in the text area, \
the dialog closes, and the task selector and default task are shown", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);
    
    let selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    const textArea = screen.getByRole('textbox', {name: /task name/i});
    userEvent.type(textArea, 'Work out');

    // Verify that text is in the text area
    let taskText = screen.getByTestId('taskDescription');
    expect(taskText.innerHTML).toMatch('Work out');

    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    userEvent.click(cancelButton);

    // Verify that the dialog is closed
    const dialog = screen.queryByLabelText('dialog');
    expect(dialog).toBeNull();

    // Verify that the task selector is visible
    selectorButton = screen.queryByLabelText('selector-button');
    expect(selectorButton).toBeInTheDocument();

    // Verify that default task is shown
    taskText = screen.getByTestId('taskDescription');
    expect(taskText.innerHTML).toMatch(defaultTask);

    // Verify that the callback function is called appropriately.
    expect(callback).toHaveBeenCalledTimes(9);
    expect(callback).toHaveBeenCalledWith(null);
})

test("When the user types into the text area and presses confirm, the \
text shon matches the user's input", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);
    
    const selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    const textArea = screen.getByRole('textbox', {name: /task name/i});
    userEvent.type(textArea, "Work out");

    const confirmButton = screen.getByRole('button', {name: /confirm/i});
    userEvent.click(confirmButton);

    // Verify that the text matches user's input
    const taskText = screen.getByTestId('taskDescription');
    expect(taskText.innerHTML).toMatch('Work out');

    // Verify that the callback function is called appropriately.
    expect(callback).toHaveBeenCalledTimes(8);
    expect(callback).toHaveBeenCalledWith("Work out");
})

test("When user clicks the confirm button, the dialog closes, the task \
selector remains hidden, and the clear button is shown", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);
    
    let selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    const textArea = screen.getByRole('textbox', {name: /task name/i});
    userEvent.type(textArea, "Work out");

    const confirmButton = screen.getByRole('button', {name: /confirm/i});
    userEvent.click(confirmButton);

    // Verify that the dialog is closed
    const dialog = screen.queryByLabelText('dialog');
    expect(dialog).toBeNull();

    // Verify that the task selector remains hidden
    selectorButton = screen.queryByLabelText('selector-button');
    expect(selectorButton).toBeNull();

    // Verify that the clear button is visible
    const clearButton = screen.getByTestId('clearButton');
    expect(clearButton).toBeTruthy();

    // Verify that the callback function is called appropriately.
    expect(callback).toHaveBeenCalledTimes(8);
    expect(callback).toHaveBeenCalledWith("Work out");
})

test("When the user clicks on the clear button, the task selector and \
default task are shown", () => {
    let callback = jest.fn();
    render(<TaskSelector onTaskChange={callback}/>);
    
    let selectorButton = screen.getByRole('button', {name: /selector/i});
    userEvent.click(selectorButton);

    const textArea = screen.getByRole('textbox', {name: /task name/i});
    userEvent.type(textArea, "Work out");

    const confirmButton = screen.getByRole('button', {name: /confirm/i});
    userEvent.click(confirmButton);

    const clearButton = screen.getByTestId('clearButton');
    userEvent.click(clearButton);

    // Verify that the task selector is visible
    selectorButton = screen.queryByLabelText('selector-button');
    expect(selectorButton).toBeInTheDocument();

    // Verify that default task is shown
    const taskText = screen.getByTestId('taskDescription');
    expect(taskText.innerHTML).toMatch(defaultTask);

    // Verify that the callback function is called appropriately.
    expect(callback).toHaveBeenCalledTimes(9);
    expect(callback).toHaveBeenCalledWith(null);
})