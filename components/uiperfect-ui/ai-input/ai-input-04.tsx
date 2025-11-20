"use client";
import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { 
  ArrowUp, 
  Plus, 
  Image as ImageIcon, 
  FileText, 
  Link as LinkIcon, 
  X, 
  Bot, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---

type ModelType = 'Model 1' | 'Model 2' | 'Model 3';

interface AIInput04Props {
  onSubmit: (text: string, attachments: File[], model: ModelType) => void;
  isGenerating?: boolean;
}

interface AttachmentMeta {
  id: string;
  name: string;
  type: 'image' | 'file' | 'link';
  file?: File;
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

const AIInput_04: FC<AIInput04Props> = ({ 
  onSubmit, 
  isGenerating = false 
}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>('Model 1');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200
  });

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSubmit = () => {
    if ((!input.trim() && attachments.length === 0) || isGenerating) return;
    
    const filesToUpload = attachments
      .filter(a => a.file)
      .map(a => a.file as File);

    onSubmit(input, filesToUpload, selectedModel);
    setInput('');
    setAttachments([]);
    adjustHeight(true);
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // --- File Upload Logic ---

  const triggerFileSelect = (type: 'image' | 'file') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '*/*';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isImage = file.type.startsWith('image/');
      
      const newAttachment: AttachmentMeta = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: isImage ? 'image' : 'file',
        file: file
      };
      
      setAttachments(prev => [...prev, newAttachment]);
      setIsMenuOpen(false);
      e.target.value = '';
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      setAttachments(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        name: new URL(url).hostname,
        type: 'link'
      }]);
      setIsMenuOpen(false);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const canSubmit = (input.trim().length > 0 || attachments.length > 0) && !isGenerating;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 font-sans">
      
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* --- The Container --- */}
      <div className="relative group rounded-2xl overflow-hidden p-[1px]">
        
        {/* 1. The Glowing "Snake" Gradient Layer 
            Updates:
            - Light Mode: Black Gradient (#000000)
            - Dark Mode: White Gradient (#ffffff) to ensure contrast against black bg
        */}
        <motion.div
          animate={{
            opacity: isFocused || isGenerating ? 1 : 0,
            rotate: 360
          }}
          transition={{
            opacity: { duration: 0.3 },
            rotate: { duration: 4, repeat: Infinity, ease: "linear" }
          }}
          className={`
            absolute inset-[-100%] origin-center pointer-events-none
            bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#000000_100%)]
            dark:bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#ffffff_100%)]
          `}
        />
        
        {/* 2. Static Border Fallback */}
        <div className={`absolute inset-0 bg-zinc-200 dark:bg-zinc-800 transition-opacity duration-300 ${isFocused || isGenerating ? 'opacity-0' : 'opacity-100'}`} />

        {/* 3. Main Input Box Content */}
        <div className="
          relative flex flex-col w-full h-full
          bg-white dark:bg-[#0a0a0a] 
          rounded-[15px]
          overflow-hidden
        ">
          
          {/* Top Bar: Model Selector */}
          <div className="px-4 pt-3 flex items-center justify-between z-20">
            <div className="relative">
              <button
                onClick={() => setIsModelOpen(!isModelOpen)}
                className="
                  flex items-center gap-2 px-3 py-1.5 rounded-lg
                  bg-zinc-50 hover:bg-zinc-100 
                  dark:bg-zinc-900 dark:hover:bg-zinc-800
                  text-xs font-medium text-zinc-900 dark:text-zinc-100
                  transition-colors
                "
              >
                <Sparkles size={14} className="text-black dark:text-white" />
                <span>{selectedModel}</span>
                <ChevronDown size={12} className={`transition-transform ${isModelOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Model Dropdown */}
              <AnimatePresence>
                {isModelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="
                      absolute top-full left-0 mt-2 w-48 p-1 z-50
                      bg-white dark:bg-zinc-900 
                      border border-zinc-200 dark:border-zinc-800
                      rounded-xl shadow-xl
                    "
                  >
                    {['Model 1', 'Model 2', 'Model 3'].map((m) => (
                      <button
                        key={m}
                        onClick={() => { setSelectedModel(m as ModelType); setIsModelOpen(false); }}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2
                          ${selectedModel === m 
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' 
                            : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}
                        `}
                      >
                        <Bot size={14} />
                        {m}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Textarea Area */}
          <div className="px-4 pb-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything..."
              className="
                w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none
                text-zinc-900 placeholder:text-zinc-400
                dark:text-zinc-100 dark:placeholder:text-zinc-600
                text-[15px] leading-relaxed mt-2
                [&::-webkit-scrollbar]:hidden
              "
              disabled={isGenerating}
            />
            
            {/* Attachments Preview */}
            <AnimatePresence>
              {attachments.length > 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-wrap gap-2 mt-3 overflow-hidden"
                >
                  {attachments.map((file) => (
                    <motion.div
                      layout
                      key={file.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="
                        group relative flex items-center gap-2 px-3 py-2 rounded-xl
                        bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800
                      "
                    >
                      <div className="p-1.5 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-zinc-500">
                        {file.type === 'image' && <ImageIcon size={14} />}
                        {file.type === 'file' && <FileText size={14} />}
                        {file.type === 'link' && <LinkIcon size={14} />}
                      </div>
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 max-w-[100px] truncate">
                        {file.name}
                      </span>
                      <button 
                        onClick={() => removeAttachment(file.id)}
                        className="absolute -top-1.5 -right-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Toolbar */}
          <div className="flex justify-between items-end px-3 pb-3 pt-2">
            
            {/* Left: Plus Menu */}
            <div className="flex items-center gap-2 relative z-30">
              <motion.div 
                animate={{ 
                  width: isMenuOpen ? 'auto' : '32px',
                }}
                className={`
                  flex items-center overflow-hidden rounded-full
                  transition-colors duration-200
                  ${isMenuOpen ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-transparent'} 
                `}
              >
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
                    ${isMenuOpen 
                        ? 'rotate-45 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white' 
                        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}
                    transition-all duration-200
                  `}
                >
                  <Plus size={18} />
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center px-1 pr-2 gap-1"
                    >
                      <MenuButton 
                        icon={<ImageIcon size={16} />} 
                        label="Image" 
                        onClick={() => triggerFileSelect('image')} 
                      />
                      <MenuButton 
                        icon={<FileText size={16} />} 
                        label="File" 
                        onClick={() => triggerFileSelect('file')} 
                      />
                      <MenuButton 
                        icon={<LinkIcon size={16} />} 
                        label="Link" 
                        onClick={addLink} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right: Send Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.05 } : {}}
              whileTap={canSubmit ? { scale: 0.95 } : {}}
              className={`
                flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200
                ${canSubmit 
                  ? 'bg-gradient-to-b from-zinc-700 to-black dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-black shadow-md' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}
              `}
            >
              {isGenerating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <ArrowUp size={18} strokeWidth={2.5} />
              )}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Helper Text */}
      <div className="text-center mt-4">
        <p className="text-xs text-zinc-400">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const MenuButton: FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="
      flex items-center justify-center w-8 h-8 rounded-full
      text-zinc-500 dark:text-zinc-400
      hover:bg-zinc-200 dark:hover:bg-zinc-600 hover:text-zinc-900 dark:hover:text-white
      transition-colors
    "
    title={label}
  >
    {icon}
  </button>
);

export default AIInput_04;