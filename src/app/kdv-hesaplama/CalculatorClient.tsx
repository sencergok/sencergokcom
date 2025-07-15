"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function KdvHesaplamaClient() {
  const [tutar, setTutar] = useState("");
  const [oran, setOran] = useState("18");
  const [sonuc, setSonuc] = useState("");

  function hesapla() {
    const t = parseFloat(tutar.replace(",", "."));
    const o = parseFloat(oran.replace(",", "."));
    if (!t || !o) {
      setSonuc("Lütfen tutar ve KDV oranı giriniz.");
      return;
    }
    const kdv = t * o / 100;
    const toplam = t + kdv;
    setSonuc(`KDV: ${kdv.toFixed(2)} TL, Toplam: ${toplam.toFixed(2)} TL`);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 py-8 pt-24">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">KDV Hesaplama</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tutar (TL)</label>
            <input type="number" value={tutar} onChange={e=>setTutar(e.target.value)} placeholder="Örn: 1000" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">KDV Oranı (%)</label>
            <input type="number" value={oran} onChange={e=>setOran(e.target.value)} placeholder="Örn: 18" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <Button className="w-full mt-2" onClick={hesapla}>Hesapla</Button>
          {sonuc && (
            <Card className="p-4 bg-secondary/50 mt-2 text-center">
              <div>{sonuc}</div>
            </Card>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Badge variant="secondary">KDV</Badge>
            <Badge variant="secondary">Modern UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
} 