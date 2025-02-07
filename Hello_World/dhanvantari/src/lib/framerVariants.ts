export const getSlideLeftVariants = (delay: number) => ({
    initial: {
        opacity: 0,
        x: 200
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.75,
            delay: delay,
            type:"spring"
        }
    }
})

export const getSlideRightVariants = (delay: number) => ({
    initial: {
        opacity: 0,
        x: -200
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.75,
            delay: delay,
            type:"spring"
        }
    }
})

export const getSlideDownVariants = (delay: number) => ({
    initial: {
        opacity: 0,
        y: -200
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            delay: delay,
            type:"spring"
        }
    }
})