export function getAppointmentsForDay(state, day) {
  const appointments = state.days
    .filter(d => d.name === day)
    .map(d => d.appointments)
    .reduce((acc, val) => acc.concat(val), []);
  return appointments.map(id => state.appointments[id]);
}
