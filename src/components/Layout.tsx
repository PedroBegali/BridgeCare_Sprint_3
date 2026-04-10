import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
 

 

const ScrollManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
 

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
<div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-in-out">
    {children}
</div>
);
 

 
const Layout = () => {
  return (
<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-700 font-sans">
   
<ScrollManager />
 
      <Header />
 
<main className="grow w-full">
<PageWrapper>
<Outlet />
</PageWrapper>
</main>
 
      <Footer />
</div>
  );
};
 
export default Layout;