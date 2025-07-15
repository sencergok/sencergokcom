"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function IkiTarihArasiFarkHesaplamaClient() {
  const [tarih1, setTarih1] = useState("");
  const [tarih2, setTarih2] = useState("");
  const [sonuc, setSonuc] = useState("");

  function hesapla() {
    if (!tarih1 || !tarih2) {
      setSonuc("Lütfen iki tarihi de giriniz.");
      return;
    }
    const t1 = new Date(tarih1);
    const t2 = new Date(tarih2);
    if (isNaN(t1.getTime()) || isNaN(t2.getTime())) {
      setSonuc("Geçerli bir tarih giriniz.");
      return;
    }
    const farkMs = Math.abs(t2.getTime() - t1.getTime());
    const gun = Math.floor(farkMs / (1000 * 60 * 60 * 24));
    const ay = Math.floor(gun / 30.44);
    const yil = Math.floor(gun / 365.25);
    setSonuc(`${gun} gün, yaklaşık ${ay} ay, yaklaşık ${yil} yıl fark var.`);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 py-8 pt-24">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">İki Tarih Arası Fark Hesaplama</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">1. Tarih</label>
            <input type="date" value={tarih1} onChange={e=>setTarih1(e.target.value)} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">2. Tarih</label>
            <input type="date" value={tarih2} onChange={e=>setTarih2(e.target.value)} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <Button className="w-full mt-2" onClick={hesapla}>Hesapla</Button>
          {sonuc && (
            <Card className="p-4 bg-secondary/50 mt-2 text-center">
              <div>{sonuc}</div>
            </Card>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Badge variant="secondary">Tarih Farkı</Badge>
            <Badge variant="secondary">Modern UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
} 