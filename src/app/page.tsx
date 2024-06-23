import {SunIcon, BoltIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <div className='flex flex-col items-center justify-center h-screen px-2 text-white'>
            <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
            <div className="flex space-x-2 text-center">
                <div className="">
                    <div className="flex flex-col items-center justify-center mb-5">
                        {/*    Sun Icon */}
                        <SunIcon className="h-8 w-8"/>
                        <h2>Examples</h2>
                    </div>
                    <div className="space-y-2">
                        <p className='infoText'>&quot;Explain Something to me&quot;</p>
                        <p className='infoText'>&quot;What is the difference between a dog and a cat&quot;</p>
                        <p className='infoText'>&quot;What is the color of the sun&quot;</p>
                    </div>

                </div>
                <div className="">
                    <div className="flex flex-col items-center justify-center mb-5">
                        {/*    Sun Icon */}
                        <BoltIcon className="h-8 w-8"/>
                        <h2>Capabilities</h2>
                    </div>
                    <div className="space-y-2">
                        <p className='infoText'>Change the ChatGPT Model the use</p>
                        <p className='infoText'>Messages are stored in Firebase&apos;s Firestore</p>
                        <p className='infoText'>Hot Toast Notification when CharGPT is thinking!</p>
                    </div>

                </div>
                <div className="">
                    <div className="flex flex-col items-center justify-center mb-5">
                        {/*    Sun Icon */}
                        <ExclamationTriangleIcon className="h-8 w-8"/>
                        <h2>Limitations</h2>
                    </div>
                    <div className="space-y-2">
                        <p className='infoText'>&quot;Explain Something to me&quot;</p>
                        <p className='infoText'>&quot;What is the difference between a dog and a cat&quot;</p>
                        <p className='infoText'>&quot;What is the color of the sun&quot;</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
