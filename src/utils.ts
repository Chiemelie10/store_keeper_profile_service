import sanitizeHtml from "sanitize-html";

export function now(): string {
    const date = new Date();

    const parts = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: process.env.APP_TIMEZONE,
    }).formatToParts(date);

    const formatted = `${parts.find(p => p.type === "year")?.value}-${parts.find(p => p.type === "month")?.value}-${parts.find(p => p.type === "day")?.value} ${parts.find(p => p.type === "hour")?.value}:${parts.find(p => p.type === "minute")?.value}:${parts.find(p => p.type === "second")?.value}`;

    return formatted;
}

export function getTimestamp(date: Date): string {

    const parts = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(date);

    const formatted = `${parts.find(p => p.type === "year")?.value}-${parts.find(p => p.type === "month")?.value}-${parts.find(p => p.type === "day")?.value} ${parts.find(p => p.type === "hour")?.value}:${parts.find(p => p.type === "minute")?.value}:${parts.find(p => p.type === "second")?.value}`;

    return formatted;
}

export function cleanInput(value: string): string {
    return sanitizeHtml(value.trim(), {
        allowedTags: [],
        allowedAttributes: {}
    });
}

export function isValidPhoneNumber(value: string): boolean {
    if (value.length === 0) return false;

    let isValid = true;

    const firstChar = value.charAt(0);
    const otherChars = value.slice(1);

    if (firstChar != "+" && !/^\d$/.test(firstChar)) {
        isValid = false;
    }

    if (otherChars === "" || !/^\d+$/.test(otherChars)) {
        isValid = false;
    }

    return isValid;
}