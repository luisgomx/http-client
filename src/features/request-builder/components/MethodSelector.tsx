import type { HttpMethod } from '../../../types/http.types';

interface MethodSelectorProps {
  method: HttpMethod;
  onMethodChange: (method: HttpMethod) => void;
}

const METHODS: { value: HttpMethod; label: string; colorClass: string }[] = [
  { value: 'GET', label: 'GET', colorClass: 'text-green-400' },
  { value: 'POST', label: 'POST', colorClass: 'text-yellow-400' },
  { value: 'PUT', label: 'PUT', colorClass: 'text-blue-400' },
  { value: 'DELETE', label: 'DELETE', colorClass: 'text-red-400' },
  { value: 'PATCH', label: 'PATCH', colorClass: 'text-orange-400' },
];

export function MethodSelector({ method, onMethodChange }: MethodSelectorProps) {
  return (
    <select
      value={method}
      onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
      className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
    >
      {METHODS.map(({ value, label, colorClass }) => (
        <option key={value} value={value} className={colorClass}>
          {label}
        </option>
      ))}
    </select>
  );
}
