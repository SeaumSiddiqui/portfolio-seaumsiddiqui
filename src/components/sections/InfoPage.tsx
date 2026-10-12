import React from 'react';
import { InfoSidebar } from './InfoSidebar';
import { InfoCenter } from './InfoCenter';
import { InfoRightSidebar } from './InfoRightSidebar';

export function InfoPage() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.65fr_1fr] pt-11 min-h-screen">
      {/* Left Column (About Me Sidebar) */}
      <div className="order-1 lg:order-1 lg:border-r border-brand-border min-w-0">
        <InfoSidebar />
      </div>

      {/* Center Column (Bio, Software Stack, Experience) - order-3 on mobile, order-2 on desktop */}
      <div className="order-3 lg:order-2 lg:border-r border-brand-border flex flex-col min-w-0 min-h-screen">
        <InfoCenter />
      </div>

      {/* Right Column (Stats, Achievements) - order-2 on mobile, order-3 on desktop */}
      <div className="order-2 lg:order-3 min-w-0">
        <InfoRightSidebar />
      </div>
    </div>
  );
}
