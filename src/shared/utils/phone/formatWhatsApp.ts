export function formatWhatsApp(phone: string | null | undefined): string {
  if (!phone) return '-'

  const digits = phone.replace(/\D/g, '')

  const localDigits = digits.startsWith('55') ? digits.slice(2) : digits

  if (localDigits.length === 11) {
    const ddd = localDigits.slice(0, 2)
    const firstPart = localDigits.slice(2, 7)
    const secondPart = localDigits.slice(7)
    return `(${ddd}) ${firstPart}-${secondPart}`
  }

  if (localDigits.length === 10) {
    const ddd = localDigits.slice(0, 2)
    const firstPart = localDigits.slice(2, 6)
    const secondPart = localDigits.slice(6)
    return `(${ddd}) ${firstPart}-${secondPart}`
  }

  return phone
}
