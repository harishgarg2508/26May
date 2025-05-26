// Signup
function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  localStorage.setItem("user", JSON.stringify({ email, password }));
  alert("Signup successful!");
  window.location.href = "index.html";
}

// Login
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Add Contact
function addContact() {
  const contact = {
    name: document.getElementById("name").value,
    designation: document.getElementById("designation").value,
    company: document.getElementById("company").value,
    industry: document.getElementById("industry").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    country: document.getElementById("country").value,
  };

  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

// Render Contacts
function renderContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  const tbody = document.getElementById("contactTable");
  const filterEmail = document.getElementById("searchEmail")?.value.toLowerCase();
  const filterCountry = document.getElementById("filterCountry")?.value;

  tbody.innerHTML = "";

  contacts.forEach((c, i) => {
    if (filterEmail && !c.email.toLowerCase().includes(filterEmail)) return;
    if (filterCountry && c.country !== filterCountry) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.name}</td><td>${c.designation}</td><td>${c.company}</td><td>${c.industry}</td>
      <td>${c.email}</td><td>${c.phone}</td><td>${c.country}</td>
      <td>
        <button onclick="editContact(${i})">Edit</button>
        <button onclick="deleteContact(${i})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Delete
function deleteContact(index) {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

// Edit
function editContact(index) {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  const c = contacts[index];
  document.getElementById("name").value = c.name;
  document.getElementById("designation").value = c.designation;
  document.getElementById("company").value = c.company;
  document.getElementById("industry").value = c.industry;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  document.getElementById("country").value = c.country;

  contacts.splice(index, 1); // remove old one
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

// Auto render if on dashboard
if (window.location.pathname.includes("dashboard")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
  renderContacts();
}
