import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, setDay, onChange } = props;

  const handleDayChange = (name) => {
    if (setDay) {
      setDay(name);
    }
    if (onChange) {
      onChange(name);
    }
  };

  const dayListItems = days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={dayItem.name === value}
      setDay={setDay}
      customOnChange={handleDayChange}
    />
  ));

  return <ul>{dayListItems}</ul>;
}








