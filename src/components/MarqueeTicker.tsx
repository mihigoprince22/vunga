import React from 'react';

const TICKER_ITEMS = [
  '30% OFF NEW SUBSCRIPTIONS',
  'GROWN AT 2,400M IN KINIGI, RWANDA',
  '100% ORGANIC FRUITING BODIES',
  'FREE COPPER DOSING SCOOP ON SUBSCRIPTIONS',
  'KIGALI SAME-DAY DISPATCH · DHL WORLDWIDE',
];

const MarqueeTicker: React.FC = () => {
  const renderItemSequence = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-8 px-4">
      {TICKER_ITEMS.map((item, index) => (
        <React.Fragment key={`${key}-${index}`}>
          <span className="whitespace-nowrap">{item}</span>
          <span className="text-[#D4AF6A] select-none text-xs">&bull;</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Announcements ticker"
      className="relative w-full bg-[#141515] text-[#EAE8E1] border-b border-[#B86B43]/25 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] overflow-hidden whitespace-nowrap flex items-center z-40 select-none"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
        {renderItemSequence('track-1')}
        {renderItemSequence('track-2')}
      </div>
    </div>
  );
};

export default MarqueeTicker;
