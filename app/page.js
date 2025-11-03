import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/auth/login">
        <button className="p-4  border-2 rounded-2xl">Login</button>
      </Link>
      <Link href="/auth/signup">
        <button className="p-4 border-2 rounded-2xl">signup</button>
      </Link>

    </div>
  );
}
