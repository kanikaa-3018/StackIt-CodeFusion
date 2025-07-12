
import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, Link, Image, List, ListOrdered, Quote, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  className = ""
}) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleImageUpload = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid image URL.",
        variant: "destructive"
      });
      return;
    }

    const imageMarkdown = `![Image](${imageUrl})`;
    insertText(imageMarkdown);
    setImageUrl('');
    setShowImageUpload(false);
    
    toast({
      title: "Image Added",
      description: "Image has been inserted into your content.",
    });
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertText('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*'), title: 'Italic' },
    { icon: Underline, action: () => insertText('<u>', '</u>'), title: 'Underline' },
    { icon: Code, action: () => insertText('`', '`'), title: 'Code' },
    { icon: Link, action: () => insertText('[', '](url)'), title: 'Link' },
    { icon: List, action: () => insertText('- '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('1. '), title: 'Numbered List' },
    { icon: Quote, action: () => insertText('> '), title: 'Quote' },
  ];

  return (
    <div className={`border border-border rounded-lg bg-background ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b border-border">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowImageUpload(!showImageUpload)}
          title="Insert Image"
          className="h-8 w-8 p-0"
        >
          <Image className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Upload Section */}
      {showImageUpload && (
        <div className="p-3 border-b border-border bg-muted/50">
          <div className="flex items-center space-x-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background"
            />
            <Button size="sm" onClick={handleImageUpload}>
              Add Image
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setShowImageUpload(false);
                setImageUrl('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Text Area */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] border-0 focus:ring-0 focus:ring-offset-0 resize-none rounded-t-none"
      />

      {/* Preview hint */}
      <div className="px-3 py-2 text-xs text-muted-foreground border-t border-border">
        Supports Markdown formatting. Use ** for bold, * for italic, ` for code, and {"> for quotes"}.
      </div>
    </div>
  );
};

export default RichTextEditor;
