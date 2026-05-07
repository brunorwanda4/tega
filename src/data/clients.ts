export type ClientGender = "Male" | "Female";

export type ClientTrip = {
  id: string;
  driverName: string;
  driverAvatar: string;
  dateTime: string;
  pickup: string;
  destination: string;
  payment: string;
  receipt: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  gender: ClientGender;
  location: string;
  joined: string;
  phone: string;
  image: string;
  stats: {
    bookings: number;
    bookingsIncrease: string;
    reports: number;
    reportsDate: string;
  };
  travelHistory: ClientTrip[];
};

export const clients: Client[] = [
  {
    id: "1",
    name: "Beatrice Carrot",
    email: "Ngabonzizabrunel@gmail.com",
    gender: "Female",
    location: "Rwanda",
    joined: "04-11-2024",
    phone: "0785190645",
    image: "https://i.pravatar.cc/150?u=client-1",
    stats: {
      bookings: 12,
      bookingsIncrease: "2.5%",
      reports: 2,
      reportsDate: "21/07/2024",
    },
    travelHistory: [
      {
        id: "trip-1",
        driverName: "Alex Parker",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-101",
        dateTime: "04-11-2024, 14:00",
        pickup: "Kigali International Airport",
        destination: "Marriott Hotel Kigali",
        payment: "3,000 FRW",
        receipt: "#34531",
      },
      {
        id: "trip-2",
        driverName: "Marie Uwera",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-102",
        dateTime: "03-11-2024, 09:30",
        pickup: "Nyabugogo Bus Park",
        destination: "Muhanga Bus Park",
        payment: "1,500 FRW",
        receipt: "#34532",
      },
    ],
  },
  {
    id: "2",
    name: "Andy Melvin",
    email: "ishimwereponse5@gmail.com",
    gender: "Male",
    location: "Rwanda",
    joined: "12-10-2024",
    phone: "0783599232",
    image: "https://i.pravatar.cc/150?u=client-2",
    stats: {
      bookings: 8,
      bookingsIncrease: "1.8%",
      reports: 0,
      reportsDate: "12/10/2024",
    },
    travelHistory: [
      {
        id: "trip-3",
        driverName: "Jean Claude",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-103",
        dateTime: "12-10-2024, 11:15",
        pickup: "Kimironko Terminal",
        destination: "Rubavu Station",
        payment: "4,500 FRW",
        receipt: "#34533",
      },
    ],
  },
  {
    id: "3",
    name: "Iradukunda Marie",
    email: "mudasumbwaleilla@gmail.com",
    gender: "Female",
    location: "Rwanda",
    joined: "29-09-2024",
    phone: "0794969163",
    image: "https://i.pravatar.cc/150?u=client-3",
    stats: {
      bookings: 16,
      bookingsIncrease: "4.1%",
      reports: 1,
      reportsDate: "29/09/2024",
    },
    travelHistory: [
      {
        id: "trip-4",
        driverName: "Eric Mutoni",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-104",
        dateTime: "29-09-2024, 16:45",
        pickup: "Huye Bus Park",
        destination: "Kigali City",
        payment: "2,800 FRW",
        receipt: "#34534",
      },
      {
        id: "trip-5",
        driverName: "Bruno Kabaka",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-105",
        dateTime: "25-09-2024, 08:00",
        pickup: "Muhanga Bus Park",
        destination: "Kigali City",
        payment: "1,500 FRW",
        receipt: "#34535",
      },
    ],
  },
  {
    id: "4",
    name: "Mugisha Rwanda",
    email: "Ngabonzizabrunel@gmail.com",
    gender: "Male",
    location: "Rwanda",
    joined: "18-08-2024",
    phone: "0785190645",
    image: "https://i.pravatar.cc/150?u=client-4",
    stats: {
      bookings: 5,
      bookingsIncrease: "0.9%",
      reports: 1,
      reportsDate: "18/08/2024",
    },
    travelHistory: [
      {
        id: "trip-6",
        driverName: "Patrick Niyonsaba",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-106",
        dateTime: "18-08-2024, 07:20",
        pickup: "Remera",
        destination: "Rwamagana",
        payment: "1,800 FRW",
        receipt: "#34536",
      },
    ],
  },
  {
    id: "5",
    name: "John Nathanael",
    email: "ishimwereponse5@gmail.com",
    gender: "Male",
    location: "Uganda",
    joined: "05-08-2024",
    phone: "0783599232",
    image: "https://i.pravatar.cc/150?u=client-5",
    stats: {
      bookings: 10,
      bookingsIncrease: "3.2%",
      reports: 0,
      reportsDate: "05/08/2024",
    },
    travelHistory: [
      {
        id: "trip-7",
        driverName: "Marie Uwera",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-107",
        dateTime: "05-08-2024, 18:10",
        pickup: "Musanze Terminal",
        destination: "Rubavu",
        payment: "2,200 FRW",
        receipt: "#34537",
      },
    ],
  },
  {
    id: "6",
    name: "Alex Mugabe",
    email: "mudasumbwaleilla@gmail.com",
    gender: "Male",
    location: "Rwanda",
    joined: "21-07-2024",
    phone: "0794969163",
    image: "https://i.pravatar.cc/150?u=client-6",
    stats: {
      bookings: 14,
      bookingsIncrease: "2.9%",
      reports: 3,
      reportsDate: "21/07/2024",
    },
    travelHistory: [
      {
        id: "trip-8",
        driverName: "Bruno Kabaka",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-108",
        dateTime: "21-07-2024, 12:30",
        pickup: "Kigali City",
        destination: "Nyagatare",
        payment: "5,200 FRW",
        receipt: "#34538",
      },
      {
        id: "trip-9",
        driverName: "Alex Parker",
        driverAvatar: "https://i.pravatar.cc/150?u=driver-109",
        dateTime: "19-07-2024, 13:00",
        pickup: "Nyamirambo",
        destination: "Kayonza",
        payment: "3,100 FRW",
        receipt: "#34539",
      },
    ],
  },
];

export function getClientById(id: string) {
  return clients.find((client) => client.id === id);
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
