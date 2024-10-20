import { useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
import { WindowType } from '../constants/window';
import { windowsTemplates } from '../constants/windowsTemplate';
import useOpenWindow from '../hooks/useOpenWindow';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DesktopIcons = () => {
  // const [position] = useDesktopPosition();
  const apps = windowsTemplates.filter((a) => a.appType === 'project' || a.desktop);
  const [isDragging, setIsDragging] = useState(false);
  const openWindow = useOpenWindow();
  let savedLayouts: Layouts | string | null = localStorage.getItem('app-layouts');
  if(savedLayouts)
    savedLayouts = JSON.parse(savedLayouts);
  const generateLayouts = (apps: WindowType[]): Layouts => {
    const layouts: Layouts = {};
    const breakpoints: Array<keyof Layouts> = ['lg', 'md', 'sm', 'xs', 'xxs'];

    breakpoints.forEach((breakpoint) => {
      layouts[breakpoint] = apps.map((app, index) => ({
        i: app.app,
        x: 0,
        y: index,
        w: 1,
        h: 1,
        minW: 1,
        minH: 1,
      }));
    });

    return layouts;
  };

  const [layouts, setLayouts] = useState<Layouts>(savedLayouts ? (savedLayouts as Layouts) : generateLayouts(apps));

  // Save layouts to localStorage whenever they change
  const handleLayoutChange = (_: Layout[], allLayouts: Layouts) => {
    const layoutsString = JSON.stringify(allLayouts);
    const storedLayouts = localStorage.getItem('app-layouts');

    // Only update if the layouts have changed to prevent unnecessary updates
    if (storedLayouts !== layoutsString) {
      setLayouts(allLayouts);
      localStorage.setItem('app-layouts', layoutsString);
    }
  };

  const handleDragStop = (item: Layout) => {
    // console.log(isDragging)
    // if(isDragging){
    //   console.log("drag stopped")
    //   return;
    // }
    // const wasMoved = oldItem.x !== newItem.x || oldItem.y !== newItem.y;
    if(!isDragging){
      // Click event here
      const app = apps.find(a => a.app === item.i);
      openWindow(app!)
    }else{
      setIsDragging(false);
    }
  }


  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={130}
      style={{cursor: isDragging ? `url('grabbing.svg'), grabbing` : ''}}
      useCSSTransforms={true}
      compactType={null}
      autoSize={false}
      containerPadding={[0,0]}
      isResizable={false}
      isBounded={true}
      isDraggable={true}
      preventCollision={true}
      onDrag={() =>{setIsDragging(true)}}
      onDragStop={(_,item) => {handleDragStop(item)}}
      onLayoutChange={handleLayoutChange}
    >
      {apps.map((app) => (
        <div id={app.app} key={app.app}>
          <DesktopIcon app={app} isDragging={isDragging}/>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default DesktopIcons;
