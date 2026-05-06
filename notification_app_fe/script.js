const API_URL =
  "http://localhost:3000/priority-notifications";

const notificationList =
  document.getElementById("notification-list");

const filterSelect =
  document.getElementById("filter");

const loading =
  document.getElementById("loading");

const error =
  document.getElementById("error");

const prevBtn =
  document.getElementById("prev-btn");

const nextBtn =
  document.getElementById("next-btn");

const pageNumber =
  document.getElementById("page-number");

let currentPage = 1;

const limit = 3;

let currentFilter = "all";

let viewedNotifications =
  JSON.parse(
    localStorage.getItem("viewedNotifications")
  ) || [];

async function fetchNotifications() {

  loading.style.display = "block";

  error.innerHTML = "";

  try {

    const response =
      await fetch(API_URL);

    const data =
      await response.json();

    let notifications =
      data.notifications;

    if (currentFilter !== "all") {

      notifications =
        notifications.filter(
          item =>
            item.Type === currentFilter
        );
    }

    const start =
      (currentPage - 1) * limit;

    const end =
      start + limit;

    const paginated =
      notifications.slice(start, end);

    renderNotifications(paginated);

  } catch (err) {

    error.innerHTML =
      "Unable to fetch notifications.";
  }

  loading.style.display = "none";

  pageNumber.innerHTML =
    `Page ${currentPage}`;
}

function renderNotifications(
  notifications
) {

  notificationList.innerHTML = "";

  notifications.forEach(notification => {

    const card =
      document.createElement("div");

    card.className = "card";

    if (
      viewedNotifications.includes(notification.ID)
    ) {
      card.classList.add("viewed");
    }

    card.innerHTML = `
      <h3>${notification.Message}</h3>

      <p class="type">
        Type: ${notification.Type}
      </p>

      <p>
        ${notification.Timestamp}
      </p>
    `;

    card.addEventListener(
      "click",
      () => {

        if (
          !viewedNotifications.includes(
            notification.ID
          )
        ) {

          viewedNotifications.push(z
            notification.ID
          );

          localStorage.setItem(
            "viewedNotifications",
            JSON.stringify(
              viewedNotifications
            )
          );

          card.classList.add("viewed");
        }
      }
    );

    notificationList.appendChild(card);
  });
}

filterSelect.addEventListener(
  "change",
  (e) => {

    currentFilter =
      e.target.value;

    currentPage = 1;

    fetchNotifications();
  }
);

nextBtn.addEventListener(
  "click",
  () => {

    currentPage++;

    fetchNotifications();
  }
);

prevBtn.addEventListener(
  "click",
  () => {

    if (currentPage > 1) {

      currentPage--;

      fetchNotifications();
    }
  }
);

fetchNotifications();