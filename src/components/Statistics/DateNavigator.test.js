import React from 'react';
import { render, fireEvent, createEvent, screen } from '@testing-library/react';
import DateNavigator from "./DateNavigator";
import {dateToHtmlDateString} from "../../utils/DateUtil";
import userEvent from "@testing-library/user-event";

describe("DateNavigator should allow the use to navigate between different dates", () => {

    const currDate = new Date(2020, 1, 1);
    const prevDate = new Date(2020, 0, 31);
    const callback = jest.fn((pDate, cDate) => console.log(pDate, cDate));
    callback.bind(this);

    test("DateNavigator should display the initial date passed in as a prop", () => {
        render(<DateNavigator date={currDate} onDateChange={callback} maxDate={currDate}/>);
        const dateInput = screen.getByLabelText("Date input");
        expect(dateInput).toHaveValue(dateToHtmlDateString(currDate));
    })
    test("DateNavigator should not allow the user to navigate past the date specified by maxDate", () => {
        render(<DateNavigator date={currDate} onDateChange={callback} maxDate={currDate}/>);
        const dateInput = screen.getByLabelText("Date input");
        const rightArrow = screen.getByRole("button", {name: "Increase date"});
        expect(rightArrow).toBeDisabled();
        userEvent.click(rightArrow);
        expect(callback).not.toHaveBeenCalled();
        expect(dateInput).toHaveValue(dateToHtmlDateString(currDate));
    })
    test( "DateNavigator should decrease the date when the user clicks the left arrow button", () => {
        const { rerender } = render(<DateNavigator date={currDate} onDateChange={callback} maxDate={currDate}/>);
        const dateInput = screen.getByLabelText("Date input");
        const leftArrow = screen.getByRole("button", {name: "Decrease date"});
        userEvent.click(leftArrow);
        expect(callback).toHaveBeenCalledWith(currDate, prevDate);
        rerender(<DateNavigator date={prevDate} onDateChange={callback} maxDate={currDate}/>);
        expect(dateInput).toHaveValue(dateToHtmlDateString(prevDate));
        callback.mockReset();
    })
    test("DateNavigator should increase the date when the user clocks the right arrow button", () => {
        const { rerender } = render(<DateNavigator date={prevDate} onDateChange={callback} maxDate={currDate}/>);
        const dateInput = screen.getByLabelText("Date input");
        const rightArrow = screen.getByRole("button", {name: "Increase date"});
        userEvent.click(rightArrow);
        expect(callback).toHaveBeenCalledWith(prevDate, currDate);
        rerender(<DateNavigator date={currDate} onDateChange={callback} maxDate={currDate}/>);
        expect(dateInput).toHaveValue(dateToHtmlDateString(currDate));
        callback.mockReset();
    })
    test("DateNavigator should update the date when the user writes to the input", () => {
        const { rerender } = render(<DateNavigator date={currDate} onDateChange={callback} maxDate={currDate}/>);
        const dateInput = screen.getByLabelText("Date input");
        fireEvent.change(dateInput, {target:{value: dateToHtmlDateString(prevDate)}});
        expect(callback).toHaveBeenCalledWith(currDate, prevDate);
        rerender(<DateNavigator date={prevDate} onDateChange={callback} maxDate={currDate}/>);
        expect(dateInput).toHaveValue(dateToHtmlDateString(prevDate));
    })
})