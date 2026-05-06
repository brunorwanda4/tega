type QueryReader = {
  get: (name: string) => string | null;
  toString: () => string;
};

type QueryUpdates = Record<string, string | number | null | undefined>;

export function buildBookingHref(
  path: string,
  searchParams: QueryReader,
  updates: QueryUpdates = {},
) {
  const params = new URLSearchParams(searchParams.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function getBookingDetails(searchParams: QueryReader) {
  return {
    location: searchParams.get("location") || "Kigali, Nyamirambo",
    destination: searchParams.get("to") || "Muhanga, Cyakabiri",
    plateNumber: searchParams.get("plateNumber") || "RWF123D",
    agency: searchParams.get("agency") || "Horizon express",
    delay: searchParams.get("delay") || "On time",
    seats: searchParams.get("seats") || "10",
    status: searchParams.get("status") || "ontime",
    departureTime: searchParams.get("departureTime") || "09:10 AM",
    price: searchParams.get("price") || "1,507 RF",
    passengers: searchParams.get("passengers") || "2",
    adults: searchParams.get("adults") || searchParams.get("passengers") || "2",
    children: searchParams.get("children") || "0",
    suitcases: searchParams.get("suitcases") || "2",
    carryons: searchParams.get("carryons") || "0",
    total: searchParams.get("total"),
  };
}

export function parseMoney(value: string) {
  return Number(value.replace(/\D/g, ""));
}

export function formatRwf(value: number | string) {
  const amount = typeof value === "number" ? value : parseMoney(value);
  return `${amount.toLocaleString()} RWF`;
}
