const DEMO_ACCOUNT = {
  username: "maria.cruz@solano.edu",
  password: "Teacher123!",
  name: "Maria Cruz",
  position: "Secondary Teacher",
  department: "Science Department"
};
const STORAGE = {
  session: "solanoTeacherSession",
  requests: "solanoTeacherRequests",
  profile: "solanoTeacherProfile",
  feedback: "solanoTeacherFeedback",
  drafts: "solanoTeacherDrafts",
  appearances: "solanoTeacherAppearances"
};
const seedRequests = [
  { id: "REQ-2026-0142", name: "Division Science Training", purpose: "Professional development and science curriculum alignment.", role: "Attendee", date: "2026-11-05", start: "08:00", end: "16:00", venue: "Solano District Training Center", details: "", submitted: "2026-10-10", status: "Approved", remarks: "Approved by the school administration.", history: [{ stage: "Submitted", date: "2026-10-10" }, { stage: "Under Review", date: "2026-10-11" }, { stage: "Approved", date: "2026-10-12" }] },
  { id: "REQ-2026-0138", name: "Regional Reading Conference", purpose: "Share instructional strategies with regional educators.", role: "Resource participant", date: "2026-10-12", start: "09:00", end: "15:30", venue: "Solano Civic Hall", details: "", submitted: "2026-09-20", status: "Completed", remarks: "Appearance recorded and certificate generated.", timeIn: "08:52", timeOut: "15:38", certificateId: "COA-2026-0038", generated: "2026-10-13", history: [{ stage: "Submitted", date: "2026-09-20" }, { stage: "Under Review", date: "2026-09-22" }, { stage: "Approved", date: "2026-09-24" }, { stage: "Appearance Recorded", date: "2026-10-12" }, { stage: "Certificate Available", date: "2026-10-13" }] },
  { id: "REQ-2026-0131", name: "Campus Journalism Workshop", purpose: "Support student publication development.", role: "Faculty coordinator", date: "2026-11-22", start: "08:30", end: "15:00", venue: "Solano High School", details: "", submitted: "2026-10-05", status: "Pending", remarks: "", history: [{ stage: "Submitted", date: "2026-10-05" }, { stage: "Under Review", date: "2026-10-06" }] },
  { id: "REQ-2026-0124", name: "District Sports Coordination", purpose: "Coordinate district-level sports activities.", role: "School representative", date: "2026-10-08", start: "08:00", end: "12:00", venue: "Solano Sports Complex", details: "", submitted: "2026-09-18", status: "Rejected", remarks: "Please submit the updated activity program for review.", history: [{ stage: "Submitted", date: "2026-09-18" }, { stage: "Under Review", date: "2026-09-19" }, { stage: "Rejected", date: "2026-09-21" }] }
];

const titles = {
  dashboard: ["Overview", "Teacher Dashboard"],
  "new-request": ["Request", "Submit Activity Request"],
  requests: ["Workspace", "My Requests"],
  appearances: ["Workspace", "Appearance Records"],
  certificates: ["Workspace", "My Certificates"],
  feedback: ["Workspace", "Feedback & Suggestions"],
  profile: ["Account", "My Profile"]
};

const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("appShell");
const content = document.getElementById("appContent");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const confirmModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("confirmModal"));
const detailModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("detailModal"));
const certificateModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("certificateModal"));
let pendingRequest = null;
let pendingDraftId = null;
let pendingCertificatePrint = false;

function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(`Could not read demo data from ${key}.`, error);
    return fallback;
  }
}

