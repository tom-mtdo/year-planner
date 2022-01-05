import { paths } from "./constant";

export const yearPlanner = {
  [paths.temp.settings.year]: {
    required: { expression: true, message: "Please provide year YYYY" },
    length: { expression: 4, message: "Length is 4 chars" },
  },
  [paths.temp.settings.country]: {
    required: { expression: true, message: "Please select a country" },
  }
};
