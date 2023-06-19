class Requests {
  url = "http://localhost:4000";

  constructor() {
    this.url = "http://localhost:4000";
  }

  async getContacts(keyword) {
    let url = `${this.url}/contacts${keyword ? "?keyword=" + keyword : ""}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Não foi possivel obter contatos");
    }
  }

  async getContactById(contact_id) {
    try {
      const response = await fetch(`${this.url}/contact/${contact_id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Não foi possivel obter contatos");
    }
  }

  async createContact(name, age, number) {
    if (!name && !age && !number) {
      throw new Error("Campos precisam ser preenchidos");
    }

    try {
      const response = await fetch(`${this.url}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          number,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Não foi possivel obter contatos");
    }
  }
  async createNumber(contact_id, number) {
    if (!contact_id && !number) {
      throw new Error("Campos precisam ser preenchidos");
    }
    try {
      const response = await fetch(`${this.url}/phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_id,
          number,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Não foi possivel obter contatos");
    }
  }
  async updateNumber(phoneId, number) {
    if (!phoneId && !number) {
      throw new Error("Campos precisam ser preenchidos");
    }

    try {
      const response = await fetch(`${this.url}/phone/${phoneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Não foi possivel obter contatos");
    }
  }

  async updateContact(contactId, name, age) {
    if (!contactId && !name && !age) {
      throw new Error("Campos precisam ser preenchidos");
    }

    try {
      const response = await fetch(`${this.url}/contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);

      throw new Error("Não foi possivel obter contatos");
    }
  }

  async deleteContact(contact_id) {
    try {
      const response = await fetch(`${this.url}/contact/${contact_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.log(error)
      throw new Error("Não foi possivel obter contatos");
    }
  }
  async deleteNumberPhone(phone_id) {
    try {
      const response = await fetch(`${this.url}/phone/${phone_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Não foi possivel obter contatos");
    }
  }
}

module.exports = Requests;
