import {getDateMinutes, getDateHours, dateToHtmlDateString, htmlDateStringToDate, shiftDate} from "./DateUtil";

describe("getDateMinues should successfully output a date's minutes", () => {
    test("Test getDateMinutes to successfully output two digit minutes", () => {
        let testDate = new Date();
        const minutes = 10;
        const mintuesString = "10";
        const notMinutes = 5;
        testDate.setHours(notMinutes, minutes, notMinutes, notMinutes);

        let testDateMinutes = getDateMinutes(testDate);
        expect(testDateMinutes).toEqual(mintuesString);
    })

    test("Test getDateMinutes to successfully output single digit minutes", () => {
        let testDate = new Date();
        const minutes = 5;
        const mintuesString = "05";
        const notMinutes = 10;
        testDate.setHours(notMinutes, minutes, notMinutes, notMinutes);

        let testDateMinutes = getDateMinutes(testDate);
        expect(testDateMinutes).toEqual(mintuesString);
    });
});

describe("getDateMinues should successfully output a date's hours", () => {
    test("Test getDateHours to successfully output two digit hours", () => {
        let testDate = new Date();
        const hours = 10;
        const hoursString = "10";
        const notHours = 5;
        testDate.setHours(hours, notHours, notHours, notHours);

        let testDateHours = getDateHours(testDate);
        expect(testDateHours).toEqual(hoursString);
    });

    test("Test getDateHours to successfully output sing digit hours", () => {
        let testDate = new Date();
        const hours = 5;
        const hoursString = "05";
        const notHours = 10;
        testDate.setHours(hours, notHours, notHours, notHours);

        let testDateHours = getDateHours(testDate);
        expect(testDateHours).toEqual(hoursString);
    });
})

describe("shiftDate should be capable of arbitrarily shifting a date forward or backward by the offset", () => {
    test("shiftDate should be able to shift a Date forward/backward by a day", () => {
        // Happy leap year!
        const oldDate = new Date(2024, 2, 28);
        // 𝅘𝅥𝅮 One more day! 𝅘𝅥𝅮
        const oneDayMore = shiftDate(oldDate, 1);
        let correctDate = new Date(2024, 2, 29);
        expect(oneDayMore).toEqual(correctDate);
        // Wha...? That's not how the song goes.
        const oneDayLess = shift(oldDate, -1);
        correctDate = new Date(2024, 2, 27);
        expect(oneDayLess).toEqual(correctDate);
    })
    test("shiftDate should be able to shift a Date forward/backward by a month", () => {
        // Pfft, who even likes May? More like you may NOT.
        const oldDate = new Date(2021, 4, 30);
        // Okay, maybe I'm jumping a little more than one month.
        const oneMonthMore = shiftDate(oldDate, 32);
        // June? More like SWOON.
        let correctDate = new Date(2021, 6, 1);
        expect(oneMonthMore).toEqual(correctDate);
        const oneMonthLess = shiftDate(oldDate, 31);
        correctDate = new Date(2021, 3, 31);
        expect(oneMonthLess).toEqual(correctDate);
    })
    test("shiftDate should be able to shift a Date forward/backward by a year", () => {
        // See you ~NEXT YEAR~!
        const oldDate = new Date(2022, 11, 31);
        const oneYearMore = shiftDate(oldDate, 366);
        let correctDate = new Date(2024, 1, 1);
        expect(oneYearMore).toEqual(correctDate);
        const oneYearLess = shiftDate(oldDate, 720);
        // But when will I get a date?
        correctDate = new Date(2020, 11, 31);
        expect(oneYearLess).toEqual(correctDate);
    })
})

test("dateToHtmlDateString should be able to convert a date to a string usable in an HTML element", () => {
    // The doomed date itself before Y2k consumed us all.
    const testDate = new Date(1999, 11, 31, 23, 59, 59, 999);
    const str = dateToHtmlDateString(testDate);
    const correctStr = "1999-12-31";
    expect(str).toEqual(correctStr);
})

test("htmlDateStringToDate should be able to convert a date string from an HTML element to a Date object", () => {
    // Merry Christmas!
    const testStr = "2020-12-25";
    const date = htmlDateStringToDate(testStr);
    const correctDate = new Date(2020, 11, 25, 0, 0, 0, 0);
    expect(date).toEqual(correctDate);
})