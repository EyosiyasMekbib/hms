"use client"

import Link from "next/link";
import {
    Bell,
    Home,
    Menu,
    User,
    FileText,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RootLayout({ children }) {

    const [isLoaded, setIsLoaded] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');

        if (token) {
            setAuthenticated(true);
            setIsLoaded(false);
        } else {
            router.push('/login');
        }
    }, [router]);

    if (isLoaded) {
        return (
            <div className="flex h-screen justify-center items-center">
                <PuffLoader loading={true} />
            </div>
        )
    }

    if (!authenticated) {
        router.push('/login');
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <User className="h-6 w-6" />
                            <span>Healthcare System</span>
                        </Link>

                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                replace
                            >
                                <User className="h-4 w-4" />
                                Patients
                            </Link>
                            {/* <Link
                                href="dashboard/medical-records"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <FileText className="h-4 w-4" />
                                Medical Records
                            </Link> */}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="/dashboard"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/patients"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <User className="h-5 w-5" />
                                    Patients
                                </Link>
                                <Link
                                    href="/medical-records"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <FileText className="h-5 w-5" />
                                    Medical Records
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex justify-end">
                        <Button variant="destructive" onClick={() => {
                            console.log("test")
                            Cookies.remove('authToken');
                            router.replace('/')
                        }}>
                            Sign Out <LogOut className="ml-2" />
                        </Button>

                    </div>

                </header>
                <div className="p-10">

                    {children}
                </div>
            </div>
        </div>
    );
}
