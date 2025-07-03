'use client';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";
import ContactCompany from '../../components/contact-company';
import ActivitiesSection from '../../components/activities-section';

const sampleActivities = [
  {
    id: 1,
    imageUrl: 'https://www.rmutt.ac.th/wp-content/uploads/2023/04/songkranday2023-01.jpg',
    title: 'สงกรานต์2569 ร่วมกับร้านรุ่งอนันต์',
    description: 'ร่วมกิจกรรมสงกรานต์2569 กับร้านรุ่งอนันต์',
    linkUrl: '#', 
  }
];


export default function Events() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();
 return (
    <div>
      <main>
        <ActivitiesSection titles={'กิจกรรม'} activities={sampleActivities} />
      </main>
    </div>
  );
}
