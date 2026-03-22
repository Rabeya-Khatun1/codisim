export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
      {children}
    </div>
  );
}