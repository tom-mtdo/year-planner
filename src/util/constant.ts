import { countriesToSelect, getCountries } from "./util";
import { compKeys } from '../data-lib/util/constant';

// names used to construct data path & comp id
// fields in groups in roots
export const names = {
  // app name
  yearPlanner: 'yearPlanner',
  // id
  uuid: "uuid",
  // context root levels
  userData: "userData",
  runtime: "runtime",
  temp: "temp",
  error: "error",

  // group
  settings: "settings",
  dayModal: "dayModal",

  // fields
  calendar: "calendar",
  year: "year",
  date: 'date',
  country: "country",
  state: "state",
  note: 'note',
  dayInfo: 'dayInfo',

  // self prop
  _isShown: '_isShown'
};

export const values = {
  init: 'init',
  loading: 'loading',
  loaded: 'loaded',
  
}

export const labels = {
  yearPlanner: 'Year planner'
}

// Paths - data structure
const userDataHome = `${names.userData}`;
export const userData = {
  [compKeys._path]: userDataHome
}

const runtimeHome = `${names.runtime}`;
const runtime = {
  [compKeys._path]: runtimeHome,
  [compKeys._status]: compKeys._status,
  calendar: `${runtimeHome}.${names.calendar}`,
  year:  `${runtimeHome}.${names.year}`,
  country:  `${runtimeHome}.${names.country}`,
  state:  `${runtimeHome}.${names.state}`,
  userData:  `${runtimeHome}.${names.userData}`,
}

const settingsHome = `${names.temp}.${names.settings}`;
const settings = {
  [compKeys._path]: settingsHome,
  [compKeys._status]: `${settingsHome}.${compKeys._status}`,
  [compKeys._isShown]: `${settingsHome}.${compKeys._isShown}`,
  year: `${settingsHome}.${names.year}`,
  country: `${settingsHome}.${names.country}`,
  state: `${settingsHome}.${names.state}`
};

const dayModalHome = `${names.temp}.${names.dayModal}`;
const dayModal = {
  [compKeys._path]:dayModalHome,
  [compKeys._isShown]: `${dayModalHome}.${compKeys._isShown}`,
  dayInfo: `${dayModalHome}.${names.dayInfo}`,
  note: `${dayModalHome}.${names.dayInfo}.${names.note}`
};

const temp = {
  [compKeys._path]: `${names.temp}`,
  settings,
  dayModal
}

const error = names.error;

export const paths = {
  runtime,
  userData,
  temp,
  error
}
// End of Paths

// Other const
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

export const countries = getCountries();
export const CountriesToSelect = countriesToSelect(countries);
