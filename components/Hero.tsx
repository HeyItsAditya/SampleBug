import MarqueeAnouncement from "./Announcement";


export default function Hero() {
    return (
        <div className="px-4 sm:px-10 max-lg:py-8">
            <div className="flex flex-row justify-center items-center mt-10">
  <MarqueeAnouncement />
</div>
      <div className="max-w-screen-xl max-lg:max-w-screen-md mx-auto ">
        
        <div className="grid lg:grid-cols-2 items-center gap-x-8 gap-y-12">
          <div className="max-lg:order-1 max-lg:text-center">
            
            
            <h2 className=" lg:text-6xl text-4xl font-extrabold mb-4 !leading-tight">Protecting Your Mobile App,
<span className="text-blue-400">From Start to Finish</span></h2>
            <p className="mt-6 text-2xl  leading-relaxed">Reflecting Vulnerability, Perfecting Security</p>
            <div className="mt-8 flex flex-wrap max-lg:justify-center gap-4">
              <button type='button'
                className="bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 transition-all cursor-pointer font-medium tracking-wide text-base rounded-full px-6 py-3">Start 14 Day Free Trial</button>
              <button type='button'
                className="bg-transparent  border border-gray-300 transition-all cursor-pointer  font-medium tracking-wide text-base rounded-full px-6 py-3">Free App Secirity Test</button>
            </div>

            
          </div>
          <div className="lg:h-[650px] flex items-center relative max-lg:before:hidden before:absolute before:bg-indigo-50 before:h-full before:w-3/4 before:right-0 before:z-0">
            
          </div>
        </div>
      </div>
    </div>
    )
}