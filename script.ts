type User = {
  email: string;
  password: string;
};

type Contact = {
  name: string;
  designation: string;
  company: string;
  industry: string;
  email: string;
  phone: string;
  country: string;
};

function getInputValue(id: string): string {
  const input = document.getElementById(id) as HTMLInputElement | null;
  return input ? input.value : '';
}

function signup(): void {
  const email = getInputValue('signupEmail');
  const password = getInputValue('signupPassword');

  const user: User = { email, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful!");
  window.location.href = "index.html";
}

function login(): void {
  const email = getInputValue('loginEmail');
  const password = getInputValue('loginPassword');

  const userData = localStorage.getItem("user");
  const user: User | null = userData ? JSON.parse(userData) : null;

  if (user && user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function logout(): void {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

function addContact(): void {
  const contact: Contact = {
    name: getInputValue("name"),
    designation: getInputValue("designation"),
    company: getInputValue("company"),
    industry: getInputValue("industry"),
    email: getInputValue("email"),
    phone: getInputValue("phone"),
    country: getInputValue("country"),
  };

  const storedContacts = localStorage.getItem("contacts");
  const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];

  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

function renderContacts(): void {
  const storedContacts = localStorage.getItem("contacts");
  const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];

  const tbody = document.getElementById("contactTable") as HTMLTableSectionElement | null;
  const filterEmail = (document.getElementById("searchEmail") as HTMLInputElement | null)?.value.toLowerCase();
  const filterCountry = (document.getElementById("filterCountry") as HTMLSelectElement | null)?.value;

  if (!tbody) return;
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

function deleteContact(index: number): void {
  const storedContacts = localStorage.getItem("contacts");
  const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];

  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

function editContact(index: number): void {
  const storedContacts = localStorage.getItem("contacts");
  const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];

  const c = contacts[index];
  if (!c) return;

  (document.getElementById("name") as HTMLInputElement).value = c.name;
  (document.getElementById("designation") as HTMLInputElement).value = c.designation;
  (document.getElementById("company") as HTMLInputElement).value = c.company;
  (document.getElementById("industry") as HTMLInputElement).value = c.industry;
  (document.getElementById("email") as HTMLInputElement).value = c.email;
  (document.getElementById("phone") as HTMLInputElement).value = c.phone;
  (document.getElementById("country") as HTMLInputElement).value = c.country;

  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}
