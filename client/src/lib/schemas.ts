import { z } from 'zod';

export const signupSchema = z.object({
    firstname: z.string().min(1, { message: "A keresztnév megadása kötelező." }),
    lastname: z.string().min(1, { message: "A vezetéknév megadása kötelező." }),
    email: z.string().email({ message: 'Hibás email cím formátum.' }),
    salary: z.preprocess((value) => parseFloat(String(value)), z.number().nonnegative({ message: "A fizetés nem lehet negatív." })),
    scholarship: z.preprocess((value) => parseFloat(String(value)), z.number().nonnegative({ message: "Az ösztöndíj nem lehet negatív." })),
    balance: z.preprocess((value) => parseFloat(String(value)), z.number().nonnegative({ message: "Az egyenleg nem lehet negatív." })),
    password: z.string().min(8, { message: 'Túl rövid jelszavad van! Ennél erősebb kell. (8 karakter)' }),
    passwordAgain: z.string().min(6, { message: "A jelszónak legalább 6 karakter hosszúnak kell lennie." })
}).refine(data => data.password === data.passwordAgain, {
    message: "A jelszavak nem egyeznek",
    path: ["passwordAgain"]
});

export const loginSchema = z.object({
    email: z.string().email("Érvénytelen email cím"),
    password: z.string()
})

export const invoiceSchema = z.object({
    type: z.string().min(1, { message: "A típus megadása kötelező." }),
    category: z
      .array(z.string())
      .min(1, { message: "Legalább egy kategóriát meg kell adni." }),
    amount: z.preprocess(
      (value) => parseFloat(String(value)),
      z
        .number()
        .positive({ message: "Az összegnek nagyobbnak kell lennie, mint 0." })
    ),
  });
  