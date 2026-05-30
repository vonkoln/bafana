import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type ApiStatus = {
  status: string;
  service: string;
};

type Appointment = {
  id: number;
  date: string;
  time: string;
  client: string;
  phone: string;
  service: string;
  status: string;
  notes: string;
};

function App() {
  const [apiOnline, setApiOnline] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "2026-05-30",
      time: "14:00",
      client: "Cliente exemplo",
      phone: "(31) 99999-9999",
      service: "Atendimento inicial",
      status: "Agendado",
      notes: "Primeiro registro de teste",
    },
  ]);

  const [form, setForm] = useState({
    date: "",
    time: "",
    client: "",
    phone: "",
    service: "",
    status: "Agendado",
    notes: "",
  });

  useEffect(() => {
    axios
      .get<ApiStatus>("http://localhost:3001/health")
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newAppointment: Appointment = {
      id: Date.now(),
      ...form,
    };

    setAppointments((current) => [newAppointment, ...current]);

    setForm({
      date: "",
      time: "",
      client: "",
      phone: "",
      service: "",
      status: "Agendado",
      notes: "",
    });
  }

  function removeAppointment(id: number) {
    setAppointments((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <div>
          <h2>Bafana</h2>
          <p>Automations</p>
        </div>

        <nav>
          <button className="active">Agenda</button>
          <button disabled>Google Sheets</button>
          <button disabled>Automações</button>
        </nav>

        <div className={`api-status ${apiOnline ? "online" : "offline"}`}>
          API {apiOnline ? "online" : "offline"}
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <span className="badge">Módulo 1</span>
            <h1>Agenda conectável ao Google Sheets</h1>
            <p>
              Cadastre agendamentos. Nesta primeira fase os registros ficam
              apenas na tela; depois serão enviados para uma planilha.
            </p>
          </div>
        </header>

        <section className="grid">
          <form className="card form-card" onSubmit={handleSubmit}>
            <h3>Novo agendamento</h3>

            <label>
              Data
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Hora
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Cliente
              <input
                type="text"
                name="client"
                value={form.client}
                onChange={handleChange}
                placeholder="Nome do cliente"
                required
              />
            </label>

            <label>
              Telefone
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(31) 99999-9999"
              />
            </label>

            <label>
              Serviço
              <input
                type="text"
                name="service"
                value={form.service}
                onChange={handleChange}
                placeholder="Ex: Consulta, entrega, manutenção"
                required
              />
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Agendado</option>
                <option>Confirmado</option>
                <option>Concluído</option>
                <option>Cancelado</option>
              </select>
            </label>

            <label>
              Observações
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Detalhes do atendimento"
              />
            </label>

            <button type="submit" className="primary-button">
              Salvar agendamento
            </button>
          </form>

          <section className="card list-card">
            <div className="list-header">
              <h3>Agendamentos</h3>
              <span>{appointments.length} registro(s)</span>
            </div>

            <div className="appointments">
              {appointments.map((appointment) => (
                <article className="appointment" key={appointment.id}>
                  <div>
                    <strong>{appointment.client}</strong>
                    <span>
                      {appointment.date} às {appointment.time}
                    </span>
                  </div>

                  <p>{appointment.service}</p>

                  <div className="appointment-footer">
                    <span className="status-pill">{appointment.status}</span>
                    <button onClick={() => removeAppointment(appointment.id)}>
                      Excluir
                    </button>
                  </div>

                  {appointment.notes && <small>{appointment.notes}</small>}
                </article>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;