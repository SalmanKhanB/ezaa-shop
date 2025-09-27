import FetchWrapper from "@/components/fetch-wrapper";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
 
const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FetchWrapper>
      <div className={`flex flex-col min-h-screen`}>
        {/* <TopNav /> */}
        <Navbar />
        <div className="flex-1 pb-8">{children}</div>
        <Footer />
      </div>
    </FetchWrapper>
  );
};

export default SiteLayout;
