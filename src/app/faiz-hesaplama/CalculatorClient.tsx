"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FaizHesaplamaClient() {
  const [anapara, setAnapara] = useState("");
  const [oran, setOran] = useState("");
  const [vade, setVade] = useState("");
  const [vadeTipi, setVadeTipi] = useState("ay");
  const [vergi, setVergi] = useState("");
  const [sonuc, setSonuc] = useState<string | null>(null);

  function hesapla() {
    const a = parseFloat(anapara.replace(",", "."));
    const o = parseFloat(oran.replace(",", "."));
    const v = parseFloat(vade.replace(",", "."));
    const vergiOrani = vergi ? parseFloat(vergi.replace(",", ".")) : 0;
    if (!a || !o || !v) {
      setSonuc("Lütfen tüm alanları doldurunuz.");
      return;
    }
    const vadeAy = vadeTipi === "gün" ? v / 30.44 : v;
    const faiz = a * o * vadeAy / 1200;
    const vergiTutar = faiz * (vergiOrani / 100);
    const toplamFaiz = faiz - vergiTutar;
    const toplam = a + toplamFaiz;
    setSonuc(
      `<div class='space-y-2'>
        <div><b>Brüt Faiz:</b> ${faiz.toFixed(2)} TL</div>
        <div><b>Vergi (${vergiOrani}%):</b> ${vergiTutar.toFixed(2)} TL</div>
        <div><b>Net Faiz:</b> ${toplamFaiz.toFixed(2)} TL</div>
        <div><b>Toplam Geri Ödeme:</b> ${toplam.toFixed(2)} TL</div>
      </div>`
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 py-8 pt-24">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Faiz Hesaplama</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Anapara (TL)</label>
            <input type="number" value={anapara} onChange={e=>setAnapara(e.target.value)} placeholder="Örn: 10000" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Faiz Oranı (% yıllık)</label>
            <input type="number" value={oran} onChange={e=>setOran(e.target.value)} placeholder="Örn: 36" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Vade</label>
              <input type="number" value={vade} onChange={e=>setVade(e.target.value)} placeholder="Örn: 12" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Vade Tipi</label>
              <select value={vadeTipi} onChange={e=>setVadeTipi(e.target.value)} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground">
                <option value="ay">Ay</option>
                <option value="gün">Gün</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vergi Oranı (%) <span className="text-xs text-muted-foreground">(isteğe bağlı)</span></label>
            <input type="number" value={vergi} onChange={e=>setVergi(e.target.value)} placeholder="Örn: 15" className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" />
          </div>
          <Button className="w-full mt-2" onClick={hesapla}>Hesapla</Button>
          {sonuc && (
            <Card className="p-4 bg-secondary/50 mt-2 text-center">
              <div dangerouslySetInnerHTML={{ __html: sonuc }} />
            </Card>
          )}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Badge variant="secondary">Basit Faiz</Badge>
            <Badge variant="secondary">Vergi Hesaplı</Badge>
            <Badge variant="secondary">Modern UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
} 