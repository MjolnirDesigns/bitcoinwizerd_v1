// app/components/ui/Footer.tsx
import React from "react";
import Socials from "./Socials";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgb(30,30,30)] py-8 border-t-2 border-crown-chakra">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div className="text-center">
            <h3 className="text-wizerd-blue font-ubuntu text-lg font-semibold mb-4">Company</h3>
            <ul className="text-wizerd-blue font-ubuntu text-sm">
              <li><a href="#" className="hover:text-cyber-yellow">Link 1</a></li>
              <li><a href="#" className="hover:text-cyber-yellow">Link 2</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-wizerd-blue font-ubuntu text-lg font-semibold mb-4">Community</h3>
            <ul className="text-wizerd-blue font-ubuntu text-sm">
              <li><a href="#" className="hover:text-cyber-yellow">Link 1</a></li>
              <li><a href="#" className="hover:text-cyber-yellow">Link 2</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-wizerd-blue font-ubuntu text-lg font-semibold mb-4">Products</h3>
            <ul className="text-wizerd-blue font-ubuntu text-sm">
              <li><a href="#" className="hover:text-cyber-yellow">Link 1</a></li>
              <li><a href="#" className="hover:text-cyber-yellow">Link 2</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-wizerd-blue font-ubuntu text-lg font-semibold mb-4">Resources</h3>
            <ul className="text-wizerd-blue font-ubuntu text-sm">
              <li><a href="#" className="hover:text-cyber-yellow">Link 1</a></li>
              <li><a href="#" className="hover:text-cyber-yellow">Link 2</a></li>
            </ul>
          </div>
        </div>
        <Socials className="mb-6" />
        <div className="text-center text-wizerd-blue font-ubuntu text-sm">
          <p>© {new Date().getFullYear()} 
            <span className="text-bitcoin-orange"> ₿itcoin</span>
            <span className="text-alien-green">Wizerd </span> 
            All rights reserved.
          </p>
          <p>
            Built with the power of Mjolnir! www.MjolnirDesignStudios.com
          </p>
          <p className="mt-2">
            <a href="/terms" className="hover:text-cyber-yellow">Terms of Use</a> |{" "}
            <a href="/privacy" className="hover:text-cyber-yellow">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};