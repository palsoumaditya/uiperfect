"use client";
import React, { FC, useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, 
  Paperclip, 
  Image as ImageIcon, 
  X, 
  Mic, 
  Globe,
  Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---

type AttachmentType = 'image' | 'file';

export interface AIInput03Props {
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

// --- Hooks ---

const useAutoResizeTextarea = ({ minHeight, maxHeight }: { minHeight: number; maxHeight: number }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (reset?: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    if (reset) {
      textarea.style.height = `${minHeight}px`;
      return;
    }

    textarea.style.height = `${minHeight}px`;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${Math.max(newHeight, minHeight)}px`;
  };

  return { textareaRef, adjustHeight };
};

// --- Component ---

const AIInput_03: FC<AIInput03Props> = ({ 
  onSubmit, 
  isGenerating = false, 
  placeholder = "Type a message...",
  className = ""
}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 240
  });

  useEffect(() => {
    adjustHeight();
  }, [input]);

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

  const addMockAttachment = (type: AttachmentType) => {
    const newFile: AttachmentMeta = {
      id: Math.random().toString(36).substring(7),
      name: type === 'image' ? `screenshot-${Date.now()}.png` : `specs-${Date.now()}.pdf`,
      type
    };
    setAttachments(prev => [...prev, newFile]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const canSubmit = (input.trim().length > 0 || attachments.length > 0) && !isGenerating;

  return (
    <div className={`w-full max-w-2xl mx-auto p-4 ${className}`}>
      <motion.div
        layout
        initial={false}
        animate={{
          boxShadow: isFocused 
            ? "0 0 0 2px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.05)" 
            : "0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.02)"
        }}
        transition={{ duration: 0.2 }}
        className={`
          relative flex flex-col w-full 
          bg-white dark:bg-[#0F0F0F] 
          rounded-xl overflow-hidden
          border border-zinc-200 dark:border-zinc-800
        `}
      >
        
        {/* 1. Input Area */}
        <div className="relative px-4 py-3">
          {/* Attachments (Tags style) */}
          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: 'auto', opacity: 1, marginBottom: 12 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                className="flex flex-wrap gap-2 overflow-hidden"
              >
                {attachments.map((file) => (
                  <div 
                    key={file.id}
                    className="
                      flex items-center gap-2 px-2 py-1 rounded-md border text-xs font-medium
                      bg-zinc-50 border-zinc-200 text-zinc-700
                      dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300
                    "
                  >
                    <span className="text-zinc-400">
                        {file.type === 'image' ? <ImageIcon size={12} /> : <Paperclip size={12} />}
                    </span>
                    <span>{file.name}</span>
                    <button
                      onClick={() => removeAttachment(file.id)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="
              w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none
              text-zinc-900 placeholder:text-zinc-400
              dark:text-zinc-100 dark:placeholder:text-zinc-600
              text-[14px] leading-relaxed min-h-[60px] font-normal
              [&::-webkit-scrollbar]:hidden
            "
            disabled={isGenerating}
          />
        </div>

        {/* 2. Minimal Toolbar */}
        <div className="
          flex justify-between items-center px-3 py-2
          border-t border-zinc-100 dark:border-zinc-800/50
          bg-zinc-50/50 dark:bg-zinc-900/50
        ">
          {/* Left: Contextual Tools */}
          <div className="flex items-center gap-1">
            <ToolButton 
              icon={<Paperclip size={16} strokeWidth={2} />} 
              onClick={() => addMockAttachment('file')}
            />
            <ToolButton 
              icon={<ImageIcon size={16} strokeWidth={2} />} 
              onClick={() => addMockAttachment('image')}
            />
             {/* Divider */}
            <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-700 mx-1.5" />
            
            <ToolButton 
              icon={<Globe size={16} strokeWidth={2} />} 
              onClick={() => {}}
            />
          </div>

          {/* Right: Action */}
          <div className="flex items-center gap-3">
             {/* Removed "K to Search" hint block from here */}

             {/* Send Button */}
             <motion.button
                onClick={handleSubmit}
                disabled={!canSubmit}
                animate={{ 
                    backgroundColor: canSubmit ? "#18181b" : "transparent", // zinc-950
                    color: canSubmit ? "#ffffff" : "#a1a1aa", // zinc-400
                    scale: canSubmit ? 1 : 0.95
                }}
                whileHover={canSubmit ? { scale: 1.05 } : {}}
                whileTap={canSubmit ? { scale: 0.95 } : {}}
                className={`
                  relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors
                  dark:bg-white dark:text-black
                `}
             >
                {isGenerating ? (
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                     className="w-4 h-4 border-[2px] border-zinc-400 border-t-transparent rounded-full"
                   />
                ) : (
                   <ArrowUp size={16} strokeWidth={2.5} className={canSubmit ? "text-white dark:text-black" : "text-zinc-300 dark:text-zinc-600"} />
                )}
             </motion.button>
          </div>
        </div>

      </motion.div>
      
      {/* Bottom Hint */}
      <div className="flex justify-center mt-3 opacity-0 focus-within:opacity-100 transition-opacity duration-500">
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            Press <kbd className="font-sans bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-zinc-500">↵</kbd> to send
          </span>
      </div>
    </div>
  );
};

// --- Minimal Button ---

const ToolButton: FC<{ icon: React.ReactNode; onClick: () => void }> = ({ icon, onClick }) => (
  <button 
    type="button"
    onClick={onClick}
    className="
      p-1.5 rounded-md text-zinc-400 transition-all duration-200
      hover:bg-zinc-200 hover:text-zinc-900
      dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200
    "
  >
    {icon}
  </button>
);

export default AIInput_03;