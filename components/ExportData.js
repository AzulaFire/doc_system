import { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from '@/components/ui/button';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportData = ({ exportToPDF, exportText, downloadText }) => {
  const [exportType, setExportType] = useState('');

  const handleExportToPDF = () => {
    exportToPDF();
  };

  return (
    <div>
      <Button onClick={() => setExportType('pdf')}>{exportText}</Button>

      {exportType === 'pdf' && (
        <Button onClick={handleExportToPDF} className='ml-8'>
          {downloadText}
        </Button>
      )}
    </div>
  );
};

export default ExportData;
