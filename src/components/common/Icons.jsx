import React from 'react';
import Svg, { Path, Line, Polyline, Circle, Rect, Polygon } from 'react-native-svg';

const icon = (Component) => ({ size = 20, color = 'currentColor', ...props }) => (
  <Component size={size} color={color} {...props} />
);

const SvgIcon = ({ size = 20, color = '#64748b', children }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    {children}
  </Svg>
);

export const Icons = {
  Pulse: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  ),
  Mail: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <Polyline points="22,6 12,13 2,6" />
    </SvgIcon>
  ),
  Lock: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgIcon>
  ),
  Eye: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx="12" cy="12" r="3" />
    </SvgIcon>
  ),
  EyeOff: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <Line x1="1" y1="1" x2="23" y2="23" />
    </SvgIcon>
  ),
  Plus: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </SvgIcon>
  ),
  Filter: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </SvgIcon>
  ),
  X: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </SvgIcon>
  ),
  Logout: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <Polyline points="16 17 21 12 16 7" />
      <Line x1="21" y1="12" x2="9" y2="12" />
    </SvgIcon>
  ),
  ArrowLeft: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Line x1="19" y1="12" x2="5" y2="12" />
      <Polyline points="12 19 5 12 12 5" />
    </SvgIcon>
  ),
  Edit: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </SvgIcon>
  ),
  Trash: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Polyline points="3 6 5 6 21 6" />
      <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </SvgIcon>
  ),
  Calendar: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <Line x1="16" y1="2" x2="16" y2="6" />
      <Line x1="8" y1="2" x2="8" y2="6" />
      <Line x1="3" y1="10" x2="21" y2="10" />
    </SvgIcon>
  ),
  Clock: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Circle cx="12" cy="12" r="10" />
      <Polyline points="12 6 12 12 16 14" />
    </SvgIcon>
  ),
  ChevronLeft: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Polyline points="15 18 9 12 15 6" />
    </SvgIcon>
  ),
  ChevronRight: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Polyline points="9 18 15 12 9 6" />
    </SvgIcon>
  ),
  AlertCircle: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Circle cx="12" cy="12" r="10" />
      <Line x1="12" y1="8" x2="12" y2="12" />
      <Line x1="12" y1="16" x2="12.01" y2="16" />
    </SvgIcon>
  ),
  Inbox: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <Path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </SvgIcon>
  ),
  Download: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <Polyline points="7 10 12 15 17 10" />
      <Line x1="12" y1="15" x2="12" y2="3" />
    </SvgIcon>
  ),
  Menu: ({ size, color }) => (
    <SvgIcon size={size} color={color}>
      <Line x1="3" y1="6" x2="21" y2="6" />
      <Line x1="3" y1="12" x2="21" y2="12" />
      <Line x1="3" y1="18" x2="21" y2="18" />
    </SvgIcon>
  ),
};

export default Icons;
