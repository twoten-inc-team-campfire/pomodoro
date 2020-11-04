
// Imports necessary to run our tests
//------------------------------------
import React from 'react';
// React Testing Library
import { render } from '@testing-library/react'; 
// import the component that you need to test
import Home from './Home';

test('Page should have a title of Pomodoro', async () => {
    const { findByText } = render(<Home />);
    await findByText('Pomodoro');
});

test('Page should be a Hello World page', async () => {
    const { findByText } = render(<Home />);
    await findByText('Hello World');
});