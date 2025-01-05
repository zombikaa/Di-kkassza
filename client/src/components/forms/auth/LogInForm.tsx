import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from '@/lib/schemas'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { AtSign, KeyRound } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { IconInput } from "@/components/shared/IconInput"
import { useState } from "react"
import LoadingStateIcon from "@/components/shared/Loader/Loader";



const LogInForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: '',
          password: ''
        },
      })
     
      async function onSubmit(values: z.infer<typeof loginSchema>) {
        setLoading(true);
        try {
            const response = await fetch('https://diakkasszaapi.vercel.app/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer a12b3c'
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            if (data.success) {
                console.log('Login successful');
                navigate('/');
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
        setLoading(false);
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-5">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                         <IconInput icon={<AtSign size={16} strokeWidth={2} aria-hidden="true"/>} placeholder="E-Mail" type="email" password={false} {...field}/>
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
                        <IconInput icon={<KeyRound size={16} strokeWidth={2} aria-hidden="true"/>} placeholder="Jelszó" type="password" password={true} {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <div className="w-full flex flex-col text-sm gap-1">
                <p className="flex items-center justify-between">Nincs még fiókod? <Link to={'/signup'} className="url">Regisztrálj</Link></p>
                {/* <Link to={'/forgot-password'} className="mx-auto url">Elfelejtettem a jelszavam</Link> */}
            </div>
            <Button className="w-full" disabled={loading} variant={'primary'} type="submit">
                {loading ? <><LoadingStateIcon color="#000000" /> Betöltés</> : 'Bejelentkezés'}
            </Button>
        </form>
    </Form>
  )
}

export default LogInForm