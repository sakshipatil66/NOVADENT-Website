import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Search, Trash2, RefreshCw, Download } from "lucide-react";
import "./AdminDashboard.css";

const STORAGE_KEY = "novadent_appointment_requests";
export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [notice, setNotice] = useState("");
  const refresh = () => {
    try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); setRequests(Array.isArray(data) ? data : []); }
    catch { setRequests([]); setNotice("Could not read this browser's saved requests."); }
  };
  useEffect(() => { refresh(); }, []);
  const filtered = useMemo(() => requests.filter((r) => {
    const haystack = `${r.name} ${r.phone} ${r.email} ${r.service} ${r.id}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (status === "All" || r.status === status);
  }), [requests, query, status]);
  const persist = (updated, successMessage) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRequests(updated);
      setNotice(successMessage);
    } catch {
      setNotice("Could not save changes in this browser. Storage may be unavailable or full.");
      refresh();
    }
  };
  const updateStatus = (id, nextStatus) => {
    const updated = requests.map((r) => r.id === id ? { ...r, status: nextStatus } : r);
    persist(updated, "Status updated in this browser.");
  };
  const remove = (id) => {
    if (!window.confirm("Delete this saved request from this browser?")) return;
    const updated = requests.filter((r) => r.id !== id);
    persist(updated, "Request deleted from this browser.");
  };
  const exportCsv = () => {
    const cols = ["id","name","phone","email","service","date","time","status","createdAt"];
    const quote = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...filtered.map((r) => cols.map((c) => quote(r[c])).join(","))].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = "novadent-appointment-requests.csv"; a.click(); URL.revokeObjectURL(url);
  };
  return <main className="novaAdminPage"><div className="novaAdminWrap">
    <header className="novaAdminHeader"><div><span className="novaAdminEyebrow">NOVADENT · OPERATIONS</span><h1>Appointment requests</h1><p>Review and organize requests saved by this browser.</p></div><div className="novaAdminActions"><button onClick={refresh}><RefreshCw size={16}/> Refresh</button><button onClick={exportCsv}><Download size={16}/> Export CSV</button></div></header>
    <div className="novaAdminNotice" role="note"><strong>Demo / local-only dashboard:</strong> this page has no login or server database. Requests only appear in the same browser that submitted them. Do not use this page to store real patient data or expose it publicly until authentication and a secure backend are added.</div>
    <div className="novaAdminStats"><article><span>Total saved</span><strong>{requests.length}</strong></article><article><span>Pending</span><strong>{requests.filter(r=>r.status==="Pending").length}</strong></article><article><span>Confirmed</span><strong>{requests.filter(r=>r.status==="Confirmed").length}</strong></article><article><span>Completed</span><strong>{requests.filter(r=>r.status==="Completed").length}</strong></article></div>
    <div className="novaAdminFilters"><label><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, phone, service or ID" aria-label="Search requests"/></label><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter by status"><option>All</option><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></div>
    {notice && <p className="novaAdminFeedback" role="status">{notice}</p>}
    {filtered.length === 0 ? <div className="novaAdminEmpty"><CalendarDays size={30}/><h2>No requests found</h2><p>Requests created in this browser will appear here.</p></div> : <div className="novaAdminTableWrap"><table className="novaAdminTable"><thead><tr><th>Patient / Request</th><th>Preferred visit</th><th>Contact</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(r=><tr key={r.id}><td><strong>{r.name}</strong><small>{r.id} · {r.service}</small>{r.message && <small>{r.message}</small>}</td><td>{r.date}<small>{r.time}</small></td><td>{r.phone}<small>{r.email || "No email"}</small></td><td><select value={r.status || "Pending"} onChange={e=>updateStatus(r.id,e.target.value)} aria-label={`Status for ${r.name}`}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></td><td><button className="novaAdminDelete" onClick={()=>remove(r.id)} aria-label={`Delete request for ${r.name}`}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>}
  </div></main>;
}
