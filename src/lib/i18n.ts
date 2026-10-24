export type Language = "en" | "si" | "ta";

export interface Translations {
  nav: {
    findServices: string;
    directory: string;
    howItWorks: string;
    scoringModel: string;
    bookings: string;
    providerPortal: string;
    providerInbox: string;
    getStarted: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    nearMe: string;
    findSpecialist: string;
    analyzing: string;
    schedulingOptions: string;
    hideSchedulingOptions: string;
    colomboTime: string;
    preferredDay: string;
    timeWindow: string;
    yourName: string;
    namePlaceholder: string;
    today: string;
    tomorrow: string;
    dayAfter: string;
    flexible: string;
    morning: string;
    afternoon: string;
    evening: string;
    scenarioPresets: string;
    demoChips: {
      sink: { label: string; text: string };
      fan: { label: string; text: string };
      ac: { label: string; text: string };
      tap: { label: string; text: string };
    };
  };
  mockup: {
    engineTitle: string;
    matchConfidence: string;
    activeIntake: string;
    sampleProblem: string;
    categoryLabel: string;
    categoryValue: string;
    proximityLabel: string;
    proximityValue: string;
    matchedSpecialist: string;
    technicianName: string;
    technicianRole: string;
    visitFeeLabel: string;
    visitFeeValue: string;
    nextSlotLabel: string;
    nextSlotValue: string;
    guaranteeText: string;
  };
  categories: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    categoryCount: string;
    selectService: string;
    items: {
      electrical: { name: string; subtitle: string; samplePrompt: string };
      plumbing: { name: string; subtitle: string; samplePrompt: string };
      ac_appliance: { name: string; subtitle: string; samplePrompt: string };
      mechanic: { name: string; subtitle: string; samplePrompt: string };
      cleaning: { name: string; subtitle: string; samplePrompt: string };
      carpenter: { name: string; subtitle: string; samplePrompt: string };
      painter: { name: string; subtitle: string; samplePrompt: string };
      pest_control: { name: string; subtitle: string; samplePrompt: string };
      salon: { name: string; subtitle: string; samplePrompt: string };
      security: { name: string; subtitle: string; samplePrompt: string };
    };
  };
  principles: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    searchCompareTitle: string;
    searchCompareDesc: string;
    verifiedProvidersTitle: string;
    verifiedProvidersDesc: string;
    bookInstantlyTitle: string;
    bookInstantlyDesc: string;
    realReviewsTitle: string;
    realReviewsDesc: string;
  };
  business: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    registerBtn: string;
    loginBtn: string;
  };
  technicians: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    ratingLabel: string;
    jobsLabel: string;
    visitFeeLabel: string;
    selectBtn: string;
  };
  footer: {
    preTitle: string;
    preHeading: string;
    preSub: string;
    preBtnFind: string;
    preBtnRegister: string;
    tagline: string;
    pilotInfo: string;
    colServices: string;
    colTech: string;
    colProviders: string;
    colGovernance: string;
    legalNote: string;
    poweredBy: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      findServices: "Find Services",
      directory: "Directory",
      howItWorks: "How It Works",
      scoringModel: "Scoring Model",
      bookings: "Bookings",
      providerPortal: "Provider Portal",
      providerInbox: "Provider Inbox",
      getStarted: "Get Started",
    },
    hero: {
      eyebrow: "Institutional Service Infrastructure / Colombo Pilot",
      title: "The future of local trade verification.",
      subtitle:
        "Search verified electricians, plumbers, and AC technicians across Colombo. Describe your problem naturally in English, Sinhala, Tamil, or Singlish. Our explainable deterministic algorithm matches you with available local specialists.",
      searchPlaceholder: "What needs fixing? e.g. AC leaking, pipe burst, breaker tripping...",
      nearMe: "Near Me",
      findSpecialist: "Find Specialist",
      analyzing: "Analyzing with AI...",
      schedulingOptions: "Specify preferred day and time window",
      hideSchedulingOptions: "Hide scheduling options",
      colomboTime: "Today is Colombo time",
      preferredDay: "Preferred Day",
      timeWindow: "Time Window",
      yourName: "Your Name (Optional)",
      namePlaceholder: "e.g. Anura",
      today: "Today",
      tomorrow: "Tomorrow (Recommended)",
      dayAfter: "Day after tomorrow",
      flexible: "Flexible / Any",
      morning: "Morning (8 AM - 12 PM)",
      afternoon: "Afternoon (12 PM - 4 PM)",
      evening: "Evening (4 PM - 7 PM)",
      scenarioPresets: "Sample scenario presets:",
      demoChips: {
        sink: {
          label: "Sink pipe leak (English)",
          text: "My kitchen sink pipe is leaking under the counter, need someone tomorrow morning",
        },
        fan: {
          label: "Fan and burning smell (Singlish)",
          text: "fan eka karakenne na, switch eken burning smell ekak enawa",
        },
        ac: {
          label: "AC not cooling (Sinhala)",
          text: "AC එක හරියට සීතල වෙන්නේ නැහැ, හෙට හවස එන්න පුළුවන්ද?",
        },
        tap: {
          label: "Bathroom tap (Tamil)",
          text: "குளியலறை குழாய் ஒழுகுகிறது, நாளை காலை வர முடியுமா?",
        },
      },
    },
    mockup: {
      engineTitle: "Verified Dispatch Engine",
      matchConfidence: "Match Confidence",
      activeIntake: "Active Resident Intake",
      sampleProblem: "Sink pipe leaking under counter / Urgent valve check",
      categoryLabel: "Category",
      categoryValue: "Plumbing",
      proximityLabel: "Proximity Area",
      proximityValue: "Nugegoda Cluster",
      matchedSpecialist: "Matched Specialist",
      technicianName: "Kasun Perera",
      technicianRole: "Licensed Master Plumber / 142 jobs",
      visitFeeLabel: "Visit Fee",
      visitFeeValue: "LKR 2,000",
      nextSlotLabel: "Next Availability:",
      nextSlotValue: "Tomorrow / Morning",
      guaranteeText: "100% Deterministic match. Zero sponsored positioning.",
    },
    categories: {
      sectionBadge: "Trade Taxonomy",
      title: "Explore verified services.",
      subtitle:
        "Select a trade to initiate an AI-assisted intake ticket or view specialist availability across the Colombo cluster.",
      categoryCount: "10 Standard Categories / Live Pilot",
      selectService: "Select Service",
      items: {
        electrical: {
          name: "Electrician",
          subtitle: "Wiring, fans, breakers and inverters",
          samplePrompt: "Ceiling fan stopped working, breaker trips when turning on",
        },
        plumbing: {
          name: "Plumber",
          subtitle: "Pipes, taps, pumps and drainage",
          samplePrompt: "Kitchen sink drain leaking and bathroom tap dripping",
        },
        ac_appliance: {
          name: "AC and Appliances",
          subtitle: "AC, fridge, washing machine",
          samplePrompt: "Split AC not cooling properly and making vibrating noise",
        },
        mechanic: {
          name: "Auto Mechanic",
          subtitle: "Car, van and vehicle repair",
          samplePrompt: "Car battery dead and engine will not start in morning",
        },
        cleaning: {
          name: "Cleaning",
          subtitle: "Home, office and deep cleaning",
          samplePrompt: "Deep apartment cleaning needed before tenant move-in",
        },
        carpenter: {
          name: "Carpenter",
          subtitle: "Furniture, doors and cabinets",
          samplePrompt: "Wooden front door lock stuck and cupboard hinges broken",
        },
        painter: {
          name: "Painter",
          subtitle: "House and building paint",
          samplePrompt: "Living room wall repainting and water dampness touchup",
        },
        pest_control: {
          name: "Pest Control",
          subtitle: "Termites, cockroaches and insects",
          samplePrompt: "Termite treatment needed for bedroom wooden door frame",
        },
        salon: {
          name: "Salon and Barber",
          subtitle: "Hair, beauty and home grooming",
          samplePrompt: "Home haircut and beard trim appointment needed",
        },
        security: {
          name: "CCTV and Security",
          subtitle: "Cameras, alarms and fences",
          samplePrompt: "CCTV camera offline and DVR recording storage check",
        },
      },
    },
    principles: {
      sectionBadge: "Platform Principles",
      title: "Engineered for transparency.",
      subtitle:
        "Every technician match is calculated deterministically with zero opaque ranking logic.",
      searchCompareTitle: "Search and Compare",
      searchCompareDesc:
        "Find local trade specialists by exact problem symptoms, pilot area proximity, and transparent ratings.",
      verifiedProvidersTitle: "Verified Providers",
      verifiedProvidersDesc:
        "Sample vetted technician profiles with transparent skill tags, visit fees, and zero hidden markups.",
      bookInstantlyTitle: "Book Instantly",
      bookInstantlyDesc:
        "Schedule visits in your preferred morning, afternoon, or evening window with instant confirmation.",
      realReviewsTitle: "Real Reviews",
      realReviewsDesc:
        "Explainable deterministic scoring with zero pay-to-win ranks or sponsored algorithmic distortion.",
    },
    business: {
      sectionBadge: "For Independent Technicians",
      title: "Grow your business with HelpDesk LK.",
      subtitle:
        "Join licensed and certified trade professionals across Colombo. Receive verified resident requests, publish your free availability calendar, and confirm bookings with zero commission fees.",
      benefit1: "Direct resident dispatch",
      benefit2: "Real-time calendar slot management",
      benefit3: "Verified technician credential status",
      benefit4: "Zero platform commission fees",
      registerBtn: "Register as Provider",
      loginBtn: "CRM Portal Login",
    },
    technicians: {
      sectionBadge: "Active Directory",
      title: "Featured verified technicians.",
      subtitle: "Licensed trade specialists active in the Colombo pilot cluster.",
      viewAll: "View all technicians",
      ratingLabel: "Rating",
      jobsLabel: "jobs",
      visitFeeLabel: "Visit fee:",
      selectBtn: "Select Technician",
    },
    footer: {
      preTitle: "Institutional Verification",
      preHeading: "Transparent local trade matching for Sri Lanka.",
      preSub:
        "Describe repair issues in everyday Sinhala, Tamil, Singlish, or English. Deterministic database rankings connect you directly to local technicians.",
      preBtnFind: "Find Local Technician",
      preBtnRegister: "Provider Registration",
      tagline:
        "Institutional local service coordination platform. Multilingual AI problem intake with explainable open scoring weights.",
      pilotInfo: "Colombo Pilot Cluster : Nugegoda, Mirihana, Kirulapone",
      colServices: "Services",
      colTech: "Technology",
      colProviders: "Providers",
      colGovernance: "Governance",
      legalNote:
        "Prototype developed for Hack for Humanity Colombo. All provider profiles are fictional sample data.",
      poweredBy: "Powered by Google Gemini and Supabase PostgreSQL.",
    },
  },

  si: {
    nav: {
      findServices: "සේවා සොයන්න",
      directory: "නාමාවලිය",
      howItWorks: "ක්‍රියාකාරීත්වය",
      scoringModel: "ලකුණු ක්‍රමය",
      bookings: "වෙන්කිරීම්",
      providerPortal: "සේවා සපයන්නන්ගේ ද්වාරය",
      providerInbox: "සේවා ඉන්බොක්ස්",
      getStarted: "ආරම්භ කරන්න",
    },
    hero: {
      eyebrow: "දේශීය සේවා යටිතල පහසුකම් / කොළඹ නියමු ව්‍යාපෘතිය",
      title: "දේශීය කාර්මික ශිල්පීන් සත්‍යාපනය කිරීමේ නව මග.",
      subtitle:
        "කොළඹ පුරා සත්‍යාපිත විදුලි කාර්මිකයන්, නල කාර්මිකයන් සහ AC කාර්මිකයන් සොයන්න. ඔබේ ගැටලුව සිංහල, දෙමළ, ඉංග්‍රීසි හෝ සිංග්ලිෂ් භාෂාවෙන් විස්තර කරන්න. විනිවිදභාවයෙන් යුතු ක්‍රමවේදය මඟින් ඔබට සුදුසුම ශිල්පියා සම්බන්ධ කරදේ.",
      searchPlaceholder: "මොකක්ද අලුත්වැඩියා වෙන්න ඕන? උදා. AC වතුර කාන්දුව, බට පිපිරීම, ට්‍රිප් ස්විචය...",
      nearMe: "මා අසල",
      findSpecialist: "ශිල්පියෙකු සොයන්න",
      analyzing: "AI මඟින් විශ්ලේෂණය කරමින්...",
      schedulingOptions: "දිනය සහ වේලාව තෝරන්න",
      hideSchedulingOptions: "වේලා විකල්ප සඟවන්න",
      colomboTime: "අද දිනය කොළඹ වේලාවෙන්",
      preferredDay: "කැමති දිනය",
      timeWindow: "වේලා කවුළුව",
      yourName: "ඔබේ නම (අවශ්‍ය නම්)",
      namePlaceholder: "උදා. අනුර",
      today: "අද",
      tomorrow: "හෙට (නිර්දේශිත)",
      dayAfter: "අනිද්දා",
      flexible: "ඕනෑම වේලාවක",
      morning: "උදෑසන (8 AM - 12 PM)",
      afternoon: "දවල් (12 PM - 4 PM)",
      evening: "සවස (4 PM - 7 PM)",
      scenarioPresets: "නියැදි ගැටලු අවස්ථා:",
      demoChips: {
        sink: {
          label: "සින්ක් බට කාන්දුව (English)",
          text: "My kitchen sink pipe is leaking under the counter, need someone tomorrow morning",
        },
        fan: {
          label: "ෆෑන් එක කරකැවෙන්නේ නැත (Singlish)",
          text: "fan eka karakenne na, switch eken burning smell ekak enawa",
        },
        ac: {
          label: "AC එක සිසිල් නොවේ (Sinhala)",
          text: "AC එක හරියට සීතල වෙන්නේ නැහැ, හෙට හවස එන්න පුළුවන්ද?",
        },
        tap: {
          label: "නානකාමර කරාමය (Tamil)",
          text: "குளியலறை குழாய் ஒழுகுகிறது, நாளை காலை வர முடியுமா?",
        },
      },
    },
    mockup: {
      engineTitle: "සත්‍යාපිත සම්බන්ධීකරණ පද්ධතිය",
      matchConfidence: "ගැළපීමේ විශ්වසනීයත්වය",
      activeIntake: "ක්‍රියාකාරී ගැටලු සටහන",
      sampleProblem: "සින්ක් එක යට බටය කාන්දු වීම / වෑල්වය පරීක්ෂා කිරීම",
      categoryLabel: "කාණ්ඩය",
      categoryValue: "නල කාර්මික",
      proximityLabel: "ආසන්න ප්‍රදේශය",
      proximityValue: "නුගේගොඩ කලාපය",
      matchedSpecialist: "තෝරාගත් ශිල්පියා",
      technicianName: "කසුන් පෙරේරා",
      technicianRole: "බලපත්‍රලාභී ප්‍රධාන නල කාර්මික / සේවා 142",
      visitFeeLabel: "පැමිණීමේ ගාස්තුව",
      visitFeeValue: "රු. 2,000",
      nextSlotLabel: "ඊළඟ ලබා ගත හැකි වේලාව:",
      nextSlotValue: "හෙට / උදෑසන",
      guaranteeText: "100% අපක්ෂපාතී තේරීමක්. මුදල් ගෙවා ලබාගත් ස්ථානගත කිරීම් නැත.",
    },
    categories: {
      sectionBadge: "වෘත්තීය නාමාවලිය",
      title: "සත්‍යාපිත සේවාවන් ගවේෂණය කරන්න.",
      subtitle:
        "AI සහය ලබන සේවා ඉල්ලුමක් සෑදීමට හෝ කොළඹ ප්‍රදේශයේ ශිල්පීන්ගේ වේලාවන් බැලීමට කාණ්ඩයක් තෝරන්න.",
      categoryCount: "ප්‍රධාන කාණ්ඩ 10 / නියමු අදියර",
      selectService: "සේවාව තෝරන්න",
      items: {
        electrical: {
          name: "විදුලි කාර්මික",
          subtitle: "වයරින්, ෆෑන්, ට්‍රිප් ස්විච් සහ ඉන්වර්ටර්",
          samplePrompt: "සිවිලිං විදුලි පංකාව ක්‍රියා විරහිත වී ඇත, ස්විචය දැමූ විට ට්‍රිප් වේ",
        },
        plumbing: {
          name: "නල කාර්මික",
          subtitle: "බට, කරාම, මෝටර් සහ ජලාපවහනය",
          samplePrompt: "මුළුතැන්ගෙයි සින්ක් බටය කාන්දු වන අතර නානකාමර කරාමය බිංදු වැටේ",
        },
        ac_appliance: {
          name: "AC සහ ගෘහ උපකරණ",
          subtitle: "AC, ශීතකරණ, රෙදි සෝදන යන්ත්‍ර",
          samplePrompt: "ස්ප්ලිට් AC එක සීතල නොවන අතර අසාමාන්‍ය ශබ්දයක් ඇසේ",
        },
        mechanic: {
          name: "මෝටර් රථ කාර්මික",
          subtitle: "කාර්, වෑන් සහ වාහන අලුත්වැඩියාව",
          samplePrompt: "කාර් බැටරිය බැස ඇති අතර එන්ජිම පණගැන්විය නොහැක",
        },
        cleaning: {
          name: "පිරිසිදු කිරීම",
          subtitle: "නිවාස, කාර්යාල පිරිසිදු කිරීම",
          samplePrompt: "පදිංචියට පෙර නිවාස සම්පූර්ණ පිරිසිදු කිරීමක් අවශ්‍යයි",
        },
        carpenter: {
          name: "වඩු කාර්මික",
          subtitle: "ගෘහ භාණ්ඩ, දොරවල් සහ කබඩ්",
          samplePrompt: "ලී ප්‍රධාන දොර අගුල සිරවී ඇති අතර කබඩ් අසව් කැඩී ඇත",
        },
        painter: {
          name: "පින්තාරු කිරීම",
          subtitle: "නිවාස සහ ගොඩනැගිලි තීන්ත ආලේපය",
          samplePrompt: "විසිත්ත කාමරයේ බිත්ති තීන්ත ආලේප කිරීම අවශ්‍යයි",
        },
        pest_control: {
          name: "කෘමි මර්දනය",
          subtitle: "වේයන් සහ කෘමි හානි මර්දනය",
          samplePrompt: "නිදන කාමරයේ ලී උළුවස්සේ වේයන් මර්දනය සඳහා ප්‍රතිකාර අවශ්‍යයි",
        },
        salon: {
          name: "සැලූන් සහ බාබර්",
          subtitle: "කොණ්ඩ කැපීම සහ රූපලාවන්‍ය සේවා",
          samplePrompt: "නිවසට පැමිණ කොණ්ඩය කැපීම සඳහා හමුවීමක් අවශ්‍යයි",
        },
        security: {
          name: "CCTV සහ ආරක්ෂක පද්ධති",
          subtitle: "කැමරා සහ ආරක්ෂක පද්ධති",
          samplePrompt: "CCTV කැමරාවක් ක්‍රියා විරහිත වී ඇති අතර DVR පරීක්ෂාවක් අවශ්‍යයි",
        },
      },
    },
    principles: {
      sectionBadge: "පද්ධති ප්‍රතිපත්ති",
      title: "විනිවිදභාවය මුල්කරගත් නිර්මාණයක්.",
      subtitle:
        "සෑම ශිල්පියෙකුම තෝරාගනු ලබන්නේ කිසිදු අභිරහස් ඇල්ගොරිතමයකින් තොරව විනිවිද පෙනෙන දත්ත පදනම් කරගෙනයි.",
      searchCompareTitle: "සොයා බලා සසඳන්න",
      searchCompareDesc:
        "ගැටලුවේ ස්වභාවය, ආසන්න ප්‍රදේශය සහ පාරිභෝගික ඇගයීම් අනුව දේශීය ශිල්පීන් සොයාගන්න.",
      verifiedProvidersTitle: "සත්‍යාපිත ශිල්පීන්",
      verifiedProvidersDesc:
        "විස්තරාත්මක නිපුණතා සහ පැහැදිලි පැමිණීමේ ගාස්තු සහිත පරීක්ෂා කළ ශිල්පී පැතිකඩ.",
      bookInstantlyTitle: "ක්ෂණිකව වෙන්කරගන්න",
      bookInstantlyDesc:
        "ඔබ කැමති උදෑසන, දවල් හෝ සවස වේලාව තෝරා ක්ෂණිකව සේවාව වෙන්කරවා ගන්න.",
      realReviewsTitle: "සත්‍ය ඇගයීම්",
      realReviewsDesc:
        "මුදල් ගෙවා ඉදිරියට ඒමට නොහැකි, විද්‍යාත්මක ගණනය කිරීම් මත පදනම් වූ ශ්‍රේණිගත කිරීම්.",
    },
    business: {
      sectionBadge: "ස්වාධීන කාර්මික ශිල්පීන් සඳහා",
      title: "HelpDesk LK සමඟ ඔබේ ව්‍යාපාරය දියුණු කරගන්න.",
      subtitle:
        "කොළඹ පුරා සිටින දක්ෂ කාර්මික ශිල්පීන් සමඟ එක්වන්න. නිවැසියන්ගේ සේවා ඉල්ලීම් ලබාගන්න, ඔබේ ලබා ගත හැකි වේලාවන් නොමිලේ ඇතුළත් කරන්න, කිසිදු අතරමැදි කොමිස් මුදලක් නොමැතිව සේවාවන් තහවුරු කරන්න.",
      benefit1: "සෘජු පාරිභෝගික සම්බන්ධතාව",
      benefit2: "කාලසටහන් සජීවී කළමනාකරණය",
      benefit3: "සත්‍යාපිත කාර්මික ශිල්පී තත්ත්වය",
      benefit4: "කිසිදු කොමිස් මුදලක් අය නොකෙරේ",
      registerBtn: "සේවා සපයන්නෙකු ලෙස ලියාපදිංචි වන්න",
      loginBtn: "CRM පද්ධතියට පිවිසෙන්න",
    },
    technicians: {
      sectionBadge: "ක්‍රියාකාරී නාමාවලිය",
      title: "විශේෂාංගීකෘත සත්‍යාපිත ශිල්පීන්.",
      subtitle: "කොළඹ නියමු කලාපයේ ක්‍රියාකාරී බලපත්‍රලාභී විශේෂඥ ශිල්පීන්.",
      viewAll: "සියලුම ශිල්පීන් බලන්න",
      ratingLabel: "ශ්‍රේණිගත කිරීම",
      jobsLabel: "සේවා",
      visitFeeLabel: "පැමිණීමේ ගාස්තුව:",
      selectBtn: "ශිල්පියා තෝරන්න",
    },
    footer: {
      preTitle: "පද්ධතිමය සත්‍යාපනය",
      preHeading: "ශ්‍රී ලංකාව සඳහා විනිවිදභාවයෙන් යුතු දේශීය සේවා සම්බන්ධීකරණය.",
      preSub:
        "ඔබේ අලුත්වැඩියා ගැටලු සිංහල, දෙමළ හෝ ඉංග්‍රීසි භාෂාවෙන් විස්තර කරන්න. විනිවිද පෙනෙන දත්ත පද්ධතිය ඔබව සෘජුවම දේශීය ශිල්පීන් සමඟ සම්බන්ධ කරයි.",
      preBtnFind: "දේශීය ශිල්පියෙකු සොයන්න",
      preBtnRegister: "සේවා සපයන්නන් ලියාපදිංචිය",
      tagline:
        "දේශීය සේවා සම්බන්ධීකරණ තාක්ෂණික පද්ධතිය. බහුභාෂා AI ගැටලු විශ්ලේෂණය සහ විවෘත ලකුණු ක්‍රමය.",
      pilotInfo: "කොළඹ නියමු කලාපය : නුගේගොඩ, මිරිහාන, කිරුළපන",
      colServices: "සේවාවන්",
      colTech: "තාක්ෂණය",
      colProviders: "සේවා සපයන්නන්",
      colGovernance: "පාලනය සහ නීතිමය",
      legalNote:
        "Hack for Humanity Colombo හැකතන් තරගාවලිය සඳහා නිර්මාණය කරන ලද්දකි. සියලුම ශිල්පී පැතිකඩ නියැදි දත්ත වේ.",
      poweredBy: "Google Gemini සහ Supabase PostgreSQL මඟින් බලගැන්වේ.",
    },
  },

  ta: {
    nav: {
      findServices: "சேவைகளைத் தேடுங்கள்",
      directory: "கோப்பகம்",
      howItWorks: "எவ்வாறு செயல்படுகிறது",
      scoringModel: "மதிப்பீட்டு மாதிரி",
      bookings: "பதிவுகள்",
      providerPortal: "வழங்குநர் போர்டல்",
      providerInbox: "இன்பாக்ஸ்",
      getStarted: "தொடங்குங்கள்",
    },
    hero: {
      eyebrow: "உள்நாட்டு சேவை உள்கட்டமைப்பு / கொழும்பு முன்னோடி",
      title: "உள்நாட்டு தொழில்நுட்ப வல்லுநர் சரிபார்ப்பின் எதிர்காலம்.",
      subtitle:
        "கொழும்பு முழுவதும் சரிபார்க்கப்பட்ட எலக்ட்ரீஷியன்கள், பிளம்பர்கள் மற்றும் ஏசி தொழில்நுட்ப வல்லுநர்களைத் தேடுங்கள். உங்கள் சிக்கலை தமிழ், சிங்களம் அல்லது ஆங்கிலத்தில் விவரிக்கவும். எமது வெளிப்படையான வழிமுறை மூலம் உங்களுக்கு தகுதியான நிபுணர்களை இணைக்கிறது.",
      searchPlaceholder: "என்ன சரிசெய்ய வேண்டும்? எ.கா. ஏசி கசிவு, குழாய் வெடிப்பு, மின் தடை...",
      nearMe: "எனக்கு அருகில்",
      findSpecialist: "நிபுணரைத் தேடுங்கள்",
      analyzing: "AI மூலம் பகுப்பாய்வு செய்கிறது...",
      schedulingOptions: "விருப்பமான நாள் மற்றும் நேரத்தைக் குறிப்பிடவும்",
      hideSchedulingOptions: "நேர விருப்பங்களை மறைக்கவும்",
      colomboTime: "இன்று கொழும்பு நேரம்",
      preferredDay: "விருப்பமான நாள்",
      timeWindow: "நேர சாளரம்",
      yourName: "உங்கள் பெயர் (விருப்பமானது)",
      namePlaceholder: "எ.கா. அனுரா",
      today: "இன்று",
      tomorrow: "நாளை (பரிந்துரைக்கப்பட்டது)",
      dayAfter: "நாளை மறுநாள்",
      flexible: "எந்த நேரமும்",
      morning: "காலை (8 AM - 12 PM)",
      afternoon: "மதியம் (12 PM - 4 PM)",
      evening: "மாலை (4 PM - 7 PM)",
      scenarioPresets: "மாதிரி சூழ்நிலைகள்:",
      demoChips: {
        sink: {
          label: "சிங்க் குழாய் கசிவு (English)",
          text: "My kitchen sink pipe is leaking under the counter, need someone tomorrow morning",
        },
        fan: {
          label: "மின்விசிறி இயங்கவில்லை (Singlish)",
          text: "fan eka karakenne na, switch eken burning smell ekak enawa",
        },
        ac: {
          label: "ஏசி குளிரவில்லை (Sinhala)",
          text: "AC එක හරියට සීතල වෙන්නේ නැහැ, හෙට හවස එන්න පුළුවන්ද?",
        },
        tap: {
          label: "குளியலறை குழாய் (Tamil)",
          text: "குளியலறை குழாய் ஒழுகுகிறது, நாளை காலை வர முடியுமா?",
        },
      },
    },
    mockup: {
      engineTitle: "சரிபார்க்கப்பட்ட திட்டமிடல் அமைப்பு",
      matchConfidence: "பொருத்த நம்பிக்கை",
      activeIntake: "செயலில் உள்ள பதிவு",
      sampleProblem: "சிங்க் குழாய் கசிவு / அவசர வால்வு சோதனை",
      categoryLabel: "வகை",
      categoryValue: "பிளம்பிங்",
      proximityLabel: "அருகிலுள்ள பகுதி",
      proximityValue: "நுகேகொட கிளஸ்டர்",
      matchedSpecialist: "பொருந்திய நிபுணர்",
      technicianName: "கசுன் பெரேரா",
      technicianRole: "உரிமம் பெற்ற முதன்மை பிளம்பர் / 142 பணிகள்",
      visitFeeLabel: "வருகை கட்டணம்",
      visitFeeValue: "ரூ. 2,000",
      nextSlotLabel: "அடுத்த இருப்பு:",
      nextSlotValue: "நாளை / காலை",
      guaranteeText: "100% வெளிப்படையான பொருத்தம். விளம்பர முன்னுரிமை இல்லை.",
    },
    categories: {
      sectionBadge: "தொழில் வகைப்பாடு",
      title: "சரிபார்க்கப்பட்ட சேவைகளை ஆராயுங்கள்.",
      subtitle:
        "சேவைக் கோரிக்கையைத் தொடங்க அல்லது கொழும்பு கிளஸ்டரில் வல்லுநர்களின் இருப்பைப் பார்க்க ஒரு வகையைத் தேர்ந்தெடுக்கவும்.",
      categoryCount: "10 நிலையான வகைகள் / நேரடி முன்னோடி",
      selectService: "சேவையைத் தேர்ந்தெடுக்கவும்",
      items: {
        electrical: {
          name: "எலக்ட்ரீஷியன்",
          subtitle: "வயரிங், மின்விசிறிகள், பிரேக்கர்கள் மற்றும் இன்வெர்ட்டர்கள்",
          samplePrompt: "மின்விசிறி வேலை செய்யவில்லை, சுவிட்ச் ஆன் செய்யும் போது பிரேக்கர் ட்ரிப் ஆகிறது",
        },
        plumbing: {
          name: "பிளம்பர்",
          subtitle: "குழாய்கள், குழாய்கள், பம்புகள் மற்றும் வடிகால்",
          samplePrompt: "சமையலறை சிங்க் குழாய் கசிகிறது மற்றும் குளியலறை குழாய் சொட்டுகிறது",
        },
        ac_appliance: {
          name: "ஏசி மற்றும் உபகரணங்கள்",
          subtitle: "ஏசி, பிரிட்ஜ், சலவை இயந்திரம்",
          samplePrompt: "ஏசி சரியாக குளிரூட்டவில்லை மற்றும் அதிர்வு சத்தம் எழுப்புகிறது",
        },
        mechanic: {
          name: "ஆட்டோ மெக்கானிக்",
          subtitle: "கார், வேன் மற்றும் வாகன பழுதுபார்ப்பு",
          samplePrompt: "கார் பேட்டரி செயலிழந்துவிட்டது, காலையில் எஞ்சின் ஸ்டார்ட் ஆகவில்லை",
        },
        cleaning: {
          name: "சுத்தம் செய்தல்",
          subtitle: "வீடு, அலுவலகம் மற்றும் ஆழ்ந்த சுத்தம்",
          samplePrompt: "குடியேறுவதற்கு முன் அபார்ட்மெண்ட் ஆழமாக சுத்தம் செய்ய வேண்டும்",
        },
        carpenter: {
          name: "தச்சர்",
          subtitle: "தளபாடங்கள், கதவுகள் மற்றும் அலமாரிகள்",
          samplePrompt: "மரத்தாலான கதவு பூட்டு சிக்கியுள்ளது மற்றும் அலமாரி கீல்கள் உடைந்துவிட்டன",
        },
        painter: {
          name: "பெயிண்டர்",
          subtitle: "வீடு மற்றும் கட்டிட பெயிண்டிங்",
          samplePrompt: "வாழ்க்கை அறை சுவருக்கு மீண்டும் வர்ணம் பூச வேண்டும்",
        },
        pest_control: {
          name: "பூச்சி கட்டுப்பாடு",
          subtitle: "கறையான்கள், கரப்பான் பூச்சிகள் மற்றும் பூச்சிகள்",
          samplePrompt: "படுக்கையறை மர கதவு சட்டகத்திற்கு கறையான் சிகிச்சை தேவைப்படுகிறது",
        },
        salon: {
          name: "சலூன் மற்றும் முடிதிருத்துபவர்",
          subtitle: "முடி, அழகு மற்றும் சீர்ப்படுத்தல்",
          samplePrompt: "வீட்டிலேயே முடி வெட்டுவதற்கு முன்பதிவு தேவை",
        },
        security: {
          name: "சிசிடிவி மற்றும் பாதுகாப்பு",
          subtitle: "கேமராக்கள், அலாரங்கள் மற்றும் வேலிகள்",
          samplePrompt: "சிசிடிவி கேமரா ஆஃப்லைனில் உள்ளது மற்றும் டிவிடபிள்யுஆர் பதிவு சேமிப்பக சோதனை",
        },
      },
    },
    principles: {
      sectionBadge: "தள கொள்கைகள்",
      title: "வெளிப்படைத்தன்மைக்காக வடிவமைக்கப்பட்டது.",
      subtitle:
        "ஒவ்வொரு தொழில்நுட்ப வல்லுநர் பொருத்தமும் எந்தவொரு மறைமுக முன்னுரிமையும் இன்றி வெளிப்படையாக கணக்கிடப்படுகிறது.",
      searchCompareTitle: "தேடி ஒப்பிடுங்கள்",
      searchCompareDesc:
        "துல்லியமான அறிகுறிகள், பகுதி மற்றும் வெளிப்படையான மதிப்பீடுகள் மூலம் உள்ளூர் நிபுணர்களைக் கண்டறியவும்.",
      verifiedProvidersTitle: "சரிபார்க்கப்பட்ட வல்லுநர்கள்",
      verifiedProvidersDesc:
        "வெளிப்படையான திறன் குறிச்சொற்கள், வருகைக் கட்டணங்கள் மற்றும் மறைக்கப்பட்ட கட்டணங்கள் இல்லாத சரிபார்க்கப்பட்ட சுயவிவரங்கள்.",
      bookInstantlyTitle: "உடனடியாக முன்பதிவு செய்யுங்கள்",
      bookInstantlyDesc:
        "உடனடி உறுதிப்படுத்தலுடன் உங்கள் விருப்பமான காலை, மதியம் அல்லது மாலை நேரத்தில் சேவைகளை திட்டமிடுங்கள்.",
      realReviewsTitle: "உண்மையான மதிப்புரைகள்",
      realReviewsDesc:
        "விளம்பர முன்னுரிமை இல்லாத, உண்மையான தகுதி அடிப்படையிலான வெளிப்படையான மதிப்பீடுகள்.",
    },
    business: {
      sectionBadge: "சுயாதீன தொழில்நுட்ப வல்லுநர்களுக்கு",
      title: "HelpDesk LK மூலம் உங்கள் வணிகத்தை வளர்க்கவும்.",
      subtitle:
        "கொழும்பு முழுவதிலும் உள்ள திறமையான வர்த்தக நிபுணர்களுடன் இணையுங்கள். சரிபார்க்கப்பட்ட கோரிக்கைகளைப் பெறுங்கள், உங்கள் இலவச கால அட்டவணையை வெளியிடுங்கள், பூஜ்ஜிய கமிஷன் கட்டணங்களுடன் முன்பதிவுகளை உறுதிப்படுத்தவும்.",
      benefit1: "நேரடி குடியிருப்பு அனுப்புதல்",
      benefit2: "நிகழ்நேர காலண்டர் மேலாண்மை",
      benefit3: "சரிபார்க்கப்பட்ட சான்றுகள் நிலை",
      benefit4: "பூஜ்ஜிய கமிஷன் கட்டணங்கள்",
      registerBtn: "வழங்குநராக பதிவு செய்யுங்கள்",
      loginBtn: "CRM போர்டல் உள்நுழைவு",
    },
    technicians: {
      sectionBadge: "செயலில் உள்ள கோப்பகம்",
      title: "சிறப்பு சரிபார்க்கப்பட்ட நிபுணர்கள்.",
      subtitle: "கொழும்பு கிளஸ்டரில் செயலில் உள்ள உரிமம் பெற்ற வர்த்தக நிபுணர்கள்.",
      viewAll: "அனைத்து நிபுணர்களையும் பார்க்கவும்",
      ratingLabel: "மதிப்பீடு",
      jobsLabel: "பணிகள்",
      visitFeeLabel: "வருகை கட்டணம்:",
      selectBtn: "நிபுணரைத் தேர்ந்தெடுக்கவும்",
    },
    footer: {
      preTitle: "நிறுவன சரிபார்ப்பு",
      preHeading: "இலங்கைக்கான வெளிப்படையான உள்ளூர் சேவை ஒருங்கிணைப்பு.",
      preSub:
        "பழுதுபார்க்கும் சிக்கல்களை தமிழ், சிங்களம் அல்லது ஆங்கிலத்தில் விவரிக்கவும். வெளிப்படையான தரவுத்தள தரவரிசை உங்களை நேரடியாக உள்ளூர் தொழில்நுட்ப வல்லுநர்களுடன் இணைக்கிறது.",
      preBtnFind: "உள்ளூர் நிபுணரைக் கண்டறியவும்",
      preBtnRegister: "வழங்குநர் பதிவு",
      tagline:
        "உள்ளூர் சேவை ஒருங்கிணைப்பு தளம். பலமொழி AI சிக்கல் உட்கொள்ளல் மற்றும் வெளிப்படையான திறந்த மதிப்பெண் அமைப்பு.",
      pilotInfo: "கொழும்பு கிளஸ்டர் : நுகேகொட, மிரிகான, கிருலப்பனை",
      colServices: "சேவைகள்",
      colTech: "தொழில்நுட்பம்",
      colProviders: "வழங்குநர்கள்",
      colGovernance: "நிர்வாகம்",
      legalNote:
        "Hack for Humanity Colombo க்காக உருவாக்கப்பட்ட முன்மாதிரி. அனைத்து சுயவிவரங்களும் மாதிரி தரவு ஆகும்.",
      poweredBy: "Google Gemini மற்றும் Supabase PostgreSQL மூலம் இயக்கப்படுகிறது.",
    },
  },
};

export const translations = TRANSLATIONS;
