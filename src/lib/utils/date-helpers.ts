export const dateHelpers = {
  getTodayStart(): Date {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  },

  getWeekStart(): Date {
    const date = new Date()
    const day = date.getDay()
    date.setDate(date.getDate() - day)
    date.setHours(0, 0, 0, 0)
    return date
  },

  getMonthStart(): Date {
    const date = new Date()
    date.setDate(1)
    date.setHours(0, 0, 0, 0)
    return date
  }
}
