import { Button } from "@mui/material";
import { XIcon, ArrowLeft } from "lucide-react";
import { useState } from "react";

const CurriculumModal = ({ 
  setOpenMenu, 
  children, 
  setCurriculumType, 
  curriculumType,
  step,
  setStep,
  onBack 
}) => {
  const handleClose = () => {
    setOpenMenu(false);
    setCurriculumType(null);
    setStep('selection');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (step === 'tools' && curriculumType === 'interactiveTool') {
      setStep('lesson');
    } else if (step === 'lesson' && curriculumType === 'interactiveTool') {
      setStep('selection');
      setCurriculumType(null);
    } else {
      setStep('selection');
      setCurriculumType(null);
    }
  };

  const showBackButton = step !== 'selection';

  return (
    <div className="space-y-2">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {showBackButton && (
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleBack}
            sx={{
              minWidth: '40px',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              '&:hover': {
                backgroundColor: '#f1f5f9',
                borderColor: '#cbd5e1'
              }
            }}
          >
            <ArrowLeft size={16} />
          </Button>
        )}
        
        <Button
          type="button"
          variant="text"
          className="!min-w-10"
          onClick={handleClose}
          sx={{
            minWidth: '40px',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            color: '#64748b',
            '&:hover': {
              backgroundColor: '#f1f5f9'
            }
          }}
        >
          <XIcon size={16} />
        </Button>
      </div>
      {children}
    </div>
  );
};

export default CurriculumModal;
