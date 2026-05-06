const express = require("express");

const cors = require("cors");

const Log =
  require("../logging_middleware/logger");

const app = express();

app.use(cors());

const PORT = 3000;

const notifications = [

  {
    ID: 1,
    Type: "Placement",
    Message: "Microsoft hiring for SDE Role",
    Timestamp: "2026-05-06T13:00:00"
  },

  {
    ID: 2,
    Type: "Result",
    Message: "Semester results published",
    Timestamp: "2026-05-06T11:30:00"
  },

  {
    ID: 3,
    Type: "Event",
    Message: "AI Workshop tomorrow",
    Timestamp: "2026-05-05T16:00:00"
  },

  {
    ID: 4,
    Type: "Placement",
    Message: "Amazon Online Assessment",
    Timestamp: "2026-05-06T12:15:00"
  }
];

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function calculatePriority(notification) {

  const currentTime =
    new Date();

  const notificationTime =
    new Date(notification.Timestamp);

  const minutesDifference =
    (currentTime - notificationTime)
    / (1000 * 60);

  const recencyScore =
    Math.max(0, 1000 - minutesDifference);

  return Math.round(
    weights[notification.Type] * 1000
    + recencyScore
  );
}

app.get(
  "/priority-notifications",
  (req, res) => {

    Log(
      "backend",
      "info",
      "notification_service",
      "Fetching notifications"
    );

    const rankedNotifications =

      notifications

        .map(notification => {

          return {

            ...notification,

            priorityScore:
              calculatePriority(notification)
          };
        })

        .sort(
          (a, b) =>
            b.priorityScore - a.priorityScore
        )

        .slice(0, 10);

    res.json({

      total:
        rankedNotifications.length,

      notifications:
        rankedNotifications
    });
  }
);

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});