import {getDateMinutes, getDateHours} from "./DateUtil";

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