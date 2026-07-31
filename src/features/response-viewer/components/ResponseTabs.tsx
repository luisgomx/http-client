type ActiveTab = 'body' | 'headers';

interface ResponseTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const TABS: { id: ActiveTab; label: string }[] = [
  { id: 'body', label: 'Body' },
  { id: 'headers', label: 'Headers' },
];

export function ResponseTabs({ activeTab, onTabChange }: ResponseTabsProps) {
  return (
    <div className="flex border-b border-gray-700 bg-gray-800">
      {TABS.map(({ id, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={[
              'px-5 py-2.5 text-sm font-medium transition-colors relative',
              isActive
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                : 'text-gray-500 hover:text-gray-300',
            ].join(' ')}
            aria-selected={isActive}
            role="tab"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
