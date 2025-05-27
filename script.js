function getInputValue(id) {
    var input = document.getElementById(id);
    return input ? input.value : '';
}
function signup() {
    var email = getInputValue('signupEmail');
    var password = getInputValue('signupPassword');
    var user = { email: email, password: password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful!");
    window.location.href = "index.html";
}
function login() {
    var email = getInputValue('loginEmail');
    var password = getInputValue('loginPassword');
    var userData = localStorage.getItem("user");
    var user = userData ? JSON.parse(userData) : null;
    if (user && user.email === email && user.password === password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid credentials");
    }
}
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
function addContact() {
    var contact = {
        name: getInputValue("name"),
        designation: getInputValue("designation"),
        company: getInputValue("company"),
        industry: getInputValue("industry"),
        email: getInputValue("email"),
        phone: getInputValue("phone"),
        country: getInputValue("country"),
    };
    var storedContacts = localStorage.getItem("contacts");
    var contacts = storedContacts ? JSON.parse(storedContacts) : [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
}
function renderContacts() {
    var _a, _b;
    var storedContacts = localStorage.getItem("contacts");
    var contacts = storedContacts ? JSON.parse(storedContacts) : [];
    var tbody = document.getElementById("contactTable");
    var filterEmail = (_a = document.getElementById("searchEmail")) === null || _a === void 0 ? void 0 : _a.value.toLowerCase();
    var filterCountry = (_b = document.getElementById("filterCountry")) === null || _b === void 0 ? void 0 : _b.value;
    if (!tbody)
        return;
    tbody.innerHTML = "";
    contacts.forEach(function (c, i) {
        if (filterEmail && !c.email.toLowerCase().includes(filterEmail))
            return;
        if (filterCountry && c.country !== filterCountry)
            return;
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>".concat(c.name, "</td><td>").concat(c.designation, "</td><td>").concat(c.company, "</td><td>").concat(c.industry, "</td>\n      <td>").concat(c.email, "</td><td>").concat(c.phone, "</td><td>").concat(c.country, "</td>\n      <td>\n        <button onclick=\"editContact(").concat(i, ")\">Edit</button>\n        <button onclick=\"deleteContact(").concat(i, ")\">Delete</button>\n      </td>\n    ");
        tbody.appendChild(row);
    });
}
function deleteContact(index) {
    var storedContacts = localStorage.getItem("contacts");
    var contacts = storedContacts ? JSON.parse(storedContacts) : [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
}
function editContact(index) {
    var storedContacts = localStorage.getItem("contacts");
    var contacts = storedContacts ? JSON.parse(storedContacts) : [];
    var c = contacts[index];
    if (!c)
        return;
    document.getElementById("name").value = c.name;
    document.getElementById("designation").value = c.designation;
    document.getElementById("company").value = c.company;
    document.getElementById("industry").value = c.industry;
    document.getElementById("email").value = c.email;
    document.getElementById("phone").value = c.phone;
    document.getElementById("country").value = c.country;
    // Remove the current contact before editing
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
}
