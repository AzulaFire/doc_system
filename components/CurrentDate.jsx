'use client';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { Translations } from '@/constants/definitions';

export function CurrentDate({
  setStartDate,
  setCompletionDate,
  propName,
  getLanguage,
}) {
  const [date, setDate] = useState();

  useEffect(() => {
    const formatDate = (originalDateString) => {
      // Create a new Date object from the original date string
      const dateObject = new Date(originalDateString);

      // Extract year, month, and day from the Date object
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so add 1
      const day = String(dateObject.getDate()).padStart(2, '0');

      // Formulate the desired format: month-day-year
      const formattedDate = `${month}-${day}-${year}`;
      return formattedDate;
    };

    if (propName === 'option1') {
      const newDate = formatDate(date);
      setStartDate(newDate);
    } else if (propName === 'option2') {
      const newDate = formatDate(date);
      setCompletionDate(newDate);
    }
  }, [date, propName, setCompletionDate, setStartDate]);

  const pickDateText = Translations[getLanguage].find(
    (item) => item.id === 'pick_date'
  ).text;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[200px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>{pickDateText}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
