import Image from "next/image";
// import logo from "../images/linkedin.png"; 

function Header() {
  return (
    <div className="flex">
      <Image
        className="rounded-lg"
        src="https://i.postimg.cc/wjbG8qzb/linked-Inlogo.png"
        width={40}
        height={40}
        alt="Logo"
      />
    </div>
  );
}
export default Header;
