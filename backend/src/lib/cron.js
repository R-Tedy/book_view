import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent sucessfully");
      else console.log("GET request failes", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// CRON JOB EXPLANATION
// Cron jobs are scheduled tasks that run periodically at fixed intervals 
// the above code sends 1 GET request every 14 minutes;

// a schedule is defined using a cron expression, this consists of five fields:
// MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

// 14 * * * * - every 14 minutes
// 0 0 * * 0 - at midnight every sunday.
// 30 3 15 * * - at 3:30am on the 15th of every month
// 0 0 1 1 * - midnight at the first day of every month
// 0 * * * * - every hour