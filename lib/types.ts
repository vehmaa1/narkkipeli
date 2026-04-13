export interface TierItem {
  id: number;
  name: string;
  image: string;      // polku public/-kansiosta, esim. "/tiers/olut.png"
  color: string;      // taustaväri ruudussa
  textColor: string;  // nimen tekstiväri
}

export interface Cell {
  id: string;
  tierId: number;
  row: number;
  col: number;
  merging?: boolean;
  isNew?: boolean;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  topTier: string;
  date: string;
}

export const DEFAULT_TIERS: TierItem[] = [
  { id: 1,  name: "Kupari",  image: "/tiers/kupari.jpg",  color: "#f9f0d8", textColor: "#6b5a3e" },
  { id: 2,  name: "Sandels",  image: "/tiers/sandels.jpg",  color: "#f5e4b0", textColor: "#6b5a3e" },
  { id: 3,  name: "Lonkero",  image: "/tiers/lonkero.jpg",  color: "#f0d070", textColor: "#5a4a1e" },
  { id: 4,  name: "Valdemar",  image: "/tiers/valdemar.jpg",  color: "#f0a050", textColor: "#fff" },
  { id: 5,  name: "Gato Negro",  image: "/tiers/gato-negro.jpg",  color: "#e88040", textColor: "#fff" },
  { id: 6,  name: "Salmari",  image: "/tiers/salmari.jpg",  color: "#e06030", textColor: "#fff" },
  { id: 7,  name: "Jägermeister",  image: "/tiers/jagermeister.jpg",  color: "#c04020", textColor: "#fff" },
  { id: 8,  name: "Jack Daniels",  image: "/tiers/jack-daniels.jpg",  color: "#903010", textColor: "#fff" },
  { id: 9,  name: "Vergi",  image: "/tiers/vergi.jpg",  color: "#601000", textColor: "#fff" },
  { id: 10, name: "Absintti", image: "/tiers/absintti.jpg", color: "#3a0080", textColor: "#fff" },
  { id: 11, name: "Vergi 80%", image: "/tiers/vergi80.jpg", color: "#5500aa", textColor: "#fff" },
  { id: 12, name: "Smirnoff Silver", image: "/tiers/smirnoff.jpg", color: "#0044cc", textColor: "#fff" },
  { id: 13, name: "Lasol", image: "/tiers/lasol.png", color: "#006633", textColor: "#fff" },
  { id: 14, name: "Kannabis", image: "/tiers/kannabis.jpg", color: "#cc9900", textColor: "#fff" },
  { id: 15, name: "Ekstaasi", image: "/tiers/ekstaasi.jpg", color: "#cc5500", textColor: "#fff" },
  { id: 16, name: "Kokaiini", image: "/tiers/kokaiini.jpg", color: "#cc0033", textColor: "#fff" },
  { id: 17, name: "Piri", image: "/tiers/amfetamin.jpg", color: "#222222", textColor: "#fff" },
  { id: 18, name: "Heroiini", image: "/tiers/heroiini.jpg", color: "#ddddff", textColor: "#222" },
  { id: 19, name: "Peukku", image: "/tiers/peukku.jpg", color: "#ffd700", textColor: "#222" },
  { id: 20, name: "Kuolema (Webb Joshua)", image: "/tiers/kuolema.jpg", color: "#ff0066", textColor: "#fff" },
];