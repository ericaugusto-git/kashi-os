import { AppType, AppTypeType } from "@/constants/apps";
import { createContext, ReactNode, useContext, useRef, useState } from "react";


export type ContextMenuProps = {
  x: number, 
  y: number, 
  source: 'desktop' | 'folder' | 'windows' | AppTypeType, 
  handleCustomMenuEvent?: (event: string) => void,
  folderPath?: string,
  fileInputRef?: React.RefObject<HTMLInputElement>,
  app?: AppType,
} | null | undefined;

type MenuContextType = [
  ContextMenuProps, 
  React.Dispatch<React.SetStateAction<ContextMenuProps>>,
  React.RefObject<HTMLInputElement>
];

const MenuContext = createContext<MenuContextType>([null, () => null, { current: null }]);

function ContextMenuProvider({children}: {children: ReactNode}){
  const [menuProps, setMenuProps] = useState<ContextMenuProps>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
    
  return <MenuContext.Provider value={[menuProps, setMenuProps, fileInputRef]}>
    <input 
      type="file"
      ref={fileInputRef}
      style={{ display: 'none' }}
    />
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

function useContextMenuHandler(source:  NonNullable<ContextMenuProps>['source'], handleCustomMenuEvent?:  NonNullable<ContextMenuProps>['handleCustomMenuEvent'], folderPath?: NonNullable<ContextMenuProps>['folderPath'], app?: AppType) {
    const [, setMenuProps] = useContextMenu();

    const handleContextMenu = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const { pageX, pageY } = e;
      setMenuProps({ x: pageX, y: pageY, source, handleCustomMenuEvent, folderPath, app });
    };
  
    return handleContextMenu;
  }

export { ContextMenuProvider, useContextMenu, useContextMenuHandler };
