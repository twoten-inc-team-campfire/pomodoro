import {setDateToMidnight} from "./ExampleUtil";

describe("setDateToMidnight should set a date passed in to midnight", () => {
    test("It should set the date to the correct time, midnight", () => {
        let date = new Date(2020, 2, 3, 5, 6, 7, 8);
        let correctDate = new Date(2020, 2, 3, 0, 0, 0, 1);
        date = setDateToMidnight(date);
        expect(date).toEqual(correctDate);
    })
})