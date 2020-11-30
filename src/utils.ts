export function getDays(year: number, month: number) {
  var date = new Date(year, month, 0);
  var days = date.getDate();
  return days;
}

export function clone(data: RecordItem[] | RecordItem) {
  return JSON.parse(JSON.stringify(data));
}
