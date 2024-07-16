'use client';
import MainForm from '@/components/MainForm';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import ImageUploading from 'react-images-uploading';
import { Button } from '@/components/ui/button';
import ExportData from '@/components/ExportData';
import { Titles } from '@/constants/definitions';
import { useState } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Translations } from '@/constants/definitions';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Define the fonts you want to use
var fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
  // Example for Japanese font
  NotoSans: {
    normal: 'app/NotoSansJP-Regular.ttf',
    bold: 'app/NotoSansJP-Bold.ttf',
    medium: 'app/NotoSansJP-Medium.ttf',
  },
};

// Set pdfMake fonts
pdfMake.fonts = fonts;

export default function Home() {
  const [getLanguage, setGetLanguage] = useState('ja');
  const [images, setImages] = useState([]);
  const [getTitle, setGetTitle] = useState('');
  const [getStage, setGetStage] = useState('');
  const [getVersion, setGetVersion] = useState('');
  const [getTechnology, setGetTechnology] = useState('');
  const [startDate, setStartDate] = useState();
  const [completionDate, setCompletionDate] = useState();
  const [getFunctional, setGetFunctional] = useState('');
  const [getNonFunctional, setGetNonFunctional] = useState('');
  const [getDescription, setGetDescription] = useState('');

  const maxNumber = 4;

  // Accessing the text directly using the language and ID
  const buttonUpload = Translations[getLanguage].find(
    (item) => item.id === 'click_or_drop'
  ).text;
  const buttonRemove = Translations[getLanguage].find(
    (item) => item.id === 'remove_images'
  ).text;
  const exportText = Translations[getLanguage].find(
    (item) => item.id === 'export_to_pdf'
  ).text;
  const downloadText = Translations[getLanguage].find(
    (item) => item.id === 'download_pdf'
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
  const functionalText = Translations[getLanguage].find(
    (item) => item.id === 'functional_requirements'
  ).text;
  const nonfunctionalText = Translations[getLanguage].find(
    (item) => item.id === 'non_functional_requirements'
  ).text;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const exportToPDF = async () => {
    // Define content using styles directly
    const content = [
      {
        text: Titles[getLanguage],
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 0, 20],
      },
      {
        text: getTitle,
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 0, 20],
      },
      {
        width: '100%',
        table: {
          body: [
            [stageText, getStage, versionNumberText, getVersion],
            [startDateText, startDate, completionDateText, completionDate],
          ],
          alignment: 'center',
          margin: [0, 20, 0, 20],
        },
      },
      {
        text: overviewText,
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 20],
      },
      getDescription,
      {
        text: functionalText,
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 20],
      },
      getFunctional,
      {
        text: nonfunctionalText,
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 20],
      },
      getNonFunctional,
      {
        text: '',
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 20],
      },
      {
        width: '100%',
        table: {
          body: [[technologyText, getTechnology]],
          alignment: 'center',
          margin: [0, 20, 0, 20],
        },
      },
      { text: 'Images:', fontSize: 18, bold: true, alignment: 'center' },
    ];

    // Handle images
    if (images.length > 0) {
      const imagePromises = images.map(async (image) => {
        try {
          const dataUrl = await getImageDataUrl(image);
          return dataUrl;
        } catch (error) {
          console.error('Failed to convert image to data URL:', error);
          return null;
        }
      });

      const resolvedImages = await Promise.all(imagePromises);

      resolvedImages.forEach((dataUrl) => {
        if (dataUrl) {
          content.push({
            image: dataUrl,
            width: 200, // Adjust width as needed
            height: 200, // Adjust height as needed
          });
        }
      });
    }

    // Create PDF document
    const pdfDoc = { content };

    // Generate and download PDF
    pdfMake.createPdf(pdfDoc).download('data.pdf');
  };

  const getImageDataUrl = async (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(image.file);
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h2 className='font-semibold text-3xl'>{Titles[getLanguage]}</h2>

      <MainForm
        setGetLanguage={setGetLanguage}
        getLanguage={getLanguage}
        setGetTitle={setGetTitle}
        setGetStage={setGetStage}
        setGetVersion={setGetVersion}
        setGetTechnology={setGetTechnology}
        setStartDate={setStartDate}
        setCompletionDate={setCompletionDate}
        setGetFunctional={setGetFunctional}
        setGetNonFunctional={setGetNonFunctional}
        setGetDescription={setGetDescription}
        getDescription={getDescription}
      />
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
        acceptType={['jpg', 'jpeg', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className='upload__image-wrapper'>
            <div className='flex justify-center my-8'>
              <Button
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
                className='mr-8'
              >
                {buttonUpload}
              </Button>
              <Button onClick={onImageRemoveAll}>{buttonRemove}</Button>
            </div>
            <div className='flex flex-row'>
              {imageList.map((image, index) => (
                <div key={index} className='image-item'>
                  <Image src={image.data_url} alt='' width={200} height={200} />
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      <Separator className='my-8' />
      <div>
        <ExportData
          exportToPDF={exportToPDF}
          exportText={exportText}
          downloadText={downloadText}
        />
        {/* Other content of your page */}
      </div>
    </main>
  );
}
