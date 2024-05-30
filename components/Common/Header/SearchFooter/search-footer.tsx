import { EnterKey } from '../../Icons/EnterKey'
import { ArrowDown } from '../../Icons/ArrowDown'
import { ArrowUp } from '../../Icons/ArrowUp'
import { EscapeKey } from '../../Icons/EscapeKey'
import KeyboardKey from '../KeyboardKey/keyboard-key'

export default function SearchFooter() {
  return (
    <>
      <footer className="items-center bg-[#ffffff] dark:bg-[#1b1b1f] shadow-[0px_-1px_0px_0px_#e0e3e8,0px_-3px_6px_0px_rgba(69,98,155,.12)] rounded-b-[8px] dark:shadow-none flex flex-row-reverse h-[44px] justify-between p-3 relative select-none w-[100%] z-[300] dark:border-t dark:border-t-[#2e2e32]">
        <ul
          id="commands"
          className="flex list-style-none m-0 p-0 text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)]"
        >
          <li className="break-words mr-[.8em] flex items-center">
            <kbd className="items-center bg-transparent rounded-[2px] flex h-[18px] justify-center mr-[.4em] pb-px shadow-none border-none w-5 text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)]">
              <EnterKey />
            </kbd>
            <span className="text-[.75em] leading-[1.6em] text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)]">
              to select
            </span>
          </li>
          <li className="break-words mr-[.8em] flex items-center">
            <KeyboardKey>
              <ArrowDown />
            </KeyboardKey>
            <KeyboardKey>
              <ArrowUp />
            </KeyboardKey>
            <span className="text-[.75em] leading-[1.6em] text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)]">
              to navigate
            </span>
          </li>
          <li className="break-words flex items-center">
            <KeyboardKey>
              <EscapeKey />
            </KeyboardKey>
            <span className="text-[.75em] leading-[1.6em] text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)]">
              to close
            </span>
          </li>
        </ul>
      </footer>
    </>
  )
}
