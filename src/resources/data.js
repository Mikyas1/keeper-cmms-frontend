const scheduler_type = [
    {
        id: 'OT',
        name: 'One Time'
    },
    {
        id: 'DY',
        name: 'Daily'
    },
    {
        id: 'WK',
        name: 'Weekly'
    },
    {
        id: 'MN',
        name: 'Monthly'
    },
    {
        id: 'IN',
        name: 'Interval'
    },
];

const month_days = [
    {
        id: 1,
        name: '1st'
    },
    {
        id: 2,
        name: '2nd'
    },
    {
        id: 3,
        name: '3rd'
    },
    {
        id: 4,
        name: '4th'
    },
    {
        id: 5,
        name: '5th'
    },
    {
        id: 6,
        name: '6th'
    },
    {
        id: 7,
        name: '7th'
    },
    {
        id: 8,
        name: '8th'
    },
    {
        id: 9,
        name: '9th'
    },
    {
        id: 10,
        name: '10th'
    },
    {
        id: 11,
        name: '11th'
    },
    {
        id: 12,
        name: '12th'
    },
    {
        id: 13,
        name: '13th'
    },
    {
        id: 14,
        name: '14th'
    },
    {
        id: 15,
        name: '15th'
    },
    {
        id: 16,
        name: '16th'
    },
    {
        id: 17,
        name: '17th'
    },
    {
        id: 18,
        name: '18th'
    },
    {
        id: 19,
        name: '19th'
    },
    {
        id: 20,
        name: '20th'
    },
    {
        id: 21,
        name: '21st'
    },
    {
        id: 22,
        name: '22nd'
    },
    {
        id: 23,
        name: '23rd'
    },
    {
        id: 24,
        name: '24th'
    },
    {
        id: 25,
        name: '25th'
    },
    {
        id: 26,
        name: '26th'
    },
    {
        id: 27,
        name: '27th'
    },
    {
        id: 28,
        name: '28th'
    },
    {
        id: -2,
        name: '3rd to last'
    },
    {
        id: -1,
        name: '2nd to last'
    },
    {
        id: 0,
        name: 'last'
    },
];

const months = [
    {
        id: 1,
        name: 'January',
        arb: 'Jan'
    },
    {
        id: 2,
        name: 'February',
        arb: 'Feb'
    },
    {
        id: 3,
        name: 'March',
        arb: 'Mar'
    },
    {
        id: 4,
        name: 'April',
        arb: 'Apr'
    },
    {
        id: 5,
        name: 'May',
        arb: 'May'
    },
    {
        id: 6,
        name: 'June',
        arb: 'Jun'
    },
    {
        id: 7,
        name: 'July',
        arb: 'Jul'
    },
    {
        id: 8,
        name: 'August',
        arb: 'Aug'
    },
    {
        id: 9,
        name: 'September',
        arb: 'Sep'
    },
    {
        id: 10,
        name: 'October',
        arb: 'Oct'
    },
    {
        id: 11,
        name: 'November',
        arb: 'Nov'
    },
    {
        id: 12,
        name: 'December',
        arb: 'Dec'
    },
];

const week_days = [
    {
        id: 0,
        name: 'Monday',
        arb: 'Mon'
    },
    {
        id: 1,
        name: 'Tuesday',
        arb: 'Tue'
    },
    {
        id: 2,
        name: 'Wednesday',
        arb: 'Wed'
    },
    {
        id: 3,
        name: 'Thursday',
        arb: 'Thu'
    },
    {
        id: 4,
        name: 'Friday',
        arb: 'Fri'
    },
    {
        id: 5,
        name: 'Saturday',
        arb: 'Sat'
    },
    {
        id: 6,
        name: 'Sunday',
        arb: 'Sun'
    },
]

export { scheduler_type, 
         month_days, 
         months, 
         week_days};