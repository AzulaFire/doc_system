'use client';
import { Textarea } from '@/components/ui/textarea';
import { Translations } from '@/constants/definitions';

const NonFunctional = ({ setGetNonFunctional, getLanguage }) => {
  const handleInput = (e) => {
    if ((e.target.name = 'details')) {
      setGetNonFunctional(e.target.value);
    }
  };

  const performanceText = Translations[getLanguage].find(
    (item) => item.id === 'performance_requirements'
  ).text;

  const securityText = Translations[getLanguage].find(
    (item) => item.id === 'security_requirements'
  ).text;

  const reliabilityText = Translations[getLanguage].find(
    (item) => item.id === 'reliability_requirements'
  ).text;

  let placeText = `
  ${performanceText}
  ${securityText}
  ${reliabilityText}
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
export default NonFunctional;
