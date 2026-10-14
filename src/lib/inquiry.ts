export const boothPackages = [
  { value: "Digital Photo Booth", label: "Digital Photo Booth" },
  { value: "Pro Photo Booth", label: "Pro Photo Booth" },
  { value: "Not sure — help me choose", label: "Not sure — help me choose" },
] as const;

export const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Mitzvah",
  "Quince / Sweet 16",
  "Holiday Party",
  "School Event",
  "Private Celebration",
  "Birthday",
  "Graduation",
  "Other",
] as const;

export const hourOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10+"] as const;

export const timeOptions: { label: string; value: string }[] = (() => {
  const times: { label: string; value: string }[] = [];
  for (let hour = 8; hour <= 23; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 23 && minute === 30) break;
      const hour12 = hour % 12 || 12;
      const period = hour < 12 ? "AM" : "PM";
      const label = `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
      const value = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      times.push({ label, value });
    }
  }
  return times;
})();

export type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  boothPackage: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  hoursNeeded: string;
  estimatedGuests: string;
  venueName: string;
  venueCity: string;
  message: string;
};

const FORM_ERROR = "Please check the form and try again.";

function textField(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function timeLabel(value: string): string {
  return timeOptions.find((time) => time.value === value)?.label ?? value;
}

function formatEventDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function isSpamTrap(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  const company = (input as Record<string, unknown>).company;
  return typeof company === "string" && company.trim().length > 0;
}

export function parseInquiry(
  input: unknown,
): { ok: true; inquiry: Inquiry } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: FORM_ERROR };
  }

  const body = input as Record<string, unknown>;
  const inquiry: Inquiry = {
    firstName: textField(body, "firstName"),
    lastName: textField(body, "lastName"),
    email: textField(body, "email"),
    phone: textField(body, "phone"),
    boothPackage: textField(body, "boothPackage"),
    eventType: textField(body, "eventType"),
    eventDate: textField(body, "eventDate"),
    startTime: textField(body, "startTime"),
    endTime: textField(body, "endTime"),
    hoursNeeded: textField(body, "hoursNeeded"),
    estimatedGuests: textField(body, "estimatedGuests"),
    venueName: textField(body, "venueName"),
    venueCity: textField(body, "venueCity"),
    message: textField(body, "message"),
  };

  const nameOk = (value: string) => value.length > 0 && value.length <= 80;
  const phoneDigits = inquiry.phone.replace(/\D/g, "").length;

  if (
    !nameOk(inquiry.firstName) ||
    !nameOk(inquiry.lastName) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
    inquiry.email.length > 254 ||
    phoneDigits < 7 ||
    inquiry.phone.length > 40 ||
    !boothPackages.some((pkg) => pkg.value === inquiry.boothPackage) ||
    !(eventTypes as readonly string[]).includes(inquiry.eventType) ||
    !isRealDate(inquiry.eventDate) ||
    !timeOptions.some((time) => time.value === inquiry.startTime) ||
    !timeOptions.some((time) => time.value === inquiry.endTime) ||
    !(hourOptions as readonly string[]).includes(inquiry.hoursNeeded) ||
    !/^\d+$/.test(inquiry.estimatedGuests) ||
    Number(inquiry.estimatedGuests) < 1 ||
    Number(inquiry.estimatedGuests) > 20000 ||
    inquiry.venueName.length === 0 ||
    inquiry.venueName.length > 120 ||
    inquiry.venueCity.length === 0 ||
    inquiry.venueCity.length > 80 ||
    inquiry.message.length > 4000
  ) {
    return { ok: false, error: FORM_ERROR };
  }

  if (inquiry.endTime <= inquiry.startTime) {
    return { ok: false, error: "Event end time needs to be after the start time." };
  }

  return { ok: true, inquiry };
}

export function inquirySubject(inquiry: Inquiry): string {
  return `Photo booth inquiry — ${inquiry.firstName} ${inquiry.lastName}, ${inquiry.eventType}`;
}

export function inquiryText(inquiry: Inquiry): string {
  const hoursLabel = inquiry.hoursNeeded === "10+" ? "10+ hours" : `${inquiry.hoursNeeded} hours`;
  const lines = [
    `${inquiry.firstName} ${inquiry.lastName} asked about a photo booth.`,
    "",
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Booth: ${inquiry.boothPackage}`,
    `Event: ${inquiry.eventType}`,
    `Date: ${formatEventDate(inquiry.eventDate)}`,
    `Time: ${timeLabel(inquiry.startTime)} – ${timeLabel(inquiry.endTime)}`,
    `Hours needed: ${hoursLabel}`,
    `Estimated guests: ${inquiry.estimatedGuests}`,
    `Venue: ${inquiry.venueName}, ${inquiry.venueCity}`,
  ];

  if (inquiry.message) {
    lines.push("", "Additional details:", inquiry.message);
  }

  return lines.join("\n");
}
