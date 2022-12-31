import { chip } from './constaints';

export const findColor = (type: string) =>
  chip.find(el => el.name === type)?.color;

export const findVariant = (type: string) =>
  chip.find(el => el.name === type)?.variant;

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
