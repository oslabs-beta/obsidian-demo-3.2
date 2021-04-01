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
    }
  }
}

const Header = (props: any) => {
  return (
    <div className="pb-5 border-b border-gray-200 mt-10 mb-5">
      <h3 className="text-xl leading-6 font-medium text-gray-100 pt-3">
        Obsidian Demo
      </h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-400">
        Use the below mock app to test the functionality and performance of
        Obsidian!
      </p>
    </div>
  );
};

export default Header;
