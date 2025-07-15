"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function KalanGunHesaplamaClient() {
  const [hedef, setHedef] = useState("");
  const [sonuc, setSonuc] = useState("");

  function hesapla() {
    if (!hedef) {
      setSonuc("Lütfen hedef tarihi giriniz.");
      return;
    }
    const h = new Date(hedef);
    const bugun = new Date();
    if (isNaN(h.getTime())) {
      setSonuc("Geçerli bir tarih giriniz.");
      return;
    }
    const farkMs = h.getTime() - bugun.getTime();
    if (farkMs < 0) {
      setSonuc("Bu tarih geçmişte!");
      return;
    }
    const gun = Math.ceil(farkMs / (1000 * 60 * 60 * 24));
    setSonuc(`${gun} gün kaldı.`);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 py-8 pt-24">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Kalan Gün Hesaplama</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hedef Tarih</label>
            <input type="date" value={hedef} onChange={e=>setHedef(e.target.value)} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <Button className="w-full mt-2" onClick={hesapla}>Hesapla</Button>
          {sonuc && (
            <Card className="p-4 bg-secondary/50 mt-2 text-center">
              <div>{sonuc}</div>
            </Card>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Badge variant="secondary">Kalan Gün</Badge>
            <Badge variant="secondary">Modern UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
} 