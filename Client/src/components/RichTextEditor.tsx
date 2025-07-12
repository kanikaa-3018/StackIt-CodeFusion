
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Smile,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Upload,
  X,
  Hash
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = "Write your content here...", minHeight = "300px" }: RichTextEditorProps) => {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const emojis = ["😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "💯", "🔥", "⭐", "✅", "❌", "❗", "❓", "💡", "🚀"];

  const insertText = useCallback((before: string, after: string = "", defaultText: string = "") => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;
    
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [value, onChange]);

  const formatText = (type: string) => {
    switch (type) {
      case 'bold':
        insertText('**', '**', 'bold text');
        break;
      case 'italic':
        insertText('*', '*', 'italic text');
        break;
      case 'underline':
        insertText('<u>', '</u>', 'underlined text');
        break;
      case 'strikethrough':
        insertText('~~', '~~', 'strikethrough text');
        break;
      case 'code':
        insertText('`', '`', 'code');
        break;
      case 'codeblock':
        insertText('\n```\n', '\n```\n', 'code block');
        break;
      case 'h1':
        insertText('\n# ', '', 'Heading 1');
        break;
      case 'h2':
        insertText('\n## ', '', 'Heading 2');
        break;
      case 'h3':
        insertText('\n### ', '', 'Heading 3');
        break;
      case 'quote':
        insertText('\n> ', '', 'Quote text');
        break;
      case 'ul':
        insertText('\n- ', '', 'List item');
        break;
      case 'ol':
        insertText('\n1. ', '', 'List item');
        break;
      case 'align-left':
        insertText('\n<div align="left">\n', '\n</div>\n', 'Left aligned text');
        break;
      case 'align-center':
        insertText('\n<div align="center">\n', '\n</div>\n', 'Center aligned text');
        break;
      case 'align-right':
        insertText('\n<div align="right">\n', '\n</div>\n', 'Right aligned text');
        break;
      case 'hr':
        insertText('\n---\n', '', '');
        break;
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      insertText(`[${linkText}](${linkUrl})`, '', '');
      setLinkUrl('');
      setLinkText('');
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      insertText(`![${imageAlt || 'Image'}](${imageUrl})`, '', '');
      setImageUrl('');
      setImageAlt('');
    }
  };

  const insertEmoji = (emoji: string) => {
    insertText(emoji, '', '');
    setShowEmojiPicker(false);
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3 mt-5">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary/20 pl-4 italic text-muted-foreground my-2">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />')
      .replace(/^---$/gm, '<hr class="my-4 border-border" />')
      .replace(/<div align="(left|center|right)">(.*?)<\/div>/gs, '<div class="text-$1">$2</div>')
      .replace(/\n/g, '<br />');
  };

  const toolbarButtons = [
    { icon: Bold, action: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, action: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: Underline, action: 'underline', tooltip: 'Underline' },
    { icon: Strikethrough, action: 'strikethrough', tooltip: 'Strikethrough' },
    { divider: true },
    { icon: Heading1, action: 'h1', tooltip: 'Heading 1' },
    { icon: Heading2, action: 'h2', tooltip: 'Heading 2' },
    { icon: Heading3, action: 'h3', tooltip: 'Heading 3' },
    { divider: true },
    { icon: AlignLeft, action: 'align-left', tooltip: 'Align Left' },
    { icon: AlignCenter, action: 'align-center', tooltip: 'Align Center' },
    { icon: AlignRight, action: 'align-right', tooltip: 'Align Right' },
    { divider: true },
    { icon: List, action: 'ul', tooltip: 'Bullet List' },
    { icon: ListOrdered, action: 'ol', tooltip: 'Numbered List' },
    { icon: Quote, action: 'quote', tooltip: 'Quote' },
    { divider: true },
    { icon: Code, action: 'code', tooltip: 'Inline Code' },
    { icon: Type, action: 'codeblock', tooltip: 'Code Block' },
    { icon: Hash, action: 'hr', tooltip: 'Horizontal Rule' },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 sm:p-3 border-b border-border bg-muted/20">
          {toolbarButtons.map((button, index) => (
            button.divider ? (
              <div key={index} className="w-px h-6 bg-border mx-1 hidden sm:block" />
            ) : (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => formatText(button.action)}
                className="h-8 w-8 p-0 hover:bg-primary/10 shrink-0"
                title={button.tooltip}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            )
          ))}
          
          {/* Link Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-primary/10"
                title="Insert Link"
              >
                <Link className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-3">
                <h4 className="font-medium">Insert Link</h4>
                <div className="space-y-2">
                  <Label htmlFor="link-text">Link Text</Label>
                  <Input
                    id="link-text"
                    placeholder="Enter link text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                </div>
                <Button onClick={insertLink} className="w-full" size="sm">
                  Insert Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Image Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-primary/10"
                title="Insert Image"
              >
                <Image className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-3">
                <h4 className="font-medium">Insert Image</h4>
                <div className="space-y-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-alt">Alt Text (Optional)</Label>
                  <Input
                    id="image-alt"
                    placeholder="Describe the image"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                  />
                </div>
                <Button onClick={insertImage} className="w-full" size="sm">
                  Insert Image
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Emoji Button */}
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-primary/10"
                title="Insert Emoji"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-muted"
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Editor Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "write" | "preview")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="write" className="rounded-none">
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="rounded-none">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="mt-0">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="border-0 resize-none focus-visible:ring-0 rounded-none font-mono text-sm leading-relaxed"
              style={{ minHeight }}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div 
              className="p-4 prose prose-sm max-w-none bg-background overflow-auto"
              style={{ minHeight }}
              dangerouslySetInnerHTML={{ 
                __html: value ? renderPreview(value) : '<p class="text-muted-foreground italic">Nothing to preview yet...</p>' 
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-muted/10 border-t text-xs text-muted-foreground gap-2">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs">
              Markdown supported
            </Badge>
            <span>{value.length} characters</span>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <span>Ctrl+B: Bold</span>
            <span>Ctrl+I: Italic</span>
            <span>Ctrl+K: Link</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
