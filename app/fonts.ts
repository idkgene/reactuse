import localFont from 'next/font/local'

const WixMadeforDisplayExtraBold = localFont({
    src: '../public/fonts/WixMadeforDisplay-ExtraBold.ttf',
    fallback: ['system-ui', 'Roboto'],
})

const WixMadeforDisplayBold = localFont({
    src: '../public/fonts/WixMadeforDisplay-Bold.ttf',
    fallback: ['system-ui', 'Roboto'],
})

const WixMadeforDisplaySemiBold = localFont({
    src: '../public/fonts/WixMadeforDisplay-SemiBold.ttf',
    fallback: ['system-ui', 'Roboto'],
})

const WixMadeforDisplayMedium = localFont({
    src: '../public/fonts/WixMadeforDisplay-Medium.ttf',
    fallback: ['system-ui', 'Roboto'],
})

const WixMadeforDisplayRegular = localFont({
    src: '../public/fonts/WixMadeforDisplay-Regular.ttf',
    fallback: ['system-ui', 'Roboto'],
})

const WixMadeForDisplayVariable = localFont({
    src: '../public/fonts/WixMadeforDisplay-VariableFont_wght.ttf',
    fallback: ['system-ui', 'Roboto'],
})

export {
    WixMadeforDisplayExtraBold,
    WixMadeforDisplayBold,
    WixMadeforDisplaySemiBold,
    WixMadeforDisplayMedium,
    WixMadeforDisplayRegular,
    WixMadeForDisplayVariable,
}
