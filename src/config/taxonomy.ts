export const CATEGORIES = ["plumbing", "electrical", "ac_appliance"] as const;
export type Category = (typeof CATEGORIES)[number] | "unknown";

export interface TaxonomyTag {
  id: string;
  category: (typeof CATEGORIES)[number];
  label_en: string;
  label_si?: string;
  label_ta?: string;
  keywords: string[];
}

export const TAXONOMY: TaxonomyTag[] = [
  // Plumbing
  {
    id: "leak",
    category: "plumbing",
    label_en: "Leak / Dripping",
    label_si: "කාන්දුව",
    label_ta: "கசிவு",
    keywords: ["leak", "leaking", "kandu", "kanduwak", "vathura yanawa", "diyawenawa", "ozhugu", "කාන්දු", "ஒழுகு"],
  },
  {
    id: "pipe",
    category: "plumbing",
    label_en: "Pipe repair",
    label_si: "බට අලුත්වැඩියාව",
    label_ta: "குழாய் பழுது",
    keywords: ["pipe", "bata", "bata eka", "kulaai", "sink pipe", "drain pipe", "drainage", "බට", "குழாய்"],
  },
  {
    id: "blocked_drain",
    category: "plumbing",
    label_en: "Blocked drain",
    label_si: "හිරවීම්",
    label_ta: "அடைப்பு",
    keywords: ["blocked", "clogged", "hira wela", "vathura bahinne na", "adaippu", "ஹடைப்பு"],
  },
  {
    id: "tap",
    category: "plumbing",
    label_en: "Tap / Faucet",
    label_si: "කරාමය",
    label_ta: "குழாய் திருகி",
    keywords: ["tap", "karamaya", "cock", "water tap", "faucet", "කරාම"],
  },
  {
    id: "toilet",
    category: "plumbing",
    label_en: "Toilet / Commode",
    label_si: "වැසිකිලි / කොමෝඩ්",
    label_ta: "கழிப்பறை",
    keywords: ["toilet", "commode", "flush", "cistern", "kakussiya"],
  },
  {
    id: "water_pump",
    category: "plumbing",
    label_en: "Water pump",
    label_si: "වතුර මෝටරය",
    label_ta: "தண்ணீர் பம்ப்",
    keywords: ["pump", "motor", "water pump", "motare", "pumpuwa"],
  },
  {
    id: "water_tank",
    category: "plumbing",
    label_en: "Water tank",
    label_si: "වතුර ටැංකිය",
    label_ta: "தண்ணீர் தொட்டி",
    keywords: ["tank", "water tank", "tankiya"],
  },
  {
    id: "pipe_burst",
    category: "plumbing",
    label_en: "Pipe burst / Major flood",
    label_si: "බට පිපිරීම",
    label_ta: "குழாய் வெடிப்பு",
    keywords: ["burst", "pipirila", "flooding", "pipe broke", "pala gihin"],
  },

  // Electrical
  {
    id: "no_power",
    category: "electrical",
    label_en: "No power / Outage",
    label_si: "විදුලිය විසන්ධි වීම",
    label_ta: "மின்சாரம் இல்லை",
    keywords: ["no power", "current na", "current naha", "lights off", "power drop", "minsaram"],
  },
  {
    id: "tripping",
    category: "electrical",
    label_en: "Breaker tripping",
    label_si: "ට්‍රිප් වීම",
    label_ta: "முறிப்பான் தடை",
    keywords: ["trip", "tripping", "breaker", "trip switch", "trip wenawa", "main switch"],
  },
  {
    id: "socket_switch",
    category: "electrical",
    label_en: "Socket & Switch",
    label_si: "ප්ලග් / ස්විච",
    label_ta: "சுவிட்ச்",
    keywords: ["socket", "switch", "plug", "wall switch", "switcheka"],
  },
  {
    id: "wiring",
    category: "electrical",
    label_en: "Wiring & cables",
    label_si: "වයරින්",
    label_ta: "மின் கம்பி",
    keywords: ["wire", "wiring", "cable", "short", "kambi"],
  },
  {
    id: "lighting",
    category: "electrical",
    label_en: "Lighting / Bulbs",
    label_si: "විදුලි පහන්",
    label_ta: "விளக்கு",
    keywords: ["light", "bulb", "lamp", "chandel", "pahan"],
  },
  {
    id: "ceiling_fan",
    category: "electrical",
    label_en: "Ceiling fan",
    label_si: "විදුලි පංකාව",
    label_ta: "மின்விசிறி",
    keywords: ["fan", "ceiling fan", "fan eka", "karakenne na", "visiri", "පංකා"],
  },
  {
    id: "burning_smell",
    category: "electrical",
    label_en: "Burning smell / Sparks",
    label_si: "පිළිස්සුණු ගඳ / ගිනි පුපුරු",
    label_ta: "எரியும் வாசனை / தீப்பொறி",
    keywords: ["burning smell", "sparks", "smoke", "gini pupuru", "dumanawa", "karawena gada", "pukay"],
  },
  {
    id: "inverter_ups",
    category: "electrical",
    label_en: "Inverter / UPS / Battery",
    label_si: "ඉන්වර්ටර් / බැටරි",
    label_ta: "மின் மாற்றி",
    keywords: ["inverter", "ups", "battery", "backup"],
  },

  // AC & Appliances
  {
    id: "ac_not_cooling",
    category: "ac_appliance",
    label_en: "AC not cooling",
    label_si: "AC සිසිල් නොවීම",
    label_ta: "ஏசி குளிரவில்லை",
    keywords: ["ac", "not cooling", "air conditioner", "cool wenna na", "seethala wenne na", "kulira villai", "සීතල වෙන්නේ නැහැ"],
  },
  {
    id: "ac_leaking",
    category: "ac_appliance",
    label_en: "AC water leak",
    label_si: "AC වතුර කාන්දුව",
    label_ta: "ஏசி நீர் கசிவு",
    keywords: ["ac leaking", "ac water", "ac eken vathura"],
  },
  {
    id: "ac_service",
    category: "ac_appliance",
    label_en: "AC routine service",
    label_si: "AC සර්විස් කිරීම",
    label_ta: "ஏசி பராமரிப்பு",
    keywords: ["ac service", "clean ac", "gas refill", "servis"],
  },
  {
    id: "fridge",
    category: "ac_appliance",
    label_en: "Refrigerator / Fridge",
    label_si: "ශීතකරණය",
    label_ta: "குளிர்சாதன பெட்டி",
    keywords: ["fridge", "refrigerator", "ice box", "refrigeration"],
  },
  {
    id: "washing_machine",
    category: "ac_appliance",
    label_en: "Washing machine",
    label_si: "රෙදි සෝදන යන්ත්‍රය",
    label_ta: "சலவை இயந்திரம்",
    keywords: ["washing machine", "washer", "redhi sodana"],
  },
  {
    id: "water_heater",
    category: "ac_appliance",
    label_en: "Water heater / Geyser",
    label_si: "වතුර හීටරය",
    label_ta: "நீர் சூடாக்கி",
    keywords: ["water heater", "geyser", "heater", "hot water"],
  },
  {
    id: "microwave",
    category: "ac_appliance",
    label_en: "Microwave oven",
    label_si: "මයික්‍රෝවේව් උඳුන",
    label_ta: "நுண்ணலை அடுப்பு",
    keywords: ["microwave", "oven", "micro wave"],
  },
];

export function getTagsForCategory(category: Category): TaxonomyTag[] {
  if (category === "unknown") return [];
  return TAXONOMY.filter((t) => t.category === category);
}

export function isValidTag(tagId: string, category: Category): boolean {
  return TAXONOMY.some((t) => t.id === tagId && t.category === category);
}
