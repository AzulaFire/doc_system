'use client';
import { Textarea } from '@/components/ui/textarea';
import { Translations } from '@/constants/definitions';

const Functional = ({ setGetFunctional, getLanguage }) => {
  const handleInput = (e) => {
    if ((e.target.name = 'details')) {
      setGetFunctional(e.target.value);
    }
  };

  const caseText = Translations[getLanguage].find(
    (item) => item.id === 'use_cases'
  ).text;

  const functionalText = Translations[getLanguage].find(
    (item) => item.id === 'functional_specifications'
  ).text;

  let placeText = `
  ${caseText}
  ${functionalText}
  `;

  return (
    <div>
      <Textarea
        id='details'
        placeholder={placeText}
        className='mb-4 min-h-[100px]'
        onChange={handleInput}
      />
    </div>
  );
};
export default Functional;
