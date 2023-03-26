import React, { useState, useEffect } from 'react';
import DayList from "./DayList"
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import InterviewerList from "components/InterviewerList";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all;
      setState(prev => ({
        ...prev,
        days: daysResponse.data,
        appointments: appointmentsResponse.data,
        interviewers: interviewersResponse.data
      }));
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day }));

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
      />
    );
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  }
  

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
          value={null}
          onChange={() => {}}
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" interviewers={interviewerList} bookInterview={bookInterview} />
      </section>
    </main>
 

  );
}
