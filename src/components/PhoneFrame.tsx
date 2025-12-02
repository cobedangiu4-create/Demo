import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-full max-w-[430px] mx-auto">
      {/* iPhone 16 Pro Max Frame */}
      <div className="relative w-full h-[932px] bg-[#1d1d1f] rounded-[50px] p-[3px] shadow-2xl">
        
        {/* Side Buttons */}
        <div className="absolute right-[-2px] top-[140px] w-[3px] h-[60px] bg-[#1d1d1f] rounded-l-md" />
        <div className="absolute left-[-2px] top-[120px] w-[3px] h-[40px] bg-[#1d1d1f] rounded-r-md" />
        <div className="absolute left-[-2px] top-[180px] w-[3px] h-[50px] bg-[#1d1d1f] rounded-r-md" />
        
        {/* Screen Container */}
        <div className="relative w-full h-full bg-black rounded-[48px] overflow-hidden flex flex-col">
          
          {/* Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[18px] z-50 shadow-lg" />
          
          {/* App Content - Full height container */}
          <div className="relative w-full h-full bg-white overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
