// ConnectSpace dummy data — the single source of truth for the MVP.
// No API routes, no fetch calls — everything reads from this file.

export type InterestCategory =
  | "Chess"
  | "Yoga"
  | "Music"
  | "Dance"
  | "Art"
  | "Reading"
  | "Meditation"
  | "Fitness"
  | "Networking"
  | "Volunteering";

export const ALL_INTERESTS: InterestCategory[] = [
  "Chess",
  "Yoga",
  "Music",
  "Dance",
  "Art",
  "Reading",
  "Meditation",
  "Fitness",
  "Networking",
  "Volunteering",
];

export type SpaceType =
  | "Community Hall"
  | "Playground"
  | "Garden"
  | "Rooftop"
  | "Auditorium"
  | "Indoor Sports Hall";

export const ALL_SPACE_TYPES: SpaceType[] = [
  "Community Hall",
  "Playground",
  "Garden",
  "Rooftop",
  "Auditorium",
  "Indoor Sports Hall",
];

export interface User {
  id: string;
  name: string;
  interests: InterestCategory[];
  location: string;
  ageGroup: string;
  previousEvents: string[];
}

export interface Space {
  id: string;
  name: string;
  type: SpaceType;
  address: string;
  locality: string;
  capacity: number;
  availableTimeSlots: string[];
  rentalCharges: number;
  photos: string[];
  amenities: string[];
  parking: string;
  accessibility: string;
  ownerId: string;
}

export interface EventRequest {
  id: string;
  eventTitle: string;
  purpose: string;
  socialImpact: string;
  budget: number;
  preferredLocality: string;
  expectedAudience: number;
  eventDuration: string;
  facilitiesRequired: string;
  volunteersRequired: number;
  freeOrPaid: "Free" | "Paid";
  ageGroup: string;
  eventCategory: InterestCategory;
  status: "pending" | "proposals_received" | "venue_confirmed" | "published" | "completed";
  organizerId: string;
}

export interface Proposal {
  id: string;
  spaceId: string;
  eventRequestId: string;
  availableDates: string[];
  price: number;
  facilitiesOffered: string;
  spaceName: string;
  spaceType: SpaceType;
  status: "pending" | "accepted" | "rejected";
}

export interface CommunityEvent {
  id: string;
  eventRequestId: string;
  title: string;
  purpose: string;
  socialImpact: string;
  budget: number;
  locality: string;
  expectedAudience: number;
  duration: string;
  facilitiesRequired: string;
  volunteersRequired: number;
  freeOrPaid: "Free" | "Paid";
  ageGroup: string;
  category: InterestCategory;
  venueName: string;
  venueAddress: string;
  date: string;
  ticketPrice: number;
  totalSeats: number;
  bookedSeats: number;
  status: "upcoming" | "completed";
  attendees: string[];
  ratings: EventRating[];
}

export interface EventRating {
  userId: string;
  userName: string;
  rating: number;
  review: string;
}

export interface ImpactReport {
  eventId: string;
  eventTitle: string;
  totalAttendees: number;
  totalCapacity: number;
  averageRating: number;
  totalReviews: number;
  communityEngagement: string;
  socialImpactSummary: string;
}

// --- Seed Data ---

export const dummyUsers: User[] = [
  {
    id: "u1",
    name: "Aarav Sharma",
    interests: ["Chess", "Reading", "Networking"],
    location: "Kandivali",
    ageGroup: "25-35",
    previousEvents: ["e1"],
  },
  {
    id: "u2",
    name: "Priya Mehta",
    interests: ["Yoga", "Meditation", "Fitness"],
    location: "Borivali",
    ageGroup: "35-45",
    previousEvents: ["e2"],
  },
  {
    id: "u3",
    name: "Rajesh Desai",
    interests: ["Music", "Dance", "Art"],
    location: "Andheri",
    ageGroup: "55-65",
    previousEvents: [],
  },
  {
    id: "u4",
    name: "Sneha Kulkarni",
    interests: ["Volunteering", "Fitness", "Yoga"],
    location: "Malad",
    ageGroup: "20-25",
    previousEvents: ["e1", "e2"],
  },
];

