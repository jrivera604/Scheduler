import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    // Fetch data from the API endpoints
    Promise.all([
      fetch('/api/days'),
      fetch('/api/appointments'),
      fetch('/api/interviewers')
    ])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) =>
        Promise.all([
          daysResponse.json(), 
          appointmentsResponse.json(), 
          interviewersResponse.json()
        ])
      )
      .then(([daysData, appointmentsData, interviewersData]) => {
        // Update the state with the fetched data
        setState((prev) => ({
          ...prev,
          days: daysData,
          appointments: appointmentsData,
          interviewers: interviewersData
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots - 1
        };
      }
      return day;
    });

    return fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interview })
    })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }));
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots + 1
        };
      }
      return day;
    });

    // Send a DELETE request to the API to cancel the appointment
    return fetch(`/api/appointments/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Update the state with the updated appointments and days data
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
