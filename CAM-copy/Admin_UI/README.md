# Solano High School Admin UI Prototype

A responsive HTML, CSS, JavaScript, and Bootstrap 5 prototype for the Certificate of Appearance request and issuance workflow.

## Run

Open `index.html` in a modern browser, or serve this folder through XAMPP. Bootstrap 5 and Bootstrap Icons are loaded from CDNs.

## Demo workflow

1. Open **Approval Management**, select a pending request, and approve or reject it. Rejections require remarks.
2. Open **Appearance Records**, choose an approved request, and enter time-in and time-out.
3. Open **Certificate Management** to preview and generate an eligible certificate, then print it.
4. Use **Activity Requests**, **Reports and Records**, **User Management**, and **Feedback** to explore their filters and detail views.
5. Use the account menu to switch to the restricted teacher demo role. Administrative approvals and record-management sections are unavailable in that mode.

## Prototype limits

Sample records and demo actions are stored in the current browser's `localStorage`; no data is sent to the school. Role restrictions are frontend demonstrations, not security controls. System-based approval records show traceability metadata and do not represent a personal handwritten or cryptographic signature. A production deployment needs a secured backend, database, server-side role authorization, and school-approved record and certificate procedures.
