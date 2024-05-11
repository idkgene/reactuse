// Sidebar.tsx
import styles from '../../../app/guide/Layout.module.css'

export const Sidebar = () => {
  const guideItems = [
    { text: 'Get Started', href: '/guide' },
    { text: 'Best Practices', href: '/guide/best-practice' },
    { text: 'Configurations', href: '/guide/config' },
    { text: 'Contributing', href: '/guide/contributing' },
  ]

  const coreFunctionsItems = [
    { text: 'State', href: 'state' },
    { text: 'Elements', href: 'elements' },
    { text: 'Browser', href: 'browser' },
    { text: 'Sensors', href: 'sensors' },
    { text: 'Network', href: 'network' },
    { text: 'Animation', href: 'animation' },
    { text: 'Component', href: 'component' },
    { text: 'Watch', href: 'watch' },
    { text: 'Array', href: 'array' },
    { text: 'Time', href: 'time' },
    { text: 'Utilities', href: 'utilities' },
  ]
  return (
    <aside className={styles.sidebar}>
      <div id="curtain" className={styles.curtain}></div>
      <nav
        id="vpsiderbanav"
        aria-labelledby="sidebar-aria-label"
        className="outline-none"
        tabIndex={-1}
      >
        <span className="sr-only" id="sidebar-aria-label">
          Sidebar Navigation
        </span>

        <div
          id="group"
          className="border-t border-solid border-[#2e2e32] pt-[10px] lg:pt-[10px] lg:w-[calc(272px-64px)]"
        >
          <section id="sidebaritem level active?" className="pb-6">
            <div
              id="item"
              role="button"
              tabIndex={0}
              className="touch-manipulation relative flex w-full"
            >
              <div
                id="indicator"
                className="absolute top-1.5 bottom-1.5 -left-[17px] w-0.5 rounded-[2px] transition-colors"
              ></div>
              <h2
                id="text"
                className="grow py-1 leading-[24px] text-[14px] transition-colors font-bold text-rgba(255,255,245,.86)]"
              >
                Guide
              </h2>
            </div>
            <div id="items">
              <div id="sidebaritem is-link is-active has-active">
                {guideItems.map((item) => (
                  <div
                    key={item.href}
                    id="sidebaritem is-link is-active has-active"
                  >
                    <div id="item" className="relative flex w-full">
                      <div
                        id="indicator"
                        className="absolute top-1.5 bottom-1.5 -left-[17px] w-0.5 rounded-[2px] transition-colors"
                      ></div>
                      <a
                        href={item.href}
                        id="link"
                        className="flex items-center grow py-1 px-0 leading-[24p] text-[14px] transition-colors font-medium text-[rgba(235,235,245,.6)] hover:text-[#fff] hover:underline"
                      >
                        {item.text}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section id="sidebaritem level active?" className="pb-6">
            <div
              id="item"
              role="button"
              tabIndex={0}
              className="touch-manipulation relative flex w-full"
            >
              <div
                id="indicator"
                className="absolute top-1.5 bottom-1.5 -left-[17px] w-0.5 rounded-[2px] transition-colors"
              ></div>
              <h2
                id="text"
                className="grow py-1 leading-[24px] text-[14px] transition-colors font-bold text-rgba(255,255,245,.86)]"
              >
                Core Functions
              </h2>
            </div>
            <div id="items">
              <div id="sidebaritem is-link is-active has-active">
                {coreFunctionsItems.map((item) => (
                  <div
                    key={item.href}
                    id="sidebaritem is-link is-active has-active"
                  >
                    <div id="item" className="relative flex w-full">
                      <div
                        id="indicator"
                        className="absolute top-1.5 bottom-1.5 -left-[17px] w-0.5 rounded-[2px] transition-colors"
                      ></div>
                      <a
                        href={item.href}
                        id="link"
                        className="flex items-center grow py-1 px-0 leading-[24p] text-[14px] transition-colors font-medium text-[rgba(235,235,245,.6)] hover:text-[#fff] hover:underline"
                      >
                        {item.text}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </nav>
    </aside>
  )
}
