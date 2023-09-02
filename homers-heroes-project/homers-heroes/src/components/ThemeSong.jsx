import React from "react"
import useSound from 'use-sound'
import BALong from '../assets/BALong.mp3'
import BAShort from '../assets/BAShort.mp3'
import HomeDepotBeat from '../assets/HomeDepotBeat.mp3'


const ThemeSong = () => {
    const [playLongActive] = useSound(BALong, { volume: 0.35 })
    const [playShortActive] = useSound(BAShort, { volume: 0.35 })
    const [playActive] = useSound(HomeDepotBeat, { volume: 0.35 })

    return (
        <div>
            <button
                onClick={playLongActive}
            >Long Version</button>
            <button
                onClick={playShortActive}
            >Short Version</button>
            <button
                onClick={playActive}
            >HD Theme</button>
        </div>
    )
}

export default ThemeSong
