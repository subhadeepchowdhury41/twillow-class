"use client"
import { BsBellFill, BsEnvelopeFill, BsHouseFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
// import { useUserContext } from '@/app/providers/userProvider';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  // const { currentUser, signOut } = useUserContext();
  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: false
    },
    {
      icon: BsEnvelopeFill,
      label: 'Profile',
      href: `/users/${'currentUser?.id'}`,
      auth: true,
    },
  ]
  return (
    <div className="h-screen overflow-y-scroll flex flex-col items-center">
      <div className="space-y-2 lg:w-[230px]">
        <SidebarLogo />
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            alert={item.alert}
            auth={item.auth}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
        {'currentUser' && <SidebarItem onClick={() => { }} icon={BiLogOut} label="Logout" />}
        <SidebarTweetButton />
      </div>
    </div>);
}

export default Sidebar