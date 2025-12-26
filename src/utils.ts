export function GetYear(date: string): string {
  const FormatDate = new Date(date);
  return FormatDate.getFullYear().toString();
}
