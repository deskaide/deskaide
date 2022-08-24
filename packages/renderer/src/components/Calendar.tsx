import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
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
    }

    .react-calendar__tile--active {
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

      &:disabled {
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
    }

    .react-calendar__month-view__weekdays {
      text-transform: none;
      font-size: ${({ theme }) => theme.fontSizes.h6};
      font-family: ${({ theme }) => theme.fonts.heading};
    }
  }
`;

export const DiaryCalendar: React.FC = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Wrapper>
      <Calendar
        onChange={onChange}
        value={value}
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
