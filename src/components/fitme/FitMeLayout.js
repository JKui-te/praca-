"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/fitme/Icon";
import { FitMeProvider, useFitMe } from "@/components/fitme/FitMeProvider";

const navigation = [
  { label: "Dashboard", href: "/", icon: "dashboard" },
  { label: "Workouts", href: "/workouts", icon: "workouts" },
  { label: "Progress", href: "/progress", icon: "progress" },
];

function FitMeFrame({ children }) {
  const pathname = usePathname();
  const { unit, actions, storageError } = useFitMe();
  const currentPage = navigation.find(
    (item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark"><Icon name="brand" /></span>
          <span>FitMe</span>
        </Link>

        <p className="nav-label">Workspace</p>
        <nav aria-label="Main navigation" className="nav-list">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`nav-link${active ? " active" : ""}`}
                href={item.href}
                key={item.href}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <strong>Progress, not perfection.</strong>
            <p>Every session is a step toward a stronger you.</p>
            <span>Keep showing up &rarr;</span>
          </div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <Link className="mobile-brand" href="/">
            <span className="brand-mark"><Icon name="brand" /></span>
            FitMe
          </Link>
          <div aria-label={`Current page: ${currentPage?.label || "Workout session"}`} className="breadcrumb">
            FitMe <span aria-hidden="true">/</span>{" "}
            <strong>{currentPage?.label || "Workout session"}</strong>
          </div>
          <div className="topbar-right">
            <div aria-label="Weight unit" className="unit-toggle">
              {["kg", "lb"].map((option) => (
                <button
                  aria-pressed={unit === option}
                  className={unit === option ? "selected" : ""}
                  key={option}
                  onClick={() => actions.setUnit(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
            <div aria-label="FitMe profile" className="avatar">F</div>
          </div>
        </header>

        <main className="page-content">
          {storageError && (
            <div className="storage-notice" role="alert">
              {storageError} Your changes will remain available until you leave this page.
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export default function FitMeLayout({ children }) {
  return (
    <FitMeProvider>
      <FitMeFrame>{children}</FitMeFrame>
    </FitMeProvider>
  );
}
