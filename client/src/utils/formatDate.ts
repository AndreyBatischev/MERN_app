export function formateDate(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
}