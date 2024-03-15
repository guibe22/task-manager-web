
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { BsFillSendArrowDownFill,BsSendArrowUpFill } from "react-icons/bs";

function Tab() {
  return (
    <Tabs aria-label="Default tabs" style="underline" className='w-full'>
      <Tabs.Item active title="Recibidos" icon={BsFillSendArrowDownFill}>
        This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
      <Tabs.Item title="Enviados" icon={BsSendArrowUpFill}>
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
      <Tabs.Item title="Nuevo" icon={MdOutlineDataSaverOn}>
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
    
    </Tabs>
  );
}

export default Tab;