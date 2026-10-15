"use client";

import { FormEvent, useEffect, useState } from "react";
import { boothPackages, eventTypes, hourOptions, timeOptions } from "@/lib/inquiry";

const inputClassName = "luxury-input";
const selectClassName = "luxury-select";

const labelClassName = "luxury-label";

function boothFromUrl(): string {
  if (typeof window === "undefined") return "";
  const booth = new URLSearchParams(window.location.search).get("booth");
  if (!booth) return "";
  return boothPackages.some((p) => p.value === booth) ? booth : "";
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [boothPackage, setBoothPackage] = useState("");

  useEffect(() => {
    const fromUrl = boothFromUrl();
    if (fromUrl) setBoothPackage(fromUrl);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(
          payload?.error ||
            "We couldn't send your inquiry. Email hello@thephotogenicexperience.com or try again shortly.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "We couldn't send your inquiry. Email hello@thephotogenicexperience.com or try again shortly.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center border border-luxury-silver/30">
          <svg
            className="h-8 w-8 text-luxury-silver"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="luxury-subheading mb-4">Thank You</h3>
        <p className="max-w-md text-luxury-platinum/70">
          We&apos;ve received your inquiry and will be in touch within 24 hours
          with pricing, availability, and personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className={inputClassName}
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className={inputClassName}
            placeholder="Smith"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={inputClassName}
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClassName}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={inputClassName}
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div className="border-t border-black/[0.06] pt-8">
        <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-neutral-500">
          Booth &amp; Event Details
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="boothPackage" className={labelClassName}>
              Photo Booth Type
            </label>
            <select
              id="boothPackage"
              name="boothPackage"
              required
              className={selectClassName}
              value={boothPackage}
              onChange={(e) => setBoothPackage(e.target.value)}
            >
              <option value="" disabled>
                Select Digital or Pro Photo Booth
              </option>
              {boothPackages.map((pkg) => (
                <option key={pkg.value} value={pkg.value}>
                  {pkg.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="eventType" className={labelClassName}>
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                required
                className={selectClassName}
                defaultValue=""
              >
                <option value="" disabled>
                  Select event type
                </option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="eventDate" className={labelClassName}>
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                className={`${inputClassName} [color-scheme:dark]`}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="startTime" className={labelClassName}>
                Event Start Time
              </label>
              <select
                id="startTime"
                name="startTime"
                required
                className={selectClassName}
                defaultValue=""
              >
                <option value="" disabled>
                  Select start time
                </option>
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="endTime" className={labelClassName}>
                Event End Time
              </label>
              <select
                id="endTime"
                name="endTime"
                required
                className={selectClassName}
                defaultValue=""
              >
                <option value="" disabled>
                  Select end time
                </option>
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="hoursNeeded" className={labelClassName}>
                Hours Needed
              </label>
              <select
                id="hoursNeeded"
                name="hoursNeeded"
                required
                className={selectClassName}
                defaultValue=""
              >
                <option value="" disabled>
                  Select hours
                </option>
                {hourOptions.map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} hours
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="estimatedGuests" className={labelClassName}>
                Estimated Guests
              </label>
              <input
                type="number"
                id="estimatedGuests"
                name="estimatedGuests"
                required
                min={1}
                className={inputClassName}
                placeholder="150"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="venueName" className={labelClassName}>
                Venue Name
              </label>
              <input
                type="text"
                id="venueName"
                name="venueName"
                required
                className={inputClassName}
                placeholder="The Drake Hotel"
              />
            </div>
            <div>
              <label htmlFor="venueCity" className={labelClassName}>
                Venue City
              </label>
              <input
                type="text"
                id="venueCity"
                name="venueCity"
                required
                className={inputClassName}
                placeholder="Chicago"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClassName} resize-none`}
          placeholder="Special requests, booth preferences, or anything else we should know..."
        />
      </div>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
