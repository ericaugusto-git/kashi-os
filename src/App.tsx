import Background from "./Background"
import Menu from "./Menu/Menu"
import taskImage from './assets/taskbar.png'


function App() {
    return (
      <>
          {/* <div>
      <p style={{ fontFamily: 'Happy Monkey', marginBottom: '20px' }}>Happy Monkey: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Julius Sans One', marginBottom: '20px' }}>Julius Sans One: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Major Mono Display', marginBottom: '20px' }}>Major Mono Display: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Megrim', marginBottom: '20px' }}>Megrim: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Oxanium', marginBottom: '20px' }}>Oxanium: Eric Augusto Batista Carvalho</p>
    </div> */}
        <Background/>
        <Menu/>
      </>
    )
}

export default App
