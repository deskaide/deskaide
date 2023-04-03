import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactCalendar from 'react-calendar';
import { isSameDay } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import type { TileClassNameFunc } from 'react-calendar/dist/cjs/shared/types';

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
        color: var(--color-text-2);

        &:disabled {
          color: var(--color-bg-2);
        }
      }
      button.react-calendar__tile--active {
        color: var(--color-text-1);
        font-weight: bold;
      }
    }

    .react-calendar__tile {
      &:enabled {
        &:hover {
          background: var(--color-bg-2);
          border-color: var(--color-text-1);
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
          border-color: var(--color-text-1);

          &:hover {
            background: var(--color-bg-2);
          }
        }
      }
    }

    .react-calendar__tile {
      border-radius: 4px;
      color: var(--color-text-1);
      border: 2px solid var(--color-bg-0);

      &:disabled {
        color: var(--color-bg-2);
        background: var(--color-bg-0);
        cursor: not-allowed;
      }
    }

    .react-calendar__tile--active_selected {
      border-color: var(--color-text-1);
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

    .react-calendar__tile--hasActive {
      background: none;
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

type CalendarProps = {
  activeDates?: Date[];
  defaultSelectedDate?: Date;
  onClickDay?: (date: Date) => void;
  onClickMonth?: (date: Date) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
  activeDates = [],
  defaultSelectedDate = new Date(),
  onClickDay,
  onClickMonth,
}) => {
  const [dates, setDates] = useState(activeDates);
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);

  const handleClickDay = (date: Date) => {
    setSelectedDate(date);

    if (onClickDay) {
      onClickDay(date);
    }
  };

  useEffect(() => {
    let ignoreSetActive = false;
    if (!ignoreSetActive) {
      setDates(activeDates);
    }

    return () => {
      ignoreSetActive = true;
    };
  }, [activeDates]);

  useEffect(() => {
    let ignoreSetDefaultDate = false;
    if (!ignoreSetDefaultDate) {
      setSelectedDate(defaultSelectedDate);
    }

    return () => {
      ignoreSetDefaultDate = true;
    };
  }, [defaultSelectedDate]);

  const tileClassName: TileClassNameFunc = ({ date }: { date: Date }) => {
    const classNames = ['react-calendar__tile'];

    if (isSameDay(date, selectedDate)) {
      classNames.push('react-calendar__tile--active_selected');
    }

    if (dateAlreadyClicked(dates, date))
      return ['react-calendar__tile--active', ...classNames].join(' ');
    return classNames.join(' ');
  };

  return (
    <Wrapper>
      <ReactCalendar
        tileClassName={tileClassName}
        onClickDay={handleClickDay}
        value={selectedDate}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
        }
        prev2Label={null}
        next2Label={null}
        maxDate={new Date()}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (onClickMonth && activeStartDate) {
            onClickMonth(activeStartDate);
          }
        }}
      />
    </Wrapper>
  );
};
