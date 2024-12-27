import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black/25 to-gray-900 p-4">
      <div className="flex flex-col gap-4 items-center sm:items-center">
        <Image
          className="dark:invert max-w-xs sm:max-w-sm md:max-w-md"
          src="/SPENDWISE.svg"
          alt="SpendWise Logo"
          width={500}
          height={500}
          priority
        />
        <div className="mt-6 flex justify-center items-center">
          <Link href={"/auth"}>
            <ShimmerButton text="Get Started" />
          </Link>
        </div>
      </div>
    </div>
  );
}
