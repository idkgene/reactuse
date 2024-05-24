import { Search } from 'lucide-react'
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
import searchData, { SearchItem } from './searchData'
import { ClearIcon } from '../../Icons/Clear/icon'
import { SearchIcon } from '../../Icons/Search/icon'
import { EnterKey } from '../../Icons/EnterKey'
import { ArrowDown } from '../../Icons/ArrowDown'
import { ArrowUp } from '../../Icons/ArrowUp'
import { EscapeKey } from '../../Icons/EscapeKey'

export function Searchbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
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
    } else {
      setSearchResults([])
    }
    setSelectedIndex(-1)
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
      <div id="search" className="flex items-center md:grow md:pl-6 lg:pl-8">
        <div>
          <button
            type="button"
            className="flex justify-center items-center m-0 p-0 h-12 w-[55px] bg-transparent transition-colors md:justify-start md:border md:border-solid md:border-transparent md:rounded-lg md:pt-0 md:pb-0 md:pl-2.5 md:pr-3 md:w-full md:h-10 md:dark:bg-[hsl(240,4%,9%)] md:bg-[hsl(240,6%,97%)]"
            onClick={handleSearchClick}
          >
            <span className="flex items-center">
              <span className="relative w-4 h-4 fill-current transition-colors text-[hsl(240,6%,25%)] dark:text-[hsla(60,100%,98%,1)] md:top-px md:mr-2 md:size-[14px] md:text-[hsla(240,6%,25%,1)] md:dark:text-[hsla(240,33%,94%,1)]">
                <Search size={14} />
              </span>
              <span className="hidden mt-0.5 pr-4 text-[13px] font-medium text-[hsla(240,6%,25%,1)] dark:text-[hsla(240,33%,94%,1)] transition-colors md:inline-block">
                Search
              </span>
            </span>
            <span className="min-w-[auto] hidden md:flex md:items-center">
              <kbd className="!text-[0px] block mt-0.5 border-y border-l border-solid border-[hsl(240,2%,89%)] dark:border-[hsl(240,4%,19%)] rounded-l pl-1.5 pr-1 min-w-0 w-auto h-[22px] leading-[22px] font-medium transition-colors after:content-['⌘'] after:text-xs after:tracking-normal after:text-[rgba(60,60,67,0.78)] after:dark:text-[hsla(240,33%,94%,1)]"></kbd>
              <kbd className="!text-[0px] block mt-0.5 border-y border-r border-solid border-[hsl(240,2%,89%)] dark:border-[hsl(240,4%,19%)] rounded-r pr-1.5 min-w-0 w-auto h-[22px] leading-[22px] font-medium transition-colors after:content-['K'] after:text-xs after:tracking-normal after:text-[rgba(60,60,67,0.78)] after:dark:text-[hsla(240,33%,94%,1)]"></kbd>
            </span>
          </button>
        </div>
      </div>

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
            className="bg-[#202127] rounded-[6px] mt-[60px] mx-auto mb-auto relative shadow-none max-w-[560px]"
          >
            <header className="flex p-3 pb-0">
              <form
                action="#"
                className="items-center rounded-[4px] flex shadow-none m-0 py-0 px-3 relative w-full border border-solid border-[#44bd87] bg-[rgba(101,117,133,.16)]"
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
                  className="appearence-none bg-transparent border-none text-[rgba(255,255,245,.86)] flex-[1] text-[1.2em] h-full outline-none p-3 w-[80%]"
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
              className="text-[rgba(235,235,245,.6)] max-h-[calc(600px-56px-12px-44px)] min-h-[12px] overflow-y-[overlay] py-0 px-3"
              style={{
                scrollbarColor: 'rgba(235, 235, 245, .6)',
                scrollbarWidth: 'thin',
              }}
            >
              {searchResults.length > 0 ? (
                <ul role="listbox" className="list-none p-0 m-0">
                  {searchResults.map((result, index) => (
                    <li
                      key={result.id}
                      role="option"
                      aria-selected={selectedIndex === index}
                      onMouseDown={() => (window.location.href = result.path)}
                      className={`rounded-[4px] flex pb-1 relative ${
                        selectedIndex === index ? 'bg-[#2e2e32]' : ''
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <h3 className="font-bold text-[rgba(255,255,245,.9)]">
                        {result.title}
                      </h3>
                      {result.headings.length > 0 && (
                        <ul className="list-none p-0 m-0 text-[rgba(235,235,245,.7)]">
                          {result.headings.map((heading, headingIndex) => (
                            <li key={headingIndex} className="text-sm mt-1">
                              {heading}
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
            <footer className="items-center bg-[#1b1b1f] rounded-b-[8px] shadow-none flex flex-row-reverse h-[44px] justify-between p-3 relative select-none w-[100%] z-[300] border-t border-t-[#2e2e32]">
              <ul
                id="commands"
                className="flex list-style-none m-0 p-0 text-[rgba(235,235,245,.6)]"
              >
                <li className="break-words mr-[.8em] flex items-center">
                  <kbd className="items-center bg-transparent rounded-[2px] flex h-[18px] justify-center mr-[.4em] pb-px shadow-none border-none w-5 text-[rgba(235,235,245,.6)]">
                    <EnterKey />
                  </kbd>
                  <span className="text-[.75em] leading-[1.6em] text-[rgba(235,235,245,.6)]">
                    to select
                  </span>
                </li>
                <li className="break-words mr-[.8em] flex items-center">
                  <kbd className="items-center bg-transparent rounded-[2px] flex h-[18px] justify-center mr-[.4em] pb-px shadow-none border-none w-5 text-[rgba(235,235,245,.6)]">
                    <ArrowDown />
                  </kbd>
                  <kbd className="items-center bg-transparent rounded-[2px] flex h-[18px] justify-center mr-[.4em] pb-px shadow-none border-none w-5 text-[rgba(235,235,245,.6)]">
                    <ArrowUp />
                  </kbd>
                  <span className="text-[.75em] leading-[1.6em] text-[rgba(235,235,245,.6)]">
                    to navigate
                  </span>
                </li>
                <li className="break-words flex items-center">
                  <kbd className="items-center bg-transparent rounded-[2px] flex h-[18px] justify-center mr-[.4em] pb-px shadow-none border-none w-5 text-[rgba(235,235,245,.6)]">
                    <EscapeKey />
                  </kbd>
                  <span className="text-[.75em] leading-[1.6em] text-[rgba(235,235,245,.6)]">
                    to close
                  </span>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
