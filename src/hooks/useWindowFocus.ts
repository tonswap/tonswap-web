import { useEffect, useState } from 'react'

function useWindowFocus() {
    const [active, setIsActive] = useState(true)
    useEffect(() => {

        const onFocus = () => {
            setIsActive(true)
        }
        const onBlur = () => {
            setIsActive(false)
        }

        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        // Calls onFocus when the window first loads
        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
  }, []);

  return active
}

export default useWindowFocus