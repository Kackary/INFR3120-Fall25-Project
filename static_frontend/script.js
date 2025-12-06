const API = "https://infr3120-fall25-project-cnvg.onrender.com/";

async function loadTasks() {
  const table = document.getElementById("task-body");
  if (!table) return;

  const res = await fetch(`${API}/api/tasks`);
  const tasks = await res.json();

  table.innerHTML = "";

  if (tasks.length === 0) {
    table.innerHTML = `
      <tr><td colspan="4" class="empty">No Task Found</td></tr>
    `;
    return;
  }

  tasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.dueDate ? task.dueDate.split("T")[0] : "No due date"}</td>
      <td>${task.completed ? "✔ Completed" : "🕒 Pending"}</td>
      <td><button onclick="deleteTask('${task._id}')" class="delete-btn">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

async function deleteTask(id) {
  await fetch(`${API}/api/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();

const loginForm = document.getElementById("loginForm");
if (loginForm) {loginForm.addEventListener("submit", async (e) => {e.preventDefault();

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.email.value,
        password: loginForm.password.value
      })
    });

    if (res.ok) location.href = "index.html";
    else alert("Invalid email or password");
  });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {registerForm.addEventListener("submit", async (e) => {e.preventDefault();

    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerForm.email.value,
        password: registerForm.password.value
      })
    });

    if (res.ok) location.href = "index.html";
    else alert("Error creating account");
  });
}

const resetForm = document.getElementById("resetForm");
if (resetForm) {resetForm.addEventListener("submit", async (e) => {e.preventDefault();

    const res = await fetch(`${API}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: resetForm.email.value,
        newPassword: resetForm.newPassword.value
      })
    });

    if (res.ok) alert("Password successfully updated");
    else alert("Error resetting password");
  });
}