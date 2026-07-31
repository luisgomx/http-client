import { useState, useCallback } from 'react';

type ActiveTab = 'body' | 'headers';

interface UseResponseDisplayReturn {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export function useResponseDisplay(): UseResponseDisplayReturn {
  const [activeTab, setActiveTab] = useState<ActiveTab>('body');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return { activeTab, setActiveTab, copied, copyToClipboard };
}
