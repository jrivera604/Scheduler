export function getAppointmentsForDay(state, day) {
  const appointments = state.days
    .filter(d => d.name === day)
    .map(d => d.appointments)
    .reduce((acc, val) => acc.concat(val), []);
  return appointments.map(id => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}
