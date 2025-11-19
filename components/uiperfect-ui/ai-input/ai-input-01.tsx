"use client";
import React, { FC, useState, useEffect } from 'react';
import { Send, Paperclip, Mic, Image as ImageIcon, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';

// --- Components ---

type AttachmentType = 'image' | 'file';

export interface AIInput01Props {
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

const AIInput_01: FC<AIInput01Props> = ({ 
  onSubmit, 
  isGenerating = false, 
  placeholder = "Ask anything...",
  className = ""
}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200
  });

  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  const handleSubmit = () => {
    if ((!input.trim() && attachments.length === 0) || isGenerating) return;

    // TODO: When you support real file uploads, map your AttachmentMeta -> File[]
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

  const addMockAttachment = (type: AttachmentType) => {
    const newFile: AttachmentMeta = {
      name: type === 'image' 
        ? `screenshot-${Date.now()}.png` 
        : `project-specs-${Date.now()}.pdf`,
      type,
      id: Math.random().toString(36).substr(2, 9)
    };
    setAttachments((prev) => [...prev, newFile]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter(a => a.id !== id));
  };

  const canSubmit = (input.trim().length > 0 || attachments.length > 0) && !isGenerating;

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <motion.div 
        layout
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`
          relative flex flex-col gap-2 p-3 rounded-xl border transition-colors duration-200
          bg-white dark:bg-zinc-900
          ${isFocused 
            ? 'border-zinc-400 ring-1 ring-zinc-400 shadow-lg dark:border-zinc-600 dark:ring-zinc-600' 
            : 'border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700'}
        `}
      >
        {/* Attachments Area */}
        <AnimatePresence mode="popLayout">
          {attachments.length > 0 && (
            <motion.div 
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              // REPLACED: .no-scrollbar class with Tailwind arbitrary values
              className="flex gap-2 overflow-x-auto py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {attachments.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                  className="
                    flex items-center gap-2 py-1.5 px-3 rounded-md border shrink-0
                    bg-zinc-100 border-zinc-200 text-zinc-700 
                    dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300
                    text-xs
                  "
                >
                  {file.type === 'image' 
                    ? <ImageIcon size={14} className="text-zinc-500 dark:text-zinc-400" /> 
                    : <FileText size={14} className="text-zinc-500 dark:text-zinc-400" />
                  }
                  <span className="max-w-[100px] truncate font-medium">
                    {file.name}
                  </span>
                  <button 
                    type="button"
                    onClick={() => removeAttachment(file.id)}
                    className="hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={1}
          // REPLACED: .custom-scrollbar class with Tailwind scrollbar modifiers
          className="
            w-full resize-none bg-transparent focus:outline-none text-sm leading-relaxed px-1
            text-zinc-900 placeholder:text-zinc-400
            dark:text-zinc-100 dark:placeholder:text-zinc-500
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
          "
          disabled={isGenerating}
        />

        {/* Toolbar */}
        <div className="flex justify-between items-center pt-2 mt-1 border-t border-zinc-50 dark:border-zinc-800/50">
          <div className="flex items-center gap-1">
            <AttachmentButton 
              onClick={() => addMockAttachment('file')} 
              icon={<Paperclip size={18} />} 
              label="Attach file" 
            />
            <AttachmentButton 
              onClick={() => addMockAttachment('image')} 
              icon={<ImageIcon size={18} />} 
              label="Upload image" 
            />
            <AttachmentButton 
              onClick={() => {}} 
              icon={<Mic size={18} />} 
              label="Voice input" 
            />
          </div>

          <motion.button
            type="button"
            whileHover={canSubmit ? { scale: 1.05 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              flex items-center justify-center p-2 rounded-md transition-all duration-200
              ${canSubmit
                ? 'bg-zinc-900 text-white shadow-md hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200' 
                : 'bg-zinc-100 text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'}
            `}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-500 rounded-full animate-spin dark:border-zinc-600 dark:border-t-zinc-400" />
            ) : (
              <Send 
                size={18} 
                className={input.trim() || attachments.length > 0 ? "ml-0.5" : ""} 
              />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Helper component for toolbar buttons to keep main clean
const AttachmentButton: FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <motion.button 
    type="button"
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="
      p-2 rounded-md transition-colors
      text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100
      dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800
    "
    title={label}
  >
    {icon}
  </motion.button>
);

export default AIInput_01;