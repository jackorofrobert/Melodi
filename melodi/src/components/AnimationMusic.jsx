import React from "react";

const AnimationMusic = () => {
  return (
    <div className={`flex space-x-2 -ml-8 w-12`}>
      <div className="h-6 w-1 bg-slate-50 animate-wave"></div>
      <div className="h-6 w-1 bg-slate-50 animate-wave delay-100"></div>
      <div className="h-6 w-1 bg-slate-50 animate-wave delay-200"></div>
      <div className="h-6 w-1 bg-slate-50 animate-wave delay-300"></div>
      <div className="h-6 w-1 bg-slate-50 animate-wave delay-400"></div>
    </div>
  );
};

export default AnimationMusic;
