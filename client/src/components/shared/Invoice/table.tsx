import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatToSimpleDateString } from "@/lib/utils";

interface Invoice {
  id: string;
  status: string;
  type: string;
  amount: number;
  category: string;
  $createdAt: string;
}

const TableInvoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch("https://diakkasszaapi.vercel.app/invoice/get", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer a12b3c",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        const documents = data.invoices.documents || [];
        setInvoices(
          documents.map((doc: any) => ({
            id: doc.$id,
            status: doc.status,
            type: doc.type,
            category: doc.category,
            $createdAt: doc.$createdAt,
            amount: doc.amount,
          }))
        );
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <Table className="mx-auto">
      <TableHeader>
        <TableRow className="bg-secondarycolor/20">
          <TableHead className="w-[100px]">Azonosító</TableHead>
          <TableHead className="text-center">Státusz</TableHead>
          <TableHead className="text-center">Típus</TableHead>
          <TableHead className="text-center">Kategória</TableHead>
          <TableHead className="text-center">Dátum</TableHead>
          <TableHead className="text-right">Összeg</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium text-center">
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-text hover:underline">{invoice.id.slice(0, 3)}...</TooltipTrigger>
                <TooltipContent>
                  <p>{invoice.id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </TableCell>
            <TableCell
              className={invoice.status === "Sikeres" ? "text-green-600 text-center" : "text-center"}
            >
              {invoice.status}
            </TableCell>
            <TableCell className={`text-center ${invoice.type == 'Bevétel' && 'text-green-600'} ${invoice.type == 'Kiadás' && 'text-red-600'}` }>{invoice.type}</TableCell>
            <TableCell className="text-center">{invoice.category}</TableCell>
            <TableCell className="text-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-text hover:underline">{formatToSimpleDateString(invoice.$createdAt)}</TooltipTrigger>
                  <TooltipContent className="capitalize">
                    {new Date(invoice.$createdAt).toLocaleDateString('hu-HU', { weekday: 'long' })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="text-right ">{invoice.amount} Ft</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Összesen</TableCell>
          <TableCell className="text-right text-secondarycolor">
          {invoices.reduce((total: number, invoice: Invoice) => total + invoice.amount, 0)} Ft
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableInvoice;
