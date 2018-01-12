import { Component, ViewChild, Input, Output, EventEmitter, SimpleChange, SimpleChanges, ElementRef } from '@angular/core';
import {
    MdNativeDateModule,
    MdDatepicker
} from '@angular/material';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "app/shared/toastr/toastr.service";
/**
 * @title Basic datepicker
 */
@Component({
    selector: 'datepicker-component',
    templateUrl: 'datepicker.component.html',
    styleUrls: ['datepicker.component.scss'],
})
export class DatepickerComponent {
    date: Date;
    presentDay: Date;
    days: any[] = [];
    momentDate: moment.Moment;
    months: any[] = [];
    selectedDate: Date;
    selectedDay = {};
    selectedMonth = {};
    selectedYear = {};
    years: any[] = [];

    @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;
    @Output() onValueChange: EventEmitter<string> = new EventEmitter();
    @Input() data: Date;
    @Input() disableFuture: boolean;

    constructor(private translateService: TranslateService, private tosterService: ToastrService, private elementRef: ElementRef) {
        this.date = new Date();
        this.presentDay = new Date();
    }

    onItemSelection(date: any) {       
        // const day = date.getDate();
        // const month = date.getMonth();
        // const year = date.getFullYear();
        this.onValueChange.emit(moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }

    ngOnChanges(changes: SimpleChanges) {      
        // const data: SimpleChange = changes.data;
        // if (!isNullOrUndefined(data)) {
        //     this.momentDate = moment(this.date, 'LLLL');
        //     if (!isNullOrUndefined(this.data)) {
        //         this.date = new Date(this.data);
        //         this.momentDate = moment(this.date, 'LLLL');
        //         // this.getSelectedDateParameters(this.momentDate);
        //     }
        //     // this.getDays();
        //     // this.getMonths();
        //     // this.getYears();
        // }
    }

    getSelectedDateParameters(momentDate) {
        this.selectedDay = { dayValue: momentDate.date(), dayText: momentDate.date().toString() };
        // month 0-11 . Get month name from moment  Jan -Dec
        this.selectedMonth = { monthValue: momentDate.month(), monthText: this.getMonthName((momentDate.month())) };
        this.selectedYear = { yearValue: momentDate.year(), yearText: momentDate.year().toString() };
    }

    private getDays() {
        this.days = [];
        const days = this.momentDate.daysInMonth();
        for (let i = 1; i <= days; i++) {
            this.days.push({ dayValue: i, dayText: i.toString() });
        }
    }

    private getMonths() {
        const lang = this.translateService.currentLang;
        moment.locale(lang);
        this.months = [];
        this.months = moment.monthsShort().map((month, i) => {
            return { monthValue: i, monthText: month };
        });
    }

    private getMonthName(month) {
        const months = Array.apply(0, new Array(12)).map(function (_, i) {
            return moment().month(i).format('MMM');
        });
        return months[month];
    }

    private getYears() {
        if (this.years.length === 0) {
            const currentYear = this.momentDate.year();
            this.years = [];
            let years = 0;
            if (this.disableFuture) {
                years = currentYear - 90;
                for (let i = currentYear; i >= years; i--) {
                    this.years.push({ yearValue: i, yearText: i.toString() });
                }
            } else {
                years = currentYear + 60;
                for (let i = currentYear; i <= years; i++) {
                    this.years.push({ yearValue: i, yearText: i.toString() });
                }
            }
        }
    }

    dateFormatter(event: any) {       
        if (event.target.value != '' && typeof this.data == 'object') {
            if (moment(event.target.value, "DD-MM-YY").isValid()) {
                this.data = new Date(moment(event.target.value, "DD-MM-YYYY").format());
                this.onValueChange.emit(moment(this.data).format());
            }
            else {
                this.tosterService.showError('COMMON.INVALIDDATEFORMATE');
                event.target.value = '';
                event.target.focus();
            }
        }
    }
}