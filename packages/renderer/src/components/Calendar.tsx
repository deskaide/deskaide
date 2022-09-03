import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ReactCalendar from 'react-calendar';
import { isSameDay } from 'date-fns';

import 'react-calendar/dist/Calendar.css';

const Wrapper = styled.div`
  .react-calendar {
    background: var(--color-bg-0);
    border: none;
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: ${({ theme }) => theme.lineHeights.body};

    abbr[title] {
      text-decoration: none;
    }

    .react-calendar__navigation {
      display: flex;
      margin-bottom: ${({ theme }) => theme.space[3]}px;
      height: auto;

      button {
        padding: ${({ theme }) => theme.space[2]}px;
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        font-size: ${({ theme }) => theme.fontSizes.h6};
        font-family: ${({ theme }) => theme.fonts.heading};
      }
    }

    .react-calendar__navigation,
    .react-calendar__month-view__days {
      button {
        color: var(--color-text-1);

        &:hover {
          background: var(--color-bg-1);
        }
      }
    }

    .react-calendar__month-view__days {
      button.react-calendar__month-view__days__day--neighboringMonth {
        color: var(--color-bg-2);
      }
      button.react-calendar__tile--active {
        color: var(--color-text-1);
      }
    }

    .react-calendar__tile {
      &:enabled {
        &:hover {
          background: var(--color-bg-2);
        }

        &:focus {
          background: var(--color-bg-0);
        }
      }
    }

    .react-calendar__tile--active,
    .react-calendar__navigation button {
      &:enabled {
        &:focus {
          background: var(--color-bg-2);

          &:hover {
            background: var(--color-bg-2);
          }
        }
      }
    }

    .react-calendar__tile {
      border-radius: 4px;
      color: var(--color-text-1);

      &:disabled {
        color: var(--color-bg-2);
        background: var(--color-bg-0);
        cursor: not-allowed;
      }
    }

    .react-calendar__tile,
    .react-calendar__navigation button {
      &:disabled {
        background: var(--color-bg-0);
        cursor: not-allowed;
      }
    }

    .react-calendar__tile--now {
      background: var(--color-bg-1);
    }

    .react-calendar__tile--active {
      background: var(--color-bg-2);
      color: var(--color-text-1);
    }

    .react-calendar__month-view__weekdays {
      text-transform: none;
      font-size: ${({ theme }) => theme.fontSizes.h6};
      font-family: ${({ theme }) => theme.fonts.heading};
    }
  }
`;

const dateAlreadyClicked = (dates: Date[], date: Date) =>
  dates.some((d) => isSameDay(date, d));

const datesExcept = (dates: Date[], date: Date) =>
  dates.filter((d) => !isSameDay(date, d));

type CalendarProps = {
  activeDates?: Date[];
  defaultSelectedDate?: Date;
};

export const Calendar: React.FC<CalendarProps> = ({
  activeDates = [],
  defaultSelectedDate = new Date(),
}) => {
  const [dates, setDates] = useState(activeDates);
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);

  const onClickDay = (date: Date) => {
    if (dateAlreadyClicked(dates, date)) {
      setDates(datesExcept(dates, date));
      setSelectedDate(defaultSelectedDate);
    } else {
      setDates([...dates, date]);
      setSelectedDate(date);
      console.log(selectedDate.toJSON());
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const classNames = ['react-calendar__tile'];

    if (dateAlreadyClicked(dates, date))
      return ['react-calendar__tile--active', ...classNames];
    return classNames;
  };

  return (
    <Wrapper>
      <ReactCalendar
        tileClassName={tileClassName}
        onClickDay={onClickDay}
        value={selectedDate}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
        }
        prev2Label={null}
        next2Label={null}
        maxDate={new Date()}
      />
    </Wrapper>
  );
};
