    let contacts = [];
    let editIndex = -1;
    let db;

    function dbin() {
      const request = indexedDB.open('ContactDB', 1);
      
      request.onerror = () => console.error('DB error');
      
      request.onsuccess = (e) => {
        db = e.target.result;
        loadContacts();
      };
      
      request.onupgradeneeded = (e) => {
        db = e.target.result;
        const store = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      };
    }

    function loadContacts() {
      const tx = db.transaction(['contacts'], 'readonly');
      const store = tx.objectStore('contacts');
      const request = store.getAll();
      
      request.onsuccess = () => {
        contacts = request.result;
        renderTable();
      };
    }

    function saveContact(contact) {
      const tx = db.transaction(['contacts'], 'readwrite');
      const store = tx.objectStore('contacts');
      
      if (contact.id) {
        store.put(contact);
      } else {
        store.add(contact);
      }
      
      tx.oncomplete = () => loadContacts();
    }

    function removeContact(id) {
      const tx = db.transaction(['contacts'], 'readwrite');
      const store = tx.objectStore('contacts');
      store.delete(id);
      
      tx.oncomplete = () => loadContacts();
    }

    function renderTable() {
      const table = document.getElementById('contact-table');
      const search = document.getElementById('search').value.toLowerCase();
      
      table.innerHTML = '';

      const filteredContacts = contacts.filter(c => 
        c.name.toLowerCase().includes(search)
      );

      filteredContacts.forEach((contact) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.designation}</td>
          <td>${contact.company}</td>
          <td>${contact.industry}</td>
          <td>${contact.email}</td>
          <td>${contact.country}</td>
          <td class="actions">
            <button onclick="editContact(${contact.id})">Edit</button>
            <button onclick="deleteContact(${contact.id})">Delete</button>
          </td>
        `;
        table.appendChild(row);
      });
    }

    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();

      const contact = {
        name: document.getElementById('name').value,
        designation: document.getElementById('designation').value,
        company: document.getElementById('company').value,
        industry: document.getElementById('industry').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value
      };

      if (editIndex !== -1) {
        contact.id = editIndex;
        editIndex = -1;
      }

      saveContact(contact);
      this.reset();
    });

    function editContact(id) {
      const contact = contacts.find(c => c.id === id);
      document.getElementById('name').value = contact.name;
      document.getElementById('designation').value = contact.designation;
      document.getElementById('company').value = contact.company;
      document.getElementById('industry').value = contact.industry;
      document.getElementById('email').value = contact.email;
      document.getElementById('phone').value = contact.phone;
      document.getElementById('country').value = contact.country;
      editIndex = id;
    }

    function deleteContact(id) {
      if (confirm('Are you sure?')) {
        removeContact(id);
      }
    }

    function sortTable(key) {
      contacts.sort((a, b) => a[key].localeCompare(b[key]));
      renderTable();
    }

    document.getElementById('search').addEventListener('input', renderTable);
    document.getElementById('logout-btn').addEventListener('click', function() {
      window.location.href = 'login.html';
    });

    dbin();