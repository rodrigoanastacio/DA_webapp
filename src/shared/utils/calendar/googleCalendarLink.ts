interface GoogleCalendarEvent {
  title: string
  details?: string
  start: Date
  end?: Date
  location?: string
}

export const generateGoogleCalendarLink = (
  event: GoogleCalendarEvent
): string => {
  const baseUrl = 'https://calendar.google.com/calendar/render'
  const action = 'TEMPLATE'

  // Format dates to YYYYMMDDTHHmmSSZ
  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d+/g, '')

  const startDate = formatDate(event.start)
  // Default duration 1 hour if no end date
  const endDate = event.end
    ? formatDate(event.end)
    : formatDate(new Date(event.start.getTime() + 60 * 60 * 1000))

  const params = new URLSearchParams({
    action,
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.details || '',
    location: event.location || ''
  })

  return `${baseUrl}?${params.toString()}`
}
