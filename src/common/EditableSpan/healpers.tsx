export function fotmatToString(value: string | number) {
  return typeof value == "number" ? value.toLocaleString("ru-RU") : value
}

export function fotmatToNumber(value: string): number {
  return +value.replace(/\s/g, "").replaceAll(",", ".")
}

export function validate(value, inputName): string | null {
  if (inputName !== "rowName" && Number.isNaN(fotmatToNumber(value))) {
    return "Только цифры,запятая, точка,пробел "
  }
  if (value.toString().length > 16) {
    return "Не более 15 знаков"
  }
  if (value.toString().length === 0) {
    return "Заполните поле"
  }
  return null
}