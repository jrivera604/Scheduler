import React from 'react';
import DayList from "./DayList"
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import useApplicationData from "hooks/useApplicationData";
import { getInterview, getInterviewersForDay, getAppointmentsForDay } from "helpers/selectors";
import InterviewerList from "./InterviewerList";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const interviewerList = getInterviewersForDay(state, state.day).map((interviewer) => {
    return {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    };
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        <InterviewerList
          interviewers={interviewerList}
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" interviewers={interviewerList} bookInterview={bookInterview} />
      </section>
    </main>
  );
}
