import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../utils'
import avatar from '/avatar.png'

const navMotion = {
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.15,
        },
    },
    hidden: {
        opacity: 0,
    },
}
const itemMotion = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
}

export default function Nav() {
    const [toggled, setToggled] = useState(false)
    const matches = useMediaQuery('(min-width: 1280px)')

    return (
        <nav className='relative mx-8 mb-24 flex justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32'>
            <svg
                className='absolute bottom-0 left-1/2 -translate-x-1/2'
                height={4}
                width="250"
                fill='none'
                viewBox='0 0 250 4'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path d='M2 2L428 2' stroke='#282828' strokeLinecap='round' strokeWidth={2} />
            </svg>
            <div>
                <img src={avatar} alt="Profile picture of Hua" />
            </div>

            {/* Title */}
            <h1 className='text-lg font-bold'>
                <a href="/">Hua.</a>
            </h1>

            {/* Check if we are on mobile or not */}
            {matches && (
                <div className='flex gap-12'>
                    <a href="/">Home</a>
                    <a href="/services">Services</a>
                    <a href="https://chidera.dev">Contact</a>
                </div>
            )}

            {!matches && (
                <div
                    onClick={() => setToggled((prevToggle) => !prevToggle)}
                    className='space-y-1.5 cursor-pointer z-50'
                >
                    <motion.span
                        className='block h-0.5 w-8 bg-black'
                        animate={{
                            rotateZ: toggled ? 45 : 0,
                            y: toggled ? 8 : 0,
                        }}
                    />
                    <motion.span
                        className='block h-0.5 w-6 bg-black'
                        animate={{ width: toggled ? 0 : 24 }}
                    />
                    <motion.span
                        className='block h-0.5 w-4 bg-black'
                        animate={{
                            rotateZ: toggled ? -45 : 0,
                            y: toggled ? -8 : 0,
                            width: toggled ? 32 : 16,
                        }}
                    />
                </div>
            )}

            {toggled && !matches && (
                <div className='fixed bg-white bottom-0 left-0 w-full h-screen flex items-center justify-center z-40'>
                    <motion.div
                        variants={navMotion}
                        animate="visible"
                        initial="hidden"
                        className='flex flex-col gap-24 text-lg'
                    >
                        <motion.a href="/" variants={itemMotion}>Home</motion.a>
                        <motion.a href="/services" variants={itemMotion}>Services</motion.a>
                        <motion.a href="https://chidera.dev" variants={itemMotion}>Contact</motion.a>
                    </motion.div>
                </div>
            )}
        </nav>
    )
}