import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/shared/Dialog/ResponsiveModal';
import { Button } from '@/components/ui/button';
import InvoiceForm from '@/components/forms/invoice/create';
  
  const CreateInvoiceModal = () => {
    return (
      <ResponsiveModal>
        <ResponsiveModalTrigger asChild>
          <Button variant={'outline'}>Számla hozzáadása</Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent side={'bottom'}>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Számla hozzáadása</ResponsiveModalTitle>
          </ResponsiveModalHeader>
          <InvoiceForm />
        </ResponsiveModalContent>
      </ResponsiveModal>
    );
  };
  
  export default CreateInvoiceModal;