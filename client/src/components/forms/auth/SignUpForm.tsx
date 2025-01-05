import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSign, KeyRound } from "lucide-react";
import { Link, Meta } from "react-router-dom";
import { IconInput } from "@/components/shared/IconInput";
import { useState } from "react";
import LoadingStateIcon from "@/components/shared/Loader/Loader";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      salary: 0,
      scholarship: 0,
      balance: 0,
      email: "",
      password: "",
      passwordAgain: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authorization': "Bearer a12b3c",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.success) {
        console.log("Signup successful");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-5">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Vezetéknév" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Keresztnév" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="scholarship"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      className="peer pe-12"
                      placeholder={'Ösztöndíj (opcionális)'}
                      type="text"
                      maxLength={6}
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
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <div className="space-y-2">
                  <div className="relative">
                    <Input
                      className="peer pe-12"
                      placeholder={'Fizetés (opcionális)'}
                      type="text"
                      maxLength={7}
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
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <div className="space-y-2">
                  <div className="relative">
                    <Input
                      className="peer pe-12"
                      placeholder={'Jelenlegi egyenleg (opcionális)'}
                      type="text"
                      maxLength={6}
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput
                  icon={<AtSign size={16} strokeWidth={2} aria-hidden="true" />}
                  placeholder="E-Mail"
                  type="email"
                  password={false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput
                  icon={
                    <KeyRound size={16} strokeWidth={2} aria-hidden="true" />
                  }
                  placeholder="Jelszó"
                  password={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordAgain"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput
                  icon={
                    <KeyRound size={16} strokeWidth={2} aria-hidden="true" />
                  }
                  placeholder="Jelszó újra"
                  password={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col text-sm gap-1">
          <p className="flex items-center justify-between">
            Van már fiókod?{" "}
            <Link to={"/login"} className="url">
              Jelentkezz be
            </Link>
          </p>
          {/* <Link to={'/forgot-password'} className="mx-auto url">Elfelejtettem a jelszavam</Link> */}
        </div>
        <Button className="w-full" disabled={loading} variant={'primary'} type="submit">
          {loading ? <><LoadingStateIcon color="#000000" /> Betöltés</> : 'Regisztráció'}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