export const dummySpaces: Space[] = [
  {
    id: "s1",
    name: "Harmony Community Hall",
    type: "Community Hall",
    address: "Plot 45, Sector 7, Kandivali West",
    locality: "Kandivali",
    capacity: 300,
    availableTimeSlots: ["9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM", "7:00 PM - 10:00 PM"],
    rentalCharges: 15000,
    photos: [],
    amenities: ["Projector", "Sound System", "AC", "Stage", "Restrooms"],
    parking: "50 car spaces available",
    accessibility: "Wheelchair ramp, elevator access",
    ownerId: "o1",
  },
  {
    id: "s2",
    name: "Green Meadows Playground",
    type: "Playground",
    address: "Near Shanti Nagar, Borivali East",
    locality: "Borivali",
    capacity: 500,
    availableTimeSlots: ["6:00 AM - 10:00 AM", "4:00 PM - 8:00 PM"],
    rentalCharges: 8000,
    photos: [],
    amenities: ["Open Ground", "Drinking Water", "Restrooms", "Floodlights"],
    parking: "Street parking available",
    accessibility: "Flat ground, accessible entry",
    ownerId: "o2",
  },
  {
    id: "s3",
    name: "Sunrise Rooftop Venue",
    type: "Rooftop",
    address: "Building 12, Andheri West",
    locality: "Andheri",
    capacity: 100,
    availableTimeSlots: ["5:00 PM - 10:00 PM"],
    rentalCharges: 20000,
    photos: [],
    amenities: ["City View", "Bar Setup", "Sound System", "Fairy Lights", "Restrooms"],
    parking: "Building basement parking",
    accessibility: "Elevator access to rooftop",
    ownerId: "o3",
  },
  {
    id: "s4",
    name: "Serenity Garden",
    type: "Garden",
    address: "Opposite Railway Station, Malad West",
    locality: "Malad",
    capacity: 200,
    availableTimeSlots: ["7:00 AM - 12:00 PM", "3:00 PM - 7:00 PM"],
    rentalCharges: 5000,
    photos: [],
    amenities: ["Open Lawn", "Gazebo", "Walking Path", "Drinking Water"],
    parking: "20 car spaces, bike parking",
    accessibility: "Paved pathways, bench seating",
    ownerId: "o1",
  },
  {
    id: "s5",
    name: "TCET Auditorium",
    type: "Auditorium",
    address: "Thakur Educational Campus, Kandivali East",
    locality: "Kandivali",
    capacity: 600,
    availableTimeSlots: ["9:00 AM - 5:00 PM"],
    rentalCharges: 25000,
    photos: [],
    amenities: ["Projector", "AC", "Stage", "Green Room", "Sound System", "Restrooms"],
    parking: "Campus parking lot",
    accessibility: "Wheelchair ramp, reserved seating",
    ownerId: "o4",
  },
  {
    id: "s6",
    name: "FitZone Indoor Sports Hall",
    type: "Indoor Sports Hall",
    address: "Sports Complex, Goregaon East",
    locality: "Goregaon",
    capacity: 150,
    availableTimeSlots: ["6:00 AM - 12:00 PM", "4:00 PM - 10:00 PM"],
    rentalCharges: 12000,
    photos: [],
    amenities: ["Badminton Courts", "Table Tennis", "Gym Equipment", "Changing Rooms"],
    parking: "Dedicated parking area",
    accessibility: "Ground floor, wide doorways",
    ownerId: "o2",
  },
];

