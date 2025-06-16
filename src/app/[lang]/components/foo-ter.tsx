import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 py-10 px-5 font-sans border-t border-gray-100 flex flex-col items-center">
      <div className="flex flex-wrap justify-between max-w-screen-xl w-full mb-8 lg:mb-12">
        <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
          <h3 className="text-black text-lg font-bold mb-4">EVERSPRING AGROCHEM</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-1">
            388/70 Biz Gallerie ถ.ละรินจันทร์
            <br />
            แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพมหานคร
            <br />
            10230
          </p>
          <p className="text-gray-600 text-sm">เวลาทำการ : 08.00-17.00</p>
        </div>

        <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
          <ul className="list-none p-0 m-0">
            <li className="mb-2">
              <Link href="/about-us" className="text-gray-600 text-base transition-colors duration-300 hover:text-black">
                เกี่ยวกับเรา
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/our-company" className="text-gray-600 text-base transition-colors duration-300 hover:text-black">
                บริษัทในเครือ
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/products" className="text-gray-600 text-base transition-colors duration-300 hover:text-black">
                ผลิตภัณฑ์
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/news" className="text-gray-600 text-base transition-colors duration-300 hover:text-black">
                ข่าวสาร
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
          <ul className="list-none p-0 m-0">
            <li className="mb-2">
              <Link href="/contact" className="text-gray-600 text-base transition-colors duration-300 hover:text-black">
                ติดต่อ
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/privacy-policies" className="text-gray-600 text-base transition-colors duration-300 hover:text-black">
                Privacy Policies
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow-[1.5] min-w-[280px] mb-5">
          <h4 className="text-gray-600 text-base font-bold mb-4">มีอะไรไหม ?</h4>
          <div className="flex border-b border-gray-300 pb-1 mb-3 flex-col sm:flex-row sm:border-b-0 sm:pb-0">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="border-none bg-transparent outline-none flex-grow py-1 px-0 text-gray-700 text-sm placeholder:text-gray-400 mb-2 sm:mb-0 sm:mr-2 sm:border-b sm:border-gray-300"
            />
            <button type="submit" className="bg-transparent border-none text-black text-sm font-bold cursor-pointer py-1 px-2 transition-colors duration-300 hover:text-gray-600 self-start sm:self-auto">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-xs text-gray-500 mt-5 pt-5 border-t border-gray-200">
        <p>&copy; {currentYear} PBL DevTeam. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;