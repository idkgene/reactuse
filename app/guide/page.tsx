'use client'

import * as React from 'react'
import {
    MarkdownHeading1,
    MarkdownHeading2,
} from '@/components/Common/Markdown/Headings'
import { MarkdownParagraph } from '@/components/Common/Markdown/Paragraph'
import { MarkdownCode } from '@/components/Common/Markdown/Code'
import styles from './Layout.module.css'
import { Sidebar } from '@/components/Common/Aside'
import { TableOfContents } from '@/components/Common/TOC'

export default function GuidePage() {
    return (
        <>
            <Sidebar />
            <div id="content has-sidebar" className={styles.content}>
                <div id="has-sidebar has-aside" className={styles.doc}>
                    <div
                        id="container"
                        className={`container ${styles.docContainer}`}
                    >
                        <div id="aside" className={styles.asideContent}>
                            <TableOfContents contentId="main" />
                        </div>
                        <div id="content" className={styles.docContent}>
                            <div id="content-container">
                                <main id="main" className="block">
                                    <div style={{ position: 'relative' }}>
                                        <div>
                                            <MarkdownHeading1>
                                                Get Started
                                            </MarkdownHeading1>
                                            <MarkdownParagraph>
                                                ReactUse is a collection of
                                                utility functions based on React
                                                Hooks API. We assume that you
                                                are already familiar with the
                                                basic ideas of React Custom
                                                Hooks API before you continue.{' '}
                                            </MarkdownParagraph>
                                            <MarkdownHeading2>
                                                Installation
                                            </MarkdownHeading2>
                                            <blockquote className="prose">
                                                We support React version 18 for
                                                now and are waiting for version
                                                19 to be released
                                            </blockquote>
                                            <pre>
                                                <code>
                                                    npm i @reactuse/core
                                                </code>
                                            </pre>
                                            <span>Addons</span> <span>|</span>{' '}
                                            <span>Next JS Module</span>
                                            <MarkdownHeading2>
                                                CDN
                                            </MarkdownHeading2>
                                            <MarkdownCode>
                                                &lt;script
                                                src=&ldquo;https://unpkg.com/@reactuse/shared&rdquo;&gt;&lt;/script&gt
                                                &lt;script
                                                src=&ldquo;https://unpkg.com/@reactuse/core&rdquo;&gt;&lt;/script&gt;
                                            </MarkdownCode>
                                            <MarkdownParagraph>
                                                It will be exposed to global as
                                                <MarkdownCode>
                                                    window.ReactUse
                                                </MarkdownCode>
                                            </MarkdownParagraph>
                                            <MarkdownHeading2>
                                                Next
                                            </MarkdownHeading2>
                                            <p>We support Next version 14</p>
                                            <pre>
                                                <MarkdownCode>
                                                    npm i -D @reactuse/next
                                                    @reactuse/core
                                                </MarkdownCode>
                                            </pre>
                                            <MarkdownHeading2>
                                                Usage Example
                                            </MarkdownHeading2>
                                            <MarkdownParagraph>
                                                Simply importing the functions
                                                you need from @vueuse/core
                                            </MarkdownParagraph>
                                            Refer to functions list for more
                                            details
                                        </div>
                                    </div>
                                </main>
                                <footer className="mt-16" id="footer"></footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
