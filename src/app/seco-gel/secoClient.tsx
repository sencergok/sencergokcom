"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, NotebookPen, Clock, CheckCircle2 } from "lucide-react";

type ApiSuccess = {
  success: true;
  data: {
    id?: string;
    clicked_at?: string;
  } | null;
};

type ApiError = {
  error: string;
};

export default function SecomClient() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; emoji: string }>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const maxLen = 2000;
  const remaining = maxLen - note.length;

  useEffect(() => {
    if (note.length > maxLen) {
      setNote(note.slice(0, maxLen));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.length]);

  useEffect(() => {
    audioRef.current = new Audio('/sound.mp3')
    if (audioRef.current) {
      audioRef.current.preload = 'auto'
      audioRef.current.volume = 0.8
    }
  }, [])

  function playSound() {
    const a = audioRef.current
    if (!a) return
    try {
      a.currentTime = 0
      void a.play().catch(() => {})
    } catch {}
  }

  async function handleClick() {
    // Play public sound immediately on user gesture
    playSound();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/seco-gel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const contentType = res.headers.get("content-type") || "";
      let data: ApiSuccess | ApiError | null = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
        if (!res.ok || (data && "error" in data)) {
          throw new Error((data && "error" in data) ? (data as ApiError).error : "İstek başarısız oldu");
        }
      } else {
        const text = await res.text();
        throw new Error(text || "Sunucu hatası");
      }
      const safe = (data as ApiSuccess);
      const ts = (safe.data?.clicked_at && new Date(safe.data.clicked_at)) || new Date();
      const formatted = ts.toLocaleString();
      setResult(`Kaydedildi! Zaman: ${formatted}`);
      setNote("");

      // Celebrate with confetti emojis
      const emojis = ["✨", "🎉", "💖", "🌟", "🎈", "🥳"];
      const burst = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100, // vw
        delay: Math.random() * 0.4,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      }));
      setConfetti(burst);
      setTimeout(() => setConfetti([]), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-[90vh] overflow-hidden py-8 pt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-white to-sky-200 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Floating sparkles background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: 60, rotate: 0, scale: 0.8, opacity: 0 }}
              animate={{ y: -300, rotate: 360, scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: c.delay, ease: "easeOut" }}
              className="absolute text-2xl select-none"
              style={{ left: `${c.x}vw` }}
            >
              {c.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="relative p-6 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-fuchsia-400/40 via-pink-400/40 to-sky-400/40 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-300" />
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-600 to-sky-600 dark:from-fuchsia-300 dark:via-pink-300 dark:to-sky-300">
                buluşma sinyali
              </h1>
            </div>
            <p className="text-center text-sm text-muted-foreground mb-5">Saat/yer yaz (opsiyonel) ve büyük yuvarlak butona bas ✨</p>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <NotebookPen className="h-4 w-4" /> Not (saat/yer – opsiyonel)
                </label>
                <div className="relative group">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Örn: 19:30, Nişantaşı kahve"
                    className="w-full px-4 py-4 rounded-2xl border bg-white/70 dark:bg-white/5 focus:ring-4 focus:ring-pink-300/50 focus:outline-none text-foreground min-h-28 shadow-sm transition-colors border-transparent group-hover:border-pink-200 dark:group-hover:border-pink-900/40"
                    maxLength={maxLen}
                  />
                  <div className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity bg-gradient-to-r from-fuchsia-400/30 via-pink-400/30 to-sky-400/30" />
                  <div className="absolute bottom-2 right-3 text-[11px] text-muted-foreground">{remaining}</div>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleClick}
                  disabled={loading}
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full text-white font-bold shadow-[0_10px_30px_rgba(236,72,153,0.45)] focus:outline-none focus:ring-8 ring-pink-300/40 disabled:opacity-70"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 50% 0%, rgba(236,72,153,1) 0%, rgba(147,51,234,1) 40%, rgba(14,165,233,1) 100%)",
                  }}
                >
                  <span className="absolute -inset-[6px] rounded-full bg-gradient-to-r from-fuchsia-500/20 via-pink-500/20 to-sky-500/20 blur-2xl" />
                  <span className="relative z-10 inline-flex flex-col items-center justify-center w-full h-full gap-1">
                    {loading ? (
                      <>
                        <Clock className="h-6 w-6 animate-spin" />
                        <span>Kaydediliyor</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-7 w-7" />
                        <span>seco gel</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card className="p-4 bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-center">
                      <div className="inline-flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-5 w-5" /> {result}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card className="p-4 bg-destructive/10 text-destructive text-center">
                      {error}
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-center text-xs text-muted-foreground pt-2">Sadece URL bilenler için ;)</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}


