import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Home-CSS/InterviewCalendar.css';

const InterviewCalendar = ({ interviews }) => {
  const tileClassName = ({ date }) => {
    const hasInterview = interviews?.some(interview => {
      const interviewDate = new Date(interview.interviewDate);
      return (
        interviewDate.getDate() === date.getDate() &&
        interviewDate.getMonth() === date.getMonth() &&
        interviewDate.getFullYear() === date.getFullYear()
      );
    });

    return hasInterview ? 'interview-scheduled' : '';
  };

  const tileContent = ({ date }) => {
    const interviewsOnDate = interviews?.filter(interview => {
      const interviewDate = new Date(interview.interviewDate);
      return (
        interviewDate.getDate() === date.getDate() &&
        interviewDate.getMonth() === date.getMonth() &&
        interviewDate.getFullYear() === date.getFullYear()
      );
    });

    return interviewsOnDate?.length > 0 ? (
      <div className="interview-dot">
        <span className="interview-count">{interviewsOnDate.length}</span>
      </div>
    ) : null;
  };

  return (
    <div className="calendar-container">
      <Calendar 
        tileClassName={tileClassName}
        tileContent={tileContent}
        className="interview-calendar"
      />
    </div>
  );
};

export default InterviewCalendar;