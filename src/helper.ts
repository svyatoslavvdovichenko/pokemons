import { chip } from './constaints';
export const findColor = (types: string): "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined => {
  const color = chip.find(el => el.name === types);
  return color!.color;
}

export const findVariant = (types: string): "outlined" | "filled" | undefined => {
  const variant = chip.find(el => el.name === types);
  return variant!.variant;
}