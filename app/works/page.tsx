"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorksPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/cases');
  }, [router]);

  return null;
}
