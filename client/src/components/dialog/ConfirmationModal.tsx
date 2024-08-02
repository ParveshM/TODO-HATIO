import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type Props = {
  handleDeleteTrue: () => void;
  handleDeleteFalse: () => void;
};
const ConfirmationModal: React.FC<Props> = ({
  handleDeleteTrue,
  handleDeleteFalse,
}) => {
  return (
    <AlertDialog onOpenChange={handleDeleteFalse} defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project and it's associated Todo's from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleDeleteFalse()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTrue()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
