
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExportOptions } from '../../types/calculator';
import { Download, FileSpreadsheet, FileIcon } from 'lucide-react';
import { TranslationObject } from '../../constants/calculator/types';

interface ExportResultsProps {
  t: TranslationObject;
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
}

const ExportResults: React.FC<ExportResultsProps> = ({
  t,
  isOpen,
  onClose,
  onExport
}) => {
  const { toast } = useToast();
  const [options, setOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeGraphs: true,
    includeFinancials: true,
    includeCustomerSegments: true,
    includeProducts: true
  });
  
  const handleExport = () => {
    onExport(options);
    toast({
      title: t.exportPreparing,
      description: t.exportPreparingDescription,
    });
    onClose();
  };
  
  const updateOption = (key: keyof ExportOptions, value: any) => {
    setOptions({
      ...options,
      [key]: value
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.exportResults}</DialogTitle>
          <DialogDescription>
            {t.exportResultsDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{t.exportFormat}</Label>
            <Select
              value={options.format}
              onValueChange={(value) => updateOption('format', value as 'pdf' | 'excel')}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.selectFormat} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf" className="flex items-center">
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span>PDF</span>
                  </div>
                </SelectItem>
                <SelectItem value="excel" className="flex items-center">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Excel</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>{t.contentToInclude}</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeGraphs" 
                checked={options.includeGraphs}
                onCheckedChange={(checked) => 
                  updateOption('includeGraphs', checked === true)
                }
              />
              <Label htmlFor="includeGraphs">{t.includeGraphs}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeFinancials" 
                checked={options.includeFinancials}
                onCheckedChange={(checked) => 
                  updateOption('includeFinancials', checked === true)
                }
              />
              <Label htmlFor="includeFinancials">{t.includeFinancials}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeCustomerSegments" 
                checked={options.includeCustomerSegments}
                onCheckedChange={(checked) => 
                  updateOption('includeCustomerSegments', checked === true)
                }
              />
              <Label htmlFor="includeCustomerSegments">{t.includeCustomerSegments}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeProducts" 
                checked={options.includeProducts}
                onCheckedChange={(checked) => 
                  updateOption('includeProducts', checked === true)
                }
              />
              <Label htmlFor="includeProducts">{t.includeProducts}</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t.cancel}</Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            {t.export}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportResults;
