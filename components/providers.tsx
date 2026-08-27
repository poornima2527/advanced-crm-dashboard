'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { useState } from 'react';
export function Providers({children}:{children:React.ReactNode}){const [qc]=useState(()=>new QueryClient({defaultOptions:{queries:{staleTime:30_000,refetchOnWindowFocus:false}}}));return <ThemeProvider attribute="class" defaultTheme="dark" enableSystem><QueryClientProvider client={qc}>{children}<Toaster theme="dark" richColors position="top-right"/></QueryClientProvider></ThemeProvider>}
