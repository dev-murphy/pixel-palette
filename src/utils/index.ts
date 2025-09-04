export function copyColor(color: string) {
  navigator.clipboard.writeText(color);
  return true;
}
