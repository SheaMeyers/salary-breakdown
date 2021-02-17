const monthsPerYear: number = 12;
const twoWeekPeriodsPerMonth: number = 2.17;
const twoWeekPeriodsPerYear: number = 26;
const weeksPerMonth: number = 4.3;
const weeksPerYear: number = 52;

const moneyRegex: RegExp = /^\d{1,}(\.\d{0,2})?$/;
const numberRegex: RegExp = /^\d+$/;

export { monthsPerYear, twoWeekPeriodsPerMonth, weeksPerMonth, weeksPerYear, twoWeekPeriodsPerYear,
    moneyRegex, numberRegex }
