export function dateToHourAndMinutes(date: Date): string {
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}
