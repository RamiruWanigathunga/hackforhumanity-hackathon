import { Provider, ProviderSlot } from "@/server/db/schema";
import { getColomboToday, getColomboOffsetDate } from "@/lib/time";

export interface SeedProviderDef {
  id: string;
  displayName: string;
  categories: ("plumbing" | "electrical" | "ac_appliance")[];
  tags: string[];
  homeArea: string;
  areasServed: string[];
  languages: ("si" | "ta" | "en")[];
  rating: string;
  jobsCompleted: number;
  visitFeeLkr: number | null;
  phoneMasked: string;
  bio: string;
}

export const SEED_PROVIDERS_RAW: SeedProviderDef[] = [
  // Plumbing (6)
  {
    id: "prov-p1",
    displayName: "Kasun Perera",
    categories: ["plumbing"],
    tags: ["leak", "pipe", "tap", "blocked_drain"],
    homeArea: "Nugegoda",
    areasServed: ["Nugegoda", "Gangodawila", "Mirihana", "Pagoda", "Kirulapone"],
    languages: ["si", "en"],
    rating: "4.8",
    jobsCompleted: 142,
    visitFeeLkr: 2000,
    phoneMasked: "+94 71 XXX XX12",
    bio: "Certified domestic plumber with 9+ years experience handling pipes, leaks, and bathroom fixtures.",
  },
  {
    id: "prov-p2",
    displayName: "S. Kumaran",
    categories: ["plumbing"],
    tags: ["leak", "pipe", "toilet", "water_pump", "pipe_burst"],
    homeArea: "Gangodawila",
    areasServed: ["Gangodawila", "Nugegoda", "Delkanda", "Pagoda"],
    languages: ["ta", "si", "en"],
    rating: "4.7",
    jobsCompleted: 98,
    visitFeeLkr: 2500,
    phoneMasked: "+94 77 XXX XX45",
    bio: "Emergency leak and water pump repair specialist across Nugegoda and Gangodawila.",
  },
  {
    id: "prov-p3",
    displayName: "Ramesh Thevarajah",
    categories: ["plumbing"],
    tags: ["leak", "pipe", "tap", "water_tank"],
    homeArea: "Kirulapone",
    areasServed: ["Kirulapone", "Nugegoda", "Mirihana"],
    languages: ["ta", "en"],
    rating: "4.6",
    jobsCompleted: 64,
    visitFeeLkr: null,
    phoneMasked: "+94 76 XXX XX89",
    bio: "Water line fitting, overhead tank installation, and quick tap leak resolution.",
  },
  {
    id: "prov-p4",
    displayName: "Nadeesha Fernando",
    categories: ["plumbing"],
    tags: ["leak", "blocked_drain", "toilet"],
    homeArea: "Pagoda",
    areasServed: ["Pagoda", "Nugegoda", "Mirihana"],
    languages: ["si", "en"],
    rating: "4.9",
    jobsCompleted: 210,
    visitFeeLkr: 3000,
    phoneMasked: "+94 72 XXX XX33",
    bio: "Specializing in blocked drains, sanitary fittings, and bathroom pipe maintenance.",
  },
  {
    id: "prov-p5",
    displayName: "M. Rizwan",
    categories: ["plumbing"],
    tags: ["leak", "pipe", "water_pump", "blocked_drain"],
    homeArea: "Delkanda",
    areasServed: ["Delkanda", "Gangodawila", "Udahamulla", "Nugegoda"],
    languages: ["ta", "si", "en"],
    rating: "4.5",
    jobsCompleted: 53,
    visitFeeLkr: 1800,
    phoneMasked: "+94 75 XXX XX67",
    bio: "Prompt service for household plumbing repairs, water pumps, and valve replacements.",
  },
  {
    id: "prov-p6",
    displayName: "Chandana Wickramasinghe",
    categories: ["plumbing"],
    tags: ["leak", "pipe", "toilet", "water_tank"],
    homeArea: "Udahamulla",
    areasServed: ["Udahamulla", "Mirihana", "Delkanda"],
    languages: ["si"],
    rating: "4.3",
    jobsCompleted: 35,
    visitFeeLkr: 1500,
    phoneMasked: "+94 78 XXX XX21",
    bio: "Local plumber experienced with water tanks, pvc piping, and commode flushes.",
  },

  // Electrical (6)
  {
    id: "prov-e1",
    displayName: "Tharindu Silva",
    categories: ["electrical"],
    tags: ["tripping", "socket_switch", "wiring", "ceiling_fan", "burning_smell"],
    homeArea: "Nugegoda",
    areasServed: ["Nugegoda", "Gangodawila", "Mirihana", "Pagoda", "Kirulapone"],
    languages: ["si", "en"],
    rating: "4.9",
    jobsCompleted: 184,
    visitFeeLkr: 2500,
    phoneMasked: "+94 77 XXX XX04",
    bio: "Licensed domestic electrician. Rapid troubleshooting for tripping breakers, fan repairs, and rewiring.",
  },
  {
    id: "prov-e2",
    displayName: "K. Sivaganeshan",
    categories: ["electrical"],
    tags: ["no_power", "tripping", "wiring", "lighting"],
    homeArea: "Kirulapone",
    areasServed: ["Kirulapone", "Nugegoda", "Pagoda"],
    languages: ["ta", "en", "si"],
    rating: "4.7",
    jobsCompleted: 112,
    visitFeeLkr: 2000,
    phoneMasked: "+94 71 XXX XX56",
    bio: "Experienced wireman for residential distribution board issues, power faults, and lighting fixtures.",
  },
  {
    id: "prov-e3",
    displayName: "Dinesh Jayakody",
    categories: ["electrical", "ac_appliance"],
    tags: ["socket_switch", "ceiling_fan", "lighting", "inverter_ups", "burning_smell"],
    homeArea: "Mirihana",
    areasServed: ["Mirihana", "Nugegoda", "Udahamulla", "Pagoda"],
    languages: ["si", "en"],
    rating: "4.6",
    jobsCompleted: 78,
    visitFeeLkr: 2200,
    phoneMasked: "+94 70 XXX XX91",
    bio: "Ceiling fans, switches, inverter backup connections, and safety checks.",
  },
  {
    id: "prov-e4",
    displayName: "A. R. Mohamed",
    categories: ["electrical"],
    tags: ["no_power", "tripping", "socket_switch", "wiring"],
    homeArea: "Delkanda",
    areasServed: ["Delkanda", "Gangodawila", "Nugegoda", "Udahamulla"],
    languages: ["ta", "si"],
    rating: "4.4",
    jobsCompleted: 45,
    visitFeeLkr: 1500,
    phoneMasked: "+94 76 XXX XX22",
    bio: "Troubleshooting electrical short-circuits, wall sockets, and trip switch faults.",
  },
  {
    id: "prov-e5",
    displayName: "Pradeep Samarakoon",
    categories: ["electrical"],
    tags: ["ceiling_fan", "socket_switch", "lighting"],
    homeArea: "Gangodawila",
    areasServed: ["Gangodawila", "Nugegoda", "Delkanda"],
    languages: ["si", "en"],
    rating: "4.5",
    jobsCompleted: 92,
    visitFeeLkr: null,
    phoneMasked: "+94 72 XXX XX78",
    bio: "Specializing in ceiling fan installations, regulator fixes, and modern LED lighting.",
  },
  {
    id: "prov-e6",
    displayName: "Gayan Karunaratne",
    categories: ["electrical"],
    tags: ["tripping", "wiring", "no_power", "inverter_ups"],
    homeArea: "Pagoda",
    areasServed: ["Pagoda", "Nugegoda", "Gangodawila"],
    languages: ["si"],
    rating: "4.3",
    jobsCompleted: 39,
    visitFeeLkr: 1800,
    phoneMasked: "+94 78 XXX XX19",
    bio: "Home electrical repairs, circuit tracing, and fuse box maintenance.",
  },

  // AC & Appliances (6)
  {
    id: "prov-a1",
    displayName: "Ruwan Senanayake",
    categories: ["ac_appliance"],
    tags: ["ac_not_cooling", "ac_leaking", "ac_service"],
    homeArea: "Nugegoda",
    areasServed: ["Nugegoda", "Gangodawila", "Mirihana", "Kirulapone", "Pagoda"],
    languages: ["si", "en"],
    rating: "4.8",
    jobsCompleted: 165,
    visitFeeLkr: 3500,
    phoneMasked: "+94 77 XXX XX81",
    bio: "Inverter AC servicing, gas charging, leak troubleshooting, and comprehensive maintenance.",
  },
  {
    id: "prov-a2",
    displayName: "T. Vimalan",
    categories: ["ac_appliance"],
    tags: ["ac_not_cooling", "ac_service", "fridge"],
    homeArea: "Mirihana",
    areasServed: ["Mirihana", "Nugegoda", "Udahamulla"],
    languages: ["ta", "si", "en"],
    rating: "4.7",
    jobsCompleted: 130,
    visitFeeLkr: 3000,
    phoneMasked: "+94 71 XXX XX99",
    bio: "HVAC and refrigeration technician. Quick response for ACs not cooling and refrigerator thermostats.",
  },
  {
    id: "prov-a3",
    displayName: "Priyantha Liyanage",
    categories: ["ac_appliance"],
    tags: ["washing_machine", "water_heater", "microwave"],
    homeArea: "Gangodawila",
    areasServed: ["Gangodawila", "Nugegoda", "Delkanda", "Pagoda"],
    languages: ["si", "en"],
    rating: "4.6",
    jobsCompleted: 85,
    visitFeeLkr: 2500,
    phoneMasked: "+94 76 XXX XX14",
    bio: "Repairing front-load and top-load washing machines, geysers, and domestic microwave ovens.",
  },
  {
    id: "prov-a4",
    displayName: "Farhan Naeem",
    categories: ["ac_appliance"],
    tags: ["ac_leaking", "ac_service", "water_heater"],
    homeArea: "Delkanda",
    areasServed: ["Delkanda", "Gangodawila", "Nugegoda", "Udahamulla"],
    languages: ["ta", "si", "en"],
    rating: "4.5",
    jobsCompleted: 60,
    visitFeeLkr: 2500,
    phoneMasked: "+94 75 XXX XX38",
    bio: "AC coil washing, drainage unclogging, and instantaneous water heater repairs.",
  },
  {
    id: "prov-a5",
    displayName: "Saman Kumara",
    categories: ["ac_appliance"],
    tags: ["fridge", "washing_machine"],
    homeArea: "Pagoda",
    areasServed: ["Pagoda", "Nugegoda", "Mirihana"],
    languages: ["si"],
    rating: "4.4",
    jobsCompleted: 50,
    visitFeeLkr: 2000,
    phoneMasked: "+94 72 XXX XX55",
    bio: "Domestic refrigerator compressor fixes, freezer issues, and washing machine motor troubleshooting.",
  },
  {
    id: "prov-a6",
    displayName: "Niroshan Perera",
    categories: ["ac_appliance"],
    tags: ["ac_not_cooling", "ac_service", "microwave"],
    homeArea: "Udahamulla",
    areasServed: ["Udahamulla", "Mirihana", "Delkanda"],
    languages: ["si", "en"],
    rating: "4.3",
    jobsCompleted: 28,
    visitFeeLkr: null,
    phoneMasked: "+94 78 XXX XX62",
    bio: "General appliance repairs, AC filter cleaning, and microwave repairs in Nugegoda outskirts.",
  },
];

export const FALLBACK_PROVIDERS: Provider[] = SEED_PROVIDERS_RAW.map((p) => ({
  ...p,
  verificationStatus: "verified" as const,
  active: true,
}));

export function getFallbackProvidersWithSlots() {
  const today = getColomboToday();
  const tomorrow = getColomboOffsetDate(1);
  const dayAfter = getColomboOffsetDate(2);
  const dates = [today, tomorrow, dayAfter];
  const windows = ["morning", "afternoon", "evening"] as const;

  return FALLBACK_PROVIDERS.map((provider) => {
    const slots: ProviderSlot[] = [];
    dates.forEach((date, dIdx) => {
      windows.forEach((win, wIdx) => {
        // Pseudo-deterministic pattern to create available slots
        if ((dIdx + wIdx + provider.id.charCodeAt(provider.id.length - 1)) % 2 === 0) {
          slots.push({
            id: `slot-${provider.id}-${date}-${win}`,
            providerId: provider.id,
            date,
            window: win,
            status: "available",
          });
        }
      });
    });

    return {
      provider,
      slots,
    };
  });
}
