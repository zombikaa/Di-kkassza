import { invoiceSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TagsInput } from "@/components/shared/TagsInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import LoadingStateIcon from "@/components/shared/Loader/Loader";

const InvoiceForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      type: "",
      category: [],
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof invoiceSchema>) {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/invoice/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer a12b3c",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    {field.value === "Bevétel" ? (
                      <span className="text-green-600">Bevétel</span>
                    ) : field.value === "Kiadás" ? (
                      <span className="text-red-700">Kiadás</span>
                    ) : (
                      <span className="text-gray-500">Típus</span>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bevétel" className="text-green-600">
                      Bevétel
                    </SelectItem>
                    <SelectItem value="Kiadás" className="text-red-700">
                      Kiadás
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Kategória"
                  maxItems={1}
                />
              </FormControl>
              <FormDescription>
                Miután beírta a kategóriát, nyomjon ENTER-t!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      className="peer pe-12"
                      placeholder={"Összeg"}
                      type="text"
                      maxLength={8}
                      {...field}
                    />
                    <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                      Ft
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={loading}
          variant={"primary"}
          type="submit"
        >
          {loading ? (
            <>
              <LoadingStateIcon color="#000000" /> Betöltés
            </>
          ) : (
            "Mentés"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default InvoiceForm;
