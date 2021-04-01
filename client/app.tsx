import { React, ReactDOMServer, ObsidianWrapper } from '../deps.ts';
// import Dashboard from './Components/Dashboard/Dashboard.tsx';
import { CardsContainer } from './Components/Card_Components/CardsContainer.tsx';
import Header from './Components/Card_Components/Header.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h3: any;
      h1: any;
      p: any;
    }
  }
}
const App = () => {
  return (
    <ObsidianWrapper>
      <div className="container mx-auto bg-gray-800 min-h-screen rounded-lg">
        <Header />
        <CardsContainer />
      </div>
    </ObsidianWrapper>
  );
};
export default App;