export const dummyEventRequests: EventRequest[] = [
  {
    id: "er1",
    eventTitle: "Mental Wellness Workshop",
    purpose: "Community mental health awareness and coping strategies",
    socialImpact: "Addresses loneliness and mental health in urban Mumbai",
    budget: 200000,
    preferredLocality: "Borivali",
    expectedAudience: 250,
    eventDuration: "4 hours",
    facilitiesRequired: "Indoor Hall, Projector, Sound System, AC",
    volunteersRequired: 20,
    freeOrPaid: "Free",
    ageGroup: "All Ages",
    eventCategory: "Meditation",
    status: "proposals_received",
    organizerId: "org1",
  },
  {
    id: "er2",
    eventTitle: "Community Chess Championship",
    purpose: "Promote strategic thinking and intergenerational bonding",
    socialImpact: "Bridges age gaps through a shared intellectual activity",
    budget: 50000,
    preferredLocality: "Kandivali",
    expectedAudience: 100,
    eventDuration: "6 hours",
    facilitiesRequired: "Indoor Hall, Tables, Chairs",
    volunteersRequired: 10,
    freeOrPaid: "Paid",
    ageGroup: "All Ages",
    eventCategory: "Chess",
    status: "pending",
    organizerId: "org1",
  },
  {
    id: "er3",
    eventTitle: "Yoga in the Park",
    purpose: "Free community yoga session for senior citizens and WFH professionals",
    socialImpact: "Tackles sedentary lifestyles and social isolation",
    budget: 30000,
    preferredLocality: "Malad",
    expectedAudience: 80,
    eventDuration: "2 hours",
    facilitiesRequired: "Open Ground, Drinking Water",
    volunteersRequired: 5,
    freeOrPaid: "Free",
    ageGroup: "25+",
    eventCategory: "Yoga",
    status: "venue_confirmed",
    organizerId: "org2",
  },
];

export const dummyProposals: Proposal[] = [
  {
    id: "p1",
    spaceId: "s2",
    eventRequestId: "er1",
    availableDates: ["2026-08-10", "2026-08-17", "2026-08-24"],
    price: 12000,
    facilitiesOffered: "Open Ground, Drinking Water, Restrooms, Floodlights, Tent Setup",
    spaceName: "Green Meadows Playground",
    spaceType: "Playground",
    status: "pending",
  },
  {
    id: "p2",
    spaceId: "s1",
    eventRequestId: "er1",
    availableDates: ["2026-08-12", "2026-08-19"],
    price: 18000,
    facilitiesOffered: "Projector, Sound System, AC, Stage, Restrooms, 300 Chairs",
    spaceName: "Harmony Community Hall",
    spaceType: "Community Hall",
    status: "pending",
  },
  {
    id: "p3",
    spaceId: "s4",
    eventRequestId: "er3",
    availableDates: ["2026-08-05"],
    price: 5000,
    facilitiesOffered: "Open Lawn, Gazebo, Drinking Water, Yoga Mats (50)",
    spaceName: "Serenity Garden",
    spaceType: "Garden",
    status: "accepted",
  },
];

