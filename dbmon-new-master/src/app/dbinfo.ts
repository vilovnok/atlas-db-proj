

export const applyLag = [
    {source: 'OGG$A_COOL', class: '_11', lag: 1, lagClass: 'green', status: 'ENABLED', statusClass(): String {
        if (this.status == 'ENABLED') {
            return 'green';
        } else {
            return 'red';
        }
    }, date: '2021-08-04 \n 12:33:49'},
    {source: 'OGG$A_COOL01', class: '_11', lag: 2.2305, lagClass: 'green', status: 'ENABLED', statusClass(): String {
        if (this.status == 'ENABLED') {
            return 'green';
        } else {
            return 'red';
        }
    }, date: '2021-08-04 \n 12:33:49'},
    {source: 'OGG$C_TRIG', class: '_11', lag: 3, lagClass: 'red', status: 'ENABLED', statusClass(): String {
        if (this.status == 'ENABLED') {
            return 'green';
        } else {
            return 'red';
        }
    }, date: '2021-08-04 \n 12:33:49'},
    {source: 'OGG$A_TRIG', class: '_11', lag: 4, lagClass: 'red', status: 'ENABLED', statusClass(): String {
        if (this.status == 'ENABLED') {
            return 'green';
        } else {
            return 'red';
        }
    }, date: '2021-08-04 \n 12:33:49'},
    {source: 'OGG$A_AMI', class: '_11', lag: 5, lagClass: 'green', status: 'ENABLED', statusClass(): String {
        if (this.status == 'ENABLED') {
            return 'green';
        } else {
            return 'red';
        }
    }, date: '2021-08-04 \n 12:33:49'},
    {source: 'OGG$A_AMIRTR', class: '_11', lag: 9, lagClass: 'red', status: 'ENABLED', statusClass(): String {
        if (this.status == 'ENABLED') {
            return 'green';
        } else {
            return 'red';
        }
    }, date: '2021-08-04 \n 12:33:49'}
]

export interface IDb {
    items: any[]
}