import ReactDOM from 'react-dom';
import App, 
    { 
        ActionType, yearReducer, monthReducer, 
        twoWeekReducer, weekReducer, hourReducer, 
    }  from './App';

it('renders App without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('Tests that reducer and function work properly', () => {
    it('yearReducer returns correct object', () => {
        const fakeAction: ActionType = {
            type: 'year',
            newValue: '100000',
            hoursWorkedPerWeekString: '40',
            daysVacationPerYearString: '20',
        }
        const result = yearReducer(fakeAction);
        expect(result).toStrictEqual({
            "hoursWorkedPerWeekString": "40",
            "lastChangedType": "year",
            "lastChangedValue": "100000",
            "salaryPerHour": "52.08",
            "salaryPerMonth": "8333.33",
            "salaryPerTwoWeeks": "3846.15",
            "salaryPerWeek": "1923.08",
            "salaryPerYear": "100000",
            "daysVacationPerYearString": "20",
        });
    })

    it('monthReducer returns correct object', () => {
        const fakeAction: ActionType = {
            type: 'month',
            newValue: '10000',
            hoursWorkedPerWeekString: '40',
            daysVacationPerYearString: '20',
        }
        const result = monthReducer(fakeAction);
        expect(result).toStrictEqual({
            "hoursWorkedPerWeekString": "40",
            "lastChangedValue": "10000",
            "lastChangedType": "month",
            "salaryPerHour": "63.03",
            "salaryPerMonth": "10000",
            "salaryPerTwoWeeks": "4608.29",
            "salaryPerWeek": "2325.58",
            "salaryPerYear": "120000.00",
            "daysVacationPerYearString": "20",
        });
    })

    it('twoWeekReducer returns correct object', () => {
        const fakeAction: ActionType = {
            type: 'two weeks',
            newValue: '1000',
            hoursWorkedPerWeekString: '40',
            daysVacationPerYearString: '20',
        }
        const result = twoWeekReducer(fakeAction);
        expect(result).toStrictEqual({
            "hoursWorkedPerWeekString": "40",
            "lastChangedType": "two weeks",
            "lastChangedValue": "1000",
            "salaryPerHour": "13.54",
            "salaryPerMonth": "4300.00",
            "salaryPerTwoWeeks": "1000",
            "salaryPerWeek": "500.00",
            "salaryPerYear": "26000.00",
            "daysVacationPerYearString": "20",
        });
    })

    it('weekReducer returns correct object', () => {
        const fakeAction: ActionType = {
            type: 'week',
            newValue: '1000',
            hoursWorkedPerWeekString: '40',
            daysVacationPerYearString: '20',
        }
        const result = weekReducer(fakeAction);
        expect(result).toStrictEqual({
            "hoursWorkedPerWeekString": "40",
            "lastChangedType": "week",
            "lastChangedValue": "1000",
            "salaryPerHour": "27.08",
            "salaryPerMonth": "4300.00",
            "salaryPerTwoWeeks": "2000.00",
            "salaryPerWeek": "1000",
            "salaryPerYear": "52000.00",
            "daysVacationPerYearString": "20",
        });
    })

    it('hourReducer returns correct object', () => {
        const fakeAction: ActionType = {
            type: 'hour',
            newValue: '10',
            hoursWorkedPerWeekString: '40',
            daysVacationPerYearString: '20',
        }
        const result = hourReducer(fakeAction);
        expect(result).toStrictEqual({
            "hoursWorkedPerWeekString": "40",
            "lastChangedType": "hour",
            "lastChangedValue": "10",
            "salaryPerHour": "10",
            "salaryPerMonth": "1586.67",
            "salaryPerTwoWeeks": "738.46",
            "salaryPerWeek": "369.23",
            "salaryPerYear": "19200.00",
            "daysVacationPerYearString": "20",
        });
    })
})