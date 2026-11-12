"use client";

import Link from "next/link";
import { useMemo } from "react";
import Icon from "@/components/fitme/Icon";
import { displayWeight, useFitMe } from "@/components/fitme/FitMeProvider";
import WeightLogForm from "@/components/fitme/WeightLogForm";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function dateKey(date) {
  const value = new Date(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const { workouts, weights, unit } = useFitMe();
  const week = useMemo(() => {
    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

    return weekDays.map((label, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      const key = dateKey(date);
      const count = workouts.filter(
        (workout) => workout.status === "completed" && dateKey(workout.startedAt) === key,
      ).length;
      return { label, count, today: key === dateKey(now) };
    });
  }, [workouts]);

  const completedThisWeek = week.reduce((total, day) => total + day.count, 0);
  const latestWeight = weights.at(-1);
  const recentActivity = [
    ...workouts.map((workout) => ({
      id: workout.id,
      title: workout.title,
      detail: workout.status === "completed" ? "Workout completed" : "Workout in progress",
      date: workout.completedAt || workout.startedAt,
      value: workout.status === "completed" ? "Done" : "Active",
      icon: "workouts",
    })),
    ...weights.map((entry) => ({
      id: entry.id,
      title: "Weight check-in",
      detail: formatDate(entry.date),
      date: entry.date,
      value: displayWeight(entry.kg, unit),
      icon: "weight",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">Your training, your pace</p>
        <h1>Your dashboard</h1>
        <p>A little progress each day adds up to big results.</p>
      </div>

      <section aria-labelledby="welcome-title" className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Make today count</p>
          <h2 id="welcome-title">Show up for yourself. The rest will follow.</h2>
          <p>Build a routine that feels good, one workout at a time.</p>
          <Link className="button-primary" href="/workouts">
            Explore workouts <Icon name="arrow" />
          </Link>
        </div>
        <div aria-hidden="true" className="hero-art">
          <span className="hero-ring" />
          <span className="hero-ring" />
          <span className="hero-ring" />
          <span className="hero-orb" />
        </div>
      </section>

      <section aria-label="Your fitness summary" className="stats-grid">
        <article className="stat-card">
          <div className="stat-top">
            <span>Workouts this week</span>
            <span className="stat-icon"><Icon name="workouts" /></span>
          </div>
          <strong className="stat-value">{completedThisWeek}</strong>
          <span className="stat-caption">Keep building your rhythm</span>
        </article>
        <article className="stat-card">
          <div className="stat-top">
            <span>Total sessions</span>
            <span className="stat-icon"><Icon name="calendar" /></span>
          </div>
          <strong className="stat-value">{workouts.filter((item) => item.status === "completed").length}</strong>
          <span className="stat-caption">Completed workouts</span>
        </article>
        <article className="stat-card">
          <div className="stat-top">
            <span>Latest weigh-in</span>
            <span className="stat-icon"><Icon name="weight" /></span>
          </div>
          <strong className="stat-value">{latestWeight ? displayWeight(latestWeight.kg, unit) : "--"}</strong>
          <span className="stat-caption">{latestWeight ? formatDate(latestWeight.date) : "Log your first check-in"}</span>
        </article>
        <article className="stat-card">
          <div className="stat-top">
            <span>Keep it going</span>
            <span className="stat-icon"><Icon name="flame" /></span>
          </div>
          <strong className="stat-value">{completedThisWeek ? `${completedThisWeek} day${completedThisWeek === 1 ? "" : "s"}` : "Start today"}</strong>
          <span className="stat-caption">Consistency beats intensity</span>
        </article>
      </section>

      <div className="dashboard-grid">
        <section aria-labelledby="activity-title" className="panel">
          <div className="panel-heading">
            <div>
              <h2 id="activity-title">Weekly activity</h2>
              <p>Your completed sessions, day by day</p>
            </div>
            <span className="text-link">This week</span>
          </div>
          <div aria-label={`${completedThisWeek} completed workouts this week`} className="week-chart">
            {week.map((day) => (
              <div className={`chart-day${day.today ? " today" : ""}`} key={day.label}>
                <div className="chart-track">
                  <span
                    className="chart-bar"
                    style={{ height: `${day.count ? Math.min(100, 25 + day.count * 35) : 4}%` }}
                  />
                </div>
                <span>{day.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="quick-weight-title" className="panel">
          <div className="panel-heading">
            <div>
              <h2 id="quick-weight-title">Weight check-in</h2>
              <p>Track your progress over time</p>
            </div>
            <span className="stat-icon"><Icon name="weight" /></span>
          </div>
          <WeightLogForm />
          <p className="stat-caption">Your entries are saved on this device.</p>
        </section>
      </div>

      <section aria-labelledby="recent-title" className="panel" style={{ marginTop: 16 }}>
        <div className="panel-heading">
          <div>
            <h2 id="recent-title">Recent activity</h2>
            <p>Your latest workouts and check-ins</p>
          </div>
          <Link className="text-link" href="/progress">View progress</Link>
        </div>
        {recentActivity.length ? (
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div className="activity-item" key={`${item.icon}-${item.id}`}>
                <span className="activity-mark"><Icon name={item.icon} /></span>
                <span className="activity-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail} · {formatDate(item.date)}</span>
                </span>
                <span className="activity-value">{item.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span><strong>Your story starts here.</strong>Start a workout or log a weigh-in to see it appear.</span>
          </div>
        )}
      </section>
    </>
  );
}
