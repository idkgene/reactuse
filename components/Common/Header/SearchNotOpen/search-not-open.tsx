import { Search } from 'lucide-react'

export default function SearchNotOpen({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div id="search" className="flex items-center md:grow md:pl-6 lg:pl-8">
        <div>
          <button
            type="button"
            className="flex justify-center items-center m-0 p-0 h-12 w-[55px] bg-transparent transition-colors md:justify-start md:border md:border-solid md:border-transparent md:rounded-lg md:pt-0 md:pb-0 md:pl-2.5 md:pr-3 md:w-full md:h-10 md:dark:bg-[hsl(240,4%,9%)] md:bg-[hsl(240,6%,97%)]"
            onClick={onClick}
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
    </>
  )
}
