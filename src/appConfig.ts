
import { BOOLEAN_VALUES, values } from './util/constant';

// Config functions and parametters.
// These functions will be call before loading landding component
// So there will be no context or hook available yet

export const getInitData = () => {
  const toDay = new Date();
  const year = toDay.getFullYear() + '';
  const country = "AU";
  const state = "VIC";
  const _status = values.init;

  // set current year as default
  const initData = {
    runtime: {
      year,
      country,
      state,
      _status
    },
    temp: {
      settings: {
        _isShown: BOOLEAN_VALUES.FALSE,
        country: "",
        state: "",
      },
      dayModal: {
        _isShown: BOOLEAN_VALUES.FALSE,
        dayInfo: {
          note: "",
        },
      },
    },
    error: {},
    userData: {}
  };

  return initData;
};
