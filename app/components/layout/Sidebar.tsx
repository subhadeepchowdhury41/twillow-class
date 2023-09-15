import { BsBellFill, BsEnvelopeFill, BsHouseFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import SidebarProfile from './SidebarProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/home',
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
      href: `/users/${session?.user.id}`,
      auth: true,
    },
  ]
  return (
    <div className="h-screen overflow-y-scroll flex flex-col items-center ">
      <div className="space-y-2 lg:w-[230px] flex flex-col justify-between h-screen m-4">
        <div>
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
          {session?.user && <SidebarItem icon={BiLogOut} label="Logout" href='/' />}
          <SidebarTweetButton />
        </div>
        <SidebarProfile />
      </div>
    </div>);
}

export default Sidebar