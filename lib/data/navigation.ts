export type NavDropdownItem = {
  label: string
  iconName?: string
  hasArrow?: boolean
}

export type NavItem = {
  label: string
  href?: string
  hasDropdown?: boolean
  dropdownItems?: NavDropdownItem[]
}

export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Project', href: '/projects' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]
