import React from 'react'

const TICKER_ITEMS = [
  '30% OFF NEW SUBSCRIPTIONS',
  'GROWN AT 2,400M IN KINIGI, RWANDA',
  '100% ORGANIC FRUITING BODIES',
  'FREE COPPER DOSING SCOOP ON SUBSCRIPTIONS',
]

const MarqueeTicker: React.FC = () => {
  const renderItemSequence = (keyPrefix: string) => (
    <div key={keyPrefix} className="inline-flex items-center shrink-0">
      {TICKER_ITEMS.map((item, index) => (
        <React.Fragment key={`${keyPrefix}-${index}`}>
          <span className="px-4 whitespace-nowrap">{item}</span>
          <span className="text-white/60 select-none">·</span>
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div
      role="region"
      aria-label="Announcements ticker"
      className="relative w-full h-[36px] bg-[#B86B43] text-white font-mono text-[12px] uppercase tracking-[0.12em] overflow-hidden flex items-center z-40 select-none"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
        {renderItemSequence('seq-1')}
        {renderItemSequence('seq-2')}
      </div>
    </div>
  )
}

export default MarqueeTicker
