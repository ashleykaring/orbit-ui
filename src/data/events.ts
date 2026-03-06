export type EventDetails = {
  typeOfIncident: string;
  severity: string;
  time: string;
  platform: string;
  account: string;
  transcript: string;
  screenshotUrl?: string;
  tags: string[];
};

export type EventItem = {
  title: string;
  details: EventDetails;
};

const todayDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
const february26Date = `February 26, ${new Date().getFullYear()}`;

export const testEvents: EventItem[] = [
  {
    title: "Inappropriate Request",
    details: {
      typeOfIncident: "Inappropriate Request",
      severity: "High",
      time: `${todayDate} at 3:00 PM`,
      platform: "Roblox",
      account: "John's Laptop",
      transcript:
        "scaryuser123: Hey, what's your address?\njohnny22: I live on 1 Grand Ave.",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["new", "risk"],
    },
  },
  {
    title: "Visited Unsafe Website",
    details: {
      typeOfIncident: "Visited Unsafe Website",
      severity: "Medium",
      time: `${todayDate} at 1:30 PM`,
      platform: "Chrome",
      account: "Stevie's PC",
      transcript: "Visited freemoney.com - flagged unsafe.",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["new", "warning"],
    },
  },
  {
    title: "Mean Comments",
    details: {
      typeOfIncident: "Mean Comments",
      severity: "Warning",
      time: `${todayDate} at 1:02 PM`,
      platform: "Minecraft",
      account: "Katie's Tablet",
      transcript:
        "meanuser290: Katie you're going nowhere in life!\nkatiegames1: :(",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["new", "cyber"],
    },
  },
  {
    title: "Suspicious Link",
    details: {
      typeOfIncident: "Suspicious Link",
      severity: "Low",
      time: `${february26Date} at 11:45 AM`,
      platform: "Instagram",
      account: "Emily's Chromebook",
      transcript:
        "sussy_guy: Check out fijiforfree.com!!\nemilyrainbows__: Ooo ok!!",
      screenshotUrl: "/examplescreenshot.png",
      tags: ["warning"],
    },
  },
];
