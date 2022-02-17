export function ConverTime(time : number | string | undefined) : string {
  if (!time) {
    return 'Продолжительность фильма неизвеста';
  }
  const timeCopy = Number(String(time));
  const hours = timeCopy / 60;
  const minutes = timeCopy % 60;
  let res = '';
  if (Math.floor(hours) !== 0) {
    res += `${Math.floor(hours)} ч`;
  }
  if (minutes !== 0) {
    res += ` ${minutes} мин`;
  }
  return res;
}
