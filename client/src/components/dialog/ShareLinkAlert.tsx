import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ShareLinkAlert: React.FC<{
  url: string | null;
  setShow: (isOpen: boolean) => void;
}> = ({ url, setShow }) => {
  const [tooltipText, setTooltipText] = useState("Copy");
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const handleCopy = () => {
    setTooltipText("Copied to clipboard");
    setIsTooltipVisible(true);
    const copyText = document.getElementById("link") as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
    setTimeout(() => {
      setIsTooltipVisible(false);
      setTooltipText("Copy");
    }, 2000);
  };
  return (
    <Dialog onOpenChange={() => setShow(false)} defaultOpen>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url!} readOnly />
          </div>
          <div className="relative inline-block">
            <Button
              onClick={handleCopy}
              type="button"
              size="sm"
              className="px-3"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            {isTooltipVisible && (
              <p className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                {tooltipText}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareLinkAlert;
