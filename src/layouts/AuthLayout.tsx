import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="items-center justify-center hidden w-1/2 h-screen bg-indigo-700 lg:flex lg:flex-col">
        <span className="font-bold text-white text-9xl">Zustand</span>
        {/* <img src="https://placehold.co/1440/667fff/ffffff.png?text=Zustand&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full" /> */}
      </div>
      <div className="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};
