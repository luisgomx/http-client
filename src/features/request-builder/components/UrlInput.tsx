interface UrlInputProps {
  url: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function UrlInput({ url, onChange, onSend }: UrlInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <input
      type="text"
      value={url}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="https://api.example.com/..."
      className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
    />
  );
}
