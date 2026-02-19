import type { ReactNode } from "react";
import "./PhoneWrapper.css";

type PhoneWrapperProps = {
  children: ReactNode;
};

export default function PhoneWrapper({ children }: PhoneWrapperProps) {
  return (
    <div className="phone-outer">
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="notch"></div>
          <div className="camera"></div>
          <div className="speaker"></div>
          <div className="content-area">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

