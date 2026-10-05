/**
 * Live Date & Time Counter since 6 April 2025
 * Dynamically calculated to the exact second.
 */

export function calculateTimeTogether(startDateStr = "2025-04-06T00:00:00") {
  const startDate = new Date(startDateStr);
  const now = new Date();

  // If current date is before start date, show time until, else time elapsed
  let diffMs = now - startDate;
  const isPast = diffMs >= 0;
  if (!isPast) diffMs = Math.abs(diffMs);

  // Exact calendar difference calculation
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    // Borrow days from previous month
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Ensure non-negative
  years = Math.max(0, years);
  months = Math.max(0, months);
  days = Math.max(0, days);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Total continuous units
  const totalDays = Math.floor(Math.abs(now - startDate) / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(Math.abs(now - startDate) / (1000 * 60 * 60));

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    isPast
  };
}
