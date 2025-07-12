
import React, { useState } from 'react';
import { X, Tag, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from './RichTextEditor';

interface AskQuestionFormProps {
  onClose: () => void;
  onSubmit?: (question: { title: string; content: string; tags: string[] }) => void;
}

const AskQuestionForm: React.FC<AskQuestionFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question title.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please provide details about your question.",
        variant: "destructive"
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one tag to categorize your question.",
        variant: "destructive"
      });
      return;
    }

    const questionData = {
      title: title.trim(),
      content: content.trim(),
      tags
    };

    console.log('Submitting question:', questionData);
    
    if (onSubmit) {
      onSubmit(questionData);
    }

    toast({
      title: "Question Posted",
      description: "Your question has been submitted successfully!",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
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

        {/* Content */}
        <div className="p-6 space-y-6">
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
              className="w-full px-3 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={150}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Be specific and imagine you're asking a question to another person
            </p>
          </div>

          {/* Content/Body */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Question Details *
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Provide all the details someone would need to understand and answer your question. Include code snippets, error messages, and what you've already tried."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Include code, error messages, and what you've tried so far
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Tags *
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-primary/70 hover:text-primary"
                  >
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
                placeholder="Add a tag (e.g. react, javascript, css)"
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={tags.length >= 5}
              />
              <Button 
                onClick={handleAddTag} 
                variant="outline"
                disabled={!tagInput.trim() || tags.includes(tagInput.trim()) || tags.length >= 5}
              >
                Add Tag
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Add up to 5 tags to describe what your question is about
            </p>
          </div>

          {/* Tips */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Writing a good question</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Summarize your problem in the title</li>
                  <li>• Describe what you've tried and what didn't work</li>
                  <li>• Include minimal code that reproduces the issue</li>
                  <li>• Add relevant tags to help others find your question</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Post Your Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;
