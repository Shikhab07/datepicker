import {
    NativeDateAdapter
} from '@angular/material';
import * as moment from 'moment';

export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat == "input") {

            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();

            return this._to2digit(day) + '. ' + this.getMonthName(month) + ' ' + year;
        } else {
            return date.toDateString();
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    private getMonthName(month) {
        const months = Array.apply(0, new Array(12)).map(function (_, i) {
            return moment().month(i).format('MMMM');
        });
        return months[month];
    }
}

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        //dateInput: { month: 'short', year: 'numeric', day: 'numeric' }, //Uncomment this line if want default format.
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};