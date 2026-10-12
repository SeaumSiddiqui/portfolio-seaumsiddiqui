import React, { useState, useEffect, useCallback } from 'react';
import { DashboardLeftSidebar } from './DashboardLeftSidebar';
import { DashboardCenter } from './DashboardCenter';
import { DashboardRightSidebar } from './DashboardRightSidebar';
import {
  getTelemetry,
  fetchTelemetryAsync,
  recordPageView,
  subscribeTelemetry,
  type TelemetryState,
} from '../../lib/telemetry';

export function SiteDashboard() {
  const [telemetry, setTelemetry] = useState<TelemetryState>(getTelemetry);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTelemetry = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const updated = await fetchTelemetryAsync();
      setTelemetry(updated);
    } catch {
      setTelemetry(getTelemetry());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const simulateEvent = () => {
    // Record simulated pageview across featured routes
    const paths = ['/work/devscope', '/work/everbloom-bd', '/work/hookchef-api', '/info', '/'];
    const randomPath = paths[Math.floor(Math.random() * paths.length)];
    recordPageView(randomPath);
  };

  useEffect(() => {
    // Initial fetch from serverless API
    refreshTelemetry();

    // Subscribe to internal state updates (from clicks, simulations)
    const unsubscribe = subscribeTelemetry((newState) => {
      setTelemetry(newState);
    });

    // Auto-poll API every 15 seconds to stream live traffic
    const interval = setInterval(() => {
      fetchTelemetryAsync().then((updated) => {
        setTelemetry(updated);
      });
    }, 15000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [refreshTelemetry]);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.65fr_1fr] pt-11 min-h-screen bg-brand-bg text-brand-text">
      {/* Center Column: Traffic & Metric Analytics (First on mobile) */}
      <div className="order-1 lg:order-2 lg:border-r border-brand-border flex flex-col min-w-0">
        <DashboardCenter telemetry={telemetry} />
      </div>

      {/* Left Column: Diagnostics & System Health (Second on mobile, first on desktop) */}
      <div className="order-2 lg:order-1 lg:border-r border-brand-border min-w-0">
        <DashboardLeftSidebar
          telemetry={telemetry}
          isRefreshing={isRefreshing}
          onRefreshTelemetry={refreshTelemetry}
          onSimulateEvent={simulateEvent}
        />
      </div>

      {/* Right Column: Conversions, Demographics & Referrals (Third on mobile, third on desktop) */}
      <div className="order-3 lg:order-3 min-w-0">
        <DashboardRightSidebar telemetry={telemetry} />
      </div>
    </div>
  );
}
