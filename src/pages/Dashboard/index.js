import React, { useState, useMemo, useEffect } from 'react';

import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
  isEqual,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz'; /** Convert the date to remove the timestamp */

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date()); /** no right fot manipulate */

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      /**
       * We need to convert the date to
       * the global utc format
       * because in the backend we are
       * doing this
       */

      const response = await api.get('schedule', {
        params: { date },
      });

      console.log(parseISO(response.data[0].date));
      console.log('2');
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // take the user timezone

      const data = range.map((hour) => {
        /**
         * Compare if there is a schedule
         * for each time in the range
         */
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);

        const compareDate = utcToZonedTime(checkDate, timezone);
        console.log(compareDate);
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((ap) =>
            isEqual(compareDate, parseISO(ap.date))
          ),
        };
      });
      console.log(data);
      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        {schedule.map((time) => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
