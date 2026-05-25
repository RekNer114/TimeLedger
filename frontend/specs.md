# TimeLedger Frontend Specification

## 1. Overview

TimeLedger is a mobile-friendly web application designed for shift workers to manage schedules and track earnings across multiple jobs.

The frontend must provide:
- Clear calendar-based schedule visualization
- Easy shift editing and management
- Real-time earnings calculation visibility
- Multi-job support
- Clean UX for non-technical users

Target: responsive web app (mobile-first).

---

## 2. Tech Stack

- React (latest stable)
- TypeScript (strict mode)
- Tailwind CSS
- React Query (server state)
- Zustand (client state)
- React Router
- Day.js (date handling)

---

## 3. Core Pages

### 3.1 Auth Page
- Login / Register
- JWT-based auth
- Simple form UI

---

### 3.2 Dashboard (Main Page)

#### Sections:
1. Summary Cards:
   - Total hours (current month)
   - Gross earnings
   - Tax amount
   - Net earnings

2. Calendar View:
   - Month view (default)
   - Each day shows:
     - shift type
     - hours worked
     - job color tag

3. Quick Actions:
   - Add shift
   - Auto-fill schedule
   - Export data

---

### 3.3 Calendar Page

#### Features:
- Full calendar UI
- Click day → open modal
- Shift display:
  - Job name
  - Hours
  - Type (day/night/custom)
- Color-coded by job

#### Interactions:
- Add shift
- Edit shift
- Delete shift

---

### 3.4 Jobs Management Page

#### Features:
- List of jobs
- Create/edit/delete job

#### Job fields:
- Name
- Payment type:
  - hourly
  - monthly
- Hourly rate OR monthly salary
- Tax:
  - manual %
  - preset selection

---

### 3.5 Reports Page

#### Features:
- Monthly summary
- Breakdown:
  - hours
  - gross
  - tax
  - net

#### Export:
- CSV
- PDF (trigger backend)

---

### 3.6 Settings Page

- User preferences
- Calendar sync (.ics export trigger)
- Theme (optional)

---

## 4. Components

### Global Components
- Navbar (bottom on mobile)
- Header
- Modal
- Button
- Input
- Select
- Card

---

### Calendar Components
- CalendarGrid
- DayCell
- ShiftBadge

---

### Domain Components
- JobCard
- ShiftForm
- EarningsSummary
- ReportTable

---

## 5. State Management

### Server State (React Query)
- shifts
- jobs
- earnings

### Client State (Zustand)
- selected date
- active job filter
- modal state

---

## 6. API Integration

Base URL: `/api`

### Endpoints:

#### Auth
- POST `/auth/login`
- POST `/auth/register`

#### Jobs
- GET `/jobs`
- POST `/jobs`
- PUT `/jobs/{id}`
- DELETE `/jobs/{id}`

#### Shifts
- GET `/shifts`
- POST `/shifts`
- PUT `/shifts/{id}`
- DELETE `/shifts/{id}`

#### Earnings
- GET `/earnings?month=YYYY-MM`

#### Reports
- GET `/reports/export?type=csv|pdf`

---

## 7. Data Models (Frontend Types)

### Job
```ts
type Job = {
  id: string
  name: string
  type: 'hourly' | 'monthly'
  hourlyRate?: number
  monthlySalary?: number
  taxRate: number
}
type Shift = {
  id: string
  jobId: string
  date: string
  hoursWorked: number
  type: string
}
Earnings
type Earnings = {
  totalHours: number
  gross: number
  tax: number
  net: number
}
```