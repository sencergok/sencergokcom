"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VucutKitleIndeksiHesaplamaClient() {
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [sonuc, setSonuc] = useState("");

  function hesapla() {
    const b = parseFloat(boy.replace(",", "."));
    const k = parseFloat(kilo.replace(",", "."));
    if (!b || !k) {
      setSonuc("Lütfen boy ve kilo giriniz.");
      return;
    }
    const bmi = k / ((b / 100) ** 2);
    let durum = "";
    if (bmi < 18.5) durum = "Zayıf";
    else if (bmi < 25) durum = "Normal";
    else if (bmi < 30) durum = "Fazla kilolu";
    else durum = "Obez";
    setSonuc(`BMI: ${bmi.toFixed(1)} (${durum})`);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 py-8 pt-24">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Vücut Kitle İndeksi Hesaplama</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Boy (cm)</label>
            <input type="number" value={boy} onChange={e=>setBoy(e.target.value)} placeholder="Örn: 170" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kilo (kg)</label>
            <input type="number" value={kilo} onChange={e=>setKilo(e.target.value)} placeholder="Örn: 65" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <Button className="w-full mt-2" onClick={hesapla}>Hesapla</Button>
          {sonuc && (
            <Card className="p-4 bg-secondary/50 mt-2 text-center">
              <div>{sonuc}</div>
            </Card>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Badge variant="secondary">BMI</Badge>
            <Badge variant="secondary">Modern UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
} 