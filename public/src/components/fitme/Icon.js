const iconContent = {
  brand: (
    <>
      <path d="M4 13.5 8.5 9l3 3L20 4" />
      <path d="M14 4h6v6" />
      <path d="M4 19h16" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </>
  ),
  workouts: (
    <>
      <path d="M6.5 7v10M17.5 7v10M3 10v4M21 10v4M6.5 12h11" />
      <path d="M8.5 5v14M15.5 5v14" />
    </>
  ),
  progress: (
    <>
      <path d="M4 19V5M4 19h17" />
      <path d="m7 15 4-4 3 2 6-7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  flame: (
    <>
      <path d="M12 22c4.4 0 7-3 7-7.1 0-3.1-1.6-5.3-4.1-7.9-.2 2-1 3.2-2.1 3.9C12.8 7.1 11.6 4.7 9 2c.2 3.5-.6 5.2-2.4 7.4C5.1 11.3 5 13 5 15c0 4.1 2.6 7 7 7Z" />
      <path d="M12 22c-1.7 0-2.8-1.2-2.8-2.8 0-1.2.7-2.1 1.8-3.4.2 1 .7 1.5 1.2 1.8.1-1.2.6-2 1.4-2.8.6 1.1 1.2 2.2 1.2 4.3 0 1.7-1.1 2.9-2.8 2.9Z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  weight: (
    <>
      <path d="M6 7h12l2 14H4L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
      <path d="M12 11v4m-2-2h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
};

export default function Icon({ name, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {iconContent[name] || iconContent.dashboard}
    </svg>
  );
}
