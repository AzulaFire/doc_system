'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useEffect, useState } from 'react';
import { Stages, Sections, Technologies } from '@/constants/definitions';
import { CurrentDate } from './CurrentDate';
import Functional from './Functional';
import NonFunctional from './NonFunctional';
import { Translations } from '@/constants/definitions';

const MainForm = ({
  setGetLanguage,
  getLanguage,
  setGetTitle,
  setGetStage,
  setGetVersion,
  setGetTechnology,
  setStartDate,
  setCompletionDate,
  setGetFunctional,
  setGetNonFunctional,
  setGetDescription,
  getDescription,
}) => {
  const [getToggle, setGetToggle] = useState(false);

  // Accessing the text directly using the language and ID
  const documentText = Translations[getLanguage].find(
    (item) => item.id === 'document_title'
  ).text;
  const titleTextPlaceholder = Translations[getLanguage].find(
    (item) => item.id === 'project_title'
  ).text;
  const stageText = Translations[getLanguage].find(
    (item) => item.id === 'stage'
  ).text;
  const startDateText = Translations[getLanguage].find(
    (item) => item.id === 'start_date'
  ).text;
  const completionDateText = Translations[getLanguage].find(
    (item) => item.id === 'completion'
  ).text;
  const versionNumberText = Translations[getLanguage].find(
    (item) => item.id === 'version_number'
  ).text;
  const technologyText = Translations[getLanguage].find(
    (item) => item.id === 'technology'
  ).text;
  const overviewText = Translations[getLanguage].find(
    (item) => item.id === 'overview'
  ).text;
  const wordcountText = Translations[getLanguage].find(
    (item) => item.id === 'word_count'
  ).text;
  const descriptionText = Translations[getLanguage].find(
    (item) => item.id === 'description'
  ).text;
  const purposeText = Translations[getLanguage].find(
    (item) => item.id === 'purpose'
  ).text;
  const functionalText = Translations[getLanguage].find(
    (item) => item.id === 'functional_requirements'
  ).text;
  const nonfunctionalText = Translations[getLanguage].find(
    (item) => item.id === 'non_functional_requirements'
  ).text;

  function countWords(text, locale) {
    return [
      ...new Intl.Segmenter(locale, { granularity: 'word' }).segment(text),
    ].reduce((wordCount, { isWordLike }) => wordCount + Number(isWordLike), 0);
  }

  const handleTitle = (e) => {
    if ((e.target.name = 'details')) {
      setGetTitle(e.target.value);
    }
  };

  const handleDescription = (e) => {
    if ((e.target.name = 'details')) {
      setGetDescription(e.target.value);
    }
  };

  const handleStage = (selectValue) => {
    setGetStage(selectValue);
  };

  const handleVersion = (e) => {
    if ((e.target.name = 'details')) {
      setGetVersion(e.target.value);
    }
  };

  const handleTechnology = (selectValue) => {
    setGetTechnology(selectValue);
  };

  const handleLanguageChange = (e) => {
    setGetToggle((prev) => !prev);
  };

  useEffect(() => {
    if (getToggle === true) {
      setGetLanguage('en');
    } else {
      setGetLanguage('ja');
    }
  }, [getToggle, setGetLanguage]);

  let placeText = `
  ${descriptionText}
  ${purposeText}
  `;

  return (
    <div className='mt-8 md:min-w-[1000px]'>
      <div className='flex justify-end items-center my-4'>
        <Label htmlFor='english' className='mx-2'>
          EN
        </Label>
        <Switch
          id='english'
          aria-readonly
          checked={getToggle}
          onCheckedChange={handleLanguageChange}
        />
      </div>

      <div className='grid grid-cols-2 gap-14'>
        <div>
          <Label htmlFor='title'>{documentText}</Label>
          <Input
            id='title'
            placeholder={titleTextPlaceholder}
            className='mb-4 w-[470px]'
            onChange={handleTitle}
          />
        </div>
        <div>
          <Label htmlFor='stage'>{stageText}</Label>
          <Select id='stage' onValueChange={(val) => handleStage(val)}>
            <SelectTrigger className='mb-4 w-[470px]'>
              <SelectValue placeholder={stageText} />
            </SelectTrigger>
            <SelectContent>
              {Stages[getLanguage].map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col mt-2'>
          <Label htmlFor='calendar' className='mb-1'>
            {startDateText}
          </Label>
          <CurrentDate
            id='calendar'
            setStartDate={setStartDate}
            getLanguage={getLanguage}
            propName='option1'
          />
        </div>
        <div className='flex flex-col mt-2'>
          <Label htmlFor='calendar' className='mb-1'>
            {completionDateText}
          </Label>
          <CurrentDate
            id='calendar'
            setCompletionDate={setCompletionDate}
            getLanguage={getLanguage}
            propName='option2'
          />
        </div>
        <div>
          <Label htmlFor='version'>{versionNumberText}</Label>
          <Input
            id='version'
            placeholder='Ex: 1.22'
            className='mb-4 w-[200px]'
            onChange={handleVersion}
          />
        </div>
        <div>
          <Label htmlFor='technology'>{technologyText}</Label>
          <Select
            id='technology'
            onValueChange={(val) => handleTechnology(val)}
          >
            <SelectTrigger className='mb-4 w-[200px]'>
              <SelectValue placeholder={technologyText} />
            </SelectTrigger>
            <SelectContent>
              {Technologies.map((technology) => (
                <SelectItem key={technology} value={technology}>
                  {technology}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Label htmlFor='details'>{overviewText}</Label>
      <Textarea
        id='details'
        placeholder={placeText}
        className='mb-4 min-h-[200px]'
        onChange={handleDescription}
      />
      <Label>
        {wordcountText}: {countWords(getDescription, getLanguage)}
      </Label>
      <div>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>{functionalText}</AccordionTrigger>
            <AccordionContent>
              <Functional
                setGetFunctional={setGetFunctional}
                getLanguage={getLanguage}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>{nonfunctionalText}</AccordionTrigger>
            <AccordionContent>
              <NonFunctional
                setGetNonFunctional={setGetNonFunctional}
                getLanguage={getLanguage}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default MainForm;
