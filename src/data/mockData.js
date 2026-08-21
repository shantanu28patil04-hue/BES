// BES - Best Engineering Services Data Layer

export const BUSINESS_INFO = {
  name: "BES – Best Engineering Services",
  shortName: "BES",
  tagline: "Professional Electrician & Home Appliance Repair at Your Doorstep",
  subtitle: "Book a trusted BES technician for electrical work and home appliance repair services.",
  owner: {
    name: "Shubham",
    role: "Owner & Operations Lead",
    phone: "+91 98765 43210",
    email: "shubham@bes-services.com"
  },
  technicians: [
    {
      id: "TECH-01",
      name: "Aman Jumde",
      role: "Electrician / Service Technician",
      specialty: "Electrical Wiring, Inverter & Heavy Appliances",
      rating: "4.9",
      experience: "Certified Expert",
      phone: "+91 98230 11223",
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=250",
      status: "Available", // Available | On Job | Off Duty
      activeJobs: 1,
      completedJobs: 18
    },
    {
      id: "TECH-02",
      name: "Nehal Jumde",
      role: "Electrician / Service Technician",
      specialty: "AC, Refrigerator & Smart Electronics Repair",
      rating: "4.9",
      experience: "Certified Expert",
      phone: "+91 98230 44556",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      status: "Available",
      activeJobs: 1,
      completedJobs: 24
    }
  ],
  contact: {
    phonePlaceholder: "+91 98XXX XXXXX",
    whatsappPlaceholder: "+91 98XXX XXXXX",
    emailPlaceholder: "contact@bes-services.com",
    addressPlaceholder: "Main Service Center, Engineering Hub, City Central",
    serviceHours: "8:00 AM – 9:00 PM (Emergency Support 24/7)"
  }
};

export const ELECTRICAL_SERVICES = [
  {
    id: "elec-1",
    title: "House Wiring",
    category: "Electrical",
    icon: "Cable",
    description: "Complete residential & commercial concealed or open wiring with high safety standards.",
    duration: "2 - 6 hrs",
    pricing: "Custom Estimate",
    popular: true,
    features: ["Flame-retardant standard check", "Load balance assessment", "Neat piping & casing"]
  },
  {
    id: "elec-2",
    title: "Electrical Fault Repair",
    category: "Electrical",
    icon: "AlertTriangle",
    description: "Rapid diagnostic and troubleshooting of power trips, voltage fluctuations & dead circuits.",
    duration: "45 - 90 mins",
    pricing: "Diagnostic + Fix",
    popular: true,
    features: ["Digital multimeter testing", "Phase tracing", "Instant resolution"]
  },
  {
    id: "elec-3",
    title: "Switch & Socket Repair",
    category: "Electrical",
    icon: "ToggleRight",
    description: "Replacement and repair of modular switches, heavy 16A sockets, dimmer & USB points.",
    duration: "30 - 60 mins",
    pricing: "Affordable base rate",
    popular: false,
    features: ["Modular & regular fittings", "Spark-free connection", "Burn prevention"]
  },
  {
    id: "elec-4",
    title: "MCB / Fuse Repair",
    category: "Electrical",
    icon: "ShieldAlert",
    description: "Main circuit breaker, RCCB, ELCB replacement, tripping analysis and main fuse fix.",
    duration: "45 mins",
    pricing: "Standard Rate",
    popular: true,
    features: ["Overload protection", "Short-circuit safety test", "Correct rating fitting"]
  },
  {
    id: "elec-5",
    title: "Fan Installation & Repair",
    category: "Electrical",
    icon: "Fan",
    description: "Ceiling fan hanging, regulator change, noise elimination, winding inspection & wall fan fitting.",
    duration: "30 - 60 mins",
    pricing: "Quick Service Rate",
    popular: false,
    features: ["Rod & hook securing", "Balance alignment", "Capacitor replacement"]
  },
  {
    id: "elec-6",
    title: "Light / LED Installation",
    category: "Electrical",
    icon: "Lightbulb",
    description: "Fancy chandeliers, COB spotlight drilling, LED strip lights, false ceiling lighting & tube fixtures.",
    duration: "45 mins",
    pricing: "Per point rate",
    popular: false,
    features: ["Aesthetic placement", "Concealed wire routing", "Sturdy ceiling brackets"]
  },
  {
    id: "elec-7",
    title: "Inverter Installation",
    category: "Electrical",
    icon: "BatteryCharging",
    description: "Inverter & tubular battery wiring, bypass switch setup, UPS backup cabling & maintenance.",
    duration: "1 - 2 hrs",
    pricing: "Complete Setup Rate",
    popular: true,
    features: ["Heavy gauge battery leads", "Neutral loop correction", "Terminal anti-rust coating"]
  },
  {
    id: "elec-8",
    title: "Electrical Maintenance",
    category: "Electrical",
    icon: "Wrench",
    description: "Preventive periodic inspection of whole house wiring, earthing resistance check & load testing.",
    duration: "2 - 3 hrs",
    pricing: "Comprehensive Audit",
    popular: false,
    features: ["Thermal hotspot check", "Earthing ground test", "Safety certificate summary"]
  },
  {
    id: "elec-9",
    title: "New Electrical Connection",
    category: "Electrical",
    icon: "Zap",
    description: "Sub-meter setup, meter board wiring, additional appliance line pulling & distribution box.",
    duration: "2 - 4 hrs",
    pricing: "Custom Project",
    popular: false,
    features: ["Authorized gauge wires", "Busbar fitting", "Phase load split"]
  },
  {
    id: "elec-10",
    title: "Short-Circuit Inspection",
    category: "Electrical",
    icon: "Flame",
    description: "Urgent emergency inspection of burnt smell, spark origins, melted conduits and wire faults.",
    duration: "Immediate / 1 hr",
    pricing: "Emergency Priority",
    popular: true,
    features: ["Emergency 24/7 dispatch", "Insulation megger test", "Hazard isolation"]
  }
];

