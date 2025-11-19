"use client";
import React, { FC, useState, useEffect } from 'react';
import { 
  SendHorizontal, 
  Paperclip, 
  Image as ImageIcon, 
  X, 
  Plus,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';

// --- Types & Props ---

type AttachmentType = 'image' | 'file';

export interface AIInput02Props {
  onSubmit: (text: string, attachments: File[]) => void;
  isGenerating?: boolean;
  placeholder?: string;
  className?: string;
}

interface AttachmentMeta {
  id: string;
  name: string;
  type: AttachmentType;
}

// --- Component ---

const AIInput_02: FC<AIInput02Props> = ({ 
  onSubmit, 
  isGenerating = false, 
  placeholder = "How can I help you today?",
  className = ""
}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);

  // Auto-resize hook
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 24, 
    maxHeight: 200
  });

  // Adjust height on input change
  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  const handleSubmit = () => {
    if ((!input.trim() && attachments.length === 0) || isGenerating) return;
    onSubmit(input, []);
    setInput('');
    setAttachments([]);
    adjustHeight(true); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // --- Mock Helpers ---
  const addMockAttachment = (type: AttachmentType) => {
    const newFile: AttachmentMeta = {
      id: Math.random().toString(36).substring(7),
      name: type === 'image' ? `image-${Date.now()}.png` : `doc-${Date.now()}.pdf`,
      type
    };
    setAttachments(prev => [...prev, newFile]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const canSubmit = (input.trim().length > 0 || attachments.length > 0) && !isGenerating;

  return (
    <div className={`w-full max-w-2xl mx-auto px-4 ${className}`}>
      <motion.div
        layout
        className={`
          relative flex flex-col w-full bg-white dark:bg-neutral-900
          border transition-colors duration-200 ease-in-out
          rounded-[26px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          ${isFocused 
            /* CHANGED: Removed 'ring-1 ring-neutral-400' to stop the double border/outline effect */
            ? 'border-neutral-500 dark:border-neutral-600 shadow-lg' 
            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'}
        `}
      >
        
        {/* 1. Attachments Area */}
        <AnimatePresence>
          {attachments.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pt-3 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {attachments.map((file) => (
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    key={file.id}
                    className="
                      group flex items-center gap-2 pr-1 pl-3 py-1.5 rounded-full text-xs font-medium
                      bg-neutral-100 text-neutral-700 border border-neutral-200
                      dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700
                    "
                  >
                    {file.type === 'image' ? <ImageIcon size={12} /> : <Paperclip size={12} />}
                    <span className="max-w-[80px] truncate">{file.name}</span>
                    <button 
                      onClick={() => removeAttachment(file.id)}
                      className="p-0.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Main Input Area */}
        <div className="flex items-end gap-3 p-3">
          
          <div className="pb-1 pl-1">
             <ActionButton 
                icon={<Plus size={20} />} 
                onClick={() => addMockAttachment('file')}
                tooltip="Add Attachment"
             />
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={1}
            /* Added focus:outline-none to ensure no browser default outline appears */
            className="
              w-full py-2.5 bg-transparent border-none focus:outline-none focus:ring-0 resize-none
              text-neutral-900 placeholder:text-neutral-400
              dark:text-neutral-100 dark:placeholder:text-neutral-500
              text-[15px] leading-relaxed max-h-[200px]
              [&::-webkit-scrollbar]:hidden
            "
            disabled={isGenerating}
          />

          <div className="pb-1 pr-1">
            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.05 } : {}}
              whileTap={canSubmit ? { scale: 0.95 } : {}}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200
                ${canSubmit 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'bg-neutral-100 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed'}
              `}
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <SendHorizontal size={16} className={canSubmit ? "-ml-0.5" : ""} />
              )}
            </motion.button>
          </div>
        </div>

        {/* 3. Bottom Toolbar */}
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-3 flex items-center gap-3"
          >
            <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800 absolute left-0 bottom-[42px] pointer-events-none" />
            
            <MiniButton 
              icon={<Globe size={14} />} 
              label="Search" 
              active={false} 
              onClick={() => {}} 
            />
            <MiniButton 
              icon={<ImageIcon size={14} />} 
              label="Generate Image" 
              active={false} 
              onClick={() => addMockAttachment('image')} 
            />
            <div className="flex-1" />
            <span className="text-[10px] text-neutral-400 font-medium">
               {input.length} / 4000
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// --- Subcomponents ---

const ActionButton: FC<{ icon: React.ReactNode, onClick: () => void, tooltip: string }> = ({ icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="
      p-2 rounded-full text-neutral-400 transition-colors
      hover:bg-neutral-100 hover:text-neutral-600
      dark:hover:bg-neutral-800 dark:hover:text-neutral-300
    "
  >
    {icon}
  </button>
);

const MiniButton: FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors
      ${active 
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
        : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'}
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default AIInput_02;