"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    // Cores da PLAGE System - gradiente de azul
    const colors = [
        '#0066cc', // Azul primário
        '#0052a3', // Azul médio
        '#00a896', // Verde/teal
        '#20c997', // Verde claro
        '#004080', // Azul escuro
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id={`gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0066cc" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#00a896" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#0052a3" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                <title>Background Paths</title>
                {paths.map((path) => {
                    const colorIndex = path.id % colors.length;
                    const baseOpacity = 0.4 + (path.id * 0.02);
                    return (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke={colors[colorIndex]}
                            strokeWidth={1.5 + path.id * 0.05}
                            strokeOpacity={baseOpacity}
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: [baseOpacity * 0.5, baseOpacity, baseOpacity * 0.5],
                            }}
                            transition={{
                                duration: 15 + Math.random() * 10,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                repeatType: "reverse",
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-neutral-950 dark:via-blue-950/20 dark:to-neutral-900">
            <div className="absolute inset-0 z-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
                {/* Camada adicional de profundidade */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                {/* Theme Toggle na Hero Section - opcional */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
                    <ThemeToggle />
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter drop-shadow-2xl">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-[#0066cc] via-[#00a896] to-[#0052a3]
                                        dark:from-[#0066cc] dark:via-[#20c997] dark:to-[#00a896]
                                        font-extrabold"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <div
                        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <a href="#experience">
                            <Button
                                variant="ghost"
                                className="rounded-[1.15rem] px-10 py-7 text-lg font-bold backdrop-blur-md 
                                bg-gradient-to-r from-[#0066cc] to-[#0052a3] hover:from-[#0052a3] hover:to-[#004080]
                                text-white border-2 border-[#0066cc]/50 hover:border-[#00a896]
                                transition-all duration-300 group-hover:-translate-y-1
                                hover:shadow-2xl hover:shadow-[#0066cc]/50 cursor-pointer
                                dark:from-[#0066cc] dark:to-[#00a896] dark:hover:from-[#00a896] dark:hover:to-[#20c997]"
                            >
                                <span className="opacity-100 group-hover:opacity-100 transition-opacity font-semibold">
                                    Ver Meus Projetos
                                </span>
                                <span
                                    className="ml-3 opacity-100 group-hover:opacity-100 group-hover:translate-x-2 
                                    transition-all duration-300 text-xl"
                                >
                                    →
                                </span>
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

