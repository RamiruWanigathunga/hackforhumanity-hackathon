import React from "react";

export interface ScoreComponents {
  service: number; // max 40
  availability: number; // max 25
  area: number; // max 20
  rating: number; // max 10
  language: number; // max 5
}

export interface ScoreBarProps {
  total: number;
  components: ScoreComponents;
  showBreakdown?: boolean;
  className?: string;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  total,
  components,
  showBreakdown = false,
  className = "",
}) => {
  return (
    <div className={`space-y-2 w-full ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-current">
        <span>Deterministic Match Score</span>
        <span className="number-display text-sm font-bold">{Math.round(total)}/100</span>
      </div>

      {/* Proportional 5-segment bar in stadium pill */}
      <div
        className="w-full h-2.5 bg-[#eef0f3] rounded-full overflow-hidden flex"
        role="progressbar"
        aria-valuenow={Math.round(total)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Match score ${Math.round(total)} of 100`}
      >
        <div
          style={{ width: `${components.service}%` }}
          className="bg-[#0052ff] h-full"
          title={`Service fit: ${Math.round(components.service)}/40`}
        />
        <div
          style={{ width: `${components.availability}%` }}
          className="bg-[#3375ff] h-full"
          title={`Availability: ${Math.round(components.availability)}/25`}
        />
        <div
          style={{ width: `${components.area}%` }}
          className="bg-[#6697ff] h-full"
          title={`Area proximity: ${Math.round(components.area)}/20`}
        />
        <div
          style={{ width: `${components.rating}%` }}
          className="bg-[#99baff] h-full"
          title={`Rating: ${Math.round(components.rating)}/10`}
        />
        <div
          style={{ width: `${components.language}%` }}
          className="bg-[#ccdcfc] h-full"
          title={`Language: ${Math.round(components.language)}/5`}
        />
      </div>

      {showBreakdown && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[11px] text-[#7c828a]">
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#0052ff] mr-1" />
            Service: <span className="number-display text-xs text-current font-medium">{Math.round(components.service)}/40</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#3375ff] mr-1" />
            Avail: <span className="number-display text-xs text-current font-medium">{Math.round(components.availability)}/25</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#6697ff] mr-1" />
            Area: <span className="number-display text-xs text-current font-medium">{Math.round(components.area)}/20</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#99baff] mr-1" />
            Rating: <span className="number-display text-xs text-current font-medium">{Math.round(components.rating)}/10</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#ccdcfc] mr-1" />
            Lang: <span className="number-display text-xs text-current font-medium">{Math.round(components.language)}/5</span>
          </div>
        </div>
      )}
    </div>
  );
};
