"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function YasHesaplamaClient() {
  const [dogum, setDogum] = useState("");
  const [sonuc, setSonuc] = useState("");

  function hesapla() {
    if (!dogum) {
      setSonuc("Lütfen doğum tarihinizi giriniz.");
      return;
    }
    const d = new Date(dogum);
    if (isNaN(d.getTime())) {
      setSonuc("Geçerli bir tarih giriniz.");
      return;
    }
    const bugun = new Date();
    let yil = bugun.getFullYear() - d.getFullYear();
    let ay = bugun.getMonth() - d.getMonth();
    let gun = bugun.getDate() - d.getDate();
    if (gun < 0) {
      ay--;
      const prevMonth = new Date(bugun.getFullYear(), bugun.getMonth(), 0);
      gun += prevMonth.getDate();
    }
    if (ay < 0) {
      yil--;
      ay += 12;
    }
    setSonuc(`Yaşınız: ${yil} yıl ${ay} ay`);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 py-8 pt-24">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Yaş Hesaplama</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Doğum Tarihi</label>
            <input type="date" value={dogum} onChange={e=>setDogum(e.target.value)} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <Button className="w-full mt-2" onClick={hesapla}>Hesapla</Button>
          {sonuc && (
            <Card className="p-4 bg-secondary/50 mt-2 text-center">
              <div>{sonuc}</div>
            </Card>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Badge variant="secondary">Yaş Hesaplama</Badge>
            <Badge variant="secondary">Modern UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
} 