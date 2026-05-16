/**
 * InstantDB client — single shared instance across the app.
 *
 * SETUP (one-time):
 *  1. Create a free account at https://www.instantdb.com/dash
 *  2. Create a new app and copy the App ID
 *  3. Create frontend/.env.local  →  VITE_INSTANTDB_APP_ID=<your-app-id>
 *
 * Until the env var is set, the client initialises with a placeholder ID and
 * all queries simply return empty data — the app still renders normally.
 */
import { init, id } from '@instantdb/react';

const APP_ID =
  import.meta.env.VITE_INSTANTDB_APP_ID ||
  '00000000-0000-0000-0000-000000000000'; // Replace via .env.local

export const db = init({ appId: APP_ID });

// Re-export id() helper so callers can do: import { db, id } from '../lib/db'
export { id };

/**
 * Pre-defined namespaces used in this project.
 *
 *   jobs          – job listings shown on Career Hub
 *   applications  – internship / job applications submitted by users
 *   products      – products listed on Products page
 *   services      – services shown on Services pages
 *   trainings     – training modules (admin-managed)
 *
 * Example read (inside a React component):
 *   const { data } = db.useQuery({ jobs: {} });
 *
 * Example write:
 *   db.transact(db.tx.applications[id()].update({ firstName, email, ... }));
 */
