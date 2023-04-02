const fixtures = {
  "/api/appointments": {
    "1": {
      id: 1,
      time: "12pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: 1
      }
    },
    "2": {
      id: 2,
      time: "1pm",
      interview: {
        student: "Archie Cohen",
        interviewer: 2
      }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: {
        student: "Leopold Silvers",
        interviewer: 3
      }
    },
    "4": {
      id: 4,
      time: "3pm",
      interview: {
        student: "Jace White",
        interviewer: 4
      }
    },
    "5": {
      id: 5,
      time: "4pm",
      interview: {
        student: "Chris Brown",
        interviewer: 5
      }
    }
  },
  "/api/interviewers": {
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      "id": 2,
      "name": "Tori Malcolm",
      "avatar": "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      "id": 3,
      "name": "Mildred Nazir",
      "avatar": "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      "id": 4,
      "name": "Cohana Roy",
      "avatar": "https://i.imgur.com/FK8V841.jpg"
    },
    "5": {
      "id": 5,
      "name": "Sven Jones",
      "avatar": "https://i.imgur.com/twYrpay.jpg"
    }
  }
};

export default {
  defaults: { baseURL: "" },
  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: [
          {
            id: 1,
            name: "Monday",
            appointments: [1, 2],
            interviewers: [1, 2],
            spots: 1
          },
          {
            id: 2,
            name: "Tuesday",
            appointments: [3, 4, 5],
            interviewers: [3, 4, 5],
            spots: 0
          }
        ]
      });
    }

    if (url === "/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures["/api/appointments"]
      });
    }

    if (url === "/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures["/api/interviewers"]
      });
    }
  }),

  put: jest.fn(url => {
    return Promise.resolve({
      status: 204,
      statusText: "No Content"
    });
  }),

  delete: jest.fn(url => {
    return Promise.resolve({
      status: 204,
      statusText: "No Content"
    });
  })
};


it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});