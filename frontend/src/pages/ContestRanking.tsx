import React, { useState } from 'react';

interface SubmissionDetail {
  time?: string;
  penalty: number;
  status: 'first_solve' | 'accepted' | 'failed' | 'unattempted';
}

interface Team {
  rank: number;
  name: string;
  affiliation: string;
  solved: number;
  totalAttempts: number;
  totalTime: string;
  submissions: Record<string, SubmissionDetail>;
}

// 23 Sample Teams (original 13 with adjusted times + 10 new teams)
const TEAMS_DATA: Team[] = [
  {
    rank: 1,
    name: 'mosaic14_2025',
    affiliation: 'CyberKnights',
    solved: 8,
    totalAttempts: 10,
    totalTime: '11:02:15',
    submissions: {
      A: { time: '0:15:22', penalty: 1, status: 'first_solve' },
      B: { time: '0:45:10', penalty: 2, status: 'accepted' },
      C: { time: '1:10:33', penalty: 1, status: 'accepted' },
      D: { time: '1:55:00', penalty: 3, status: 'accepted' },
      E: { time: '2:30:15', penalty: 1, status: 'accepted' },
      F: { time: '3:10:45', penalty: 4, status: 'accepted' },
      G: { time: '3:25:22', penalty: 2, status: 'accepted' },
      H: { time: '3:50:00', penalty: 5, status: 'accepted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 2,
    name: 'BinaryBeasts',
    affiliation: 'Tech Univ',
    solved: 7,
    totalAttempts: 10,
    totalTime: '10:25:15',
    submissions: {
      A: { time: '0:10:45', penalty: 0, status: 'accepted' },
      B: { time: '0:32:10', penalty: 1, status: 'first_solve' },
      C: { time: '1:05:50', penalty: 2, status: 'accepted' },
      D: { penalty: 3, status: 'failed' },
      E: { time: '2:15:30', penalty: 1, status: 'accepted' },
      F: { time: '3:05:40', penalty: 0, status: 'accepted' },
      G: { time: '3:35:10', penalty: 4, status: 'accepted' },
      H: { time: '3:45:22', penalty: 1, status: 'accepted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 3,
    name: 'CodeMasters',
    affiliation: 'Polytechnic',
    solved: 6,
    totalAttempts: 10,
    totalTime: '09:20:30',
    submissions: {
      A: { time: '0:20:15', penalty: 1, status: 'accepted' },
      B: { time: '0:55:40', penalty: 0, status: 'accepted' },
      C: { time: '1:20:10', penalty: 0, status: 'first_solve' },
      D: { time: '2:10:45', penalty: 2, status: 'accepted' },
      E: { penalty: 4, status: 'failed' },
      F: { time: '3:30:15', penalty: 1, status: 'accepted' },
      G: { time: '3:50:30', penalty: 3, status: 'accepted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 4,
    name: 'ByteBusters',
    affiliation: 'Alpha Tech',
    solved: 6,
    totalAttempts: 10,
    totalTime: '11:05:00',
    submissions: {
      A: { time: '0:25:30', penalty: 2, status: 'accepted' },
      B: { time: '1:02:15', penalty: 1, status: 'accepted' },
      C: { time: '1:45:00', penalty: 1, status: 'accepted' },
      D: { time: '2:25:40', penalty: 3, status: 'accepted' },
      E: { time: '3:20:10', penalty: 0, status: 'accepted' },
      F: { time: '3:52:50', penalty: 2, status: 'accepted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 5,
    name: 'RecursionRiders',
    affiliation: 'Beta University',
    solved: 5,
    totalAttempts: 10,
    totalTime: '08:45:40',
    submissions: {
      A: { time: '0:18:10', penalty: 0, status: 'accepted' },
      B: { time: '0:50:30', penalty: 1, status: 'accepted' },
      C: { time: '1:30:15', penalty: 0, status: 'accepted' },
      D: { time: '2:40:00', penalty: 2, status: 'accepted' },
      E: { time: '3:45:20', penalty: 1, status: 'accepted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 6,
    name: 'NullPointers',
    affiliation: 'Code Academy',
    solved: 5,
    totalAttempts: 10,
    totalTime: '09:47:35',
    submissions: {
      A: { time: '0:30:12', penalty: 1, status: 'accepted' },
      B: { time: '1:15:22', penalty: 3, status: 'accepted' },
      C: { time: '2:02:40', penalty: 0, status: 'accepted' },
      D: { time: '3:10:15', penalty: 2, status: 'accepted' },
      E: { time: '3:55:10', penalty: 1, status: 'accepted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 7,
    name: 'StackOverlords',
    affiliation: 'Gamma College',
    solved: 4,
    totalAttempts: 10,
    totalTime: '06:10:25',
    submissions: {
      A: { time: '0:22:45', penalty: 0, status: 'accepted' },
      B: { time: '0:58:30', penalty: 1, status: 'accepted' },
      C: { time: '1:50:10', penalty: 0, status: 'accepted' },
      D: { time: '3:05:20', penalty: 1, status: 'accepted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 8,
    name: 'BugHunters',
    affiliation: 'Delta Institute',
    solved: 4,
    totalAttempts: 10,
    totalTime: '07:45:12',
    submissions: {
      A: { time: '0:35:10', penalty: 2, status: 'accepted' },
      B: { time: '1:20:45', penalty: 0, status: 'accepted' },
      C: { time: '2:10:30', penalty: 1, status: 'accepted' },
      D: { time: '3:30:12', penalty: 3, status: 'accepted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 9,
    name: 'KernelPanic',
    affiliation: 'Linux Club',
    solved: 3,
    totalAttempts: 10,
    totalTime: '04:15:30',
    submissions: {
      A: { time: '0:28:15', penalty: 0, status: 'accepted' },
      B: { time: '1:12:45', penalty: 1, status: 'accepted' },
      C: { time: '2:30:20', penalty: 2, status: 'accepted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 10,
    name: 'RuntimeTerrors',
    affiliation: 'Web Devs',
    solved: 3,
    totalAttempts: 10,
    totalTime: '05:30:12',
    submissions: {
      A: { time: '0:40:22', penalty: 1, status: 'accepted' },
      B: { time: '1:45:30', penalty: 2, status: 'accepted' },
      C: { time: '3:05:00', penalty: 0, status: 'accepted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 11,
    name: 'BitShifted',
    affiliation: 'Hardware Guys',
    solved: 2,
    totalAttempts: 10,
    totalTime: '02:40:15',
    submissions: {
      A: { time: '0:50:10', penalty: 1, status: 'accepted' },
      B: { time: '1:50:05', penalty: 0, status: 'accepted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 12,
    name: 'DataDrifters',
    affiliation: 'Database Team',
    solved: 1,
    totalAttempts: 10,
    totalTime: '01:05:30',
    submissions: {
      A: { time: '1:05:30', penalty: 0, status: 'accepted' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 13,
    name: 'HelloWorlders',
    affiliation: 'Freshmen',
    solved: 1,
    totalAttempts: 10,
    totalTime: '01:45:00',
    submissions: {
      A: { time: '1:45:00', penalty: 2, status: 'accepted' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 14,
    name: 'AlgoAvengers',
    affiliation: 'HUST',
    solved: 1,
    totalAttempts: 10,
    totalTime: '02:15:00',
    submissions: {
      A: { time: '02:15:00', penalty: 0, status: 'accepted' },
      B: { penalty: 2, status: 'failed' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 15,
    name: 'CyberSleuths',
    affiliation: 'FPT University',
    solved: 1,
    totalAttempts: 10,
    totalTime: '02:30:15',
    submissions: {
      A: { penalty: 3, status: 'failed' },
      B: { time: '02:30:15', penalty: 0, status: 'accepted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 16,
    name: 'DevDynasty',
    affiliation: 'RMIT',
    solved: 1,
    totalAttempts: 10,
    totalTime: '02:40:00',
    submissions: {
      A: { penalty: 0, status: 'unattempted' },
      B: { time: '02:40:00', penalty: 0, status: 'accepted' },
      C: { penalty: 1, status: 'failed' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 17,
    name: 'LogicLords',
    affiliation: 'UIT',
    solved: 1,
    totalAttempts: 10,
    totalTime: '03:35:40',
    submissions: {
      A: { time: '03:15:40', penalty: 1, status: 'accepted' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 3, status: 'failed' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 18,
    name: 'PixelPioneers',
    affiliation: 'PTIT',
    solved: 0,
    totalAttempts: 10,
    totalTime: '00:00:00',
    submissions: {
      A: { penalty: 2, status: 'failed' },
      B: { penalty: 2, status: 'failed' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 19,
    name: 'QuantumCoders',
    affiliation: 'VNU-HCM',
    solved: 0,
    totalAttempts: 10,
    totalTime: '00:00:00',
    submissions: {
      A: { penalty: 2, status: 'failed' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 20,
    name: 'StackHackers',
    affiliation: 'FPT University',
    solved: 0,
    totalAttempts: 10,
    totalTime: '00:00:00',
    submissions: {
      A: { penalty: 0, status: 'unattempted' },
      B: { penalty: 3, status: 'failed' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 21,
    name: 'TeamNoSleep',
    affiliation: 'TDTU',
    solved: 0,
    totalAttempts: 10,
    totalTime: '00:00:00',
    submissions: {
      A: { penalty: 1, status: 'failed' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 22,
    name: 'WebWizards',
    affiliation: 'FPT University',
    solved: 0,
    totalAttempts: 10,
    totalTime: '00:00:00',
    submissions: {
      A: { penalty: 0, status: 'unattempted' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 1, status: 'failed' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  },
  {
    rank: 23,
    name: 'ZeroBug',
    affiliation: 'BKDN',
    solved: 0,
    totalAttempts: 10,
    totalTime: '00:00:00',
    submissions: {
      A: { penalty: 0, status: 'unattempted' },
      B: { penalty: 0, status: 'unattempted' },
      C: { penalty: 0, status: 'unattempted' },
      D: { penalty: 0, status: 'unattempted' },
      E: { penalty: 0, status: 'unattempted' },
      F: { penalty: 0, status: 'unattempted' },
      G: { penalty: 0, status: 'unattempted' },
      H: { penalty: 0, status: 'unattempted' },
      I: { penalty: 0, status: 'unattempted' },
      J: { penalty: 0, status: 'unattempted' }
    }
  }
];

// Helper to convert time "H:MM:SS" into minutes
const timeToMinutes = (timeStr?: string): number => {
  if (!timeStr) return 0;
  const parts = timeStr.split(':').map(Number);
  const hrs = parts[0] || 0;
  const mins = parts[1] || 0;
  const secs = parts[2] || 0;
  return hrs * 60 + mins + secs / 60;
};

// 10 Distinct Premium Colors for the Top 10 Teams
const TEAM_COLORS = [
  '#3b82f6', // Rank 1: Blue
  '#10b981', // Rank 2: Emerald Green
  '#f59e0b', // Rank 3: Amber Orange
  '#8b5cf6', // Rank 4: Purple
  '#ec4899', // Rank 5: Pink
  '#06b6d4', // Rank 6: Cyan
  '#ef4444', // Rank 7: Rose Red
  '#14b8a6', // Rank 8: Teal
  '#6366f1', // Rank 9: Indigo
  '#f97316'  // Rank 10: Orange
];

const W = 720; // width of inner chart
const H = 260; // height of inner chart
const paddingLeft = 45;
const paddingTop = 20;

// Convert minutes (0 to 240) and solves (0 to 10) to SVG viewbox coordinates
const getSvgCoords = (minutes: number, solves: number) => {
  const svgX = paddingLeft + (minutes / 240) * W;
  const svgY = (paddingTop + H) - (solves / 10) * H;
  return { x: svgX, y: svgY };
};

// Generate the Step-After SVG Path string for a team over 4 hours (240 mins)
const getStepPathString = (team: Team) => {
  const solves: { time: number; problem: string }[] = [];
  Object.keys(team.submissions).forEach((key) => {
    const sub = team.submissions[key];
    if (sub.status === 'accepted' || sub.status === 'first_solve') {
      solves.push({
        time: timeToMinutes(sub.time),
        problem: key
      });
    }
  });
  solves.sort((a, b) => a.time - b.time);

  const start = getSvgCoords(0, 0);
  if (solves.length === 0) {
    const end = getSvgCoords(240, 0);
    return {
      pathStr: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
      solves: []
    };
  }

  let pathStr = `M ${start.x} ${start.y}`;
  solves.forEach((solve, index) => {
    const p1 = getSvgCoords(solve.time, index);
    const p2 = getSvgCoords(solve.time, index + 1);
    pathStr += ` L ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  });

  const end = getSvgCoords(240, solves.length);
  pathStr += ` L ${end.x} ${end.y}`;
  return { pathStr, solves };
};

// Convert minutes back to "Hh Mm" format for formatting tooltips
const formatMinutes = (m: number): string => {
  const hrs = Math.floor(m / 60);
  const mins = Math.floor(m % 60);
  return `${hrs}h ${mins}m`;
};

export const ContestRanking: React.FC = () => {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    teamName: string;
    solvedCount: number;
    timeStr: string;
    problem: string;
  } | null>(null);

  const [visibleTeams, setVisibleTeams] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TEAMS_DATA.slice(0, 10).forEach((t) => {
      initial[t.name] = true;
    });
    return initial;
  });


  // Scoreboard individual submission cell styling mapper
  const renderSubmissionCell = (sub: SubmissionDetail, key: string) => {
    if (!sub || sub.status === 'unattempted') {
      return <td key={key} className="p-1 text-center border border-white text-xs bg-gray-50/50"></td>;
    }

    if (sub.status === 'failed') {
      return (
        <td key={key} className="p-1 text-center border border-white text-xs bg-primary text-white font-medium">
          --
          <br />
          <span className="text-[10px] font-normal text-white/80">(-{sub.penalty})</span>
        </td>
      );
    }

    const penaltyStr = sub.penalty > 0 ? `(-${sub.penalty})` : '';

    if (sub.status === 'first_solve') {
      return (
        <td key={key} className="p-1 text-center border border-white text-xs bg-brand-blue text-white font-medium">
          {sub.time}
          <br />
          <span className="text-[10px] font-normal text-white/80">{penaltyStr}</span>
        </td>
      );
    }

    // Accepted
    return (
      <td key={key} className="p-1 text-center border border-white text-xs bg-brand-green text-white font-medium">
        {sub.time}
        <br />
        <span className="text-[10px] font-normal text-white/80">{penaltyStr}</span>
      </td>
    );
  };

  return (
    <>
      <main className="w-full px-4 sm:px-8 py-8 md:py-12 bg-surface-gray flex-grow min-w-0">
        <div className="w-full flex flex-col gap-4">
          
          {/* Top Section: Interactive Custom SVG Chart & Legends */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-gray-150">
              <div>
                <h2 className="font-headline text-headline-md text-text-main relative z-10 flex items-center gap-2 font-bold text-xl">
                  <span className="material-symbols-outlined text-primary">monitoring</span> Top 10 Teams Progress
                </h2>
                <p className="text-body-sm text-text-muted mt-1">Real-time stepwise progression of problems solved over 4 hours.</p>
              </div>
              <div className="text-xs text-text-muted mt-2 md:mt-0 italic flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block animate-ping"></span> Live scoreboard feed
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch mt-2">
              
              {/* Interactive Vector Step Chart (Col-span 3) */}
              <div className="lg:col-span-3 bg-white rounded-lg border border-gray-150 p-4 relative flex items-center justify-center">
                <svg className="w-full h-auto max-w-[1100px]" viewBox="0 0 800 310" width="100%">
                  {/* Vertical Hour Grid Lines */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const minutes = i * 60;
                    const coordsStart = getSvgCoords(minutes, 0);
                    const coordsEnd = getSvgCoords(minutes, 10);
                    return (
                      <g key={i}>
                        <line
                          x1={coordsStart.x}
                          y1={coordsStart.y}
                          x2={coordsEnd.x}
                          y2={coordsEnd.y}
                          stroke="#e2e8f0"
                          strokeWidth={1}
                          strokeDasharray="4 4"
                        />
                        <text
                          x={coordsStart.x}
                          y={coordsStart.y + 16}
                          textAnchor="middle"
                          className="font-mono text-[10px] fill-text-muted"
                        >
                          {i}h
                        </text>
                      </g>
                    );
                  })}

                  {/* Horizontal Solved Count Grid Lines */}
                  {[0, 2, 4, 6, 8, 10].map((solved) => {
                    const coordsStart = getSvgCoords(0, solved);
                    const coordsEnd = getSvgCoords(240, solved);
                    return (
                      <g key={solved}>
                        <line
                          x1={coordsStart.x}
                          y1={coordsStart.y}
                          x2={coordsEnd.x}
                          y2={coordsEnd.y}
                          stroke="#e2e8f0"
                          strokeWidth={1}
                        />
                        <text
                          x={coordsStart.x - 8}
                          y={coordsStart.y + 4}
                          textAnchor="end"
                          className="font-mono text-[10px] fill-text-muted"
                        >
                          {solved}
                        </text>
                      </g>
                    );
                  })}

                  {/* Draw team stepwise progression lines */}
                  {TEAMS_DATA.slice(0, 10).map((team, idx) => {
                    if (!visibleTeams[team.name]) return null;
                    const color = TEAM_COLORS[idx];
                    const isHovered = hoveredTeam === team.name;
                    const { pathStr, solves } = getStepPathString(team);

                    return (
                      <g key={team.name}>
                        {/* Smooth vector stroke */}
                        <path
                          d={pathStr}
                          fill="none"
                          stroke={color}
                          strokeWidth={isHovered ? 3.5 : 1.5}
                          strokeOpacity={hoveredTeam === null ? 0.6 : isHovered ? 1.0 : 0.15}
                          className="transition-all duration-300"
                        />

                        {/* Interactive solve dot circles */}
                        {solves.map((solve, sIdx) => {
                          const coords = getSvgCoords(solve.time, sIdx + 1);
                          return (
                            <circle
                              key={sIdx}
                              cx={coords.x}
                              cy={coords.y}
                              r={isHovered ? 5.5 : 3.5}
                              fill={color}
                              stroke="#ffffff"
                              strokeWidth={1.5}
                              opacity={hoveredTeam === null ? 0.9 : isHovered ? 1.0 : 0.15}
                              className="cursor-pointer transition-all duration-300"
                              onMouseEnter={() => {
                                setHoveredTeam(team.name);
                                setActiveTooltip({
                                  x: coords.x,
                                  y: coords.y,
                                  teamName: team.name,
                                  solvedCount: sIdx + 1,
                                  timeStr: formatMinutes(solve.time),
                                  problem: solve.problem
                                });
                              }}
                              onMouseLeave={() => {
                                setHoveredTeam(null);
                                setActiveTooltip(null);
                              }}
                            />
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* HTML-styled SVG Tooltip Overlay */}
                  {activeTooltip && (
                    <foreignObject
                      x={activeTooltip.x - 100}
                      y={activeTooltip.y - 75}
                      width={200}
                      height={65}
                      pointerEvents="none"
                    >
                      <div className="bg-slate-800 text-white px-2.5 py-1.5 rounded-lg shadow-md border border-slate-700 text-xs font-semibold flex flex-col gap-0.5">
                        <span className="font-bold text-[11px] truncate" style={{ color: TEAM_COLORS[TEAMS_DATA.slice(0, 10).findIndex(t => t.name === activeTooltip.teamName)] || '#3b82f6' }}>
                          {activeTooltip.teamName}
                        </span>
                        <div className="flex justify-between items-center text-[10px] text-slate-300 mt-0.5">
                          <span>Solved: <strong className="text-white text-xs">{activeTooltip.solvedCount}</strong></span>
                          <span>Problem: <strong className="text-white">{activeTooltip.problem}</strong></span>
                        </div>
                        <span className="text-[9px] text-slate-400">At time: {activeTooltip.timeStr}</span>
                      </div>
                    </foreignObject>
                  )}
                </svg>
              </div>

              {/* Side Interactive Legends (Col-span 1) */}
              <div className="lg:col-span-1 border border-gray-150 rounded-lg p-4 flex flex-col gap-3 h-[382px] bg-slate-50/50">
                <div className="flex flex-col gap-1.5 pb-2 border-b border-gray-200 shrink-0">
                  <h4 className="font-label text-xs text-text-muted uppercase tracking-wider font-bold">Chart Visibility</h4>
                  <div className="flex gap-1.5 text-[10px] font-bold mt-1">
                    <button
                      onClick={() => {
                        const next: Record<string, boolean> = {};
                        TEAMS_DATA.slice(0, 10).forEach(t => next[t.name] = true);
                        setVisibleTeams(next);
                      }}
                      className="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-text-main transition-colors font-medium text-[10px]"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        const next: Record<string, boolean> = {};
                        TEAMS_DATA.slice(0, 10).forEach((t, i) => next[t.name] = i < 3);
                        setVisibleTeams(next);
                      }}
                      className="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-text-main transition-colors font-medium text-[10px]"
                    >
                      Top 3
                    </button>
                    <button
                      onClick={() => {
                        const next: Record<string, boolean> = {};
                        TEAMS_DATA.slice(0, 10).forEach(t => next[t.name] = false);
                        setVisibleTeams(next);
                      }}
                      className="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-text-main transition-colors font-medium text-[10px]"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden flex-grow">
                  {TEAMS_DATA.slice(0, 10).map((team, idx) => {
                    const color = TEAM_COLORS[idx];
                    const isHovered = hoveredTeam === team.name;
                    const isVisible = visibleTeams[team.name];

                    return (
                      <div
                        key={team.name}
                        onMouseEnter={() => isVisible && setHoveredTeam(team.name)}
                        onMouseLeave={() => setHoveredTeam(null)}
                        onClick={() => {
                          setVisibleTeams(prev => ({
                            ...prev,
                            [team.name]: !prev[team.name]
                          }));
                        }}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                          isHovered && isVisible ? 'bg-white shadow-sm border border-gray-200 translate-x-1 scale-[1.02]' : 'border border-transparent hover:bg-gray-100/70'
                        } ${!isVisible ? 'opacity-50 hover:opacity-80' : ''}`}
                      >
                        {/* Checkbox indicator */}
                        {isVisible ? (
                          <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded shrink-0 bg-white" />
                        )}

                        <span className="w-3 h-3 rounded-full shrink-0 border border-white shadow-sm" style={{ backgroundColor: color }} />
                        <div className="flex-grow min-w-0">
                          <p className="text-xs font-semibold text-text-main truncate leading-none">{team.name}</p>
                          <span className="text-[10px] text-text-muted leading-none">{team.affiliation}</span>
                        </div>
                        <span className="text-[11px] font-bold text-primary shrink-0 bg-primary-light/50 px-2 py-0.5 rounded-full">
                          {team.solved} AC
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>

          {/* Bottom Section: Detailed Scoreboard */}
          <section className="bg-white rounded-xl shadow-[0_4px_20px_rgba(18,40,76,0.05)] border border-gray-200 overflow-hidden flex flex-col w-full">
          <div className="p-4 border-b border-gray-200 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-headline text-headline-md text-text-main font-bold text-lg">Detailed Scoreboard</h3>
              <p className="text-xs text-text-muted mt-1">Complete standings of all 23 teams for problems A-J.</p>
            </div>
            <div className="flex items-center gap-4 text-sm flex-wrap bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-brand-blue block"></span> 
                <span className="text-text-muted text-[11px] font-medium">First Solve</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-brand-green block"></span> 
                <span className="text-text-muted text-[11px] font-medium">Accepted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-primary block"></span> 
                <span className="text-text-muted text-[11px] font-medium">Wrong/Failed</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-max text-left border-collapse min-w-[1200px] w-full">
              <thead>
                <tr className="bg-surface-gray text-text-main font-label text-xs border-b-2 border-gray-200 uppercase tracking-wider text-center">
                  <th className="p-4 font-bold w-12 text-center sticky left-0 bg-surface-gray z-25 shadow-[1px_0_0_#e2e8f0]">#</th>
                  <th className="p-4 font-bold sticky left-[48px] bg-surface-gray z-25 min-w-[250px] w-[250px] max-w-[250px] text-left shadow-[1px_0_0_#e2e8f0]">User</th>
                  <th className="p-2 font-bold w-20 whitespace-nowrap">AC / Total</th>
                  <th className="p-2 font-bold w-28 border-r border-gray-200">Total Time</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem A">A</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem B">B</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem C">C</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem D">D</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem E">E</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem F">F</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem G">G</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem H">H</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem I">I</th>
                  <th className="p-3 font-semibold w-[80px]" title="Problem J">J</th>
                </tr>
              </thead>
              <tbody className="text-sm font-body text-text-main divide-y divide-gray-200">
                {TEAMS_DATA.map((team) => (
                  <tr key={team.name} className="hover:bg-surface-gray transition-colors group">
                    <td className="p-4 text-center font-black text-primary sticky left-0 bg-white group-hover:bg-surface-gray z-10 shadow-[1px_0_0_#e2e8f0]">
                      {team.rank}
                    </td>
                    <td className="p-4 sticky left-[48px] bg-white group-hover:bg-surface-gray z-10 shadow-[1px_0_0_#e2e8f0]">
                      <div className="flex flex-col">
                        <span className="font-semibold text-text-main">{team.name}</span>
                        <span className="text-xs text-text-muted">{team.affiliation}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-bold whitespace-nowrap">
                      {team.solved} / {team.totalAttempts}
                    </td>
                    <td className="p-4 text-center text-text-muted font-mono border-r border-gray-200">
                      {team.totalTime}
                    </td>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((key) =>
                      renderSubmissionCell(team.submissions[key], key)
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </>
  );
};
