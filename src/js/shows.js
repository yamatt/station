const ical = require("node-ical");
const moment = require('moment-timezone');
const RRule = require('rrule').RRule;

export default class Shows {
  OFFLINE_URL = "https://giphy.com/embed/l1J9EdzfOSgfyueLm";

  ICAL_DEFAULT_URL =
    "https://calendar.google.com/calendar/ical/09a4c83c5bb269c7e72c707b716fdee126b50c6d07817b7f553080b14d3f4c08%40group.calendar.google.com/public/basic.ics";

  ICAL_CHECK_SECONDS = 60;

  constructor(parent) {
    this.parent = parent;

    this.check_loop = null;
  }

  get whatsOn() {
    ical.fromURL(icalUrl, {}, (err, data) => {
      if (err) {
        console.error("Error loading ical file:", err);
        return;
      }

      // Get the current time in UTC
      const now = moment.utc();

      // Loop through each event in the calendar
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const event = data[key];
          if (event.type === "VEVENT") {
            // Check if the event is a recurring event
            if (event.rrule) {
              // If it's a recurring event, parse the recurrence rule
              const rrule = new RRule.fromString(event.rrule.toString());
              const occurrences = rrule.between(
                now.toDate(),
                now.clone().add(1, "day").toDate()
              ); // Look for occurrences within the next 24 hours
              // Check each occurrence
              for (const occurrence of occurrences) {
                const start = moment.utc(occurrence);
                const end = moment
                  .utc(occurrence)
                  .add(event.duration || 0, "seconds");
                if (now.isBetween(start, end)) {
                  console.log("Recurring Event:", event.summary);
                  console.log("Starts:", start.format());
                  console.log("Ends:", end.format());
                }
              }
            } else {
              // If it's not a recurring event, handle it as before
              const start = moment.utc(event.start);
              const end = moment.utc(event.end);
              if (now.isBetween(start, end)) {
                console.log("Event:", event.summary);
                console.log("Starts:", start.format());
                console.log("Ends:", end.format());
              }
            }
          }
        }
      }
    });
  }

}
