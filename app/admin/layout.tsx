export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Keep this layout public so /admin/login can render without an auth redirect.
  return children;
}
