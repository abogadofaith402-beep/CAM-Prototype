const STORAGE_KEY = "solanoAdminPrototypeDataV2";
const SESSION_KEY = "solanoAdminPrototypeRole";
const approver = "Dr. Elena Bautista";

const seedData = {
  requests: [
    { id: "CA-2025-042", teacher: "Maria L. Santos", email: "maria.santos@solano.edu", initials: "MS", activity: "Division Science Fair", purpose: "Support student research presentations and represent the school at the division science fair.", role: "Science fair coordinator", activityDate: "2025-05-26", startTime: "08:00", endTime: "16:00", venue: "Solano District Activity Center", submitted: "2025-05-15", status: "Pending", remarks: "", approval: null, appearance: null, certificate: null },
    { id: "CA-2025-041", teacher: "Joel M. Reyes", email: "joel.reyes@solano.edu", initials: "JR", activity: "District Curriculum Workshop", purpose: "Participate in the district curriculum alignment and instructional planning workshop.", role: "School representative", activityDate: "2025-05-21", startTime: "08:30", endTime: "15:30", venue: "Solano District Office", submitted: "2025-05-14", status: "Approved", remarks: "Approved for official school participation.", approval: { date: "2025-05-16", by: approver, recordId: "EAP-2025-041" }, appearance: null, certificate: null },
    { id: "CA-2025-040", teacher: "Ana P. Villanueva", email: "ana.villanueva@solano.edu", initials: "AV", activity: "Regional Journalism Seminar", purpose: "Attend professional learning sessions and support campus journalism.", role: "Faculty publication adviser", activityDate: "2025-05-12", startTime: "08:00", endTime: "16:00", venue: "Solano Civic Hall", submitted: "2025-05-08", status: "Completed", remarks: "Approved for participation.", approval: { date: "2025-05-09", by: approver, recordId: "EAP-2025-040" }, appearance: { timeIn: "07:52", timeOut: "16:08", recordStatus: "Complete", recordedBy: approver, recordedAt: "2025-05-12" }, certificate: { id: "COA-2025-018", generated: "2025-05-13" } },
    { id: "CA-2025-039", teacher: "Roberto D. Cruz", email: "roberto.cruz@solano.edu", initials: "RC", activity: "Municipal Sports Council Meeting", purpose: "Coordinate school participation in municipal inter-school sports activities.", role: "School athletics coordinator", activityDate: "2025-05-20", startTime: "09:00", endTime: "12:00", venue: "Solano Municipal Hall", submitted: "2025-05-07", status: "Rejected", remarks: "Please attach the updated activity program and resubmit.", approval: { date: "2025-05-10", by: approver, recordId: "EAP-2025-039" }, appearance: null, certificate: null },
    { id: "CA-2025-038", teacher: "Leah M. Mendoza", email: "leah.mendoza@solano.edu", initials: "LM", activity: "Reading Program Orientation", purpose: "Coordinate reading intervention and orientation activities for school reading program advisers.", role: "Reading program lead", activityDate: "2025-05-08", startTime: "08:30", endTime: "14:30", venue: "Solano High School Library", submitted: "2025-05-05", status: "Completed", remarks: "Approved for school participation.", approval: { date: "2025-05-06", by: approver, recordId: "EAP-2025-038" }, appearance: { timeIn: "08:21", timeOut: "14:38", recordStatus: "Complete", recordedBy: approver, recordedAt: "2025-05-08" }, certificate: { id: "COA-2025-017", generated: "2025-05-09" } },
    { id: "CA-2025-037", teacher: "Paolo R. Garcia", email: "paolo.garcia@solano.edu", initials: "PG", activity: "Regional STEM Educators Forum", purpose: "Share classroom practices and participate in regional STEM collaboration.", role: "Resource participant", activityDate: "2025-05-29", startTime: "08:00", endTime: "16:30", venue: "North Valley Learning Center", submitted: "2025-05-03", status: "Pending", remarks: "", approval: null, appearance: null, certificate: null },
    { id: "CA-2025-036", teacher: "Nina S. Flores", email: "nina.flores@solano.edu", initials: "NF", activity: "Child Protection Seminar", purpose: "Complete annual professional development on school child-protection procedures.", role: "Participant", activityDate: "2025-05-30", startTime: "09:00", endTime: "15:00", venue: "Solano Training Hall", submitted: "2025-05-02", status: "Pending", remarks: "", approval: null, appearance: null, certificate: null }
  ],
  users: [
    { id: "USR-001", name: "Dr. Elena Bautista", email: "elena.bautista@solano.edu", role: "Administrator", status: "Active", created: "2024-06-14" },
    { id: "USR-002", name: "Maria L. Santos", email: "maria.santos@solano.edu", role: "Teacher", status: "Active", created: "2024-08-05" },
    { id: "USR-003", name: "Joel M. Reyes", email: "joel.reyes@solano.edu", role: "Teacher", status: "Active", created: "2024-08-05" },
    { id: "USR-004", name: "Ana P. Villanueva", email: "ana.villanueva@solano.edu", role: "Teacher", status: "Active", created: "2024-08-12" },
    { id: "USR-005", name: "Office Records Staff", email: "records@solano.edu", role: "Records Officer", status: "Active", created: "2025-01-10" }
  ],
  feedback: [
    { id: "FB-015", name: "Maria L. Santos", rating: 5, comments: "The request process is straightforward and the status updates are helpful.", suggestions: "A reminder email before the activity date would be useful.", submitted: "2025-05-14" },
    { id: "FB-014", name: "Joel M. Reyes", rating: 4, comments: "The certificate workflow is easy to follow.", suggestions: "Please allow a downloadable PDF copy of generated certificates.", submitted: "2025-05-12" },
    { id: "FB-013", name: "Leah M. Mendoza", rating: 3, comments: "It works well on desktop.", suggestions: "The activity form could be easier to use on a phone.", submitted: "2025-05-09" }
  ]
};

const pageInfo = {
  dashboard: ["Dashboard", "Administrator overview", "Good morning, Dr. Bautista", "Here’s what’s happening with Certificate of Appearance requests today."],
  requests: ["Activity Requests", "Request management", "Activity requests", "Review submitted activity requests and their current status."],
  approvals: ["Approval Management", "Authorized review", "Requests awaiting approval", "Review request details and record an administrative decision."],
  appearances: ["Appearance Records", "Attendance documentation", "Appearance records", "Record activity time-in and time-out for approved requests."],
  certificates: ["Certificate Management", "Issuance", "Certificates of appearance", "Preview, generate, and print certificates for eligible requests."],
  users: ["User Management", "Authorized accounts", "System users", "Manage prototype accounts and assigned roles."],
  records: ["Reports and Records", "Centralized records", "Records and reports", "Search and review activity request, approval, appearance, and certificate records."],
  feedback: ["Feedback", "System improvement", "Teacher feedback", "Review user ratings, comments, and suggestions."],
  settings: ["Settings", "Prototype configuration", "System settings", "Review prototype information and reset the local sample data."]
};
const restrictedPages = new Set(["approvals", "appearances", "certificates", "users", "records", "settings"]);
const pageContent = document.getElementById("pageContent");
const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const menuToggle = document.getElementById("menuToggle");
const adminToast = bootstrap.Toast.getOrCreateInstance(document.getElementById("adminToast"), { delay: 3200 });
const detailModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("detailModal"));
const formModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("formModal"));
const confirmModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("confirmModal"));
const certificateModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("certificateModal"));

