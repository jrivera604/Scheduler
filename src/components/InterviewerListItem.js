import React from 'react';
import classNames from 'classnames/bind';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const handleClick = () => {
    if (setInterviewer) {
      setInterviewer(id); // Call the setInterviewer function and pass the id as a parameter
    }
  };

  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  return (
    <li className={interviewerClass} onClick={handleClick} data-testid="interviewer">
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
