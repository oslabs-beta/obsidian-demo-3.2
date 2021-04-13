import { React } from '../../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      article: any;
      h3: any;
      h5: any;
      svg: any;
      path: any;
      rect: any;
      img: any;
    }
  }
}

const Header = (props: any) => {
  return (
    <div className="pb-2 border-gray-200 mt-10 flex flex-row justify-between items-center">
      <div>
        <h1 className="text-4xl leading-6 font-medium text-gray-300">
          Obsidian Demonstration
        </h1>
        <p className="mt-2 max-w-4xl text-md text-gray-400">
          Use the below mock app to test the functionality and performance of
          Obsidian!
        </p>
      </div>
      <div>
        <img
          src="static/obs-no-title-trans.png"
          width="175"
          className="grayscale"
        ></img>
      </div>
    </div>
  );
};

export default Header;
