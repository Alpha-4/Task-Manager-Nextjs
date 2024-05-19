'use client';

import Link from "next/link";
import {Settings, User, Grid, Calendar, Icon} from "react-feather";
import {usePathname} from "next/navigation";
import clsx from "clsx";

export const icons = {
    Settings, User, Grid, Calendar
}

const SidebarLink = ({link}: {link: {label: string, icon: string, link: string}}) => {
    const pathname = usePathname()
    let isActive = false

    if (pathname === link.link) {
        isActive = true
    }

    const Icon: Icon = Object.keys(icons).includes(link.icon) ? icons[link.icon as keyof typeof icons] : icons["Calendar"]
    return (
        <Link href={link.link}>
            <Icon size={40} className={clsx("stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out", isActive && 'stroke-violet-600')} />
        </Link>
    )
}

export default SidebarLink