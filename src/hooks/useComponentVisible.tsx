import { useState, useEffect, useRef, MutableRefObject } from 'react';



export default function useComponentVisible(initialIsVisible: boolean, toggleButtonRef?: MutableRefObject<HTMLButtonElement | HTMLAnchorElement | null>) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node) && !toggleButtonRef?.current?.contains(event.target as Node)) {
            setIsComponentVisible(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

    return  [ref, isComponentVisible, setIsComponentVisible ] as [React.RefObject<HTMLDivElement>, boolean, React.Dispatch<React.SetStateAction<boolean>>];
}