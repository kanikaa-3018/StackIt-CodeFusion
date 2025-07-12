
import React, { useState } from 'react';
import { Bold, Italic, Link2, Image, List, Eye, Send, X, Hash } from 'lucide-react';

interface AskQuestionProps {
  onClose: () => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedTags = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML', 'Python', 'Vue.js'];

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form and close
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setIsSubmitting(false);
    onClose();
  };

  const formatText = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let replacement = '';
    switch (format) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        break;
      case 'link':
        replacement = `[${selectedText || 'link text'}](url)`;
        break;
      case 'list':
        replacement = `\n- ${selectedText || 'list item'}`;
        break;
    }

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Ask a Question</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-[calc(90vh-120px)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Question Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Be specific and imagine you're asking a question to another person"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                {title.length}/150 characters
              </p>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Question Details <span className="text-error">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{showPreview ? 'Edit' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center space-x-2 p-2 bg-muted border border-border rounded-t-lg">
                <button
                  type="button"
                  onClick={() => formatText('bold')}
                  className="p-2 rounded hover:bg-background transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('italic')}
                  className="p-2 rounded hover:bg-background transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('link')}
                  className="p-2 rounded hover:bg-background transition-colors"
                  title="Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('list')}
                  className="p-2 rounded hover:bg-background transition-colors"
                  title="List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded hover:bg-background transition-colors"
                  title="Image"
                >
                  <Image className="w-4 h-4" />
                </button>
              </div>

              {/* Editor/Preview */}
              <div className="border-x border-b border-border rounded-b-lg">
                {showPreview ? (
                  <div className="p-4 min-h-[200px] bg-background prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
                  </div>
                ) : (
                  <textarea
                    id="content-editor"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Include all the information someone would need to answer your question"
                    className="w-full p-4 min-h-[200px] bg-background border-0 rounded-b-lg focus:outline-none resize-none"
                    required
                  />
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tags <span className="text-muted-foreground">(up to 5)</span>
              </label>
              
              {/* Tag Input */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag and press Enter"
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    disabled={tags.length >= 5}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleAddTag(tagInput.trim())}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggested Tags */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags
                    .filter(tag => !tags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddTag(tag)}
                        disabled={tags.length >= 5}
                        className="px-3 py-1 text-sm border border-border rounded-full hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Review your question before posting to get the best answers
            </p>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim() || tags.length === 0 || isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Question</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
