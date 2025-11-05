import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/login">
        <button className="p-4  border-2 rounded-2xl">Login</button>
      </Link>
      <Link href="/signup">
        <button className="p-4 border-2 rounded-2xl">signup</button>
      </Link>

    </div>
  );
}