export const dummyEvents: CommunityEvent[] = [
  {
    id: "e1",
    eventRequestId: "er_past1",
    title: "Kandivali Chess Meet",
    purpose: "Monthly chess gathering for all skill levels",
    socialImpact: "Fosters intergenerational bonding through chess",
    budget: 25000,
    locality: "Kandivali",
    expectedAudience: 60,
    duration: "3 hours",
    facilitiesRequired: "Indoor Hall, Tables",
    volunteersRequired: 5,
    freeOrPaid: "Free",
    ageGroup: "All Ages",
    category: "Chess",
    venueName: "Harmony Community Hall",
    venueAddress: "Plot 45, Sector 7, Kandivali West",
    date: "2026-06-15",
    ticketPrice: 0,
    totalSeats: 60,
    bookedSeats: 52,
    status: "completed",
    attendees: ["u1", "u4"],
    ratings: [
      { userId: "u1", userName: "Aarav Sharma", rating: 5, review: "Brilliant event! Met so many fellow chess enthusiasts." },
      { userId: "u4", userName: "Sneha Kulkarni", rating: 4, review: "Well organized. Would love more beginner-friendly rounds." },
    ],
  },
  {
    id: "e2",
    eventRequestId: "er_past2",
    title: "Borivali Sunrise Yoga",
    purpose: "Community yoga for wellness and social connection",
    socialImpact: "Reduces stress and builds neighborhood bonds",
    budget: 15000,
    locality: "Borivali",
    expectedAudience: 40,
    duration: "1.5 hours",
    facilitiesRequired: "Open Ground, Mats",
    volunteersRequired: 3,
    freeOrPaid: "Free",
    ageGroup: "All Ages",
    category: "Yoga",
    venueName: "Green Meadows Playground",
    venueAddress: "Near Shanti Nagar, Borivali East",
    date: "2026-06-22",
    ticketPrice: 0,
    totalSeats: 40,
    bookedSeats: 38,
    status: "completed",
    attendees: ["u2", "u4"],
    ratings: [
      { userId: "u2", userName: "Priya Mehta", rating: 5, review: "Perfect morning session. The instructor was wonderful." },
    ],
  },
  {
    id: "e3",
    eventRequestId: "er3",
    title: "Yoga in the Park",
    purpose: "Free community yoga session for senior citizens and WFH professionals",
    socialImpact: "Tackles sedentary lifestyles and social isolation",
    budget: 30000,
    locality: "Malad",
    expectedAudience: 80,
    duration: "2 hours",
    facilitiesRequired: "Open Ground, Drinking Water",
    volunteersRequired: 5,
    freeOrPaid: "Free",
    ageGroup: "25+",
    category: "Yoga",
    venueName: "Serenity Garden",
    venueAddress: "Opposite Railway Station, Malad West",
    date: "2026-08-05",
    ticketPrice: 0,
    totalSeats: 80,
    bookedSeats: 23,
    status: "upcoming",
    attendees: [],
    ratings: [],
  },
  {
    id: "e4",
    eventRequestId: "er_past3",
    title: "Andheri Music Night",
    purpose: "Live music evening for community bonding",
    socialImpact: "Creates social spaces for isolated professionals",
    budget: 75000,
    locality: "Andheri",
    expectedAudience: 90,
    duration: "4 hours",
    facilitiesRequired: "Rooftop, Sound System",
    volunteersRequired: 8,
    freeOrPaid: "Paid",
    ageGroup: "18+",
    category: "Music",
    venueName: "Sunrise Rooftop Venue",
    venueAddress: "Building 12, Andheri West",
    date: "2026-07-20",
    ticketPrice: 300,
    totalSeats: 90,
    bookedSeats: 45,
    status: "upcoming",
    attendees: [],
    ratings: [],
  },
  {
    id: "e5",
    eventRequestId: "er_past4",
    title: "Fitness Bootcamp Goregaon",
    purpose: "High-energy group fitness session",
    socialImpact: "Promotes physical health and team spirit",
    budget: 40000,
    locality: "Goregaon",
    expectedAudience: 50,
    duration: "2 hours",
    facilitiesRequired: "Indoor Sports Hall, Equipment",
    volunteersRequired: 4,
    freeOrPaid: "Paid",
    ageGroup: "18-45",
    category: "Fitness",
    venueName: "FitZone Indoor Sports Hall",
    venueAddress: "Sports Complex, Goregaon East",
    date: "2026-07-25",
    ticketPrice: 200,
    totalSeats: 50,
    bookedSeats: 12,
    status: "upcoming",
    attendees: [],
    ratings: [],
  },
];

export const dummyImpactReports: ImpactReport[] = [
  {
    eventId: "e1",
    eventTitle: "Kandivali Chess Meet",
    totalAttendees: 52,
    totalCapacity: 60,
    averageRating: 4.5,
    totalReviews: 2,
    communityEngagement: "87% capacity utilization. Participants from 5 different localities attended.",
    socialImpactSummary:
      "Successfully connected 52 community members across age groups through chess. 15 senior citizens attended, reducing isolation for this demographic.",
  },
  {
    eventId: "e2",
    eventTitle: "Borivali Sunrise Yoga",
    totalAttendees: 38,
    totalCapacity: 40,
    averageRating: 5.0,
    totalReviews: 1,
    communityEngagement: "95% capacity utilization. Strong repeat interest — 30 attendees signed up for the next session.",
    socialImpactSummary:
      "Addressed sedentary lifestyle concerns for 38 attendees. 12 WFH professionals reported improved mood and social connection.",
  },
];
