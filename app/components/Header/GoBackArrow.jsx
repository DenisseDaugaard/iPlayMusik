"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function GoBackArrow() {

    const router = useRouter();
    const goBack = () => {
        router.back();
    }

    return (
        <IoIosArrowBack onClick={goBack} className="text-2xl" />
    )
}
