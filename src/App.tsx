import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage, TicketPage } from './components';

function App() {
  return (
    <div
      className="h-screen flex justify-center font-[Inconsolata] text-neutral-300 relative
        bg-[url('/images/background-mobile.png')]
        sm:bg-[url('/images/background-tablet.png')]
        xl:bg-[url('/images/background-desktop.png')] bg-cover"
    >
      <div className="patterns screen pointer-events-none">
        <img
          className="absolute object-cover h-full top-0 left-1/2 transform -translate-x-1/2 right-0"
          src="images/pattern-lines.svg"
          alt=""
        />

        <img
          className="absolute object-cover top-4 h-12 xl:h-34 xl:top-8 right-0"
          src="images/pattern-squiggly-line-top.svg"
          alt=""
        />

        <img
          className="hidden xl:block absolute object-cover bottom-0 left-0"
          src="images/pattern-squiggly-line-bottom-desktop.svg"
          alt=""
        />

        <img
          className="absolute xl:hidden object-contain bottom-0 left-0"
          src="images/pattern-squiggly-line-bottom-mobile-tablet.svg"
          alt=""
        />
      </div>

      <Routes>
        <Route
          path="/ticket-generator"
          element={<MainPage />}
        />
        <Route
          path="/ticket"
          element={<TicketPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
