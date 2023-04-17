/**
 * name: calendar.js
 * author: Deve
 * date: 2021-05-10
 */

import moment from 'moment';

class Calendar {
    constructor(date) {
        this.currentTime = moment(date);
        this.year = this.year.bind(this);
        this.month = this.month.bind(this);
        this.date = this.date.bind(this);
    }

    year() {
        const { currentTime } = this;
        return currentTime.year();
    }

    month() {
        const { currentTime } = this;
        return currentTime.month();
    }

    date() {
        const { currentTime } = this;
        return currentTime.date();
    }
}

Calendar.getMonthDay = function getMonthDay(date) {
    return moment(date).daysInMonth();
};

Calendar.getTime = function getTime(date) {
    return moment(date);
};

export default Calendar;