let data = loadData();
let activePage = "dashboard";
let currentRole = getRole();
let requestTableState = { query: "", status: "", teacher: "", date: "", sort: "submitted-desc", page: 1, pageSize: 5 };
let recordsState = { query: "", status: "", teacher: "", date: "", certificate: "" };
let pendingDecision = null;
let certificateForPreview = null;

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && Array.isArray(stored.requests) && Array.isArray(stored.users) && Array.isArray(stored.feedback)) {
      return stored;
    }
  } catch (error) {
    console.error("Stored prototype data could not be loaded; starting with sample records.", error);
  }
  return structuredClone(seedData);
}

function openCertificateDetail(id) {
  const request = data.requests.find((item) => item.id === id);
  if (!request || !request.certificate) return showToast("This certificate has not been generated.");
  openDetail(request.certificate.id, "Certificate record", detailRows([
    ["Certificate ID", escapeHtml(request.certificate.id)], ["Teacher", escapeHtml(request.teacher)], ["Activity", escapeHtml(request.activity)],
    ["Date and venue", `${formatDate(request.activityDate)} · ${escapeHtml(request.venue)}`], ["Role / participation", escapeHtml(request.role)],
    ["Recorded time-in", escapeHtml(request.appearance.timeIn)], ["Recorded time-out", escapeHtml(request.appearance.timeOut)],
    ["Approval record", `${escapeHtml(request.approval.by)} · ${formatDate(request.approval.date)}<small class="table-subtext">${escapeHtml(request.approval.recordId)}</small>`],
    ["Generated", formatDate(request.certificate.generated)], ["Electronic approval", "System-based record; not a personal handwritten signature."]
  ]), `<button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary-green" data-action="certificate-preview" data-id="${escapeHtml(id)}">Preview certificate</button>`);
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Prototype data could not be saved.", error);
    showToast("Could not save changes to browser storage. Check available storage and try again.");
    return false;
  }
}

function getRole() {
  try {
    return localStorage.getItem(SESSION_KEY) === "teacher" ? "teacher" : "admin";
  } catch (error) {
    console.error("Prototype role could not be loaded.", error);
    return "admin";
  }
}

