export function pxToCm(px) {
  const ppi = 96; // Assuming a common PPI
  const cmPerInch = 2.54;
  const cm = (px / ppi) * cmPerInch;
  return cm;
}

export function cmToPx(cm) {
  const ppi = 96; // Assuming a common PPI
  const inchPerCm = 1 / 2.54;
  const px = cm * ppi * inchPerCm;
  return px;
}
