
import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  Settings,
  LogOut,
  Search,
  Bell,
} from "lucide-react";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const appointments = [
    {
      id: 1,
      patient: "Sample Patient",
      doctor: "Dr. Rohan Mehta",
      treatment: "Dental Check-up",
      date: "Pending",
      status: "Pending",
    },
  ];

  return (
    <div className="nova-admin">
      <aside className="nova-sidebar">
        <h2>NOVADENT</h2>
        <p className="sidebar-label">MANAGEMENT</p>

        <nav>
          <a href="/admin" className="active">
            <LayoutDashboard size={18} /> Dashboard
          </a>

          <a href="/admin/appointments">
            <CalendarDays size={18} /> Appointments
          </a>

          <a href="/admin/patients">
            <Users size={18} /> Patients
          </a>

          <a href="/admin/doctors">
            <Stethoscope size={18} /> Doctors
          </a>

          <a href="/admin/settings">
            <Settings size={18} /> Settings
          </a>
        </nav>

        <button className="nova-logout">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="nova-main">
        <header className="nova-topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to NOVADENT management</p>
          </div>

          <div className="nova-top-actions">
            <label className="nova-search">
              <Search size={18} />
              <input placeholder="Search appointments..." />
            </label>

            <button aria-label="Notifications">
              <Bell size={20} />
            </button>

            <div className="nova-admin-profile">
              <span>AD</span>
              <div>
                <strong>Administrator</strong>
                <small>Clinic Admin</small>
              </div>
            </div>
          </div>
        </header>

        <section className="nova-stats">
          <article>
            <p>Total Appointments</p>
            <h3>—</h3>
          </article>

          <article>
            <p>Pending Appointments</p>
            <h3>—</h3>
          </article>

          <article>
            <p>Confirmed Appointments</p>
            <h3>—</h3>
          </article>

          <article>
            <p>Cancelled Appointments</p>
            <h3>—</h3>
          </article>
        </section>

        <section className="nova-table-section">
          <div className="nova-table-heading">
            <div>
              <h2>Recent Appointments</h2>
              <p>Review and manage patient appointment requests.</p>
            </div>

            <button>View All</button>
          </div>

          <div className="nova-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Treatment</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patient}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.treatment}</td>
                    <td>{appointment.date}</td>
                    <td>
                      <span className="nova-status">
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <button className="nova-view-button">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
