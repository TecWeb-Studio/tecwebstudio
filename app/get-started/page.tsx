"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "@/app/components/ui/Dialog";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function GetStartedPage() {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) router.back();
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-900/80">
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent onClose={() => handleOpenChange(false)}>
                    <DialogHeader>
                        <DialogTitle>Contattaci</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <div className="space-y-4 text-sm text-slate-300">
                            <p>
                                Grazie per l'interesse! Compila il form nella sezione Contatti
                                oppure contattaci direttamente tramite i canali qui sotto.
                            </p>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-emerald-400" />
                                <div>
                                    <div className="text-white font-semibold">Email</div>
                                    <a
                                        href="mailto:hello@tecwebstudio.com"
                                        className="text-emerald-300 text-xs hover:underline"
                                    >
                                        hello@tecwebstudio.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-emerald-400" />
                                <div>
                                    <div className="text-white font-semibold">Telefono</div>
                                    <div className="text-slate-300 text-xs">+39 (XXX) XXX-XXXX</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Linkedin className="w-5 h-5 text-emerald-400" />
                                <div>
                                    <div className="text-white font-semibold">LinkedIn</div>
                                    <a
                                        href="#"
                                        className="text-emerald-300 text-xs hover:underline"
                                    >
                                        /tecwebstudio
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Github className="w-5 h-5 text-emerald-400" />
                                <div>
                                    <div className="text-white font-semibold">GitHub</div>
                                    <a
                                        href="#"
                                        className="text-emerald-300 text-xs hover:underline"
                                    >
                                        github.com/tecwebstudio
                                    </a>
                                </div>
                            </div>

                            <div className="pt-3 text-right">
                                <button
                                    onClick={() => handleOpenChange(false)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-sm"
                                >
                                    Chiudi
                                </button>
                            </div>
                        </div>
                    </DialogBody>
                </DialogContent>
            </Dialog>
        </div>
    );
}
