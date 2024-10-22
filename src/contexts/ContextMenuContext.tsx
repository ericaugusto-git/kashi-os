import { createContext, ReactNode, useContext, useState } from "react";


export type ContextMenuProps = {x: number, y: number, source: 'desktop' | 'app' | 'folder'} | null | undefined;
type MenuContextType = [ContextMenuProps, React.Dispatch<React.SetStateAction<ContextMenuProps>>]
const MenuContext = createContext<MenuContextType>([null, () => null]);

function ContextMenuProvider({children}: {children: ReactNode}){
    const [menuProps, setMenuProps] = useState<ContextMenuProps>(null);
    return <MenuContext.Provider value={[menuProps, setMenuProps]}>
        {children}
    </MenuContext.Provider>
}

function useContextMenu(){
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useContextMenu must be used within a ContextMenuProvider')
      }
      return context  
}

function useContextMenuHandler(source: "desktop" | "app" | "folder") {
    const [, setMenuProps] = useContextMenu();
  
    const handleContextMenu = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const { pageX, pageY } = e;
      setMenuProps({ x: pageX, y: pageY, source });
    };
  
    return handleContextMenu;
  }

export {useContextMenu, useContextMenuHandler, ContextMenuProvider}