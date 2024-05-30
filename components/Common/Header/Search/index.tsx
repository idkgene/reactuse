import { Search } from 'lucide-react'
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
import searchData, { SearchItem } from './searchData'
import { ClearIcon } from '../../Icons/Clear/icon'
import { SearchIcon } from '../../Icons/Search/icon'
import SearchFooter from '../SearchFooter/search-footer'
import SearchNotOpen from '../SearchNotOpen/search-not-open'

export function Searchbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    setIsModalOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSearchQuery('')
    setSearchResults([])
    setSelectedIndex(-1)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)

    if (query.trim() !== '') {
      const results = searchData.filter((page) => {
        const titleMatch = page.title
          .toLowerCase()
          .includes(query.toLowerCase())
        const headingMatch = page.headings.some((heading) =>
          heading.toLowerCase().includes(query.toLowerCase())
        )
        return titleMatch || headingMatch
      })
      setSearchResults(results)

      setRecentSearches((prevSearches) => {
        const updatedSearches = [
          query,
          ...prevSearches.filter((search) => search !== query),
        ]
        return updatedSearches.slice(0, 7)
      })
    } else {
      setSearchResults([])
    }
    setSelectedIndex(-1)
  }

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      window.location.href = searchResults[selectedIndex].path
    } else if (event.key === 'Escape') {
      handleModalClose()
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleModalClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <SearchNotOpen onClick={handleSearchClick} />

      {isModalOpen && (
        <div
          role="button"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-labelledby="docsearch-label"
          tabIndex={0}
          className="bg-[rgba(101,108,133,.8)] h-screen left-0 fixed top-0 w-screen z-[200]"
        >
          <div
            id="modal"
            ref={modalRef}
            className="bg-[#f6f6f7] dark:bg-[#202127] rounded-[6px] mt-[60px] mx-auto mb-auto relative shadow-none max-w-[560px]"
          >
            <header className="flex p-3 pb-0">
              <form
                action="#"
                className="items-center rounded-[4px] flex shadow-none m-0 py-0 px-3 relative w-full border border-solid border-[#44bd87] bg-[#ffffff] dark:bg-[rgba(101,117,133,.16)]"
              >
                <label
                  htmlFor="docsearch-input"
                  className="m-0 p-0 items-center flex justify-center text-[#44bd87]"
                >
                  <SearchIcon />
                </label>
                <input
                  aria-autocomplete="both"
                  aria-labelledby="docsearch-label"
                  id="docsearch-input"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  enterKeyHint="search"
                  spellCheck="false"
                  autoFocus={true}
                  placeholder="Search docs"
                  maxLength={64}
                  typeof="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  className="appearence-none bg-transparent border-none text-[rgba(60,60,67)] dark:text-[rgba(255,255,245,.86)] flex-[1] text-[1.2em] h-full outline-none p-3 w-[80%]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    title="Clear the query"
                    aria-label="Clear the query"
                    onClick={() => {
                      setSearchQuery('')
                      setSearchResults([])
                      setSelectedIndex(-1)
                      inputRef.current?.focus()
                    }}
                    className="ease-in appearence-none bg-none rounded-[1/2] border-none cursor-pointer p-0.5 stroke-[1.4]"
                  >
                    <ClearIcon />
                  </button>
                )}
              </form>
              <button
                type="button"
                aria-label="Cancel"
                onClick={handleModalClose}
                className="p-0 bg-transparent bg-none cursor-pointer hidden"
              >
                Cancel
              </button>
            </header>
            <div
              className="text-[rgba(60,60,67)] dark:text-[rgba(235,235,245,.6)] max-h-[calc(600px-56px-12px-44px)] min-h-[12px] overflow-y-[overlay] py-0 px-3"
              style={{
                scrollbarColor: 'rgba(235, 235, 245, .6)',
                scrollbarWidth: 'thin',
              }}
            >
              {searchResults.length > 0 ? (
                <ul role="listbox" className="list-none p-0 m-0">
                  {searchResults.map((result) => (
                    <li key={result.id} className="mb-4">
                      <h3
                        role="option"
                        aria-selected={selectedIndex === 0}
                        onMouseDown={() => (window.location.href = result.path)}
                        className={`rounded-[4px] font-bold text-[rgba(255,255,245,.9)] cursor-pointer ${
                          selectedIndex === 0 ? 'bg-[#2e2e32]' : ''
                        }`}
                        onMouseEnter={() => setSelectedIndex(0)}
                      >
                        {highlightMatch(result.title, searchQuery)}
                      </h3>
                      {result.headings.length > 0 && (
                        <ul className="list-none p-0 m-0 text-[rgba(235,235,245,.7)] ml-4">
                          {result.headings.map((heading, index) => (
                            <li
                              key={index}
                              role="option"
                              aria-selected={selectedIndex === index + 1}
                              onMouseDown={() =>
                                (window.location.href = result.path)
                              }
                              className={`text-sm mt-1 rounded-[4px] cursor-pointer ${
                                selectedIndex === index + 1
                                  ? 'bg-[#2e2e32]'
                                  : ''
                              }`}
                              onMouseEnter={() => setSelectedIndex(index + 1)}
                            >
                              {highlightMatch(heading, searchQuery)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-[.9em] my-0 mx-auto py-9 px-0 text-center w-[80%]">
                  <p className="text-[.9em] m-0 select-none">
                    {`No results for "${searchQuery}"`}
                  </p>
                  <p className="text-[.9em] m-0 select-none">
                    Try searching for
                  </p>
                  <ul className="list-none p-0 m-0">
                    <li className="mt-2">
                      <span className="font-bold text-[rgba(255,255,245,.9)]">
                        Documentation
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <SearchFooter />
          </div>
        </div>
      )}
    </>
  )
}
