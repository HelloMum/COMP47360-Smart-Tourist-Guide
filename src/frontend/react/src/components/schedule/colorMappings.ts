
export const getColor = (value: number): string => {
  if (value <= 10) return '#0c3f76';
  if (value <= 20) return '#185394';
  if (value <= 30) return '#276cad';
  if (value <= 40) return '#4e9bc7';
  if (value <= 50) return '#c0e1f1';
  if (value <= 60) return '#f4c2ab';
  if (value <= 70) return '#e98e6f';
  if (value <= 80) return '#ce5246';
  if (value <= 90) return '#a92b1e';
  return '#9a0805';
};
