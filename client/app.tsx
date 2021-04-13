import { React, ReactDOMServer, ObsidianWrapper } from '../deps.ts';
// import Dashboard from './Components/Dashboard/Dashboard.tsx';
import { CardsContainer } from './Components/Card_Components/CardsContainer.tsx';
import Header from './Components/Card_Components/Header.tsx';
import Instructions from './Components/Card_Components/Instructions.tsx';

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
      <div className="container mx-auto bg-gray-900  ">
        <Header />
        <Instructions />
        <div className="shadow overflow-y-visible border bg-gray-700 rounded-xl p-3 mb-5 ">
          <CardsContainer />
        </div>
      </div>
    </ObsidianWrapper>
  );
};
export default App;
