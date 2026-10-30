import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  RefreshCw,
  Download,
  Eye,
  Trash2,
  Clock3,
  CheckCircle2,
  CircleX,
  Activity,
  ChevronDown,
  HeartPulse,
  LogOut,
} from "lucide-react";

import "./AdminDashboard.css";

const STORAGE_KEY = "novadent_appointment_requests";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Appointments", icon: CalendarDays, active: true },
  { label: "Patients", icon: Users },
  { label: "Doctors", icon: Stethoscope },
  { label: "Treatments", icon: HeartPulse },
];

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function formatDate(date) {
  if (!date) return "Not specified";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status = "Pending") {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [notice, setNotice] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const refresh = () => {
    try {
      const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setRequests(Array.isArray(data) ? data : []);
      setNotice("");
    } catch {
      setRequests([]);
      setNotice("Unable to read appointment requests from this browser.");
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const filteredRequests = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    return requests.filter((request) => {
      const searchableText = [
        request.name,
        request.phone,
        request.email,
        request.service,
        request.id,
        request.doctor,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchText);

      const matchesStatus =
        status === "All" ||
        (request.status || "Pending") === status;

      return matchesSearch && matchesStatus;
    });
  }, [requests, query, status]);

  const counts = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter(
        (request) => (request.status || "Pending") === "Pending"
      ).length,
      confirmed: requests.filter(
        (request) => request.status === "Confirmed"
      ).length,
      completed: requests.filter(
        (request) => request.status === "Completed"
      ).length,
    };
  }, [requests]);

  const persist = (updatedRequests, message) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRequests)
      );

      setRequests(updatedRequests);
      setNotice(message);
    } catch {
      setNotice("Unable to save changes in browser storage.");
    }
  };

  const updateStatus = (id, nextStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? { ...request, status: nextStatus }
        : request
    );

    persist(updatedRequests, "Appointment status updated locally.");

    setSelectedRequest((current) =>
      current?.id === id
        ? { ...current, status: nextStatus }
        : current
    );
  };

  const deleteRequest = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment request?"
    );

    if (!confirmed) return;

    const updatedRequests = requests.filter(
      (request) => request.id !== id
    );

    persist(updatedRequests, "Appointment removed from this browser.");

    if (selectedRequest?.id === id) {
      setSelectedRequest(null);
    }
  };

  const exportCSV = () => {
    const columns = [
      "id",
      "name",
      "phone",
      "email",
      "service",
      "doctor",
      "date",
      "time",
      "status",
      "createdAt",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = [
      columns.join(","),
      ...filteredRequests.map((request) =>
        columns.map((column) => escapeCSV(request[column])).join(",")
      ),
    ];

    const blob = new Blob(["\uFEFF" + rows.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "novadent-appointments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="novaAdminPage">
      {sidebarOpen && (
        <button
          className="novaAdminOverlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`novaAdminSidebar ${
          sidebarOpen ? "novaSidebarOpen" : ""
        }`}
      >
        <div className="novaAdminBrand">
          <div className="novaBrandLogo">
            <HeartPulse size={25} />
          </div>

          <div className="novaBrandText">
            <strong>NOVADENT</strong>
            <span>DENTAL CARE</span>
          </div>

          <button
            className="novaSidebarClose"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="novaSidebarSection">MAIN MENU</div>

        <nav className="novaAdminNavigation">
          {menuItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              className={`novaNavItem ${active ? "active" : ""}`}
              onClick={() => {
                if (label !== "Appointments") {
                  setNotice(
                    `${label} navigation is a design placeholder.`
                  );
                } else {
                  setNotice("");
                }

                setSidebarOpen(false);
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>

              {label === "Appointments" && (
                <span className="novaNavCount">{requests.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="novaSidebarSection novaSidebarSectionBottom">
          MANAGEMENT
        </div>

        <nav className="novaAdminNavigation">
          <button
            className="novaNavItem"
            onClick={() =>
              setNotice("Settings navigation is a design placeholder.")
            }
          >
            <Settings size={19} strokeWidth={1.8} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="novaSidebarBottom">
          <div className="novaSidebarHelp">
            <div className="novaHelpIcon">
              <HeartPulse size={19} />
            </div>

            <strong>Patient-first care</strong>

            <p>
              Organize appointment requests and keep your clinic running
              smoothly.
            </p>
          </div>

          <div className="novaSidebarVersion">
            <span className="novaVersionDot" />
            NOVADENT OPERATIONS
            <span>v1.0</span>
          </div>
        </div>
      </aside>

      <section className="novaAdminMain">
        <header className="novaAdminTopbar">
          <div className="novaTopbarLeft">
            <button
              className="novaIconButton novaMenuButton"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div className="novaTopbarTitle">
              <span>Workspace</span>
              <strong>Appointments</strong>
            </div>
          </div>

          <div className="novaTopbarRight">
            <label className="novaGlobalSearch">
              <Search size={18} />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search appointments..."
                aria-label="Search appointments"
              />

              <span className="novaSearchShortcut">⌕</span>
            </label>

            <button
              className="novaIconButton novaNotificationButton"
              aria-label="Refresh appointment data"
              onClick={refresh}
              title="Refresh"
            >
              <Bell size={19} />
              {counts.pending > 0 && (
                <span className="novaNotificationDot" />
              )}
            </button>

            <div className="novaAdminProfile">
              <div className="novaAdminAvatar">NA</div>

              <div className="novaAdminProfileText">
                <strong>Clinic Admin</strong>
                <span>Administrator</span>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="novaAdminContent">
          <div className="novaPageHeading">
            <div>
              <div className="novaBreadcrumb">
                Dashboard <span>/</span> Appointments
              </div>

              <h1>Appointment Management</h1>

              <p>
                Manage patient appointment requests and monitor their status.
              </p>
            </div>

            <div className="novaHeadingActions">
              <button
                className="novaSecondaryButton"
                onClick={refresh}
              >
                <RefreshCw size={16} />
                Refresh
              </button>

              <button
                className="novaPrimaryButton"
                onClick={exportCSV}
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>

          <div className="novaAdminNotice">
            <Activity size={18} />

            <div>
              <strong>Local demo mode</strong>
              <p>
                Appointment data currently comes from this browser only.
                Connect a secure backend before using real patient records.
              </p>
            </div>
          </div>

          {notice && (
            <div className="novaFeedback" role="status">
              <span>{notice}</span>
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <section className="novaStatsGrid">
            <article className="novaStatCard">
              <div className="novaStatTop">
                <span>Total Appointments</span>
                <div className="novaStatIcon total">
                  <CalendarDays size={21} />
                </div>
              </div>

              <strong>{counts.total}</strong>
              <p>All saved requests</p>
            </article>

            <article className="novaStatCard">
              <div className="novaStatTop">
                <span>Pending</span>
                <div className="novaStatIcon pending">
                  <Clock3 size={21} />
                </div>
              </div>

              <strong>{counts.pending}</strong>
              <p>Awaiting confirmation</p>
            </article>

            <article className="novaStatCard">
              <div className="novaStatTop">
                <span>Confirmed</span>
                <div className="novaStatIcon confirmed">
                  <CheckCircle2 size={21} />
                </div>
              </div>

              <strong>{counts.confirmed}</strong>
              <p>Confirmed appointments</p>
            </article>

            <article className="novaStatCard">
              <div className="novaStatTop">
                <span>Completed</span>
                <div className="novaStatIcon completed">
                  <CircleX size={21} />
                </div>
              </div>

              <strong>{counts.completed}</strong>
              <p>Completed appointments</p>
            </article>
          </section>

          <section className="novaAppointmentsPanel">
            <div className="novaPanelHeader">
              <div>
                <h2>Appointment Requests</h2>
                <p>
                  Review patient details and update appointment status.
                </p>
              </div>

              <span className="novaTotalBadge">
                {filteredRequests.length} records
              </span>
            </div>

            <div className="novaTableToolbar">
              <div className="novaFilterTabs">
                {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
                  (item) => (
                    <button
                      key={item}
                      className={status === item ? "selected" : ""}
                      onClick={() => setStatus(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              <label className="novaTableSearch">
                <Search size={16} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search patients..."
                  aria-label="Search patients"
                />
              </label>
            </div>

            <div className="novaTableScroll">
              <table className="novaAppointmentsTable">
                <thead>
                  <tr>
                    <th>Patient / Request</th>
                    <th>Preferred Visit</th>
                    <th>Contact Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <div className="novaPatientCell">
                          <div className="novaPatientAvatar">
                            {getInitials(request.name || "Patient")}
                          </div>

                          <div className="novaPatientInfo">
                            <strong>{request.name || "Unnamed patient"}</strong>
                            <span>
                              {request.id || "No ID"}
                            </span>
                            <small>
                              {request.service || "General consultation"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="novaDateCell">
                          <strong>{formatDate(request.date)}</strong>
                          <span>{request.time || "Time not specified"}</span>
                        </div>
                      </td>

                      <td>
                        <div className="novaContactCell">
                          <strong>{request.phone || "No phone"}</strong>
                          <span>{request.email || "No email"}</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`novaStatusBadge ${statusClass(
                            request.status || "Pending"
                          )}`}
                        >
                          <span className="novaStatusDot" />
                          {request.status || "Pending"}
                        </span>

                        <select
                          className="novaStatusSelect"
                          value={request.status || "Pending"}
                          onChange={(event) =>
                            updateStatus(request.id, event.target.value)
                          }
                          aria-label={`Update status for ${request.name}`}
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>

                      <td>
                        <div className="novaRowActions">
                          <button
                            className="novaViewButton"
                            onClick={() => setSelectedRequest(request)}
                            aria-label={`View ${request.name}`}
                            title="View appointment"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            className="novaDeleteButton"
                            onClick={() => deleteRequest(request.id)}
                            aria-label={`Delete ${request.name}`}
                            title="Delete appointment"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={5}>
                        <div className="novaEmptyState">
                          <CalendarDays size={35} />

                          <h3>No appointments found</h3>

                          <p>
                            Try changing the search or status filter.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="novaTableFooter">
              <span>
                Showing {filteredRequests.length} of {requests.length} requests
              </span>

              <span>Appointment overview</span>
            </div>
          </section>

          <footer className="novaAdminFooter">
            <span>© {new Date().getFullYear()} NOVADENT Dental Care</span>
            <span>Clinic Operations Dashboard</span>
          </footer>
        </div>
      </section>

      {selectedRequest && (
        <div
          className="novaModalBackdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRequest(null);
            }
          }}
        >
          <section
            className="novaAppointmentModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="novaModalTitle"
          >
            <div className="novaModalHeader">
              <div>
                <span className="novaModalEyebrow">
                  APPOINTMENT DETAILS
                </span>
                <h2 id="novaModalTitle">
                  {selectedRequest.name || "Patient details"}
                </h2>
              </div>

              <button
                className="novaIconButton"
                onClick={() => setSelectedRequest(null)}
                aria-label="Close appointment details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="novaModalBody">
              {[
                ["Appointment ID", selectedRequest.id],
                ["Patient Name", selectedRequest.name],
                ["Phone", selectedRequest.phone],
                ["Email", selectedRequest.email],
                ["Treatment", selectedRequest.service],
                ["Doctor", selectedRequest.doctor],
                ["Preferred Date", formatDate(selectedRequest.date)],
                ["Preferred Time", selectedRequest.time],
                ["Status", selectedRequest.status || "Pending"],
                ["Message", selectedRequest.message],
              ].map(([label, value]) => (
                <div className="novaModalDetail" key={label}>
                  <span>{label}</span>
                  <strong>{value || "Not provided"}</strong>
                </div>
              ))}
            </div>

            <div className="novaModalActions">
              <button
                className="novaSecondaryButton"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>

              <button
                className="novaPrimaryButton"
                onClick={() => {
                  updateStatus(selectedRequest.id, "Confirmed");
                }}
              >
                <CheckCircle2 size={16} />
                Confirm Appointment
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}