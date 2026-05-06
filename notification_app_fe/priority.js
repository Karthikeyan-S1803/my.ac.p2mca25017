const API_URL =
  "http://localhost:3000/priority-notifications";

const priorityList =
  document.getElementById("priority-list");

const loading =
  document.getElementById("loading");

const error =
  document.getElementById("error");

let viewedNotifications =
  JSON.parse(
    localStorage.getItem("viewedNotifications")
  ) || [];

async function fetchPriorityNotifications() {

  loading.style.display = "block";

  try {

    const response =
      await fetch(API_URL);

    const data =
      await response.json();

    renderPriorityNotifications(
      data.notifications
    );

  } catch (err) {

    error.innerHTML =
      "Unable to load notifications.";
  }

  loading.style.display = "none";
}

function renderPriorityNotifications(
  notifications
) {

  priorityList.innerHTML = "";

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

    priorityList.appendChild(card);
  });
}

fetchPriorityNotifications();