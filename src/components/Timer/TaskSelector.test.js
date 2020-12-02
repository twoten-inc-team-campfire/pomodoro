import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskSelector from './TaskSelector'

test("At first, only the selector is shown.", () => {
    render(<TaskSelector/>);
    
    const selectorButton = screen.queryByLabelText('selector-button');
    const task = screen.queryByLabelText('task');
    const dialog = screen.queryByLabelText('dialog');
    const cancelButton = screen.queryByLabelText('cancel-button');
    const confirmButton = screen.queryByLabelText('confirm-button');
    const clearButton = screen.queryByLabelText('clear-button');

    expect(selectorButton).toBeInTheDocument();
    expect(task).toBeNull();
    expect(dialog).toBeNull();
    expect(cancelButton).toBeNull();
    expect(confirmButton).toBeNull();
    expect(clearButton).toBeNull();
})

test("Find and write to textarea", () => {
    render(<TaskSelector/>);
    
    const selectorButton = screen.queryByLabelText('selector-button');
    
    userEvent.click(selectorButton);

    const textArea = screen.getByRole('textbox', {name: /task name/i})
    userEvent.type(textArea, "We can type.")

    const confirmButton = screen.getByRole('button', {name: /confirm/i})
    userEvent.click(confirmButton);

    const finalText = screen.getByTestId('taskDescription');
    expect(finalText.innerHTML).toMatch('We can type.');
    
})

