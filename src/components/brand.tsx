import Link from "next/link";
import MyImage from "./my-image";

const Brand = () => {
  return (
    <Link href="/">
      <MyImage
        className="md:hidden"
        src="/images/logo.png"
        alt="Ezaa Shop"
        width={52}
        height={52}
        hasBaseUrl={false}
      />
      <MyImage
        className="hidden md:block"
        src="/images/logo.png"
        alt="Ezaa Shop"
        width={50}
        height={50}
        hasBaseUrl={false}
      />
    </Link>
  );
};

export default Brand;
