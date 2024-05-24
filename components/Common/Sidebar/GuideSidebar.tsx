import { Sidebar } from '.'

export const GuideSidebar = () => {
  const DocsSidebarGroup = [
    {
      title: 'Guide',
      items: [
        { text: 'Get Started', href: '/docs/guide' },
        { text: 'Best Practice', href: '/docs/guide/best-practice' },
        { text: 'Configuration', href: '/docs/guide/config' },
        { text: 'Contributing', href: '/docs/guide/contributing' },
        { text: 'Guidelines', href: '/docs/guide/guidelines' },
      ],
    },
    {
      title: 'Core Hooks',
      items: [
        { text: 'State', href: '/hooks/state' },
        { text: 'Elements', href: '/hooks/elements' },
        { text: 'Browser', href: '/hooks/browser' },
        { text: 'Sensors', href: '/hooks/sensors' },
        { text: 'Network', href: '/hooks/network' },
        { text: 'Animation', href: '/hooks/animation' },
        { text: 'Component', href: '/hooks/component' },
        { text: 'Watch', href: '/hooks/watch' },
        { text: 'Array', href: '/hooks/array' },
        { text: 'Time', href: '/hooks/time' },
        { text: 'Utilities', href: '/hooks/utilities' },
      ],
    },
    {
      title: 'Links',
      items: [
        { text: 'Addons', href: '/add-ons' },
        { text: 'Ecosystem', href: '/ecosystem' },
        { text: 'Export Size', href: '/export-size' },
        { text: 'Recent Updated', href: '/recent' },
      ],
    },
  ]
  return (
    <>
      <Sidebar groups={DocsSidebarGroup} />
    </>
  )
}
