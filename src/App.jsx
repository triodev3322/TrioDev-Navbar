import Header from './components/Header';

const App = () => {
  return (
    <div className="relative min-h-screen bg-white flex justify-center items-center flex-col overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-l from-slate-300 via-teal-500 to-slate-400 blur-[120px] opacity-60 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-slate-300 via-teal-500 to-slate-400 blur-[120px] opacity-60 animate-pulse-slow pointer-events-none" />

      <Header />

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-l from-slate-300 via-teal-500 to-slate-400 bg-clip-text text-transparent text-center px-4 z-10">
        NAVBAR COMPONENT
      </h1>
    </div>
  );
};

export default App;
