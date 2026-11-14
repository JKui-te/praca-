"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fitme-data-v1";
const FitMeContext = createContext(null);
const initialData = { workouts: [], weights: [], unit: "kg" };

function isValidData(value) {
  return (
    value &&
    Array.isArray(value.workouts) &&
    value.workouts.every(
      (workout) =>
        workout &&
        typeof workout.id === "string" &&
        typeof workout.title === "string" &&
        Array.isArray(workout.exercises),
    ) &&
    Array.isArray(value.weights) &&
    value.weights.every(
      (entry) =>
        entry &&
        Number.isFinite(entry.kg) &&
        typeof entry.date === "string",
    ) &&
    (value.unit === "kg" || value.unit === "lb")
  );
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function newExercise(name) {
  return {
    id: createId(),
    name,
    sets: [{ reps: 8, weight: "" }],
  };
}

function readStoredData() {
  if (typeof window === "undefined") {
    return { data: initialData, storageError: "" };
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return { data: initialData, storageError: "" };
    }

    const parsed = JSON.parse(saved);
    if (!isValidData(parsed)) {
      throw new Error("Saved FitMe data has an invalid format.");
    }

    return { data: parsed, storageError: "" };
  } catch (error) {
    return {
      data: initialData,
      storageError:
        error instanceof Error
          ? `FitMe could not load saved data: ${error.message}`
          : "FitMe could not load saved data.",
    };
  }
}

export function FitMeProvider({ children }) {
  const initialState = useMemo(() => readStoredData(), []);
  const [data, setData] = useState(initialState.data);
  const [storageError] = useState(initialState.storageError);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage save failures; the app can continue to operate without persisting.
    }
  }, [data]);

  const actions = useMemo(
    () => ({
      setUnit(unit) {
        setData((current) => ({ ...current, unit }));
      },
      startWorkout(title, exerciseNames = []) {
        const workout = {
          id: createId(),
          title,
          status: "active",
          startedAt: new Date().toISOString(),
          completedAt: null,
          exercises: exerciseNames.map(newExercise),
        };
        setData((current) => ({
          ...current,
          workouts: [workout, ...current.workouts],
        }));
        return workout.id;
      },
      addExercise(workoutId, name) {
        setData((current) => ({
          ...current,
          workouts: current.workouts.map((workout) =>
            workout.id === workoutId
              ? { ...workout, exercises: [...workout.exercises, newExercise(name)] }
              : workout,
          ),
        }));
      },
      addSet(workoutId, exerciseId) {
        setData((current) => ({
          ...current,
          workouts: current.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: workout.exercises.map((exercise) =>
                    exercise.id === exerciseId
                      ? { ...exercise, sets: [...exercise.sets, { reps: 8, weight: "" }] }
                      : exercise,
                  ),
                }
              : workout,
          ),
        }));
      },
      updateSet(workoutId, exerciseId, setIndex, field, value) {
        setData((current) => ({
          ...current,
          workouts: current.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: workout.exercises.map((exercise) =>
                    exercise.id === exerciseId
                      ? {
                          ...exercise,
                          sets: exercise.sets.map((set, index) =>
                            index === setIndex ? { ...set, [field]: value } : set,
                          ),
                        }
                      : exercise,
                  ),
                }
              : workout,
          ),
        }));
      },
      finishWorkout(workoutId) {
        setData((current) => ({
          ...current,
          workouts: current.workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  status: "completed",
                  completedAt: new Date().toISOString(),
                }
              : workout,
          ),
        }));
      },
      logWeight(amount, date) {
        const numericAmount = Number(amount);
        const kg = data.unit === "lb" ? numericAmount / 2.20462 : numericAmount;
        const entry = { id: createId(), kg, date };
        setData((current) => ({
          ...current,
          weights: [...current.weights, entry].sort((a, b) =>
            a.date.localeCompare(b.date),
          ),
        }));
      },
    }),
    [data.unit],
  );

  const value = useMemo(
    () => ({ ...data, ready: true, storageError, actions }),
    [data, storageError, actions],
  );

  return <FitMeContext.Provider value={value}>{children}</FitMeContext.Provider>;
}

export function useFitMe() {
  const context = useContext(FitMeContext);
  if (!context) {
    throw new Error("useFitMe must be used inside FitMeProvider.");
  }
  return context;
}

export function displayWeight(kg, unit) {
  const amount = unit === "lb" ? kg * 2.20462 : kg;
  return `${amount.toFixed(1)} ${unit}`;
}