export const APPLIANCE_SERVICES = [
  {
    id: "app-1",
    title: "Refrigerator",
    category: "Appliance",
    icon: "Refrigerator",
    description: "Single door, double door, side-by-side inverter fridge cooling issue, compressor & thermostat repair.",
    commonIssues: ["Not cooling", "Excess ice formation", "Gas leak / refilling", "Compressor clicking sound", "Water leakage"]
  },
  {
    id: "app-2",
    title: "Washing Machine",
    category: "Appliance",
    icon: "Disc",
    description: "Front load, top load & semi-automatic motor repair, PCB error codes, drainage & spin drum issues.",
    commonIssues: ["Drum not spinning", "Water not draining", "Excess vibration", "PCB display error", "Water inlet problem"]
  },
  {
    id: "app-3",
    title: "Air Conditioner",
    category: "Appliance",
    icon: "Wind",
    description: "Split & window AC gas charging, jet pump foam servicing, PCB circuit fix & cooling fan repair.",
    commonIssues: ["Low cooling", "Water dripping inside", "Gas refilling", "Outdoor unit not starting", "Foul odor / filter choke"]
  },
  {
    id: "app-4",
    title: "Television",
    category: "Appliance",
    icon: "Tv",
    description: "LED, LCD, Smart TV sound but no picture, backlight replacement, power board & HDMI port fix.",
    commonIssues: ["No display / black screen", "No sound", "Horizontal lines", "Power not turning on", "Motherboard repair"]
  },
  {
    id: "app-5",
    title: "Microwave Oven",
    category: "Appliance",
    icon: "Box",
    description: "Solo, grill & convection oven not heating, turntable stuck, spark inside & keypad touch issues.",
    commonIssues: ["Not heating food", "Keypad buttons unresponsive", "Sparks / arching inside", "Plate not rotating", "Dead power supply"]
  },
  {
    id: "app-6",
    title: "Geyser / Water Heater",
    category: "Appliance",
    icon: "Flame",
    description: "Instant & storage geyser heating coil replacement, thermostat calibration, valve leak & current leakage fix.",
    commonIssues: ["Water not getting hot", "Geyser giving shock", "Water leaking from bottom", "Low water pressure", "Thermostat tripping"]
  },
  {
    id: "app-7",
    title: "Cooler",
    category: "Appliance",
    icon: "Fan",
    description: "Desert & personal air cooler pump replacement, motor rewinding, honeycomb pad fitting & speed switch fix.",
    commonIssues: ["Submersible pump dead", "Fan motor humming", "Body giving mild shock", "Water distribution choked", "Speed controller broken"]
  },
  {
    id: "app-8",
    title: "Mixer Grinder",
    category: "Appliance",
    icon: "Cpu",
    description: "Heavy mixie motor carbon brush change, coupler replacement, blade sharpening & overload trip switch reset.",
    commonIssues: ["Overload switch tripping", "Blade coupler broken", "Burning smell from motor", "Jar leak / jammed blade", "Speed knob dead"]
  },
  {
    id: "app-9",
    title: "Ceiling Fan",
    category: "Appliance",
    icon: "Fan",
    description: "BLDC & regular ceiling fan capacitor replacement, bearing noise, slow rotation & remote sensor fix.",
    commonIssues: ["Running very slow", "Squeaking / grinding bearing sound", "BLDC remote not pairing", "Wobbling / vibrating", "Dead motor"]
  },
  {
    id: "app-10",
    title: "Exhaust Fan",
    category: "Appliance",
    icon: "RotateCw",
    description: "Kitchen & bathroom high-speed exhaust fan cleaning, louver repair, shaft oiling & motor replacement.",
    commonIssues: ["Jammed with oil / grease", "Excessive noise", "Blade broken", "Low suction airflow", "Motor burning smell"]
  },
  {
    id: "app-11",
    title: "Water Pump",
    category: "Appliance",
    icon: "Droplets",
    description: "Monoblock & submersible domestic pump priming issue, capacitor change, seal leak & starter box repair.",
    commonIssues: ["Pump running but not lifting water", "Capacitor blast / low torque", "Water leaking through seal", "Starter panel humming", "Air lock"]
  },
  {
    id: "app-12",
    title: "Iron",
    category: "Appliance",
    icon: "Sparkles",
    description: "Dry & steam iron heating element repair, thermal fuse replacement, power cord change & soleplate cleaning.",
    commonIssues: ["Iron not heating", "Thermal fuse blown", "Steam nozzle calcified", "Power cord damaged", "Tripping main MCB"]
  },
  {
    id: "app-13",
    title: "Other Home Appliances",
    category: "Appliance",
    icon: "HelpCircle",
    description: "Repairs for induction cooktops, air fryers, vacuum cleaners, room heaters, water purifiers and more.",
    commonIssues: ["Custom problem - Describe your appliance issue in detail during booking."]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    appointment_id: "BES-2026-0001",
    customer_name: "Aman Sharma",
    mobile_number: "+91 98111 22334",
    email: "aman.sharma@example.com",
    service_type: "Appliance",
    appliance_type: "Air Conditioner",
    problem_description: "Split AC indoor unit cooling is very low and water is dripping on the wall.",
    appointment_date: "2026-08-21",
    appointment_time: "10:00 AM - 12:00 PM",
    emergency: false,
    latitude: 28.6139,
    longitude: 77.2090,
    address: "Flat 402, Royal Palms Residency",
    landmark: "Near City Metro Gate 3",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    assigned_worker: "Nehal Jumde",
    status: "In Progress", // Pending | Accepted | Assigned | On the Way | In Progress | Completed | Cancelled
    created_at: "2026-08-21T08:15:00Z"
  },
  {
    appointment_id: "BES-2026-0002",
    customer_name: "Pooja Deshmukh",
    mobile_number: "+91 98222 33445",
    email: "pooja.d@example.com",
    service_type: "Electrical",
    appliance_type: "Switch & Socket Repair",
    problem_description: "Kitchen main 16A refrigerator power point sparked and tripped the circuit.",
    appointment_date: "2026-08-21",
    appointment_time: "02:00 PM - 04:00 PM",
    emergency: true,
    latitude: 28.6289,
    longitude: 77.2150,
    address: "B-12, Green Park Extension",
    landmark: "Opposite Community Park",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
    assigned_worker: "Aman Jumde",
    status: "On the Way",
    created_at: "2026-08-21T09:30:00Z"
  },
  {
    appointment_id: "BES-2026-0003",
    customer_name: "Rahul Verma",
    mobile_number: "+91 98333 44556",
    email: "rahul.verma@example.com",
    service_type: "Appliance",
    appliance_type: "Washing Machine",
    problem_description: "Front load washing machine spin cycle is making loud thumping sound.",
    appointment_date: "2026-08-22",
    appointment_time: "11:00 AM - 01:00 PM",
    emergency: false,
    latitude: 28.5800,
    longitude: 77.2300,
    address: "House 55, Block C, Lajpat Nagar",
    landmark: "Near Central Market",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110024",
    assigned_worker: null,
    status: "Pending",
    created_at: "2026-08-21T11:00:00Z"
  },
  {
    appointment_id: "BES-2026-0004",
    customer_name: "Sunita Kulkarni",
    mobile_number: "+91 98444 55667",
    email: "sunita.k@example.com",
    service_type: "Electrical",
    appliance_type: "Inverter Installation",
    problem_description: "New 1100VA Inverter and 150Ah battery wiring setup needed with bypass switch.",
    appointment_date: "2026-08-20",
    appointment_time: "04:00 PM - 06:00 PM",
    emergency: false,
    latitude: 28.5355,
    longitude: 77.2600,
    address: "Plot 88, Sunrise Apartments",
    landmark: "Behind Lotus Temple",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110019",
    assigned_worker: "Aman Jumde",
    status: "Completed",
    created_at: "2026-08-20T10:00:00Z"
  }
];

export const STATUS_STEPS = [
  { key: "Pending", label: "Pending", desc: "Request received & awaiting review", color: "amber" },
  { key: "Accepted", label: "Accepted", desc: "Booking approved by BES admin", color: "blue" },
  { key: "Assigned", label: "Assigned", desc: "Technician assigned to visit", color: "indigo" },
  { key: "On the Way", label: "On the Way", desc: "Technician is travelling to location", color: "purple" },
  { key: "In Progress", label: "In Progress", desc: "Inspection & repair work underway", color: "yellow" },
  { key: "Completed", label: "Completed", desc: "Service completed & verified", color: "emerald" }
];
