'use client';
import React from 'react';
import Link from 'next/link';
import { useThemeContext } from '@app/context/theme-context';

export default function ContactCompany() {
    const { themeColor1 } = useThemeContext();
    return (
        <>
            <div className="w-full h-52 flex justify-center items-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(224, 224, 224, 0.5), rgba(199, 198, 198, 0.696)), url('https://cdn.pixabay.com/photo/2016/11/14/03/50/farmer-1822530_960_720.jpg')`
                }}>
                <h3 className="text-3xl font-semibold" style={{ color: themeColor1 }}>Contact</h3>
            </div>
            <div className="bg-gray-200 py-10 px-5 text-gray-700 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] border-t border-gray-300">
                <div className="max-w-screen-xl mx-auto flex justify-between gap-10 flex-wrap">

                    <div className="flex flex-col items-center flex-1 min-w-[250px] mb-8 md:mb-0">
                        <div className="mb-5">
                            <img
                                src="https://res.cloudinary.com/dyg6r8pec/image/upload/w_130,h_100,c_fit/v1749023798/logo_everspring-01-Photoroom_lq2qb3.png"
                                alt="Logo"
                                width={130}
                                height={100}
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">เบอร์โทรติดต่อ</h3>
                        <p className="text-base font-bold text-gray-800 mt-0">โทรศัพท์ 02-363-8560</p>
                    </div>

                    <div className="flex-1 min-w-[250px] mb-8 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 whitespace-nowrap">ติดต่อบริษัท</h3>
                        <p className="text-base leading-relaxed mb-3">
                            ที่อยู่สำนักงานใหญ่ 388/70 ถนนนวลจันทร์<br />
                            แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพมหานคร 10230
                        </p>

                        <div className="flex flex-col gap-3 mt-5">
                            <Link href="mailto:evergreenagro.th@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm transition-colors duration-200 hover:bg-gray-200 hover:border-gray-400">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/9068/9068642.png"
                                    alt="Email"
                                    width={20}
                                    height={20}
                                />
                                <span>evergreenagro.th@gmail.com</span>
                            </Link>
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm transition-colors duration-200 hover:bg-gray-200 hover:border-gray-400">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/3670/3670089.png"
                                    alt="Line"
                                    width={20}
                                    height={20}
                                />
                                <span>Green Land Company</span>
                            </Link>
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm transition-colors duration-200 hover:bg-gray-200 hover:border-gray-400">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                />
                                <span>Green Land Company</span>
                            </Link>
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm transition-colors duration-200 hover:bg-gray-200 hover:border-gray-400">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/3670/3670089.png"
                                    alt="Line"
                                    width={20}
                                    height={20}
                                />
                                <span>Wintafone (Thailand)</span>
                            </Link>
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm transition-colors duration-200 hover:bg-gray-200 hover:border-gray-400">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                />
                                <span>Wintafone (Thailand)</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 min-w-[250px] mb-8 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">บริษัทในเครือ</h3>
                        <ul className="list-none p-0 m-0">
                            <li className="text-base text-gray-700 mb-2">บริษัท เอฟ แอนด์ ดับบลิว อะโกรเคม จำกัด</li>
                            <li className="text-base text-gray-700 mb-2">บริษัท ควีนแลนด์ อะโกรเคม คอป จำกัด</li>
                            <li className="text-base text-gray-700 mb-2">บริษัท วันทาโฟน (ประเทศไทย) จำกัด</li>
                            <li className="text-base text-gray-700 mb-2">บริษัท เอเวอร์สปริง อะโกรเคม จำกัด</li>
                        </ul>
                    </div>

                    <div className="flex justify-center items-center w-full h-72 rounded-lg overflow-hidden mt-5 bg-blue-300">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.257436918698!2d100.6457921!3d13.823574199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d62a3efcf9499%3A0x48407c5b5e07bc55!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4reC5gOC4p-C4reC4o-C5jOC4quC4m-C4o-C4tOC4hyDguK3guYLguIHguKPguYDguITguKEg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1749624468194!5m2!1sth!2sth" // ตรวจสอบ URL ของ iframe ให้ถูกต้อง
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            >
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    );
}
