import React from 'react'
import RootLayout from '../../layout'
import styles from '../../Layout.module.css'
import '../../globals.css'
import { TableOfContents } from '@/components/Common/TOC'
import { Navigation } from '@/components/Common/Header'
import { GuideSidebar } from '@/components/Common/Sidebar/GuideSidebar'
import { DocsNavigation } from '@/components/Common/DocsHeader'

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <RootLayout>
        <DocsNavigation />
        <GuideSidebar />
        <div id="content has-sidebar" className={styles.content}>
          <div id="has-sidebar has-aside" className={styles.doc}>
            <div id="container" className={`container ${styles.docContainer}`}>
              <div id="aside" className={styles.asideContent}>
                <TableOfContents contentId="main" />
              </div>
              <div id="content" className={styles.docContent}>
                <div id="content-container">
                  <main id="main" className="block">
                    <div style={{ position: 'relative' }}>{children}</div>
                  </main>
                  <footer className="mt-16" id="footer"></footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  )
}
