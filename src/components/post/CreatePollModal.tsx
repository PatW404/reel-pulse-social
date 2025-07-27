import React, { useState } from 'react';
import { Plus, BarChart3, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePosts } from '@/contexts/PostsContext';
import { PollOption } from '@/contexts/PostsContext';

interface CreatePollModalProps {
  children: React.ReactNode;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('30');
  const { addPost } = usePosts();

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    if (!question.trim()) return;
    
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) return;

    const durationMs = (parseInt(days) * 24 * 60 + parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000;
    const endTime = new Date(Date.now() + durationMs).toISOString();

    const pollOptions: PollOption[] = validOptions.map((text, index) => ({
      id: `option-${index}`,
      text: text.trim(),
      votes: 0
    }));

    const newPost = {
      author: {
        name: 'You',
        username: '@you',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      content: question,
      poll: {
        question,
        options: pollOptions,
        duration: {
          days: parseInt(days),
          hours: parseInt(hours),
          minutes: parseInt(minutes)
        },
        endTime,
        totalVotes: 0
      },
      tags: []
    };

    addPost(newPost);
    
    // Reset form
    setQuestion('');
    setOptions(['', '']);
    setDays('0');
    setHours('0');
    setMinutes('30');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a poll</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Poll Question */}
          <div className="space-y-2">
            <Label htmlFor="question">Your question*</Label>
            <Input
              id="question"
              placeholder="E.g., How do you commute to work?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={140}
            />
            <div className="text-right text-xs text-muted-foreground">
              {question.length}/140
            </div>
          </div>

          {/* Poll Options */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`option-${index}`}>Option {index + 1}*</Label>
                  {options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <Input
                  id={`option-${index}`}
                  placeholder={index === 0 ? "E.g., Public transportation" : index === 1 ? "E.g., Drive myself" : `Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  maxLength={30}
                />
                <div className="text-right text-xs text-muted-foreground">
                  {option.length}/30
                </div>
              </div>
            ))}
            
            {options.length < 10 && (
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add option
              </Button>
            )}
          </div>

          {/* Poll Duration */}
          <div className="space-y-2">
            <Label>Poll duration</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 8}, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} {i === 1 ? 'day' : 'days'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={hours} onValueChange={setHours}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 24}, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} {i === 1 ? 'hour' : 'hours'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={minutes} onValueChange={setMinutes}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 30, 45].map(min => (
                      <SelectItem key={min} value={min.toString()}>
                        {min} min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            We don't allow requests for political opinions, medical information or other sensitive data.
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Back
            </Button>
            <Button 
              onClick={handleCreatePoll}
              disabled={!question.trim() || options.filter(opt => opt.trim()).length < 2}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};