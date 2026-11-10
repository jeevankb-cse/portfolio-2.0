import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Navigation,
  Pause,
  Play,
} from 'lucide-react';
import { ROAD_JOURNEY_STOPS } from '../data/portfolioData';
import {
  calculateRoadProgressPercentage,
  filterRoadStops,
  RoadFilterType,
} from '../utils/portfolioLogic';

export const ExperienceEducationSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<RoadFilterType>('all');
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [revealedMaxIndex, setRevealedMaxIndex] = useState<number>(0);
  const [isAutoTraveling, setIsAutoTraveling] = useState<boolean>(false);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visibleStops = filterRoadStops(ROAD_JOURNEY_STOPS, activeFilter);

  // Reset indices when filter changes
  useEffect(() => {
    setActiveStopIndex(0);
    setRevealedMaxIndex(0);
    setIsAutoTraveling(false);
  }, [activeFilter]);

  // IntersectionObserver so scrolling naturally reveals road stops one by one
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stopRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStopIndex(index);
              setRevealedMaxIndex((prev) => Math.max(prev, index));
            }
          });
        },
        {
          threshold: 0.35,
          rootMargin: '-10% 0px -15% 0px',
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [visibleStops.length, activeFilter]);

  // Auto-travel timer that steps through stops one by one
  useEffect(() => {
    if (!isAutoTraveling) return;
    const timer = window.setInterval(() => {
      setActiveStopIndex((prev) => {
        const next = prev + 1;
        if (next >= visibleStops.length) {
          setIsAutoTraveling(false);
          return prev;
        }
        setRevealedMaxIndex((maxPrev) => Math.max(maxPrev, next));
        stopRefs.current[next]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return next;
      });
    }, 2200);

    return () => window.clearInterval(timer);
  }, [isAutoTraveling, visibleStops.length]);

  const handleTravelToStop = (index: number) => {
    const clamped = Math.max(0, Math.min(index, visibleStops.length - 1));
    setActiveStopIndex(clamped);
    setRevealedMaxIndex((prev) => Math.max(prev, clamped));
    stopRefs.current[clamped]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const progressPercent = calculateRoadProgressPercentage(
    activeStopIndex,
    visibleStops.length
  );

  return (
    <section id="experience" className="py-20 border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono font-semibold text-blue-700 mb-2">
              02. Career &amp; Academic Road Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
              The Engineering Highway: Davanagere → Shivamogga → Bengaluru
            </h2>
            <p className="text-sm text-zinc-600 mt-2 max-w-2xl">
              Scroll down the road or use the route controls below to travel
              checkpoint by checkpoint through each academic milestone and
              industry AI internship.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="group"
            aria-label="Filter timeline view"
            className="flex items-center gap-1 p-1 bg-zinc-200/70 rounded-lg self-start lg:self-auto"
          >
            {(
              [
                { id: 'all', label: 'All Route Stops (4)' },
                { id: 'experience', label: 'Industry Experience' },
                { id: 'education', label: 'Education (3)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Highway Route Navigator Bar */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
              <div>
                <div className="text-xs font-mono text-zinc-500 tabular-nums">
                  Active Checkpoint: Stop 0{activeStopIndex + 1} of 0{visibleStops.length} ·{' '}
                  {progressPercent}% Route Completed
                </div>
                <div className="text-sm font-bold text-zinc-900">
                  {visibleStops[activeStopIndex]?.city} —{' '}
                  {visibleStops[activeStopIndex]?.title}
                </div>
              </div>
            </div>

            {/* Step-by-Step Travel Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleTravelToStop(activeStopIndex - 1)}
                disabled={activeStopIndex === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Previous Stop</span>
              </button>

              <button
                type="button"
                onClick={() => handleTravelToStop(activeStopIndex + 1)}
                disabled={activeStopIndex >= visibleStops.length - 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Next Stop</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isAutoTraveling && activeStopIndex >= visibleStops.length - 1) {
                    setActiveStopIndex(0);
                  }
                  setIsAutoTraveling((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isAutoTraveling ? (
                  <>
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pause Route</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Auto-Drive Route</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Horizontal Mini-Highway Waypoint Strip */}
          <div className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {visibleStops.map((stop, idx) => {
                const isReached = idx <= activeStopIndex;
                const isCurrent = idx === activeStopIndex;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => handleTravelToStop(idx)}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : isReached
                        ? 'bg-[#FAF9F6] text-zinc-900 border-blue-700/40'
                        : 'bg-[#FAF9F6] text-zinc-500 border-zinc-200/80 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono tabular-nums mb-1">
                      <span className={isCurrent ? 'text-amber-400' : 'text-blue-700'}>
                        Stop {stop.stopNumber}
                      </span>
                      <span className={isCurrent ? 'text-zinc-300' : 'text-zinc-400'}>
                        {stop.period}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{stop.city}</div>
                    <div
                      className={`text-xs truncate mt-0.5 ${
                        isCurrent ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {stop.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical Winding Highway Road & One-by-One Appearing Milestone Cards */}
        <div className="relative py-6">
          {/* Central Paved Asphalt Road Track */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-6 lg:left-1/2 -translate-x-1/2 w-7 bg-zinc-900 rounded-full border-2 border-zinc-700 shadow-inner overflow-hidden"
          >
            {/* Dynamic Blue Illuminated Travel Progress Fill */}
            <div
              style={{ height: `${progressPercent}%` }}
              className="w-full bg-gradient-to-b from-blue-700 via-blue-600 to-amber-500 transition-all duration-500"
            />
            {/* Dashed Highway Center Lane Markings */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-amber-300/90" />
          </div>

          {/* Road Stops List */}
          <div className="space-y-12 relative z-10">
            {visibleStops.map((stop, index) => {
              const isLeftColumn = index % 2 === 0;
              const isRevealed = index <= Math.max(revealedMaxIndex, activeStopIndex);
              const isCurrentStop = index === activeStopIndex;

              return (
                <div
                  key={stop.id}
                  ref={(el) => {
                    stopRefs.current[index] = el;
                  }}
                  onClick={() => setActiveStopIndex(index)}
                  className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-6 pl-16 lg:pl-0 cursor-pointer"
                >
                  {/* Highway Checkpoint Node on the Asphalt Road */}
                  <div
                    className={`absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-mono text-xs font-bold tabular-nums border-4 transition-transform duration-200 z-20 ${
                      isCurrentStop
                        ? 'bg-amber-400 text-zinc-950 border-zinc-900 scale-110 shadow-md'
                        : isRevealed
                        ? 'bg-blue-700 text-white border-white'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-600'
                    }`}
                  >
                    {isCurrentStop ? (
                      <Navigation className="w-4 h-4 fill-current" aria-hidden="true" />
                    ) : (
                      <span>{stop.stopNumber}</span>
                    )}
                  </div>

                  {/* Horizontal Exit Ramp Bridge (Desktop) */}
                  <div
                    aria-hidden="true"
                    className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-1.5 w-12 bg-zinc-900 ${
                      isLeftColumn
                        ? 'right-1/2 mr-3 rounded-l-full'
                        : 'left-1/2 ml-3 rounded-r-full'
                    }`}
                  >
                    <div className="w-full h-0 border-t border-dashed border-amber-300 my-auto" />
                  </div>

                  {/* Stop Card Container (Alternating Left and Right on Desktop, Appearing One-by-One) */}
                  <div
                    className={`${
                      isLeftColumn
                        ? 'lg:col-span-5 lg:col-start-1'
                        : 'lg:col-span-5 lg:col-start-8'
                    } transition-all duration-300 ${
                      isRevealed
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-45 translate-y-4'
                    }`}
                  >
                    <article
                      className={`bg-white rounded-2xl p-6 sm:p-7 border transition-colors ${
                        isCurrentStop
                          ? 'border-blue-700 shadow-md'
                          : 'border-zinc-200/80 hover:border-zinc-300'
                      }`}
                    >
                      {/* Unboxed Highway Signpost Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 pb-3 mb-4 border-b border-zinc-100">
                        <div className="flex items-center gap-1.5 font-mono tabular-nums text-blue-700 font-semibold">
                          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{stop.kilometerMark}</span>
                        </div>
                        <span className="font-mono tabular-nums font-semibold text-zinc-700">
                          {stop.period}
                        </span>
                      </div>

                      {/* Stop Metadata Kicker */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 mb-2">
                        <span>{stop.highwayBadge}</span>
                        <span className="font-mono font-bold text-zinc-900 tabular-nums">
                          {stop.metricLabel}: {stop.metricValue}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 mb-1">
                        {stop.title}
                      </h3>
                      <p className="font-serif italic text-sm text-blue-700 mb-2">
                        {stop.subtitle} · {stop.fullLocation}
                      </p>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                        {stop.summary}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 text-xs text-zinc-700 mb-5">
                        {stop.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className="font-mono text-blue-700 shrink-0"
                              aria-hidden="true"
                            >
                              —
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Unboxed Tools / Subjects Footer */}
                      <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                        <span className="font-semibold text-zinc-800">
                          Key Focus:
                        </span>
                        {stop.toolsOrSubjects.map((tool, idx) => (
                          <React.Fragment key={tool}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <span>{tool}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </article>
                  </div>

                  {/* Opposite Side Highway Milepost Sign (Desktop Only) */}
                  <div
                    className={`hidden lg:flex flex-col ${
                      isLeftColumn
                        ? 'lg:col-span-5 lg:col-start-8 items-start pl-4'
                        : 'lg:col-span-5 lg:col-start-1 items-end pr-4 text-right'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-zinc-400 tabular-nums">
                      STOP {stop.stopNumber} · {stop.period}
                    </div>
                    <div className="font-display text-lg font-bold text-zinc-800">
                      {stop.city}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {stop.category} · {stop.metricLabel}: {stop.metricValue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
