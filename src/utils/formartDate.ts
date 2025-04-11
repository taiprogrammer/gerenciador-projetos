export function formatDate(dateStr: string): string {
    const timestamp = Date.parse(dateStr)

    if (isNaN(timestamp)) return 'Data inválida'

    const date = new Date(timestamp)

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date)
}