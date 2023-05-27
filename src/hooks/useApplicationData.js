import { useState, useEffect } from "react";
import axios from 'axios';

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
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(([daysData, appointmentsData, interviewersData]) => {
        // Update the state with the fetched data
        setState((prev) => ({
          ...prev,
          days: daysData.data,
          appointments: appointmentsData.data,
          interviewers: interviewersData.data
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview, isNewAppointment) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const updatedDays = updateDays(state.days, state.day, isNewAppointment ? -1 : 0);
    setState((prev) => ({
      ...prev,
      appointments,
      days: updatedDays
    }));
  
    const request = isNewAppointment
      ? axios.post(`/api/appointments`, { interview })
      : axios.put(`/api/appointments/${id}`, { interview });
  
    return request
      .then(() => {
        // Fetch the updated days data from the server
        return axios.get('/api/days');
      })
      .then((daysData) => {
        // Update the days data with the fetched data
        setState((prev) => ({
          ...prev,
          days: daysData.data
        }));
      })
      .catch((error) => {
        console.log(error);
        // Revert the state changes if the request fails
        setState((prev) => ({
          ...prev,
          appointments,
          days: state.days
        }));
        throw error;
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

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const updatedDays = updateDays(state.days, state.day, 1);
        setState((prev) => ({
          ...prev,
          appointments,
          days: updatedDays
        }));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  // Utility function to update the spots for a specific day
  function updateDays(days, selectedDay, change) {
    return days.map((day) => {
      if (day.name === selectedDay) {
        return {
          ...day,
          spots: day.spots + change
        };
      }
      return day;
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
