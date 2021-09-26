import React, {useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { monthsPerYear, twoWeekPeriodsPerMonth, weeksPerMonth, weeksPerYear, twoWeekPeriodsPerYear,
    moneyRegex, numberRegex } from "./constants";
import './App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
        marginBottom: 25
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));


type StateType = {
    salaryPerYear: string;
    salaryPerMonth: string;
    salaryPerTwoWeeks: string;
    salaryPerWeek: string;
    salaryPerHour: string;
    lastChangedValue: string
    lastChangedType: string;
    hoursWorkedPerWeekString: string;
    weeksVacationPerYearString: string;
}


type ActionType = {
    type: string
    newValue: string,
    hoursWorkedPerWeekString: string,
    weeksVacationPerYearString: string
}


const initialState: StateType = {
    salaryPerYear: '',
    salaryPerMonth: '',
    salaryPerTwoWeeks: '',
    salaryPerWeek: '',
    salaryPerHour: '',
    lastChangedValue: '',
    lastChangedType: '',
    hoursWorkedPerWeekString: '40',
    weeksVacationPerYearString: '3'
};


const yearReducer = (action: ActionType) => {
    return {
        salaryPerYear: action.newValue,
        salaryPerMonth: (parseFloat(action.newValue)/monthsPerYear).toFixed(2),
        salaryPerTwoWeeks: (parseFloat(action.newValue)/twoWeekPeriodsPerYear).toFixed(2),
        salaryPerWeek: (parseFloat(action.newValue)/weeksPerYear).toFixed(2),
        salaryPerHour: (parseFloat(action.newValue)/(weeksPerYear * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * parseInt(action.weeksVacationPerYearString))).toFixed(2),
        lastChangedValue: action.newValue,
        lastChangedType: 'year',
        hoursWorkedPerWeekString: action.hoursWorkedPerWeekString,
        weeksVacationPerYearString: action.weeksVacationPerYearString
    }
};


const monthReducer = (action: ActionType) => {
    return {
        salaryPerYear: (parseFloat(action.newValue) * monthsPerYear).toFixed(2),
        salaryPerMonth: action.newValue,
        salaryPerTwoWeeks: (parseFloat(action.newValue)/twoWeekPeriodsPerMonth).toFixed(2),
        salaryPerWeek: (parseFloat(action.newValue)/weeksPerMonth).toFixed(2),
        salaryPerHour: (parseFloat(action.newValue)/(weeksPerMonth * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * (parseInt(action.weeksVacationPerYearString)/monthsPerYear))).toFixed(2),
        lastChangedValue: action.newValue,
        lastChangedType: 'month',
        hoursWorkedPerWeekString: action.hoursWorkedPerWeekString,
        weeksVacationPerYearString: action.weeksVacationPerYearString
    }
};


const twoWeekReducer = (action: ActionType) => {
    return {
        salaryPerYear: (parseFloat(action.newValue) * twoWeekPeriodsPerYear).toFixed(2),
        salaryPerMonth: (parseFloat(action.newValue) * weeksPerMonth).toFixed(2),
        salaryPerTwoWeeks: action.newValue,
        salaryPerWeek: (parseFloat(action.newValue)/2).toFixed(2),
        salaryPerHour: (parseFloat(action.newValue) / (2 * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * (parseInt(action.weeksVacationPerYearString) / twoWeekPeriodsPerYear))).toFixed(2),
        lastChangedValue: action.newValue,
        lastChangedType: 'two weeks',
        hoursWorkedPerWeekString: action.hoursWorkedPerWeekString,
        weeksVacationPerYearString: action.weeksVacationPerYearString
    }
};


const weekReducer = (action: ActionType) => {
    return {
        salaryPerYear: (parseFloat(action.newValue) * weeksPerYear).toFixed(2),
        salaryPerMonth: (parseFloat(action.newValue) * weeksPerMonth).toFixed(2),
        salaryPerTwoWeeks: (parseFloat(action.newValue) * 2).toFixed(2),
        salaryPerWeek: action.newValue,
        salaryPerHour: (parseFloat(action.newValue) / (parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * (parseInt(action.weeksVacationPerYearString) / weeksPerYear))).toFixed(2),
        lastChangedValue: action.newValue,
        lastChangedType: 'week',
        hoursWorkedPerWeekString: action.hoursWorkedPerWeekString,
        weeksVacationPerYearString: action.weeksVacationPerYearString
    }
};


const hourReducer = (action: ActionType) => {
    return {
        salaryPerYear: (parseFloat(action.newValue) * weeksPerYear * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * parseInt(action.hoursWorkedPerWeekString)).toFixed(2),
        salaryPerMonth: (parseFloat(action.newValue) * weeksPerMonth * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * (parseInt(action.hoursWorkedPerWeekString)/monthsPerYear)).toFixed(2),
        salaryPerTwoWeeks: (parseFloat(action.newValue) * 2 * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * (parseInt(action.hoursWorkedPerWeekString)/twoWeekPeriodsPerYear)).toFixed(2),
        salaryPerWeek: (parseFloat(action.newValue) * parseInt(action.hoursWorkedPerWeekString) - parseInt(action.hoursWorkedPerWeekString) * (parseInt(action.hoursWorkedPerWeekString)/weeksPerYear)).toFixed(2),
        salaryPerHour: action.newValue,
        lastChangedValue: action.newValue,
        lastChangedType: 'hour',
        hoursWorkedPerWeekString: action.hoursWorkedPerWeekString,
        weeksVacationPerYearString: action.weeksVacationPerYearString
    }
};


