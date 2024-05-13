import React from "react";
import logo from "./logo.png";
import UsersList from "./components/UsersList";

function App() {
    return (
        <div className="min-h-full">
            <nav>
                <div className="w-full flex justify-center items-center border-b-2 border-gray-100 p-2">
                    <div className="flex items-center">
                        <img src={logo} className="h-16 w-16" alt="logo" />
                        <p className="text-2xl text-gray-900 ml-4">CSV Take Home Test</p>
                    </div>
                </div>
            </nav>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-screen-lg flex">
                    <UsersList />
                </div>
            </div>
            <footer className="mt-4">
                <div className="w-full flex justify-center items-center p-2">
                    <p className="text-gray-900 text-sm">
                        Made by <a href="https://www.davidmartins.net/" target="_blank" rel="noreferrer noopener" className="text-green-600 hover:text-green-900">David</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