function setRole(role) {
  currentRole = role === "teacher" ? "teacher" : "admin";
  try {
    localStorage.setItem(SESSION_KEY, currentRole);
  } catch (error) {
    console.error("Prototype role could not be saved.", error);
    showToast("Role simulation could not be saved in this browser.");
  }
  updateRoleUI();
  if (currentRole === "teacher" && restrictedPages.has(activePage)) navigate("dashboard");
  renderPage();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? escapeHtml(value) : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nextYearSequence(prefix, year) {
  const pattern = new RegExp(`^${prefix}-${year}-(\\d+)$`);
  const highest = data.requests.reduce((max, request) => {
    const value = prefix === "CA" ? request.id : request.certificate?.id || "";
    const match = pattern.exec(value);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return String(highest + 1).padStart(3, "0");
}

function showToast(message) {
  document.getElementById("toastMessage").textContent = message;
  adminToast.show();
}

function updateRoleUI() {
  const isTeacher = currentRole === "teacher";
  document.getElementById("sidebarName").textContent = isTeacher ? "Demo Teacher Account" : approver;
  document.getElementById("sidebarRole").textContent = isTeacher ? "Teacher · demo role" : "Administrator · demo";
  document.querySelector(".avatar-admin").textContent = isTeacher ? "DT" : "EB";
  document.getElementById("roleChip").classList.toggle("d-none", !isTeacher);
  document.querySelectorAll(".side-link[data-page]").forEach((link) => {
    const restricted = restrictedPages.has(link.dataset.page);
    link.classList.toggle("role-restricted", isTeacher && restricted);
    link.setAttribute("aria-disabled", String(isTeacher && restricted));
  });
}

function updateSharedCounts() {
  const pending = data.requests.filter((request) => request.status === "Pending").length;
  document.getElementById("pendingBadge").textContent = String(pending);
  document.getElementById("notificationText").textContent = `${pending} request${pending === 1 ? "" : "s"} waiting for review.`;
  document.getElementById("todayLabel").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function navigate(page) {
  if (!pageInfo[page]) return;
  if (currentRole === "teacher" && restrictedPages.has(page)) {
    showToast("This prototype role cannot access administrative approval or record-management tools.");
    return;
  }
  activePage = page;
  history.replaceState(null, "", `#${page}`);
  document.querySelectorAll(".side-link[data-page]").forEach((link) => {
    const active = link.dataset.page === page;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.getElementById("breadcrumbTitle").textContent = pageInfo[page][0];
  closeSidebar();
  renderPage();
  pageContent.focus({ preventScroll: true });
}

function renderPage() {
  updateSharedCounts();
  updateRoleUI();
  const renderers = {
    dashboard: renderDashboard,
    requests: renderRequestsPage,
    approvals: renderApprovalsPage,
    appearances: renderAppearancesPage,
    certificates: renderCertificatesPage,
    users: renderUsersPage,
    records: renderRecordsPage,
    feedback: renderFeedbackPage,
    settings: renderSettingsPage
  };
  pageContent.innerHTML = renderers[activePage]();
  pageContent.onclick = null;
  pageContent.oninput = null;
  pageContent.onchange = null;
  if (activePage === "dashboard") bindDashboard();
  if (activePage === "requests") bindRequestPage();
  if (activePage === "approvals") bindApprovalPage();
  if (activePage === "appearances") bindAppearancePage();
  if (activePage === "certificates") bindCertificatePage();
  if (activePage === "users") bindUsersPage();
  if (activePage === "records") bindRecordsPage();
  if (activePage === "feedback") bindFeedbackPage();
  if (activePage === "settings") bindSettingsPage();
}

function pageHeader(page) {
  const [title, eyebrow, defaultHeading, description] = pageInfo[page];
  const heading = page === "dashboard" && currentRole === "teacher" ? "Welcome, Demo Teacher" : defaultHeading;
  return `<div class="page-header"><div><div class="eyebrow">${escapeHtml(eyebrow)}</div><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p></div>${page === "requests" ? '<button class="btn btn-primary-green" data-action="new-request"><i class="bi bi-plus-lg"></i> New demo request</button>' : ""}</div>`;
}

function statusPill(status) {
  const safeStatus = escapeHtml(status || "Pending");
  return `<span class="status-pill status-${safeStatus.toLowerCase()}">${safeStatus}</span>`;
}

function requestTable(rows, options = {}) {
  const showSortDate = options.showSortDate !== false;
  const actionLabel = options.actionLabel || "View details";
  return `<div class="table-responsive"><table class="table admin-table align-middle"><thead><tr>
    <th scope="col">Request ID</th><th scope="col">Teacher Name</th><th scope="col">Activity Name</th>${showSortDate ? "<th scope=\"col\">Date Submitted</th>" : "<th scope=\"col\">Activity Date</th>"}<th scope="col">Status</th><th scope="col">Action</th>
  </tr></thead><tbody>${rows.length ? rows.map((request) => `<tr>
    <td class="id-cell">${escapeHtml(request.id)}</td>
    <td><span class="teacher-cell"><span class="teacher-avatar">${escapeHtml(request.initials || request.teacher.split(" ").map((part) => part[0]).slice(0, 2).join(""))}</span>${escapeHtml(request.teacher)}</span></td>
    <td>${escapeHtml(request.activity)}</td><td>${formatDate(showSortDate ? request.submitted : request.activityDate)}</td><td>${statusPill(request.status)}</td>
    <td><button type="button" class="detail-button" data-action="request-detail" data-id="${escapeHtml(request.id)}"><i class="bi bi-eye"></i> ${escapeHtml(actionLabel)}</button></td>
  </tr>`).join("") : '<tr><td colspan="6" class="table-empty">No requests match these filters.</td></tr>'}</tbody></table></div>`;
}

function renderDashboard() {
  const pending = data.requests.filter((item) => item.status === "Pending").length;
  const approved = data.requests.filter((item) => item.status === "Approved").length;
  const rejected = data.requests.filter((item) => item.status === "Rejected").length;
  const completed = data.requests.filter((item) => Boolean(item.certificate)).length;
  const recent = [...data.requests].sort((a, b) => b.submitted.localeCompare(a.submitted)).slice(0, 5);
  const total = data.requests.length;
  return `${pageHeader("dashboard")}
    <div class="stats-grid dashboard-stats">
      ${statCard("Total Activity Requests", total, "All submitted requests", "bi-file-earmark-text", "icon-green")}
      ${statCard("Pending Requests", pending, "Requires your review", "bi-hourglass-split", "icon-gold")}
      ${statCard("Approved Requests", approved, "Awaiting or recorded appearance", "bi-check2-square", "icon-green")}
      ${statCard("Rejected Requests", rejected, "Administrative decisions", "bi-file-earmark-x", "icon-red")}
      ${statCard("Completed Certificates", completed, "Generated in this demo", "bi-award", "icon-olive")}
    </div>
    <div class="dashboard-grid">
      <section class="panel activity-panel">
        <div class="panel-heading"><div><h2>Recent activity requests</h2><p>Latest requests submitted by school personnel</p></div><button class="text-link" data-go-page="requests">View all <i class="bi bi-arrow-right"></i></button></div>
        ${requestTable(recent)}
      </section>
      <aside class="panel workflow-panel">
        <div class="panel-heading"><div><h2>Workflow summary</h2><p>Current request pipeline</p></div></div>
        ${workflowSummary(total, pending, data.requests.filter((item) => item.appearance).length, completed)}
        ${pending ? `<div class="attention-note"><i class="bi bi-exclamation-circle"></i><span><strong>${pending} request${pending === 1 ? "" : "s"} need attention</strong><small>Review pending submissions before their scheduled activity dates.</small></span></div>` : ""}
      </aside>
    </div>`;
}

function statCard(label, value, note, icon, color) {
  return `<article class="stat-card"><span class="stat-icon ${color}"><i class="bi ${icon}"></i></span><span class="stat-label">${escapeHtml(label)}</span><strong class="stat-value">${escapeHtml(value)}</strong><span class="stat-note">${escapeHtml(note)}</span></article>`;
}

function workflowSummary(total, pending, appearances, certificates) {
  const width = (value) => total ? Math.min(100, Math.round(value / total * 100)) : 0;
  return `<div class="workflow-list">${workflowItem("Submitted", total, 100, "progress-green")}
    ${workflowItem("For approval", pending, width(pending), "progress-gold")}
    ${workflowItem("Appearances recorded", appearances, width(appearances), "progress-sage")}
    ${workflowItem("Certificates issued", certificates, width(certificates), "progress-slate")}</div>`;
}

function workflowItem(label, value, percent, color) {
  return `<div class="workflow-item"><div class="workflow-label"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div><div class="progress workflow-progress"><div class="progress-bar ${color}" style="width:${percent}%" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(label)}"></div></div></div>`;
}

function bindDashboard() {
  pageContent.onclick = handleGlobalAction;
}

function selectOptions(values, selected = "", first = "All") {
  return `<option value="">${escapeHtml(first)}</option>${values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}`;
}

function requestFilters() {
  const teacherNames = [...new Set(data.requests.map((item) => item.teacher))].sort();
  return `<div class="filter-bar">
    <label class="search-field"><i class="bi bi-search" aria-hidden="true"></i><input id="requestQuery" type="search" placeholder="Search ID, teacher, activity..." value="${escapeHtml(requestTableState.query)}" aria-label="Search requests"></label>
    <select id="requestStatus" class="form-select filter-control" aria-label="Filter status">${selectOptions(["Pending", "Approved", "Rejected", "Completed"], requestTableState.status, "All statuses")}</select>
    <select id="requestTeacher" class="form-select filter-control" aria-label="Filter teacher">${selectOptions(teacherNames, requestTableState.teacher, "All teachers")}</select>
    <label class="date-filter"><span>Activity date</span><input id="requestDate" class="form-control filter-control" type="date" value="${escapeHtml(requestTableState.date)}" aria-label="Filter activity date"></label>
    <select id="requestSort" class="form-select filter-control sort-control" aria-label="Sort requests">
      <option value="submitted-desc" ${requestTableState.sort === "submitted-desc" ? "selected" : ""}>Newest submitted</option>
      <option value="submitted-asc" ${requestTableState.sort === "submitted-asc" ? "selected" : ""}>Oldest submitted</option>
      <option value="activity-asc" ${requestTableState.sort === "activity-asc" ? "selected" : ""}>Activity date (earliest)</option>
      <option value="activity-desc" ${requestTableState.sort === "activity-desc" ? "selected" : ""}>Activity date (latest)</option>
    </select>
  </div>`;
}

function filteredRequests(state, { includeDate = true, includeCertificate = false } = {}) {
  const query = (state.query || "").trim().toLowerCase();
  return data.requests.filter((request) => {
    const matchesQuery = [request.id, request.teacher, request.activity, request.purpose, request.role]
      .some((value) => (value || "").toLowerCase().includes(query));
    return matchesQuery &&
      (!state.status || request.status === state.status) &&
      (!state.teacher || request.teacher === state.teacher) &&
      (!includeDate || !state.date || request.activityDate === state.date) &&
      (!includeCertificate || !state.certificate || (request.certificate && request.certificate.id.toLowerCase().includes(state.certificate.toLowerCase())));
  });
}

function renderRequestsPage() {
  const allRows = sortRequests(filteredRequests(requestTableState));
  const pageCount = Math.max(1, Math.ceil(allRows.length / requestTableState.pageSize));
  requestTableState.page = Math.min(requestTableState.page, pageCount);
  const rows = allRows.slice((requestTableState.page - 1) * requestTableState.pageSize, requestTableState.page * requestTableState.pageSize);
  return `${pageHeader("requests")}
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Submitted activity requests</h2><p>${allRows.length} matching record${allRows.length === 1 ? "" : "s"} · sample data</p></div></div>
      ${requestFilters()}${requestTable(rows)}
      ${paginationMarkup(requestTableState.page, pageCount, allRows.length)}
    </section>`;
}

function renderKeepingFocus() {
  const active = document.activeElement;
  const id = active?.id;
  const start = typeof active?.selectionStart === "number" ? active.selectionStart : null;
  const end = typeof active?.selectionEnd === "number" ? active.selectionEnd : null;
  renderPage();
  if (!id) return;
  const replacement = document.getElementById(id);
  if (!replacement) return;
  replacement.focus();
  if (start !== null && end !== null && typeof replacement.setSelectionRange === "function") {
    replacement.setSelectionRange(start, end);
  }
}

function sortRequests(rows) {
  const [field, direction] = requestTableState.sort.split("-");
  return rows.sort((a, b) => {
    const left = field === "submitted" ? a.submitted : a.activityDate;
    const right = field === "submitted" ? b.submitted : b.activityDate;
    return direction === "asc" ? left.localeCompare(right) : right.localeCompare(left);
  });
}

function paginationMarkup(page, pageCount, total) {
  const start = total ? (page - 1) * requestTableState.pageSize + 1 : 0;
  const end = Math.min(page * requestTableState.pageSize, total);
  return `<div class="pagination-row"><span>Showing ${start}–${end} of ${total}</span><div class="pagination-controls"><button class="btn btn-outline-green btn-sm" data-action="page-prev" ${page <= 1 ? "disabled" : ""}>Previous</button><span>Page ${page} of ${pageCount}</span><button class="btn btn-outline-green btn-sm" data-action="page-next" ${page >= pageCount ? "disabled" : ""}>Next</button></div></div>`;
}

function bindRequestPage() {
  pageContent.oninput = (event) => {
    if (event.target.id === "requestQuery") {
      requestTableState.query = event.target.value;
      requestTableState.page = 1;
      renderKeepingFocus();
    }
  };
  pageContent.onchange = (event) => {
    const map = { requestStatus: "status", requestTeacher: "teacher", requestDate: "date", requestSort: "sort" };
    if (map[event.target.id]) {
      requestTableState[map[event.target.id]] = event.target.value;
      requestTableState.page = 1;
      renderPage();
    }
  };
  pageContent.onclick = handleGlobalAction;
}

function renderApprovalsPage() {
  const waiting = data.requests.filter((item) => item.status === "Pending");
  return `${pageHeader("approvals")}
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Pending approval queue</h2><p>Decision records are system-generated prototype entries, not personal handwritten signatures.</p></div><span class="count-chip">${waiting.length} pending</span></div>
      ${requestTable(waiting, { actionLabel: "Review request" })}
    </section>
    <section class="approval-guidance"><i class="bi bi-shield-check"></i><span><strong>Administrative approval record</strong><small>Each decision stores an approver name, decision date, remarks, and system record ID for Certificate of Appearance traceability.</small></span></section>`;
}

function bindApprovalPage() {
  pageContent.onclick = handleGlobalAction;
}

function renderAppearancesPage() {
  const candidates = data.requests.filter((item) => item.status === "Approved" || item.status === "Completed");
  const records = candidates.filter((item) => item.appearance);
  const options = candidates.map((request) => `<option value="${escapeHtml(request.id)}">${escapeHtml(request.id)} · ${escapeHtml(request.teacher)} · ${escapeHtml(request.activity)}</option>`).join("");
  return `${pageHeader("appearances")}
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Record appearance</h2><p>Select an approved activity request, then record its actual time-in and time-out.</p></div></div>
      ${candidates.length ? `<form id="appearanceForm" class="appearance-form">
        <label class="form-field form-field-wide"><span>Approved activity request <b class="required-mark">*</b></span><select class="form-select" id="appearanceRequest" required><option value="">Choose an approved request</option>${options}</select></label>
        <label class="form-field"><span>Recorded time-in <b class="required-mark">*</b></span><input class="form-control" id="timeIn" type="time" required></label>
        <label class="form-field"><span>Recorded time-out <b class="required-mark">*</b></span><input class="form-control" id="timeOut" type="time" required></label>
        <div class="form-field form-field-action"><span>&nbsp;</span><button class="btn btn-primary-green" type="submit"><i class="bi bi-clock-history"></i> Save appearance</button></div>
      </form>` : '<div class="empty-panel">No approved requests are available for appearance recording.</div>'}
    </section>
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Recorded appearances</h2><p>Each appearance is linked to its approved request.</p></div></div>
      ${renderAppearanceTable(records)}
    </section>
    <p class="scope-note"><i class="bi bi-info-circle"></i> This prototype records activity-specific time-in and time-out only. It does not use GPS, biometrics, or maintain a daily time record.</p>`;
}

function renderAppearanceTable(records) {
  return `<div class="table-responsive"><table class="table admin-table align-middle"><thead><tr><th>Teacher</th><th>Activity</th><th>Activity date</th><th>Request ID</th><th>Time-in</th><th>Time-out</th><th>Record status</th></tr></thead><tbody>${records.length ? records.map((request) => `<tr><td>${escapeHtml(request.teacher)}</td><td>${escapeHtml(request.activity)}</td><td>${formatDate(request.activityDate)}</td><td class="id-cell">${escapeHtml(request.id)}</td><td>${escapeHtml(request.appearance.timeIn)}</td><td>${escapeHtml(request.appearance.timeOut)}</td><td>${statusPill(request.appearance.recordStatus)}</td></tr>`).join("") : '<tr><td colspan="7" class="table-empty">No appearance records have been saved yet.</td></tr>'}</tbody></table></div>`;
}

function bindAppearancePage() {
  const form = document.getElementById("appearanceForm");
  if (!form) return;
  document.getElementById("appearanceRequest").addEventListener("change", (event) => {
    const request = data.requests.find((item) => item.id === event.target.value);
    document.getElementById("timeIn").value = request?.appearance?.timeIn || "";
    document.getElementById("timeOut").value = request?.appearance?.timeOut || "";
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const id = document.getElementById("appearanceRequest").value;
    const request = data.requests.find((item) => item.id === id);
    const timeIn = document.getElementById("timeIn").value;
    const timeOut = document.getElementById("timeOut").value;
    if (!request || !["Approved", "Completed"].includes(request.status)) {
      showToast("Appearance records can only be added to an approved activity request.");
      return;
    }
    if (timeOut <= timeIn) {
      document.getElementById("timeOut").setCustomValidity("Time-out must be later than time-in.");
      form.reportValidity();
      document.getElementById("timeOut").setCustomValidity("");
      return;
    }
    request.appearance = { timeIn, timeOut, recordStatus: "Complete", recordedBy: currentRole === "admin" ? approver : "Demo Teacher", recordedAt: todayISO() };
    if (request.status === "Approved") request.status = "Completed";
    if (!saveData()) return;
    showToast(`Appearance record saved for ${request.id}.`);
    renderPage();
  });
}

function requestCertificateReady(request) {
  return Boolean(request.approval && request.appearance?.timeIn && request.appearance?.timeOut);
}

function renderCertificatesPage() {
  const eligible = data.requests.filter(requestCertificateReady);
  return `${pageHeader("certificates")}
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Certificate issuance</h2><p>Certificates are enabled only when approval and complete appearance information are available.</p></div><span class="count-chip">${data.requests.filter((item) => item.certificate).length} issued</span></div>
      <div class="table-responsive"><table class="table admin-table align-middle"><thead><tr><th>Certificate ID</th><th>Teacher</th><th>Activity</th><th>Date and venue</th><th>Approval</th><th>Appearance</th><th>Action</th></tr></thead><tbody>
      ${eligible.length ? eligible.map((request) => `<tr>
        <td class="id-cell">${escapeHtml(request.certificate?.id || "Not generated")}</td><td>${escapeHtml(request.teacher)}</td><td>${escapeHtml(request.activity)}</td>
        <td>${formatDate(request.activityDate)}<small class="table-subtext">${escapeHtml(request.venue)}</small></td>
        <td>${escapeHtml(request.approval.by)}<small class="table-subtext">${formatDate(request.approval.date)}</small></td>
        <td>${escapeHtml(request.appearance.timeIn)}–${escapeHtml(request.appearance.timeOut)}</td>
        <td class="action-cell"><button class="detail-button" data-action="certificate-preview" data-id="${escapeHtml(request.id)}"><i class="bi bi-eye"></i> Preview</button><button class="detail-button" data-action="certificate-detail" data-id="${escapeHtml(request.id)}">Details</button>${request.certificate ? `<button class="detail-button" data-action="certificate-print" data-id="${escapeHtml(request.id)}"><i class="bi bi-printer"></i> Print</button>` : `<button class="detail-button" data-action="certificate-generate" data-id="${escapeHtml(request.id)}"><i class="bi bi-file-earmark-check"></i> Generate</button>`}</td>
      </tr>`).join("") : '<tr><td colspan="7" class="table-empty">No requests currently meet the approval and appearance requirements.</td></tr>'}
      </tbody></table></div>
    </section>
    <div class="approval-guidance"><i class="bi bi-shield-check"></i><span><strong>System-based electronic approval record</strong><small>The certificate shows a traceable system record ID and approving personnel. It is not a handwritten signature or a cryptographic digital signature.</small></span></div>`;
}

function bindCertificatePage() {
  pageContent.onclick = handleGlobalAction;
}

function renderUsersPage() {
  return `${pageHeader("users")}
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Authorized system accounts</h2><p>Sample account directory · teacher role has no administrative approval or records access.</p></div><button class="btn btn-primary-green" data-action="new-user"><i class="bi bi-person-plus"></i> Add user</button></div>
      <div class="filter-bar compact-filter"><label class="search-field"><i class="bi bi-search" aria-hidden="true"></i><input id="userQuery" type="search" placeholder="Search name or email..." aria-label="Search users"></label><select id="userStatusFilter" class="form-select filter-control" aria-label="Filter account status">${selectOptions(["Active", "Inactive"], "", "All account statuses")}</select></div>
      <div class="table-responsive"><table class="table admin-table align-middle"><thead><tr><th>User name</th><th>Email address</th><th>Assigned role</th><th>Account status</th><th>Date created</th><th>Actions</th></tr></thead><tbody id="userRows"></tbody></table></div>
      <div class="empty-state d-none" id="userEmptyState">No users match your search.</div>
    </section>`;
}

function bindUsersPage() {
  const renderUsers = () => {
    const query = document.getElementById("userQuery").value.trim().toLowerCase();
    const status = document.getElementById("userStatusFilter").value;
    const rows = data.users.filter((user) => (!query || `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query)) && (!status || user.status === status));
    document.getElementById("userRows").innerHTML = rows.map((user) => `<tr><td>${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td><td>${escapeHtml(user.role)}</td><td>${statusPill(user.status)}</td><td>${formatDate(user.created)}</td><td class="action-cell"><button class="detail-button" data-action="edit-user" data-id="${escapeHtml(user.id)}"><i class="bi bi-pencil"></i> Edit</button><button class="detail-button" data-action="toggle-user" data-id="${escapeHtml(user.id)}">${user.status === "Active" ? "Deactivate" : "Activate"}</button></td></tr>`).join("");
    document.getElementById("userEmptyState").classList.toggle("d-none", rows.length > 0);
  };
  pageContent.oninput = (event) => { if (event.target.id === "userQuery") renderUsers(); };
  pageContent.onchange = (event) => { if (event.target.id === "userStatusFilter") renderUsers(); };
  pageContent.onclick = handleGlobalAction;
  renderUsers();
}

function renderRecordsPage() {
  const teachers = [...new Set(data.requests.map((item) => item.teacher))].sort();
  const filtered = filteredRequests(recordsState, { includeCertificate: true });
  const rows = filtered.map((request) => `<tr><td class="id-cell">${escapeHtml(request.id)}</td><td>${escapeHtml(request.teacher)}</td><td>${escapeHtml(request.activity)}</td><td>${formatDate(request.activityDate)}</td><td>${statusPill(request.status)}</td><td>${request.approval ? escapeHtml(request.approval.recordId) : "—"}</td><td>${request.appearance ? `${escapeHtml(request.appearance.timeIn)}–${escapeHtml(request.appearance.timeOut)}` : "—"}</td><td>${escapeHtml(request.certificate?.id || "—")}</td><td><button class="detail-button" data-action="request-detail" data-id="${escapeHtml(request.id)}">View record</button></td></tr>`).join("");
  return `${pageHeader("records")}
    <div class="stats-grid report-stats">${statCard("Activity requests", data.requests.length, "All statuses", "bi-file-earmark-text", "icon-green")}${statCard("Approval records", data.requests.filter((item) => item.approval).length, "Decisions recorded", "bi-check2-square", "icon-gold")}${statCard("Appearance records", data.requests.filter((item) => item.appearance).length, "Time-in and time-out", "bi-clock", "icon-green")}${statCard("Certificates", data.requests.filter((item) => item.certificate).length, "Generated documents", "bi-award", "icon-olive")}</div>
    <section class="panel full-panel">
      <div class="panel-heading"><div><h2>Centralized CA records</h2><p>Requests, approvals, appearance records, and generated certificates</p></div><span class="count-chip">${filtered.length} records</span></div>
      <div class="filter-bar records-filter">
        <label class="search-field"><i class="bi bi-search" aria-hidden="true"></i><input id="recordsQuery" type="search" placeholder="Search ID, name, activity..." value="${escapeHtml(recordsState.query)}" aria-label="Search records"></label>
        <select id="recordsTeacher" class="form-select filter-control" aria-label="Filter by teacher">${selectOptions(teachers, recordsState.teacher, "All teachers")}</select>
        <select id="recordsStatus" class="form-select filter-control" aria-label="Filter by status">${selectOptions(["Pending", "Approved", "Rejected", "Completed"], recordsState.status, "All statuses")}</select>
        <label class="date-filter"><span>Activity date</span><input id="recordsDate" class="form-control filter-control" type="date" value="${escapeHtml(recordsState.date)}" aria-label="Filter by activity date"></label>
        <input id="recordsCertificate" class="form-control filter-control certificate-filter" type="search" placeholder="Certificate ID" value="${escapeHtml(recordsState.certificate)}" aria-label="Filter by certificate ID">
      </div>
      <div class="table-responsive"><table class="table admin-table align-middle"><thead><tr><th>Request ID</th><th>Teacher</th><th>Activity</th><th>Activity date</th><th>Status</th><th>Approval record</th><th>Appearance</th><th>Certificate ID</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td class="table-empty" colspan="9">No records match these filters.</td></tr>'}</tbody></table></div>
    </section>`;
}

function bindRecordsPage() {
  pageContent.oninput = (event) => {
    const map = { recordsQuery: "query", recordsDate: "date", recordsCertificate: "certificate" };
    if (map[event.target.id]) {
      recordsState[map[event.target.id]] = event.target.value;
      renderKeepingFocus();
    }
  };
  pageContent.onchange = (event) => {
    const map = { recordsTeacher: "teacher", recordsStatus: "status", recordsDate: "date" };
    if (map[event.target.id]) {
      recordsState[map[event.target.id]] = event.target.value;
      renderPage();
    }
  };
  pageContent.onclick = handleGlobalAction;
}

function renderFeedbackPage() {
  const average = data.feedback.length ? (data.feedback.reduce((sum, item) => sum + Number(item.rating), 0) / data.feedback.length).toFixed(1) : "—";
  const positive = data.feedback.filter((item) => Number(item.rating) >= 4).length;
  return `${pageHeader("feedback")}
    <div class="stats-grid feedback-stats">${statCard("Feedback responses", data.feedback.length, "Submitted demo feedback", "bi-chat-square-text", "icon-green")}${statCard("Average satisfaction", average, "Out of 5 stars", "bi-star", "icon-gold")}${statCard("Positive ratings", positive, "4 or 5 stars", "bi-hand-thumbs-up", "icon-olive")}</div>
    <section class="panel full-panel"><div class="panel-heading"><div><h2>Feedback submissions</h2><p>Comments and suggestions to guide possible system improvements.</p></div></div>
      <div class="table-responsive"><table class="table admin-table align-middle"><thead><tr><th>User name</th><th>Satisfaction rating</th><th>Comments</th><th>Suggestions</th><th>Date submitted</th><th>Action</th></tr></thead><tbody>${data.feedback.length ? data.feedback.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td><span class="rating-stars" aria-label="${item.rating} out of 5 stars">${"★".repeat(Number(item.rating))}${"☆".repeat(5 - Number(item.rating))}</span><small class="table-subtext">${Number(item.rating)} / 5</small></td><td class="feedback-clip">${escapeHtml(item.comments)}</td><td class="feedback-clip">${escapeHtml(item.suggestions)}</td><td>${formatDate(item.submitted)}</td><td><button class="detail-button" data-action="feedback-detail" data-id="${escapeHtml(item.id)}"><i class="bi bi-eye"></i> View details</button></td></tr>`).join("") : '<tr><td colspan="6" class="table-empty">No feedback has been submitted.</td></tr>'}</tbody></table></div>
    </section>`;
}

function bindFeedbackPage() {
  pageContent.onclick = handleGlobalAction;
}

function renderSettingsPage() {
  return `${pageHeader("settings")}
    <section class="panel settings-panel"><div class="settings-icon"><i class="bi bi-shield-check"></i></div><div><h2>Prototype information</h2><p>This frontend demonstration uses mock records saved in this browser’s local storage. It does not provide real authentication, role authorization, official electronic signatures, or permanent records.</p><p>In this demo, system approval records include the decision date, approver display name, remarks, and a generated record ID. They are not a personal handwritten signature or a cryptographic signature.</p><p>For production use, connect a secured server with database-backed records and server-side authorization.</p><button class="btn btn-outline-green" data-action="reset-demo"><i class="bi bi-arrow-counterclockwise"></i> Restore sample data</button></div></section>`;
}

function bindSettingsPage() {
  pageContent.onclick = handleGlobalAction;
}

function openDetail(title, eyebrow, body, footer = '<button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Close</button>') {
  document.getElementById("detailModalTitle").textContent = title;
  document.getElementById("detailEyebrow").textContent = eyebrow;
  document.getElementById("detailModalBody").innerHTML = body;
  document.getElementById("detailModalFooter").innerHTML = footer;
  detailModal.show();
}

function detailRows(entries) {
  return `<dl class="detail-list">${entries.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${value || "—"}</dd></div>`).join("")}</dl>`;
}

function openRequestDetail(id) {
  const request = data.requests.find((item) => item.id === id);
  if (!request) return showToast("The requested record could not be found.");
  const entries = [
    ["Request ID", escapeHtml(request.id)], ["Teacher", `${escapeHtml(request.teacher)}<small class="table-subtext">${escapeHtml(request.email)}</small>`],
    ["Activity or event", escapeHtml(request.activity)], ["Purpose", escapeHtml(request.purpose)], ["Role / participation", escapeHtml(request.role)],
    ["Activity date", formatDate(request.activityDate)], ["Schedule", `${escapeHtml(request.startTime)}–${escapeHtml(request.endTime)}`],
    ["Venue", escapeHtml(request.venue)], ["Date submitted", formatDate(request.submitted)], ["Current status", statusPill(request.status)],
    ["Administrative remarks", escapeHtml(request.remarks || "—")],
    ["Approval record", request.approval ? `${escapeHtml(request.approval.by)} · ${formatDate(request.approval.date)}<small class="table-subtext">System record ${escapeHtml(request.approval.recordId)}</small>` : "No approval recorded"],
    ["Appearance", request.appearance ? `${escapeHtml(request.appearance.timeIn)}–${escapeHtml(request.appearance.timeOut)} · ${escapeHtml(request.appearance.recordStatus)}` : "Not recorded"],
    ["Certificate", request.certificate ? escapeHtml(request.certificate.id) : "Not generated"]
  ];
  const actions = currentRole === "admin" && request.status === "Pending" ?
    `<button class="btn btn-outline-green" data-action="decision-open" data-decision="Rejected" data-id="${escapeHtml(request.id)}">Reject</button><button class="btn btn-primary-green" data-action="decision-open" data-decision="Approved" data-id="${escapeHtml(request.id)}">Approve</button>` : "";
  openDetail(request.id, "Activity request · linked workflow record", detailRows(entries), `<button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Close</button>${actions}`);
}

function openDecision(requestId, decision) {
  const request = data.requests.find((item) => item.id === requestId);
  if (!request || request.status !== "Pending") {
    showToast("Only pending activity requests can be approved or rejected.");
    return;
  }
  pendingDecision = { requestId, decision };
  document.getElementById("confirmModalTitle").textContent = `${decision} request ${request.id}?`;
  const actionVerb = decision === "Approved" ? "approve" : "reject";
  document.getElementById("confirmModalBody").innerHTML = `<p>Confirm that you want to <strong>${actionVerb}</strong> “${escapeHtml(request.activity)}” submitted by ${escapeHtml(request.teacher)}.</p>
    <label class="form-field"><span>${decision === "Rejected" ? "Remarks / reason (required)" : "Administrative remarks (optional)"}</span><textarea class="form-control" id="decisionRemarks" rows="3" maxlength="500" ${decision === "Rejected" ? "required" : ""} placeholder="${decision === "Rejected" ? "Explain why the request is being rejected..." : "Add an optional note for the record..."}"></textarea></label>
    <small class="scope-note"><i class="bi bi-shield-check"></i> A system-generated decision record will be associated with this request and its future certificate.</small>`;
  document.getElementById("confirmModalFooter").innerHTML = `<button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary-green" id="finalizeDecision">${decision === "Approved" ? "Confirm approval" : "Confirm rejection"}</button>`;
  confirmModal.show();
  document.getElementById("finalizeDecision").addEventListener("click", finalizeDecision);
}

function finalizeDecision() {
  if (!pendingDecision) return;
  const remarks = document.getElementById("decisionRemarks").value.trim();
  if (pendingDecision.decision === "Rejected" && !remarks) {
    document.getElementById("decisionRemarks").setCustomValidity("Please enter the rejection reason.");
    document.getElementById("decisionRemarks").reportValidity();
    document.getElementById("decisionRemarks").setCustomValidity("");
    return;
  }
  const request = data.requests.find((item) => item.id === pendingDecision.requestId);
  if (!request || request.status !== "Pending") {
    confirmModal.hide();
    pendingDecision = null;
    showToast("This request is no longer pending. Refresh the approval queue.");
    return;
  }
  const decision = pendingDecision.decision;
  request.status = decision;
  request.remarks = remarks || (decision === "Approved" ? "Approved for official school participation." : "");
  request.approval = { date: todayISO(), by: approver, recordId: `EAP-${request.id.replace("CA-", "")}` };
  if (!saveData()) return;
  pendingDecision = null;
  confirmModal.hide();
  renderPage();
  showToast(`${request.id} ${decision.toLowerCase()}. System approval record ${request.approval.recordId} saved.`);
}

function openForm(title, eyebrow, markup, footer, onReady) {
  document.getElementById("formModalTitle").textContent = title;
  document.getElementById("formModalEyebrow").textContent = eyebrow;
  document.getElementById("formModalBody").innerHTML = markup;
  document.getElementById("formModalFooter").innerHTML = footer;
  formModal.show();
  if (onReady) onReady();
}

function openUserForm(user = null) {
  const isEdit = Boolean(user);
  const nextId = `USR-${String(Math.max(0, ...data.users.map((item) => Number(item.id.slice(4)) || 0)) + 1).padStart(3, "0")}`;
  openForm(isEdit ? "Edit user account" : "Create user account", "Authorized account", `
    <form id="userForm" class="form-grid">
      <label class="form-field"><span>Full name <b class="required-mark">*</b></span><input class="form-control" name="name" required maxlength="90" value="${escapeHtml(user?.name || "")}"></label>
      <label class="form-field"><span>Email address <b class="required-mark">*</b></span><input class="form-control" name="email" type="email" required maxlength="120" value="${escapeHtml(user?.email || "")}"></label>
      <label class="form-field"><span>Assigned role <b class="required-mark">*</b></span><select class="form-select" name="role" required><option value="">Choose role</option>${["Teacher", "Administrator", "Records Officer"].map((role) => `<option ${user?.role === role ? "selected" : ""}>${role}</option>`).join("")}</select></label>
      <label class="form-field"><span>Account status</span><select class="form-select" name="status"><option ${!user || user.status === "Active" ? "selected" : ""}>Active</option><option ${user?.status === "Inactive" ? "selected" : ""}>Inactive</option></select></label>
    </form>`, `<button class="btn btn-outline-green" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary-green" id="saveUserButton">${isEdit ? "Save changes" : "Create account"}</button>`, () => {
    document.getElementById("saveUserButton").addEventListener("click", () => {
      const form = document.getElementById("userForm");
      if (!form.reportValidity()) return;
      const formData = new FormData(form);
      const values = Object.fromEntries(formData.entries());
      const duplicate = data.users.some((item) => item.email.toLowerCase() === values.email.toLowerCase() && item.id !== user?.id);
      if (duplicate) {
        form.elements.email.setCustomValidity("An account with this email already exists.");
        form.reportValidity();
        form.elements.email.setCustomValidity("");
        return;
      }
      if (user) Object.assign(user, values);
      else data.users.push({ id: nextId, ...values, created: todayISO() });
      if (!saveData()) return;
      formModal.hide();
      renderPage();
      showToast(user ? "Account details updated." : "Demo account created.");
    });
  });
}

function openFeedbackDetail(id) {
  const item = data.feedback.find((feedback) => feedback.id === id);
  if (!item) return showToast("Feedback record not found.");
  openDetail(`${item.id} · ${item.name}`, "Teacher feedback", detailRows([
    ["User name", escapeHtml(item.name)], ["Rating", `<span class="rating-stars">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</span> · ${item.rating} / 5`],
    ["Comments", escapeHtml(item.comments)], ["Suggestions", escapeHtml(item.suggestions)], ["Date submitted", formatDate(item.submitted)]
  ]));
}

function certificateMarkup(request) {
  const certificateId = request.certificate?.id || `COA-${request.id.replace("CA-", "")}`;
  return `<article class="certificate-sheet" id="printCertificate">
    <div class="certificate-frame">
      <header class="certificate-heading"><div class="certificate-logo">SHS</div><div><strong>REPUBLIC OF THE PHILIPPINES</strong><span>Department of Education</span><b>SOLANO HIGH SCHOOL</b><small>Solano District · Certificate of Appearance Management</small></div></header>
      <div class="certificate-rule"></div>
      <p class="certificate-kicker">CERTIFICATE NO. ${escapeHtml(certificateId)}</p>
      <h2>CERTIFICATE OF APPEARANCE</h2>
      <p class="certificate-intro">This is to certify that</p>
      <p class="certificate-name">${escapeHtml(request.teacher)}</p>
      <p class="certificate-copy">was present and participated as <strong>${escapeHtml(request.role)}</strong> in the activity stated below:</p>
      <div class="certificate-activity"><strong>${escapeHtml(request.activity)}</strong><span>${formatDate(request.activityDate)} · ${escapeHtml(request.venue)}</span><span>Recorded appearance: ${escapeHtml(request.appearance.timeIn)} to ${escapeHtml(request.appearance.timeOut)}</span></div>
      <p class="certificate-copy">This certificate is issued upon request for whatever lawful purpose it may serve.</p>
      <p class="certificate-issued">Issued on ${formatDate(request.certificate?.generated || todayISO())} at Solano High School.</p>
      <div class="certificate-approval"><div class="approval-seal"><i class="bi bi-patch-check"></i><strong> SYSTEM APPROVED</strong><span>${escapeHtml(request.approval.recordId)}</span><small>Electronic approval record · not a handwritten signature</small></div><div class="approval-name"><strong>${escapeHtml(request.approval.by)}</strong><span>School Administrator</span><small>Approved ${formatDate(request.approval.date)}</small></div></div>
      <footer class="certificate-footnote">Generated by the Certificate of Appearance Management prototype · Verify the approval record with the school office.</footer>
    </div>
  </article>`;
}

function openCertificatePreview(request, printAfter = false) {
  if (!requestCertificateReady(request)) {
    showToast("Certificate generation requires an approval record and both appearance times.");
    return;
  }
  certificateForPreview = request.id;
  document.getElementById("certificateModalTitle").textContent = request.certificate ? `Certificate ${request.certificate.id}` : `Preview · ${request.id}`;
  document.getElementById("certificateModalBody").innerHTML = certificateMarkup(request);
  document.getElementById("certificateModalFooter").innerHTML = `${request.certificate ? "" : `<button class="btn btn-outline-green me-auto" data-action="certificate-generate" data-id="${escapeHtml(request.id)}"><i class="bi bi-file-earmark-check"></i> Generate certificate</button>`}<button class="btn btn-outline-green" data-bs-dismiss="modal">Close</button><button class="btn btn-primary-green" id="printCertificateButton"><i class="bi bi-printer"></i> Print certificate</button>`;
  certificateModal.show();
  document.getElementById("printCertificateButton").addEventListener("click", printCertificate, { once: true });
  if (printAfter) setTimeout(printCertificate, 300);
}

function generateCertificate(id) {
  const request = data.requests.find((item) => item.id === id);
  if (!request || !requestCertificateReady(request)) {
    showToast("Certificate generation requires an approval record and both appearance times.");
    return;
  }
  if (request.certificate) {
    showToast(`Certificate ${request.certificate.id} has already been generated.`);
    openCertificatePreview(request);
    return;
  }
  const year = (request.activityDate || todayISO()).slice(0, 4);
  const number = nextYearSequence("COA", year);
  request.certificate = { id: `COA-${year}-${number}`, generated: todayISO() };
  if (!saveData()) return;
  showToast(`Certificate ${request.certificate.id} generated.`);
  renderPage();
  openCertificatePreview(request);
}

function printCertificate() {
  window.print();
}

function handleGlobalAction(event) {
  const button = event.target.closest("[data-action], [data-go-page]");
  if (!button) return;
  if (button.dataset.goPage) return navigate(button.dataset.goPage);
  const { action, id } = button.dataset;
  if (action === "request-detail") return openRequestDetail(id);
  if (action === "decision-open") {
    detailModal.hide();
    return openDecision(id, button.dataset.decision);
  }
  if (action === "page-prev" || action === "page-next") {
    requestTableState.page += action === "page-prev" ? -1 : 1;
    return renderPage();
  }
  if (action === "new-request") return openNewRequestForm();
  if (action === "new-user") return openUserForm();
  if (action === "edit-user") return openUserForm(data.users.find((item) => item.id === id));
  if (action === "toggle-user") return toggleUser(id);
  if (action === "feedback-detail") return openFeedbackDetail(id);
  if (action === "certificate-detail") return openCertificateDetail(id);
  if (action === "certificate-preview") {
    if (button.closest("#detailModalFooter")) detailModal.hide();
    return openCertificatePreview(data.requests.find((item) => item.id === id));
  }
  if (action === "certificate-generate") return generateCertificate(id);
  if (action === "certificate-print") return openCertificatePreview(data.requests.find((item) => item.id === id), true);
  if (action === "reset-demo") return confirmReset();
}

function toggleUser(id) {
  const user = data.users.find((item) => item.id === id);
  if (!user) return showToast("User account not found.");
  if (user.id === "USR-001" && user.status === "Active") return showToast("The primary demo administrator cannot be deactivated.");
  user.status = user.status === "Active" ? "Inactive" : "Active";
  if (!saveData()) return;
  renderPage();
  showToast(`${user.name} is now ${user.status.toLowerCase()}.`);
}

function openNewRequestForm() {
  openForm("Create sample request", "Demo data only", `<p class="scope-note">This form adds a local sample request to demonstrate review and approval. It does not submit a real school request.</p>
    <form id="newRequestForm" class="form-grid">
      <label class="form-field"><span>Teacher name <b class="required-mark">*</b></span><input class="form-control" name="teacher" required></label>
      <label class="form-field"><span>Email <b class="required-mark">*</b></span><input class="form-control" type="email" name="email" required></label>
      <label class="form-field form-field-wide"><span>Activity name <b class="required-mark">*</b></span><input class="form-control" name="activity" required></label>
      <label class="form-field form-field-wide"><span>Purpose <b class="required-mark">*</b></span><textarea class="form-control" name="purpose" required rows="2"></textarea></label>
      <label class="form-field"><span>Role / participation <b class="required-mark">*</b></span><input class="form-control" name="role" required></label>
      <label class="form-field"><span>Activity date <b class="required-mark">*</b></span><input class="form-control" type="date" name="activityDate" required></label>
      <label class="form-field"><span>Start time <b class="required-mark">*</b></span><input class="form-control" type="time" name="startTime" required></label>
      <label class="form-field"><span>End time <b class="required-mark">*</b></span><input class="form-control" type="time" name="endTime" required></label>
      <label class="form-field form-field-wide"><span>Venue <b class="required-mark">*</b></span><input class="form-control" name="venue" required></label>
    </form>`, `<button class="btn btn-outline-green" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary-green" id="saveRequestButton">Add pending request</button>`, () => {
    document.getElementById("saveRequestButton").addEventListener("click", () => {
      const form = document.getElementById("newRequestForm");
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form).entries());
      if (values.endTime <= values.startTime) {
        form.elements.endTime.setCustomValidity("End time must be later than start time.");
        form.reportValidity();
        form.elements.endTime.setCustomValidity("");
        return;
      }
      const year = todayISO().slice(0, 4);
      const sequence = nextYearSequence("CA", year);
      const id = `CA-${year}-${sequence}`;
      data.requests.unshift({ ...values, id, initials: values.teacher.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(), submitted: todayISO(), status: "Pending", remarks: "", approval: null, appearance: null, certificate: null });
      if (!saveData()) return;
      formModal.hide();
      navigate("requests");
      showToast(`Sample request ${id} added to the pending queue.`);
    });
  });
}

function confirmReset() {
  document.getElementById("confirmModalTitle").textContent = "Restore sample data?";
  document.getElementById("confirmModalBody").innerHTML = "<p>This replaces locally saved prototype requests, users, and feedback with the original demonstration records.</p>";
  document.getElementById("confirmModalFooter").innerHTML = '<button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary-green" id="confirmResetButton">Restore sample data</button>';
  confirmModal.show();
  document.getElementById("confirmResetButton").addEventListener("click", () => {
    data = structuredClone(seedData);
    if (!saveData()) return;
    confirmModal.hide();
    navigate("dashboard");
    showToast("Sample data restored.");
  }, { once: true });
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebarBackdrop.classList.remove("is-visible");
  menuToggle.setAttribute("aria-expanded", "false");
}

document.querySelectorAll(".side-link[data-page], .school-brand[data-page]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navigate(link.dataset.page);
  });
});
document.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => setRole(button.dataset.role)));
document.getElementById("logoutNavButton").addEventListener("click", () => {
  setRole("admin");
  navigate("dashboard");
  showToast("Demo session ended. Returned to the administrator prototype.");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const open = sidebar.classList.toggle("is-open");
  sidebarBackdrop.classList.toggle("is-visible", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
sidebarBackdrop.addEventListener("click", closeSidebar);
document.querySelector(".notification-menu").addEventListener("click", handleGlobalAction);
document.getElementById("detailModalFooter").addEventListener("click", handleGlobalAction);
document.getElementById("certificateModalFooter").addEventListener("click", handleGlobalAction);

updateRoleUI();
renderPage();
