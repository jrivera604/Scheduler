import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  
  //transition modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //saves apointment inforamation
  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING);

      const interview = {
        student: name,
        interviewer,
      };

      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }
  }

  // removes booked appointment
  function remove() {
    if (mode === CONFIRM) {
      transition(DELETING, true);
      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    } else {
      transition(CONFIRM);
    }
  }

  // allows user to edit appointment
  function edit() {
    transition(EDIT);
  }

// render method in Appointment component
// render method in Appointment component
return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && (
      <Show
        student={props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer}
        onDelete={remove}
        onEdit={edit}
      />
    )}
    {mode === CREATE && (
      <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
    )}
    {mode === SAVING && <Status message="Saving" />}
    {mode === CONFIRM && (
      <Confirm
        message="Are you sure you would like to delete?"
        onCancel={back}
        onConfirm={remove}
      />
    )}
    {mode === DELETING && <Status message="Deleting" />}
    {mode === EDIT && (
      <Form
        name={props.name ? props.name : (props.interview && props.interview.student)}
        interviewer={props.interviewer ? props.interviewer : (props.interview && props.interview.interviewer.id)}
        onSave={save}
        interviewers={props.interviewers}
        onCancel={back}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error message="Can not Save appointment" onClose={back} />
    )}
    {mode === ERROR_DELETE && (
      <Error message="Can not delete appointment" onClose={back} />
    )}
  </article>
);


}