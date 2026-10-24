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
      <div className="flex items-center justify-between text-xs font-semibold text-[#141414]">
        <span>Match Score</span>
        <span className="font-bold text-sm">{Math.round(total)}/100</span>
      </div>

      {/* Proportional 5-segment bar */}
      <div
        className="w-full h-3 bg-[#f0f0f0] rounded-full overflow-hidden flex"
        role="progressbar"
        aria-valuenow={Math.round(total)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Match score ${Math.round(total)} of 100`}
      >
        <div
          style={{ width: `${components.service}%` }}
          className="bg-[#141414] h-full"
          title={`Service fit: ${Math.round(components.service)}/40`}
        />
        <div
          style={{ width: `${components.availability}%` }}
          className="bg-[#404040] h-full"
          title={`Availability: ${Math.round(components.availability)}/25`}
        />
        <div
          style={{ width: `${components.area}%` }}
          className="bg-[#707070] h-full"
          title={`Area proximity: ${Math.round(components.area)}/20`}
        />
        <div
          style={{ width: `${components.rating}%` }}
          className="bg-[#a3a3a3] h-full"
          title={`Rating: ${Math.round(components.rating)}/10`}
        />
        <div
          style={{ width: `${components.language}%` }}
          className="bg-[#d4d4d4] h-full"
          title={`Language: ${Math.round(components.language)}/5`}
        />
      </div>

      {showBreakdown && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-[11px] text-[#707070]">
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#141414] mr-1" />
            Service: <span className="font-medium text-[#141414]">{Math.round(components.service)}/40</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#404040] mr-1" />
            Avail: <span className="font-medium text-[#141414]">{Math.round(components.availability)}/25</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#707070] mr-1" />
            Area: <span className="font-medium text-[#141414]">{Math.round(components.area)}/20</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#a3a3a3] mr-1" />
            Rating: <span className="font-medium text-[#141414]">{Math.round(components.rating)}/10</span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#d4d4d4] mr-1" />
            Lang: <span className="font-medium text-[#141414]">{Math.round(components.language)}/5</span>
          </div>
        </div>
      )}
    </div>
  );
};
