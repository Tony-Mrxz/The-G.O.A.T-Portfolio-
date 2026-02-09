import { useState, useEffect } from 'react';

export function useScrollDirection() {
    const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < 10) {
                return;
            }

            setScrollDir(scrollY > lastScrollY ? "down" : "up");
            setLastScrollY(scrollY > 0 ? scrollY : 0);
        };

        window.addEventListener("scroll", updateScrollDir);
        return () => window.removeEventListener("scroll", updateScrollDir);
    }, [lastScrollY]);

    return scrollDir;
}
