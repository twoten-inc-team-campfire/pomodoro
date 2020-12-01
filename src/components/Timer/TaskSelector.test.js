import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
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
