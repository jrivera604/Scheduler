import React from "react";
import classNames from 'classnames';
import 'components/Appointment/styles.scss';

export default function Show(props) {
  const { student, interviewer, onEdit, onDelete } = props;

  const showClass = classNames('appointment__card', {
    'appointment__card--show': true,
  });

  return (
    <main className={showClass}>
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={onDelete}
          />
        </section>
      </section>
    </main>
  );
}