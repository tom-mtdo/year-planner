export const MONTH_NAME = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTH_SHORT_NAME = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const DAY_SHORT_NAME = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const TOTAL_COLUMN = 1 + 7 + 4 * 7 + 2 // month label + 1 week offset + 4 week/month + 2 days for longest month = 38; 

export enum BOOLEAN_VALUES {
  YES = 'yes',
  NO = 'no',
  TRUE = 'true',
  FALSE = 'false'
}

export enum BOOLEAN_LABELS {
  YES = 'Yes',
  NO = 'No',
  TRUE = 'True',
  FALSE = 'False'
}