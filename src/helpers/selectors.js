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

export function getInterviewersForDay(state, day) {
  const dayObject = state.days.find(d => d.name === day);

  if (!dayObject || !dayObject.interviewers) {
    return [];
  }

  const interviewers = dayObject.interviewers.map(interviewerId => state.interviewers[interviewerId]);

  return interviewers;
}
