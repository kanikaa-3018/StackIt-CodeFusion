import React, { useState, useEffect } from 'react';
import { X, Tag, HelpCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from './RichTextEditor';
import { validateQuestion, sanitizeInput } from '@/utils/validation';
import { handleError, logError, ValidationError } from '@/utils/errorHandler';
import { APP_CONFIG, SUCCESS_MESSAGES } from '@/config/constants';
import { useDebounce } from '@/utils/performance';

interface AskQuestionFormProps {
  onClose: () => void;
  onSubmit?: (question: { title: string; content: string; tags: string[] }) => void;
}

interface ValidationErrors {
  title?: string;
  content?: string;
  tags?: string;
  general?: string;
}

const AskQuestionForm: React.FC<AskQuestionFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const debouncedTitle = useDebounce(title);
  const debouncedContent = useDebounce(content);

  useEffect(() => {
    if (debouncedTitle) {
      const validation = validateQuestion({
        title: debouncedTitle,
        content: debouncedContent || 'temp',
        tags: tags.length ? tags : ['temp'],
      });
      if (!validation.success) {
        const titleError = validation.errors.find(err => err.field === 'title');
        setErrors(prev => ({ ...prev, title: titleError?.message }));
      } else {
        setErrors(prev => ({ ...prev, title: undefined }));
      }
    }
  }, [debouncedTitle, debouncedContent, tags]);

  const handleAddTag = () => {
    try {
      const sanitizedTag = sanitizeInput(tagInput.trim().toLowerCase());

      if (!sanitizedTag) throw new ValidationError('Tag cannot be empty');
      if (tags.includes(sanitizedTag)) throw new ValidationError('Tag already exists');
      if (tags.length >= APP_CONFIG.MAX_TAGS_PER_QUESTION)
        throw new ValidationError(`Maximum ${APP_CONFIG.MAX_TAGS_PER_QUESTION} tags allowed`);
      if (sanitizedTag.length < 2 || sanitizedTag.length > 25)
        throw new ValidationError('Tag must be between 2 and 25 characters');

      setTags([...tags, sanitizedTag]);
      setTagInput('');
      setErrors(prev => ({ ...prev, tags: undefined }));
    } catch (error) {
      const appError = handleError(error);
      setErrors(prev => ({ ...prev, tags: appError.message }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const sanitizedTitle = sanitizeInput(title.trim());
      const sanitizedContent = sanitizeInput(content.trim());
      const sanitizedTags = tags.map(tag => sanitizeInput(tag));

      const validation = validateQuestion({
        title: sanitizedTitle,
        content: sanitizedContent,
        tags: sanitizedTags,
      });

      if (!validation.success) {
        const newErrors: ValidationErrors = {};
        validation.errors.forEach(error => {
          newErrors[error.field as keyof ValidationErrors] = error.message;
        });
        setErrors(newErrors);
        return;
      }

      const questionData = {
        title: sanitizedTitle,
        content: sanitizedContent,
        tags: sanitizedTags,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(questionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to post question');
      }

      const data = await res.json();

      toast({
        title: 'Success',
        description: SUCCESS_MESSAGES.QUESTION_POSTED,
      });

      if (onSubmit) onSubmit(data);

      onClose();
    } catch (error) {
      const appError = handleError(error);
      logError(appError, 'AskQuestionForm');
      setErrors({ general: appError.message });
      toast({
        title: 'Error',
        description: appError.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    ];
    return colors[tag.length % colors.length];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-card-foreground">Ask a Question</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Get help from the community by asking a detailed question
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {errors.general && (
            <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive rounded-lg">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">{errors.general}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
              Question Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How do I implement authentication in React?"
              className={`w-full px-3 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.title ? 'border-destructive' : 'border-border'
              }`}
              maxLength={APP_CONFIG.MAX_QUESTION_TITLE_LENGTH}
            />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Be specific ({title.length}/{APP_CONFIG.MAX_QUESTION_TITLE_LENGTH})
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Question Details *
            </label>
            <div className={`${errors.content ? 'ring-2 ring-destructive' : ''} rounded-lg`}>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Provide all the details..."
              />
            </div>
            {errors.content && <p className="text-xs text-destructive mt-1">{errors.content}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Include code and what you tried ({content.length}/{APP_CONFIG.MAX_QUESTION_CONTENT_LENGTH})
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Tags *</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)} border border-primary/20`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-primary/70 hover:text-primary">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add a tag (e.g. react, javascript)"
                className={`flex-1 px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.tags ? 'border-destructive' : 'border-border'
                }`}
                disabled={tags.length >= APP_CONFIG.MAX_TAGS_PER_QUESTION}
              />
              <Button
                onClick={handleAddTag}
                variant="outline"
                disabled={
                  !tagInput.trim() ||
                  tags.includes(tagInput.trim().toLowerCase()) ||
                  tags.length >= APP_CONFIG.MAX_TAGS_PER_QUESTION
                }
              >
                Add Tag
              </Button>
            </div>
            {errors.tags && <p className="text-xs text-destructive mt-1">{errors.tags}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Add up to {APP_CONFIG.MAX_TAGS_PER_QUESTION} tags ({tags.length}/{APP_CONFIG.MAX_TAGS_PER_QUESTION})
            </p>
          </div>

          {/* Tips */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Writing a good question</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Summarize the problem in the title</li>
                  <li>• Describe what you've tried</li>
                  <li>• Include minimal reproducible code</li>
                  <li>• Add relevant tags</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Your Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;
