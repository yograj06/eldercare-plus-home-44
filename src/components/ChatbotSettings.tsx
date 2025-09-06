import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, MessageSquare } from 'lucide-react';
import { CHATBOT_CONFIG } from '@/config/chatbot';
import { useToast } from '@/hooks/use-toast';

export const ChatbotSettings = () => {
  const [chatbotId, setChatbotId] = useState(CHATBOT_CONFIG.getChatbotId());
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    CHATBOT_CONFIG.setChatbotId(chatbotId);
    toast({
      title: "Settings saved",
      description: "Chatbot configuration updated. Refresh the page to see changes.",
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setChatbotId('');
    CHATBOT_CONFIG.setChatbotId('');
    toast({
      title: "Settings cleared",
      description: "Chatbot removed. Refresh the page to see changes.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 left-4 z-50">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Chatbot Settings
          </DialogTitle>
          <DialogDescription>
            Configure your Chatbase chatbot. Get your chatbot ID from your Chatbase dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="chatbot-id">Chatbot ID</Label>
            <Input
              id="chatbot-id"
              value={chatbotId}
              onChange={(e) => setChatbotId(e.target.value)}
              placeholder="Enter your Chatbase chatbot ID"
            />
            <p className="text-sm text-muted-foreground">
              You can find this in your Chatbase dashboard under Settings → Embed on website.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSave} disabled={!chatbotId.trim()}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};