export const Window = ({ title }: { title: string }) => {
  return (
    <>
      <div className="max-w-full text-white relative rounded-[5px] bg-black overflow-hidden flex flex-col shadow-[0px_0px_0px_1px_hsla(0,0%,100%,.145),0px_2px_2px_rgba(0,0,0,.32),0px_8px_8px_-8px_rgba(0,0,0,.16)]">
        <div className="w-full basis-9 flex items-center border-b border-b-solid border-b-[#333]">
          <div className="ml-3">
            <span className="size-3 inline-block rounded-[50%] bg-[#ff5f56]"></span>
            <span className="size-3 inline-block rounded-[50%] bg-[#ffbd2e] ml-2"></span>
            <span className="size-3 inline-block rounded-[50%] bg-[#27c93f] ml-2"></span>
          </div>
          <div className="absolute w-full h-9 left-0 text-[12px] flex items-center text-[#888] justify-center">
            {title}
          </div>
          <div className="flex-[1_1] w-full overflow-auto pt-3">
            <div className="flex flex-col items-stretch justify-start flex-initial gap-0 h-full pb-3"></div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
