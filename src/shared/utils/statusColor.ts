export function getStatusColor(status: number): string {
  if (status === 0) return 'text-gray-400';
  if (status < 200) return 'text-gray-400';
  if (status < 300) return 'text-green-400';
  if (status < 400) return 'text-blue-400';
  if (status < 500) return 'text-yellow-400';
  return 'text-red-400';
}

export function getStatusBgColor(status: number): string {
  if (status === 0) return 'bg-gray-400/10';
  if (status < 200) return 'bg-gray-400/10';
  if (status < 300) return 'bg-green-400/10';
  if (status < 400) return 'bg-blue-400/10';
  if (status < 500) return 'bg-yellow-400/10';
  return 'bg-red-400/10';
}
