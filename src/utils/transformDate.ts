export function dateToHourAndMinutes(date: Date): string {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const hourString = hour < 10 ? `0${hour}` : `${hour}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hourString}:${minutesString}`;
}
