import { Spinner } from '../../../shared/components/Spinner';

interface SendButtonProps {
  loading: boolean;
  onSend: () => void;
  onCancel: () => void;
  disabled: boolean;
}

export function SendButton({ loading, onSend, onCancel, disabled }: SendButtonProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Spinner size="sm" />
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onSend}
      disabled={disabled}
      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded transition-colors"
    >
      Send
    </button>
  );
}
