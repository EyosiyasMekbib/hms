"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";


function Dashboard() {

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Dashboard Content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Use the navigation links to manage different sections of the system.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;