function nextSequence(requests, year, prefix) {
  const pattern = new RegExp(`^${prefix}-${year}-(\\d+)$`);
  const highest = requests.reduce((max, item) => {
    const match = pattern.exec(item.id || "");
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return String(highest + 1).padStart(4, "0");
}

function isAuthorizedSession() {
  const session = readStore(STORAGE.session, null);
  return Boolean(session && session.username === DEMO_ACCOUNT.username && session.role === "teacher");
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save demo data to ${key}.`, error);
    showToast("Your changes could not be saved. Check browser storage and try again.", "error");
    return false;
  }
}

function getRequests() {
  const requests = readStore(STORAGE.requests, null);
  if (Array.isArray(requests)) return requests;
  writeStore(STORAGE.requests, seedRequests);
  return structuredClone(seedRequests);
}

function getProfile() {
  return { ...DEMO_ACCOUNT, ...readStore(STORAGE.profile, {}) };
}

function updateDemoCredentialHint() {
  document.getElementById("demoAccountEmail").textContent = getProfile().username;
  document.getElementById("demoAccountPassword").textContent = readStore("solanoTeacherDemoPassword", DEMO_ACCOUNT.password);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? escapeHtml(value) : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `portal-toast ${type === "error" ? "toast-error" : ""}`;
  toast.innerHTML = `<i class="bi ${type === "error" ? "bi-exclamation-circle" : "bi-check-circle"}"></i><span>${escapeHtml(message)}</span>`;
  document.getElementById("toastRegion").append(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function showApp() {
  if (!isAuthorizedSession()) {
    logout();
    return;
  }
  const profile = getProfile();
  loginScreen.classList.add("d-none");
  appShell.classList.remove("d-none");
  document.getElementById("accountName").textContent = profile.name;
  document.getElementById("accountPosition").textContent = profile.position || profile.department;
  document.getElementById("accountAvatar").textContent = initials(profile.name);
  updateDemoCredentialHint();
  if (!location.hash || location.hash === "#login") location.hash = "#dashboard";
  renderRoute();
}

function logout() {
  localStorage.removeItem(STORAGE.session);
  appShell.classList.add("d-none");
  loginScreen.classList.remove("d-none");
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginError").textContent = "";
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

function statusClass(status) {
  return `status-${String(status).toLowerCase().replace(/\s+/g, "-")}`;
}

function statusBadge(status) {
  return `<span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span>`;
}

function requestTable(requests, options = {}) {
  if (!requests.length) return `<div class="empty-state"><span class="empty-icon"><i class="bi bi-inbox"></i></span><h3>${escapeHtml(options.emptyTitle || "No requests found")}</h3><p>${escapeHtml(options.emptyText || "Submitted requests will appear here.")}</p>${options.action ? `<a href="#new-request" class="btn btn-primary-green btn-sm">Submit an activity request</a>` : ""}</div>`;
  return `<div class="table-responsive"><table class="table activity-table align-middle mb-0"><thead><tr><th>Request ID</th><th>Activity Name</th><th>Activity Date</th><th>Date Submitted</th><th>Status</th><th>Action</th></tr></thead><tbody>${requests.map((request) => `<tr><td><strong>${escapeHtml(request.id)}</strong></td><td>${escapeHtml(request.name)}</td><td>${formatDate(request.date)}</td><td>${formatDate(request.submitted)}</td><td>${statusBadge(request.status)}</td><td><button class="row-action" type="button" data-request-details="${escapeHtml(request.id)}" aria-label="View ${escapeHtml(request.name)} details"><i class="bi bi-arrow-right"></i></button></td></tr>`).join("")}</tbody></table></div>`;
}

function dashboardPage() {
  const requests = getRequests();
  const profile = getProfile();
  const totals = {
    total: requests.filter((request) => request.status !== "Draft").length,
    pending: requests.filter((request) => request.status === "Pending").length,
    approved: requests.filter((request) => request.status === "Approved").length,
    rejected: requests.filter((request) => request.status === "Rejected").length,
    certificates: requests.filter((request) => request.status === "Completed" && request.certificateId).length
  };
  const reminders = [];
  requests.filter((request) => request.status === "Approved" && !request.timeOut).forEach((request) => reminders.push({ icon: "bi-calendar-check", style: "icon-sage", title: "Appearance to record", text: `${request.name} is approved. Record your time-in and time-out after attending.` }));
  requests.filter((request) => request.status === "Pending").forEach((request) => reminders.push({ icon: "bi-hourglass-split", style: "icon-amber", title: "Request under review", text: `${request.name} is awaiting an administrative decision.` }));
  requests.filter((request) => request.status === "Completed").forEach((request) => reminders.push({ icon: "bi-award", style: "icon-blue", title: "Certificate available", text: `Your certificate for ${request.name} is ready to view and print.` }));
  return `<section class="welcome-banner"><div class="welcome-copy"><div class="banner-date">${new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date())}</div><h2>Welcome back, ${escapeHtml(profile.name.split(" ")[0])}!</h2><p>Manage your activity requests and Certificates of Appearance from one place.</p></div><a class="btn btn-light submit-button" href="#new-request"><i class="bi bi-plus-lg"></i><span>Submit New Request</span></a><span class="banner-orbit orbit-one"></span><span class="banner-orbit orbit-two"></span></section>
    <section class="summary-grid" aria-label="Request summary">
      ${summaryCard("bi-file-earmark-text", "icon-blue", "Total Requests", totals.total, "All submitted requests")}
      ${summaryCard("bi-clock", "icon-amber", "Pending Requests", totals.pending, "Awaiting review")}
      ${summaryCard("bi-check-lg", "icon-green", "Approved Requests", totals.approved, "Ready for appearance")}
      ${summaryCard("bi-x-lg", "icon-red", "Rejected Requests", totals.rejected, "Review administrative remarks")}
      ${summaryCard("bi-award", "icon-sage", "Available Certificates", totals.certificates, "Ready to view and print")}
    </section>
    <div class="dashboard-panels"><section class="panel activity-panel"><div class="panel-heading"><div><h2>Recent Activity Requests</h2><p>Your latest submitted requests</p></div><a class="view-all-link" href="#requests">View all <i class="bi bi-arrow-right"></i></a></div>${requestTable(requests.filter((request) => request.status !== "Draft").slice(0, 5), { emptyTitle: "Your request list is empty", emptyText: "Submit an activity request to get started.", action: true })}</section>
      <section class="panel reminders-panel"><div class="panel-heading"><div><h2>Updates &amp; Reminders</h2><p>Important actions and request updates</p></div></div><div class="reminder-list">${reminders.length ? reminders.slice(0, 4).map((item) => `<article class="reminder-item"><span class="reminder-icon ${item.style}"><i class="bi ${item.icon}"></i></span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div></article>`).join("") : `<div class="empty-inline"><i class="bi bi-check2-circle"></i> You’re all caught up.</div>`}</div></section></div>
    `;
}

function summaryCard(icon, style, label, value, hint) {
  return `<article class="summary-card"><span class="summary-icon ${style}"><i class="bi ${icon}"></i></span><div class="summary-copy"><span>${label}</span><strong>${value}</strong><small>${hint}</small></div></article>`;
}

function requestFormPage() {
  const drafts = readStore(STORAGE.drafts, []);
  return `<div class="page-intro"><div><div class="eyebrow">New submission</div><h2>Submit Activity Request</h2><p>Share the activity details so the school can review your request.</p></div><span class="required-note"><span>*</span> Required fields</span></div>
    <div class="form-layout"><form id="requestForm" class="panel portal-form" novalidate>
      <div class="form-section-heading"><span class="section-number">01</span><div><h3>Activity information</h3><p>Enter the event and your participation details.</p></div></div>
      <div class="form-grid">
        ${field("activityName", "Activity or event name", "text", "e.g. Regional Science Workshop", true)}
        ${field("purpose", "Purpose of activity", "text", "What is the activity about?", true)}
        ${field("role", "Your role or participation", "text", "e.g. Attendee, presenter, coordinator", true)}
        ${field("venue", "Venue", "text", "Where will the activity take place?", true)}
        ${field("activityDate", "Activity date", "date", "", true)}
        ${field("startTime", "Start time", "time", "", true)}
        ${field("endTime", "End time", "time", "", true)}
        <div class="form-field form-field-wide"><label class="form-label" for="details">Additional details <span class="optional-label">Optional</span></label><textarea class="form-control" id="details" name="details" rows="4" placeholder="Add any details that may help with your request"></textarea></div>
      </div>
      <div id="requestFormError" class="form-error" role="alert"></div>
      <div class="form-actions"><a class="btn btn-outline-secondary" href="#dashboard">Cancel</a><button id="saveDraft" class="btn btn-outline-green" type="button"><i class="bi bi-save"></i> Save as Draft</button><button class="btn btn-primary-green" type="submit">Review &amp; Submit <i class="bi bi-arrow-right"></i></button></div>
    </form>
    <aside class="panel form-tip"><span class="tip-icon"><i class="bi bi-lightbulb"></i></span><h3>Before you submit</h3><ul><li>Check the activity date and time.</li><li>Include your role and the event venue.</li><li>Requests are reviewed by school administration.</li></ul><div class="tip-divider"></div><p>Submitting here creates a demo request. It does not send an official request to the school.</p>${drafts.length ? `<a class="draft-link" href="#requests"><i class="bi bi-file-earmark"></i> You have ${drafts.length} saved draft${drafts.length === 1 ? "" : "s"}</a>` : ""}</aside></div>`;
}

function field(id, label, type, placeholder, required) {
  return `<div class="form-field"><label class="form-label" for="${id}">${label}${required ? ' <span class="required-mark">*</span>' : ""}</label><input class="form-control" id="${id}" name="${id}" type="${type}" ${placeholder ? `placeholder="${placeholder}"` : ""} ${required ? "required" : ""}></div>`;
}

function requestsPage() {
  const requests = getRequests();
  const submitted = requests.filter((request) => request.status !== "Draft");
  return `<div class="page-intro"><div><div class="eyebrow">Track progress</div><h2>My Requests</h2><p>Search your submissions and see their current review status.</p></div><a class="btn btn-primary-green" href="#new-request"><i class="bi bi-plus-lg"></i> New Request</a></div>
    <section class="panel list-panel"><div class="filter-bar"><label class="search-box"><i class="bi bi-search"></i><span class="visually-hidden">Search requests</span><input id="requestSearch" type="search" placeholder="Search activity or Request ID"></label><label class="filter-select"><span>Status</span><select id="requestStatus" class="form-select"><option value="">All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Completed</option></select></label></div><div id="requestList">${requestTable(submitted, { emptyTitle: "No requests submitted yet", emptyText: "Your submitted activity requests will appear here.", action: true })}</div></section>
    ${requests.some((request) => request.status === "Draft") ? `<section class="panel draft-panel"><div class="panel-heading"><div><h2>Saved drafts</h2><p>Drafts stay in this browser and are not submitted for review.</p></div></div><div id="draftList">${draftList(requests.filter((request) => request.status === "Draft"))}</div></section>` : ""}`;
}

function draftList(drafts) {
  if (!drafts.length) return `<div class="empty-inline">No saved drafts.</div>`;
  return `<div class="draft-list">${drafts.map((draft) => `<article class="draft-item"><div><strong>${escapeHtml(draft.name || "Untitled request")}</strong><span>Saved ${formatDate(draft.submitted)}</span></div><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-green" type="button" data-edit-draft="${escapeHtml(draft.id)}">Continue</button><button class="btn btn-sm btn-outline-secondary" type="button" data-delete-draft="${escapeHtml(draft.id)}" aria-label="Delete draft">Delete</button></div></article>`).join("")}</div>`;
}

function requestProgress(request) {
  const stages = [{ label: "Submitted", done: true }, { label: "Under Review", done: request.status === "Pending" || ["Approved", "Rejected", "Completed"].includes(request.status) || request.history.some((event) => event.stage === "Under Review") }];
  if (request.status === "Rejected") stages.push({ label: "Rejected", done: true });
  else if (["Approved", "Completed"].includes(request.status)) {
    stages.push({ label: "Approved", done: true });
    if (request.status === "Completed") stages.push({ label: "Appearance Recorded", done: true }, { label: "Certificate Available", done: Boolean(request.certificateId) });
    else stages.push({ label: "Appearance Recorded", done: Boolean(request.timeIn && request.timeOut) }, { label: "Certificate Available", done: false });
  } else stages.push({ label: "Decision", done: false });
  return `<ol class="progress-track">${stages.map((stage, index) => `<li class="${stage.done ? "is-done" : ""} ${index === stages.length - 1 ? "is-last" : ""}"><span class="progress-dot">${stage.done ? '<i class="bi bi-check"></i>' : index + 1}</span><span>${stage.label}</span></li>`).join("")}</ol>`;
}

function detailMarkup(request) {
  const activityFields = [["Request ID", request.id], ["Activity", request.name], ["Purpose", request.purpose], ["Role", request.role], ["Activity date", formatDate(request.date)], ["Scheduled time", `${request.start || "—"} – ${request.end || "—"}`], ["Venue", request.venue], ["Date submitted", formatDate(request.submitted)], ["Status", statusBadge(request.status)]];
  return `<div class="detail-grid">${activityFields.map(([label, value]) => `<div class="detail-field"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>
    ${request.details ? `<div class="remarks-box"><strong>Additional details</strong><p>${escapeHtml(request.details)}</p></div>` : ""}
    ${request.remarks ? `<div class="remarks-box ${request.status === "Rejected" ? "remarks-warning" : ""}"><strong>Administrative remarks</strong><p>${escapeHtml(request.remarks)}</p></div>` : ""}
    <div class="detail-section"><div class="detail-section-title"><h3>Status progress</h3><span>Read-only · administrative decisions cannot be changed here</span></div>${requestProgress(request)}</div>
    <div class="detail-section"><div class="detail-section-title"><h3>Status history</h3><span>Updates recorded for this request</span></div><ul class="history-list">${(request.history || []).map((entry) => `<li><span class="history-marker"></span><div><strong>${escapeHtml(entry.stage)}</strong><small>${formatDate(entry.date)}</small></div></li>`).join("")}</ul></div>`;
}

function appearancesPage() {
  const items = getRequests().filter((request) => ["Approved", "Completed"].includes(request.status));
  return `<div class="page-intro"><div><div class="eyebrow">Approved activities</div><h2>Appearance Records</h2><p>Record attendance only for activities approved for your account.</p></div><span class="process-pill"><i class="bi bi-info-circle"></i> Flexible demo time record</span></div>
    ${items.length ? `<section class="appearance-list">${items.map((request) => `<article class="panel appearance-card"><div class="appearance-card-top"><div class="activity-mark"><i class="bi bi-calendar2-check"></i></div><div class="appearance-title"><div class="appearance-meta">${escapeHtml(request.id)} · ${formatDate(request.date)}</div><h3>${escapeHtml(request.name)}</h3><p><i class="bi bi-geo-alt"></i> ${escapeHtml(request.venue || "Venue not specified")} <span>·</span> <i class="bi bi-clock"></i> ${escapeHtml(request.start || "—")}–${escapeHtml(request.end || "—")}</p></div>${statusBadge(request.status)}</div>
      <div class="appearance-times"><div><span>Recorded time-in</span><strong>${escapeHtml(request.timeIn || "Not recorded")}</strong></div><div><span>Recorded time-out</span><strong>${escapeHtml(request.timeOut || "Not recorded")}</strong></div><div><span>Record status</span><strong>${request.timeIn && request.timeOut ? "Complete" : request.timeIn ? "Time-in recorded" : "Awaiting time-in"}</strong></div></div>
      <div class="appearance-actions">${request.status === "Approved" && !request.timeIn ? `<button class="btn btn-outline-green btn-sm" type="button" data-record-time="in" data-request-id="${escapeHtml(request.id)}"><i class="bi bi-box-arrow-in-right"></i> Record time-in</button>` : ""}${request.status === "Approved" && request.timeIn && !request.timeOut ? `<button class="btn btn-primary-green btn-sm" type="button" data-record-time="out" data-request-id="${escapeHtml(request.id)}"><i class="bi bi-box-arrow-right"></i> Record time-out</button>` : ""}${request.status === "Completed" ? `<a class="btn btn-outline-green btn-sm" href="#certificates">View certificate <i class="bi bi-arrow-right"></i></a>` : ""}<button class="text-button" type="button" data-request-details="${escapeHtml(request.id)}">View activity details</button></div>
    </article>`).join("")}</section>` : `<section class="panel"><div class="empty-state"><span class="empty-icon"><i class="bi bi-calendar2-x"></i></span><h3>No approved activities yet</h3><p>Approved activities will appear here when they are ready for appearance recording.</p></div></section>`}`;
}

function certificatesPage() {
  const certificates = getRequests().filter((request) => request.status === "Completed" && request.certificateId && request.timeIn && request.timeOut);
  return `<div class="page-intro"><div><div class="eyebrow">Your generated documents</div><h2>My Certificates</h2><p>View and print certificates available for your completed activities.</p></div></div>
    ${certificates.length ? `<section class="certificate-grid">${certificates.map((request) => `<article class="panel certificate-card"><div class="certificate-icon"><i class="bi bi-award"></i></div><div class="certificate-card-body"><div class="certificate-card-labels"><span class="certificate-label">CERTIFICATE OF APPEARANCE</span>${statusBadge("Available")}</div><h3>${escapeHtml(request.name)}</h3><p>${formatDate(request.date)} <span>·</span> ${escapeHtml(request.venue)}</p><div class="certificate-card-meta"><span><small>Certificate ID</small><strong>${escapeHtml(request.certificateId)}</strong></span><span><small>Generated</small><strong>${formatDate(request.generated)}</strong></span></div></div><div class="certificate-card-actions"><button class="btn btn-outline-green btn-sm" type="button" data-view-certificate="${escapeHtml(request.id)}"><i class="bi bi-eye"></i> View</button><button class="btn btn-primary-green btn-sm" type="button" data-print-certificate="${escapeHtml(request.id)}"><i class="bi bi-printer"></i> Print</button></div></article>`).join("")}</section>` : `<section class="panel"><div class="empty-state"><span class="empty-icon"><i class="bi bi-award"></i></span><h3>No certificates available yet</h3><p>A certificate appears after an approved activity has a complete time-in and time-out record.</p><a class="btn btn-outline-green btn-sm" href="#appearances">View appearance records</a></div></section>`}
    `;
}

function certificateMarkup(request) {
  const profile = getProfile();
  return `<article class="certificate-document">
    <div class="certificate-border"><div class="certificate-inner">
      <div class="certificate-school-mark"><span class="school-monogram">SH</span><div><span>REPUBLIC OF THE PHILIPPINES</span><strong>Solano High School</strong><small>Certificate of Appearance Management and Issuance System</small></div></div>
      <div class="certificate-rule"></div>
      <div class="certificate-kicker">This document certifies that</div>
      <h2 class="certificate-teacher">${escapeHtml(profile.name)}</h2>
      <p class="certificate-position">${escapeHtml(profile.position)} · ${escapeHtml(profile.department)}</p>
      <p class="certificate-copy">has participated in the following approved school-related activity and recorded their appearance:</p>
      <h3 class="certificate-activity">${escapeHtml(request.name)}</h3>
      <div class="certificate-facts"><div><span>Activity date</span><strong>${formatDate(request.date)}</strong></div><div><span>Venue</span><strong>${escapeHtml(request.venue)}</strong></div><div><span>Recorded time-in</span><strong>${escapeHtml(request.timeIn)}</strong></div><div><span>Recorded time-out</span><strong>${escapeHtml(request.timeOut)}</strong></div><div><span>Teacher participation</span><strong>${escapeHtml(request.role)}</strong></div><div><span>Request reference</span><strong>${escapeHtml(request.id)}</strong></div></div>
      <p class="certificate-note">Issued electronically on ${formatDate(request.generated)} based on the approved request and appearance record.</p>
      <div class="certificate-signature"><span class="signature-mark"><i class="bi bi-patch-check"></i> SYSTEM VERIFIED</span><div class="signature-line"></div><strong>Electronic approval record</strong><small>Solano High School · ${escapeHtml(request.certificateId)}</small></div>
      <div class="certificate-footer">Certificate ID: ${escapeHtml(request.certificateId)} <span>Generated ${formatDate(request.generated)}</span></div>
    </div></div>
    <p class="certificate-disclaimer">DEMO CERTIFICATE — Not an official school document or legally valid signature.</p>
  </article>`;
}

function profilePage() {
  const profile = getProfile();
  return `<div class="page-intro"><div><div class="eyebrow">Your account</div><h2>My Profile</h2><p>Update permitted contact and display information for this demo account.</p></div><span class="account-status"><i class="bi bi-check-circle"></i> Teacher account</span></div>
    <div class="profile-layout"><section class="panel profile-card"><div class="profile-card-head"><span class="profile-large-avatar">${initials(profile.name)}</span><div><h3>${escapeHtml(profile.name)}</h3><p>${escapeHtml(profile.position)} · ${escapeHtml(profile.department)}</p><span class="role-chip"><i class="bi bi-person-check"></i> Teacher role · read-only</span></div></div>
      <form id="profileForm" class="portal-form compact-form"><div class="form-grid">${field("profileName", "Full name", "text", "", true)}${field("profileEmail", "Email address", "email", "", true)}${field("profilePosition", "Position", "text", "", false)}${field("profileDepartment", "Department", "text", "", false)}</div><p class="field-help">Administrative roles and permissions cannot be changed by teachers.</p><div id="profileFeedback" class="form-feedback" role="status"></div><div class="form-actions"><button class="btn btn-primary-green" type="submit">Save profile</button></div></form>
    </section><section class="panel password-card"><span class="tip-icon"><i class="bi bi-shield-lock"></i></span><h3>Change password</h3><p>Password changes are simulated and stored in this browser only.</p><form id="passwordForm"><label class="form-label" for="currentPassword">Current password</label><input class="form-control" id="currentPassword" type="password" autocomplete="current-password" required><label class="form-label mt-3" for="newPassword">New password</label><input class="form-control" id="newPassword" type="password" minlength="8" autocomplete="new-password" required><div id="passwordFeedback" class="form-feedback" role="status"></div><button class="btn btn-outline-green mt-3" type="submit">Update password</button></form></section></div>`;
}

function feedbackPage() {
  const feedback = readStore(STORAGE.feedback, []);
  return `<div class="page-intro"><div><div class="eyebrow">Help us improve</div><h2>Feedback &amp; Suggestions</h2><p>Tell us about your experience using the teacher portal.</p></div></div>
    <div class="feedback-layout"><form id="feedbackForm" class="panel portal-form feedback-form" novalidate><div class="form-section-heading"><span class="section-number"><i class="bi bi-chat-heart"></i></span><div><h3>Share your feedback</h3><p>Your feedback helps improve this prototype.</p></div></div>
      <fieldset class="rating-field"><legend class="form-label">How would you rate your experience? <span class="required-mark">*</span></legend><div class="rating-options">${[1, 2, 3, 4, 5].map((rating) => `<label class="rating-option"><input type="radio" name="rating" value="${rating}" required><span aria-label="${rating} ${rating === 1 ? "star" : "stars"}"><i class="bi bi-star-fill"></i></span></label>`).join("")}</div><span class="rating-caption">Select a rating from 1 to 5 stars</span></fieldset>
      <div class="form-field"><label class="form-label" for="feedbackComments">Comments <span class="required-mark">*</span></label><textarea class="form-control" id="feedbackComments" name="comments" rows="4" required placeholder="What worked well or could be clearer?"></textarea></div>
      <div class="form-field"><label class="form-label" for="feedbackSuggestions">Suggestions for improvement <span class="optional-label">Optional</span></label><textarea class="form-control" id="feedbackSuggestions" name="suggestions" rows="3" placeholder="Share an idea to make the portal better"></textarea></div>
      <div id="feedbackMessage" class="form-feedback" role="status"></div><div class="form-actions"><button class="btn btn-primary-green" type="submit">Submit Feedback <i class="bi bi-arrow-right"></i></button></div>
    </form><aside class="panel feedback-aside"><span class="tip-icon"><i class="bi bi-chat-square-text"></i></span><h3>Your voice matters</h3><p>Feedback is associated with your demo account and saved locally in this browser. It is not sent to school administrators.</p><div class="tip-divider"></div><strong>${feedback.length} submission${feedback.length === 1 ? "" : "s"} from this account</strong></aside></div>
    ${feedback.length ? `<section class="panel feedback-history"><div class="panel-heading"><div><h2>Your previous feedback</h2><p>Only feedback saved under this demo account is shown.</p></div></div><div class="feedback-list">${feedback.slice().reverse().map((item) => `<article class="feedback-entry"><div class="feedback-entry-top"><span class="rating-display">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</span><time>${formatDate(item.date)}</time></div><p>${escapeHtml(item.comments)}</p>${item.suggestions ? `<small>Suggestion: ${escapeHtml(item.suggestions)}</small>` : ""}</article>`).join("")}</div></section>` : ""}`;
}

function renderRoute() {
  if (!isAuthorizedSession()) {
    loginScreen.classList.remove("d-none");
    appShell.classList.add("d-none");
    return;
  }
  const route = location.hash.slice(1) || "dashboard";
  const safeRoute = Object.hasOwn(titles, route) ? route : "dashboard";
  const [eyebrow, title] = titles[safeRoute];
  document.getElementById("pageEyebrow").textContent = eyebrow;
  document.getElementById("pageTitle").textContent = title;
  document.querySelectorAll(".side-link[data-route]").forEach((link) => {
    const active = link.dataset.route === safeRoute;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const views = {
    dashboard: dashboardPage,
    "new-request": requestFormPage,
    requests: requestsPage,
    appearances: appearancesPage,
    certificates: certificatesPage,
    feedback: feedbackPage,
    profile: profilePage
  };
  content.innerHTML = views[safeRoute]();
  closeSidebar();
  content.focus({ preventScroll: true });
}

function openDetails(id) {
  const request = getRequests().find((item) => item.id === id);
  if (!request) return showToast("That request could not be found.", "error");
  document.getElementById("detailTitle").textContent = request.name;
  document.getElementById("detailBody").innerHTML = detailMarkup(request);
  detailModal.show();
}

function openCertificate(id, print = false) {
  const request = getRequests().find((item) => item.id === id && item.status === "Completed" && item.certificateId && item.timeIn && item.timeOut);
  if (!request) return showToast("This certificate is not available until approval and appearance records are complete.", "error");
  document.getElementById("certificateBody").innerHTML = certificateMarkup(request);
  pendingCertificatePrint = print;
  certificateModal.show();
}

function updateRequest(id, update) {
  const requests = getRequests();
  const index = requests.findIndex((request) => request.id === id);
  if (index < 0) return showToast("The request could not be found.", "error");
  requests[index] = { ...requests[index], ...update };
  return writeStore(STORAGE.requests, requests);
}

function createRequest(data, status = "Pending", draftId = null) {
  const requests = getRequests().filter((request) => !draftId || request.id !== draftId);
  const year = new Date().getFullYear();
  const sequence = nextSequence(requests, year, "REQ");
  const id = `REQ-${year}-${sequence}`;
  const date = new Date().toISOString().slice(0, 10);
  const request = { ...data, id, status, submitted: date, remarks: "", history: status === "Draft" ? [] : [{ stage: "Submitted", date }, { stage: "Under Review", date }] };
  requests.unshift(request);
  return writeStore(STORAGE.requests, requests) ? request : null;
}

function requestDataFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  return {
    name: data.activityName.trim(),
    purpose: data.purpose.trim(),
    role: data.role.trim(),
    date: data.activityDate,
    start: data.startTime,
    end: data.endTime,
    venue: data.venue.trim(),
    details: data.details.trim()
  };
}

function validateRequest(data, errorElement) {
  if (!data.name || !data.purpose || !data.role || !data.date || !data.start || !data.end || !data.venue) {
    errorElement.textContent = "Please complete all required fields.";
    return false;
  }
  if (data.end <= data.start) {
    errorElement.textContent = "End time must be later than start time.";
    document.getElementById("endTime").focus();
    return false;
  }
  errorElement.textContent = "";
  return true;
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebarBackdrop.classList.remove("is-visible");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

function toggleSidebar() {
  const open = sidebar.classList.toggle("is-open");
  sidebarBackdrop.classList.toggle("is-visible", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const username = form.username.value.trim().toLowerCase();
  const password = form.password.value;
  const error = document.getElementById("loginError");
  if (!username || !password) {
    error.textContent = "Enter your email or username and password.";
    return;
  }
  if (username !== getProfile().username.toLowerCase() || password !== (readStore("solanoTeacherDemoPassword", DEMO_ACCOUNT.password))) {
    error.textContent = "We couldn’t sign you in with those demo credentials. Check the sample account shown below.";
    return;
  }
  error.textContent = "";
  localStorage.setItem(STORAGE.session, JSON.stringify({ username: DEMO_ACCOUNT.username, role: "teacher" }));
  showApp();
});

document.getElementById("togglePassword").addEventListener("click", (event) => {
  const input = document.getElementById("loginPassword");
  const visible = input.type === "password";
  input.type = visible ? "text" : "password";
  event.currentTarget.setAttribute("aria-label", visible ? "Hide password" : "Show password");
  event.currentTarget.innerHTML = `<i class="bi ${visible ? "bi-eye-slash" : "bi-eye"}"></i>`;
});

document.getElementById("forgotPassword").addEventListener("click", () => {
  document.getElementById("loginError").textContent = "Password recovery is not connected in this prototype. Use the demo password shown below.";
});

document.getElementById("logoutButton").addEventListener("click", logout);
document.getElementById("accountButton").addEventListener("click", () => { location.hash = "#profile"; });
menuToggle.addEventListener("click", toggleSidebar);
sidebarBackdrop.addEventListener("click", closeSidebar);
window.addEventListener("hashchange", renderRoute);

document.addEventListener("submit", (event) => {
  if (event.target.id === "requestForm") {
    event.preventDefault();
    const data = requestDataFromForm(event.target);
    if (!validateRequest(data, document.getElementById("requestFormError"))) return;
    pendingRequest = data;
    pendingDraftId = event.target.dataset.draftId || null;
    document.getElementById("confirmMessage").textContent = `Submit “${data.name}” for administrative review? The request will be saved with Pending status.`;
    confirmModal.show();
  }

  if (event.target.id === "loginForm") event.preventDefault();

  if (event.target.id === "profileForm") {
    event.preventDefault();
    const form = event.target;
    const profile = getProfile();
    const nextProfile = { ...profile, name: form.profileName.value.trim(), username: form.profileEmail.value.trim(), position: form.profilePosition.value.trim(), department: form.profileDepartment.value.trim() };
    if (!nextProfile.name || !nextProfile.username) {
      document.getElementById("profileFeedback").textContent = "Full name and email are required.";
      return;
    }
    if (!writeStore(STORAGE.profile, nextProfile)) return;
    document.getElementById("profileFeedback").textContent = "Profile details saved in this browser.";
    document.getElementById("accountName").textContent = nextProfile.name;
    document.getElementById("accountPosition").textContent = nextProfile.position || nextProfile.department;
    document.getElementById("accountAvatar").textContent = initials(nextProfile.name);
    updateDemoCredentialHint();
    showToast("Profile updated.");
  }

  if (event.target.id === "passwordForm") {
    event.preventDefault();
    const current = document.getElementById("currentPassword").value;
    const next = document.getElementById("newPassword").value;
    const feedback = document.getElementById("passwordFeedback");
    if (current !== readStore("solanoTeacherDemoPassword", DEMO_ACCOUNT.password)) {
      feedback.textContent = "Current password does not match this demo account.";
      feedback.classList.add("is-error");
      return;
    }
    if (next.length < 8) {
      feedback.textContent = "Choose a password with at least 8 characters.";
      feedback.classList.add("is-error");
      return;
    }
    if (!writeStore("solanoTeacherDemoPassword", next)) return;
    feedback.textContent = "Demo password updated in this browser.";
    feedback.classList.remove("is-error");
    event.target.reset();
    updateDemoCredentialHint();
    showToast("Demo password updated.");
  }

  if (event.target.id === "feedbackForm") {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const rating = Number(data.get("rating"));
    const comments = String(data.get("comments") || "").trim();
    const message = document.getElementById("feedbackMessage");
    if (!rating || !comments) {
      message.textContent = "Choose a star rating and add a comment before submitting.";
      message.classList.add("is-error");
      return;
    }
    const feedback = readStore(STORAGE.feedback, []);
    feedback.push({ rating, comments, suggestions: String(data.get("suggestions") || "").trim(), date: new Date().toISOString().slice(0, 10) });
    if (!writeStore(STORAGE.feedback, feedback)) return;
    showToast("Thank you. Your demo feedback was saved.");
    location.hash = "#feedback";
    renderRoute();
  }
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-request-details]");
  if (detailButton) return openDetails(detailButton.dataset.requestDetails);

  const viewCertificate = event.target.closest("[data-view-certificate]");
  if (viewCertificate) return openCertificate(viewCertificate.dataset.viewCertificate);

  const printCertificate = event.target.closest("[data-print-certificate]");
  if (printCertificate) return openCertificate(printCertificate.dataset.printCertificate, true);

  const recordButton = event.target.closest("[data-record-time]");
  if (recordButton) {
    const { requestId, recordTime } = recordButton.dataset;
    const request = getRequests().find((item) => item.id === requestId && item.status === "Approved");
    if (!request) return showToast("Appearance can only be recorded for an approved activity.", "error");
    if (recordTime === "out" && !request.timeIn) return showToast("Record time-in before recording time-out.", "error");
    if (recordTime === "in" && request.timeIn) return showToast("Time-in has already been recorded.", "error");
    if (recordTime === "out" && request.timeOut) return showToast("Time-out has already been recorded.", "error");
    const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    const today = new Date().toISOString().slice(0, 10);
    const update = recordTime === "in"
      ? { timeIn: time, history: [...(request.history || []), { stage: "Time-In Recorded", date: today }] }
      : { timeOut: time, status: "Completed", certificateId: `COA-${new Date().getFullYear()}-${nextSequence(getRequests(), new Date().getFullYear(), "COA")}`, generated: today };
    if (recordTime === "out") {
      update.history = [...(request.history || []), { stage: "Appearance Recorded", date: today }, { stage: "Certificate Available", date: today }];
      update.remarks = "Appearance recorded. Certificate generated in this prototype.";
    }
    if (updateRequest(requestId, update)) {
      showToast(recordTime === "in" ? `Time-in recorded at ${time}.` : `Time-out recorded at ${time}. Certificate is now available.`);
      renderRoute();
    }
  }

  const deleteDraft = event.target.closest("[data-delete-draft]");
  if (deleteDraft) {
    const requests = getRequests();
    const filtered = requests.filter((item) => item.id !== deleteDraft.dataset.deleteDraft || item.status !== "Draft");
    if (writeStore(STORAGE.requests, filtered)) {
      showToast("Draft deleted.");
      renderRoute();
    }
  }

  const editDraft = event.target.closest("[data-edit-draft]");
  if (editDraft) {
    const draft = getRequests().find((item) => item.id === editDraft.dataset.editDraft && item.status === "Draft");
    if (!draft) return showToast("Draft could not be found.", "error");
    location.hash = "#new-request";
    setTimeout(() => {
      const form = document.getElementById("requestForm");
      if (!form) return;
      const values = { activityName: draft.name, purpose: draft.purpose, role: draft.role, activityDate: draft.date, startTime: draft.start, endTime: draft.end, venue: draft.venue, details: draft.details };
      Object.entries(values).forEach(([key, value]) => { form.elements[key].value = value || ""; });
      form.dataset.draftId = draft.id;
    }, 0);
  }
});

document.getElementById("confirmSubmit").addEventListener("click", () => {
  if (!pendingRequest) return;
  const request = createRequest(pendingRequest, "Pending", pendingDraftId);
  if (!request) return;
  pendingRequest = null;
  pendingDraftId = null;
  confirmModal.hide();
  showToast(`Request submitted. Your Request ID is ${request.id}.`);
  location.hash = "#requests";
});

document.addEventListener("click", (event) => {
  if (event.target.closest("#saveDraft")) {
    const form = document.getElementById("requestForm");
    const data = requestDataFromForm(form);
    if (!data.name) {
      document.getElementById("requestFormError").textContent = "Enter an activity name before saving a draft.";
      document.getElementById("activityName").focus();
      return;
    }
    const existingId = form.dataset.draftId;
    const requests = getRequests();
    const draft = { ...data, id: existingId || `DRAFT-${Date.now()}`, status: "Draft", submitted: new Date().toISOString().slice(0, 10) };
    const next = existingId ? requests.map((item) => item.id === existingId ? draft : item) : [draft, ...requests];
    if (writeStore(STORAGE.requests, next)) {
      showToast("Draft saved in this browser.");
      location.hash = "#requests";
    }
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "requestSearch" || event.target.id === "requestStatus") filterRequests();
});
document.addEventListener("change", (event) => {
  if (event.target.id === "requestStatus") filterRequests();
});

function filterRequests() {
  const query = (document.getElementById("requestSearch")?.value || "").trim().toLowerCase();
  const status = document.getElementById("requestStatus")?.value || "";
  const filtered = getRequests().filter((request) => request.status !== "Draft" && (!status || request.status === status) && (`${request.name} ${request.id}`.toLowerCase().includes(query)));
  const list = document.getElementById("requestList");
  if (list) list.innerHTML = requestTable(filtered, { emptyTitle: "No matching requests", emptyText: "Try a different search term or status filter." });
}

document.getElementById("printCertificate").addEventListener("click", () => window.print());
document.getElementById("certificateModal").addEventListener("shown.bs.modal", () => {
  if (pendingCertificatePrint) {
    pendingCertificatePrint = false;
    window.setTimeout(() => window.print(), 250);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches('input[name="rating"]')) {
    document.querySelectorAll(".rating-option").forEach((option) => option.classList.toggle("is-selected", option.querySelector("input").checked));
  }
});

function hydrateProfileForm() {
  const form = document.getElementById("profileForm");
  if (!form) return;
  const profile = getProfile();
  form.profileName.value = profile.name;
  form.profileEmail.value = profile.username;
  form.profilePosition.value = profile.position;
  form.profileDepartment.value = profile.department;
}

const routeObserver = new MutationObserver(hydrateProfileForm);
routeObserver.observe(content, { childList: true });

updateDemoCredentialHint();
if (localStorage.getItem(STORAGE.session)) showApp();
