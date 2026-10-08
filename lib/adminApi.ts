'use client';

import type { Project } from './supabaseProjectService';

/**
 * Client helpers for the admin area.
 *
 * All reads/writes go through /api/admin/*, which authenticates with an
 * HttpOnly session cookie and talks to Supabase with the service role key.
 * The anon key is never used for mutations.
 */

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...init?.headers,
    },
  });

  if (res.status === 401) {
    // Session expired — bounce to the login page.
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Sesi berakhir. Silakan masuk kembali.');
  }

  const text = await res.text();
  const data = text ? (JSON.parse(text) as T & { error?: string }) : ({} as T);

  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Permintaan gagal (${res.status})`);
  }

  return data;
}

export async function loginAdmin(password: string): Promise<void> {
  await request<{ ok: boolean }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export async function logoutAdmin(): Promise<void> {
  await request<{ ok: boolean }>('/api/admin/logout', { method: 'POST' });
}

export async function checkSession(): Promise<boolean> {
  const res = await fetch('/api/admin/session', { credentials: 'same-origin' });
  return res.ok;
}

export async function fetchProjects(): Promise<Project[]> {
  const { projects } = await request<{ projects: Project[] }>('/api/admin/projects');
  return projects;
}

export async function fetchProject(id: string): Promise<Project> {
  const { project } = await request<{ project: Project }>(`/api/admin/projects/${id}`);
  return project;
}

export async function createProjectApi(payload: Partial<Project>): Promise<Project> {
  const { project } = await request<{ project: Project }>('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return project;
}

export async function updateProjectApi(id: string, payload: Partial<Project>): Promise<Project> {
  const { project } = await request<{ project: Project }>(`/api/admin/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return project;
}

export async function deleteProjectApi(id: string): Promise<void> {
  await request<{ ok: boolean }>(`/api/admin/projects/${id}`, { method: 'DELETE' });
}

/** Uploads a banner through the server (validated, service-role). */
export async function uploadBannerApi(file: File, slug: string): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  form.append('slug', slug);

  const { url } = await request<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    body: form,
  });
  return url;
}
