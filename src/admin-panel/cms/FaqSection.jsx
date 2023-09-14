import React from 'react'
import { User } from '../user/User'
import { useState } from 'react'
import EditModal from './EditModal'
import EditButton from './EditButton'
import Accordian from './Accordian'
const FaqSection = () => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <main>
            <div className='p-5'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <p className='text-2xl text-gray-900 font-semibold'>Frequently Asked Questions</p>
                        <div className='flex gap-x-10'>
                            <form className="flex items-center">
                                <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                                    <div className=' bg-white rounded-full p-1'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-52 py-1 px-1 bg-gray-100 outline-0"
                                        //   value={searchTerm}
                                        //   onChange={handleSearch}
                                        type="text"
                                    />

                                </div>
                            </form>
                            <User />
                        </div>
                    </div>
                </section>
                {/* General Questions */}
                <section className='p-5 flex flex-row gap-x-1 border border-[#E8E8E8] rounded mt-2'>
                    <div className='p-1 shrink-0 w-[24rem] flex flex-col space-y-4 '>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base text-gray-900 font-semibold'>General Questions</p>
                            <EditButton
                                onClick={setIsClicked}
                            />
                        </div>
                        <div>
                            <p className='text-sm text-[#878A99] font-normal text-left'>General knowledge is information that has been accumulated over time through various mediums and sources. It excludes specialized learning that can only be obtained with extensive training and information confined to a single medium.</p>
                        </div>
                    </div>
                    <div className='p-1 flex-1 flex flex-col gap-2'>
                        <Accordian
                            heading={`What are FAQ questions?`}
                            title={`An FAQ page (short for Frequently Asked Question page) is a part of your website that provides answers to common questions, assuages concerns, and overcomes objections. It's a space where customers away from your sales-focused landing pages and homepage.`}
                        />
                        <Accordian
                            heading={`What are FAQ questions?`}
                            title={`An FAQ page (short for Frequently Asked Question page) is a part of your website that provides answers to common questions, assuages concerns, and overcomes objections. It's a space where customers away from your sales-focused landing pages and homepage.`}
                        />
                        <Accordian
                            heading={`What are FAQ questions?`}
                            title={`An FAQ page (short for Frequently Asked Question page) is a part of your website that provides answers to common questions, assuages concerns, and overcomes objections. It's a space where customers away from your sales-focused landing pages and homepage.`}
                        />
                        <Accordian
                            heading={`What are FAQ questions?`}
                            title={`An FAQ page (short for Frequently Asked Question page) is a part of your website that provides answers to common questions, assuages concerns, and overcomes objections. It's a space where customers away from your sales-focused landing pages and homepage.`}
                        />
                    </div>
                </section>

                {/* Manage Account */}

                <section className='p-5 flex flex-row gap-x-1 border border-[#E8E8E8] rounded mt-2'>
                    <div className='p-1 shrink-0 w-[24rem] flex flex-col space-y-4 '>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base text-gray-900 font-semibold'>Manage Account</p>
                            <EditButton
                                onClick={setIsClicked}
                            />
                        </div>
                        <div>
                            <p className='text-sm text-[#878A99] font-normal text-left'>Cybersecurity experts recommend changing your
                                password every three months. There may even be
                                situations where you should change your password
                                immediately, especially if a cybercriminal has access to
                                your account.</p>
                        </div>
                    </div>
                    <div className='p-1 flex-1 flex flex-col gap-2'>
                        <Accordian
                            heading={`What is account management process?`}
                            title={`The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.`}
                        />
                        <Accordian
                            heading={`What is account management process?`}
                            title={`The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.`}
                        />
                        <Accordian
                            heading={`What is account management process?`}
                            title={`The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.`}
                        />
                        <Accordian
                            heading={`What is account management process?`}
                            title={`The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.`}
                        />
                    </div>
                </section>

                {/* Privacy & Security */}
                <section className='p-5 flex flex-row gap-x-1 border border-[#E8E8E8] rounded mt-2'>
                    <div className='p-1 shrink-0 w-[24rem] flex flex-col space-y-4 '>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base text-gray-900 font-semibold'>Privacy & Security</p>
                            <EditButton
                                onClick={setIsClicked}
                            />
                        </div>
                        <div>
                            <p className='text-sm text-[#878A99] font-normal text-left'>Privacy is the right to control how your information is
                                viewed and used, while security is protection against
                                threats or danger. In the digital world, security generally
                                refers to the unauthorized access of data, often involving
                                protection against hackers or cyber criminals.</p>
                        </div>
                    </div>
                    <div className='p-1 flex-1 flex flex-col gap-2'>
                        <Accordian
                            heading={`Which is important privacy or security?`}
                            title={`If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.`}
                        />
                        <Accordian
                            heading={`Which is important privacy or security?`}
                            title={`If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.`}
                        />
                        <Accordian
                            heading={`Which is important privacy or security?`}
                            title={`If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.`}
                        />
                        <Accordian
                            heading={`Which is important privacy or security?`}
                            title={`If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.`}
                        />
                    </div>
                </section>
                {
                    isClicked ?
                        <EditModal
                            modalName={`Edit Faq Title & Body`}
                            onClose={setIsClicked}
                        />
                        : null
                }
            </div>
        </main>

    )
}

export default FaqSection