const defaultReducer = (state: StateType, action: ActionType) => {
    return {
        salaryPerYear: state.salaryPerYear,
        salaryPerMonth: state.salaryPerMonth,
        salaryPerTwoWeeks: state.salaryPerTwoWeeks,
        salaryPerWeek: state.salaryPerWeek,
        salaryPerHour: state.salaryPerHour,
        lastChangedValue: state.lastChangedValue,
        lastChangedType: state.lastChangedType,
        hoursWorkedPerWeekString: action.hoursWorkedPerWeekString,
        weeksVacationPerYearString: action.weeksVacationPerYearString
    }
};


const reducer = (state: StateType, action: ActionType) => {
    if (!parseInt(action.hoursWorkedPerWeekString) || !parseInt(action.weeksVacationPerYearString)) {
        return defaultReducer(state, action);
    }

    switch (action.type) {
        case 'year':
            return yearReducer(action);
        case 'month':
            return monthReducer(action);
        case 'two weeks':
            return twoWeekReducer(action);
        case 'week':
            return weekReducer(action);
        case 'hour':
            return hourReducer(action);
        default:
            return defaultReducer(state, action);
    }
};


const Wage: React.FC = () => {

    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleYearChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(moneyRegex) || value === '') {
            dispatch({
                type: 'year',
                newValue: value,
                hoursWorkedPerWeekString: state.hoursWorkedPerWeekString,
                weeksVacationPerYearString: state.weeksVacationPerYearString
            });
        }
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(moneyRegex) || value === '') {
            dispatch({
                type: 'month',
                newValue: value,
                hoursWorkedPerWeekString: state.hoursWorkedPerWeekString,
                weeksVacationPerYearString: state.weeksVacationPerYearString
            });
        }
    };

    const handleTwoWeekChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(moneyRegex) || value === '') {
            dispatch({
                type: 'two weeks',
                newValue: value,
                hoursWorkedPerWeekString: state.hoursWorkedPerWeekString,
                weeksVacationPerYearString: state.weeksVacationPerYearString
            });
        }
    };

    const handleWeekChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(moneyRegex) || value === '') {
            dispatch({
                type: 'week',
                newValue: value,
                hoursWorkedPerWeekString: state.hoursWorkedPerWeekString,
                weeksVacationPerYearString: state.weeksVacationPerYearString
            });
        }
    };

    const handleHourChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(moneyRegex) || value === '') {
            dispatch({
                type: 'hour',
                newValue: value,
                hoursWorkedPerWeekString: state.hoursWorkedPerWeekString,
                weeksVacationPerYearString: state.weeksVacationPerYearString
            });
        }
    };

    const handleHoursPerWeekChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(numberRegex) || value === '') {
            dispatch({
                type: state.lastChangedType,
                newValue: state.lastChangedValue,
                hoursWorkedPerWeekString: value,
                weeksVacationPerYearString: state.weeksVacationPerYearString
            });
        }
    };

    const handleWeeksVacationChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value: string = event.target.value;
        if (value.match(numberRegex) || value === '') {
            dispatch({
                type: state.lastChangedType,
                newValue: state.lastChangedValue,
                hoursWorkedPerWeekString: state.hoursWorkedPerWeekString,
                weeksVacationPerYearString: value
            });
        }
    };

    return (
        <div className="Wage">
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <h1 style={{margin: 0}}>Salary Breakdown</h1>
                    <h2 style={{margin: 0}}>See Your Salary in Different Amounts</h2>
                    <TextField
                        id="outlined-year"
                        label="Salary per year"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.salaryPerYear}
                        onChange={event => handleYearChange(event)}
                    />
                    <TextField
                        id="outlined-month"
                        label="Salary per month"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.salaryPerMonth}
                        onChange={event => handleMonthChange(event)}
                    />
                    <TextField
                        id="outlined-two-weeks"
                        label="Salary per two weeks"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.salaryPerTwoWeeks}
                        onChange={event => handleTwoWeekChange(event)}
                    />
                    <TextField
                        id="outlined-week"
                        label="Salary per week"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.salaryPerWeek}
                        onChange={event => handleWeekChange(event)}
                    />
                    <TextField
                        id="outlined-hour"
                        label="Salary per hour"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.salaryPerHour}
                        onChange={event => handleHourChange(event)}
                    />
                    <TextField
                        id="outlined-hours-per-week"
                        label="Hours worked per week"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.hoursWorkedPerWeekString}
                        onChange={event => handleHoursPerWeekChanged(event)}
                    />
                    <TextField
                        id="outlined-weeks-vacation-per-year"
                        label="Weeks of vacation per year"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={state.weeksVacationPerYearString}
                        onChange={event => handleWeeksVacationChanged(event)}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Wage;
