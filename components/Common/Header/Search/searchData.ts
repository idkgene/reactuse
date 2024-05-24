export interface SearchItem {
  id: string
  path: string
  title: string
  headings: string[]
}

const searchData: SearchItem[] = [
  {
    id: 'best-practice',
    path: '/docs/guide/best-practice',
    title: 'Best Practice',
    headings: [
      'Side-effect Clean Up',
      'Reactive Arguments',
      'Non-reactive Argument',
      'Ref Argument',
      'Reactive Getter Argument',
    ],
  },
  // Add more items here as needed
]

export default searchData