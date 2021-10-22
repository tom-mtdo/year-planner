import { map } from "lodash";
import { countriesToSelect } from './util';

export const YearPath = "runtime.year";
export const CalendarPath = "runtime.calendar";
export const UserDataPath = "userData";

const SettingsHomePath = "settings";
export const SettingsPath = {
  settings: `${SettingsHomePath}`,
  showSettings: `${SettingsHomePath}.showSettings`,
  year: `${SettingsHomePath}.year`,
  country: `${SettingsHomePath}.country`,
  state: `${SettingsHomePath}.state`,
};

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
  [key: string]: string
}

export interface ICountry {
  name: string,
  states: IStates
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
    }
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
        WTC: "Westland"
      },
    }
  ]
];

// @ts-ignore
export const Countries = new Map<string, ICountry>(ArrCountries);

export const CountriesToSelect = countriesToSelect(Countries);
