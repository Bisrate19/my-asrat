export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-green-800 py-4 mt-auto">
      <p className="text-center text-cyan-700 dark:text-cyan-300 text-sm">
        © {new Date().getFullYear()} Tithe Tracker. All rights reserved.
      </p>
    </footer>
  );
}
 