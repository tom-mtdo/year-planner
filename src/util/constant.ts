import { countriesToSelect } from "./util";

// names used to construct data path & comp id
// fields in groups in roots
export const names = {
  // context root levels
  userData: "userData",
  runtime: "runtime",
  temp: "temp",

  // group
  settings: "settings",
  dayModal: "dayModal",

  // fields
  calendar: "calendar",
  isShown: "isShown",
  year: "year",
  date: 'date',
  country: "country",
  state: "state",
  note: 'note',
  dayInfo: 'dayInfo'
};

const userDataHome = `${names.userData}`;
export const userData = {
  _path: userDataHome
}

const runtimeHome = `${names.runtime}`;
const runtime = {
  _path: runtimeHome,
  calendar: `${runtimeHome}.${names.calendar}`,
  year:  `${runtimeHome}.${names.year}`,
  country:  `${runtimeHome}.${names.country}`,
  state:  `${runtimeHome}.${names.state}`,
  userData:  `${runtimeHome}.${names.userData}`,
}

const settingsHome = `${names.temp}.${names.settings}`;
const settings = {
  _path: settingsHome,
  isShown: `${settingsHome}.${names.isShown}`,
  year: `${settingsHome}.${names.year}`,
  country: `${settingsHome}.${names.country}`,
  state: `${settingsHome}.${names.state}`
};

const dayModalHome = `${names.temp}.${names.dayModal}`;
const dayModal = {
  _path:dayModalHome, 
  dayInfo: `${dayModalHome}.${names.dayInfo}`,
  isShown: `${dayModalHome}.${names.isShown}`,
  note: `${dayModalHome}.${names.dayInfo}.${names.note}`
};

const temp = {
  _path: `${names.temp}`,
  settings,
  dayModal
}

export const paths = {
  runtime,
  userData,
  temp
}

export const MinYear = 1970;
export const MaxYear = 9999;

export const MONTH_NAME = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_SHORT_NAME = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAY_SHORT_NAME = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const TOTAL_COLUMN = 1 + 7 + 4 * 7 + 2; // month label + 1 week offset + 4 week/month + 2 days for longest month = 38;

export enum BOOLEAN_VALUES {
  YES = "yes",
  NO = "no",
  TRUE = "true",
  FALSE = "false",
}

export enum BOOLEAN_LABELS {
  YES = "Yes",
  NO = "No",
  TRUE = "True",
  FALSE = "False",
}

export interface IStates {
  [key: string]: string;
}

export interface ICountry {
  name: string;
  states: IStates;
}

const ArrCountries = [
  [
    "AU",
    {
      name: "Australia",
      states: {
        ACT: "Australian Capital Territory",
        NSW: "New South Wales",
        NT: "Northern Territory",
        QLD: "Queensland",
        SA: "South Australia",
        TAS: "Tasmania",
        VIC: "Victoria",
        WA: "Western Australia",
      },
    },
  ],
  [
    "NZ",
    {
      name: "New Zealand",
      states: {
        AUK: "Auckland Province",
        CAN: "Canterbury",
        CIT: "Chatham Islands",
        HKB: "Hawke's Bay",
        MBH: "Marlborough",
        NSN: "Nelson",
        NTL: "Northland",
        OTA: "Otago Province",
        STL: "Southland",
        TKI: "Taranaki",
        WGN: "Wellington Province",
        WTC: "Westland",
      },
    },
  ],
];

// @ts-ignore
export const Countries = new Map<string, ICountry>(ArrCountries);

export const CountriesToSelect = countriesToSelect(Countries);
