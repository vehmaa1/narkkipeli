"use client";
import { useState } from "react";
import { TierItem, DEFAULT_TIERS } from "@/lib/types";

interface TierEditorProps {
  tiers: TierItem[]; onSave: (tiers: TierItem[]) => void; onClose: () => void;
}

export function TierEditor({ tiers, onSave, onClose }: TierEditorProps) {
  const [localTiers, setLocalTiers] = useState<TierItem[]>(tiers);

  const update = (idx: number, field: keyof TierItem, value: string) =>
    setLocalTiers(prev => prev.map((t, i) => i === idx ? { ...t, [field]: value } : t));

  const uploadImage = (idx: number, file: File) => {
    const reader = new FileReader();
    reader.onload = e =>
      setLocalTiers(prev => prev.map((t, i) => i === idx ? { ...t, image: e.target?.result as string } : t));
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ backgroundColor: "#faf8ef", borderRadius: 16, padding: 24, width: "100%",
        maxWidth: 700, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontFamily: "'Courier New', monospace", color: "#776e65", fontSize: 22 }}>
            🎨 Muokkaa Tierejä
          </h2>
          <button onClick={onClose} style={{ background: "#bbada0", border: "none", borderRadius: 8,
            padding: "6px 14px", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#fff" }}>✕</button>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {localTiers.map((tier, idx) => (
            <div key={tier.id} style={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr auto auto",
              gap: 8, alignItems: "center", backgroundColor: tier.color,
              padding: "8px 12px", borderRadius: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 6, overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                {tier.image
                  ? <img src={tier.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  : <span style={{ fontSize: 22 }}>{tier.emoji}</span>}
              </div>
              <input value={tier.name} onChange={e => update(idx, "name", e.target.value)}
                placeholder={`Tier ${tier.id}`} style={{ padding: "6px 10px", borderRadius: 6,
                  border: "2px solid rgba(0,0,0,0.1)", fontSize: 13, fontWeight: 600,
                  color: tier.textColor, backgroundColor: "rgba(255,255,255,0.6)", width: "100%" }} />
              <input value={tier.emoji} onChange={e => update(idx, "emoji", e.target.value)}
                placeholder="Emoji" style={{ padding: "6px 10px", borderRadius: 6,
                  border: "2px solid rgba(0,0,0,0.1)", fontSize: 13,
                  backgroundColor: "rgba(255,255,255,0.6)", width: "100%" }} />
              <label style={{ padding: "6px 10px", backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700,
                whiteSpace: "nowrap", border: "2px solid rgba(0,0,0,0.1)", color: "#555" }}>
                📷
                <input type="file" accept="image/*" style={{ display: "none" }}
                  onChange={e => { if (e.target.files?.[0]) uploadImage(idx, e.target.files[0]); }} />
              </label>
              <button onClick={() => setLocalTiers(prev => prev.map((t, i) => i === idx ? { ...DEFAULT_TIERS[idx] } : t))}
                style={{ padding: "6px 8px", backgroundColor: "rgba(255,255,255,0.5)",
                  border: "2px solid rgba(0,0,0,0.1)", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>↺</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", backgroundColor: "#bbada0",
            color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>Peruuta</button>
          <button onClick={() => { onSave(localTiers); onClose(); }}
            style={{ padding: "10px 24px", backgroundColor: "#f59563", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>💾 Tallenna</button>
        </div>
      </div>
    </div>
  );
}