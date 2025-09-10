export function mapStatusToColor(status: 'active' | 'inactive'): string {
  console.warn('mapStatusToColor() running', status);
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-500',
    inactive: 'bg-red-100 text-red-500',
  };
  return colors[status];
}
