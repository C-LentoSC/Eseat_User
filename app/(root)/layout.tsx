import Footer from "@/components/footer";
import Header from "@/components/Header";
import { NavBar } from "@/components/nav-bar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
