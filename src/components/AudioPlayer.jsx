import { useEffect, useRef, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsPauseCircleFill } from 'react-icons/bs';
import { BiSolidDownload } from 'react-icons/bi';

const AudioPlayer = ({ audioFile }) => {

    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    const progressBarRef = useRef();
    const audioRef = useRef();

    useEffect(() => {
        if (audioFile) {
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: 'audio/mpeg' }));

            const audio = audioRef.current;
            audio.src = audioURL;

            audio.addEventListener('loaddata', () => {
                setDuration(audio.duration);
            })

            audio.addEventListener('timeupdate', updateProgressBar);

            return () => {
                URL.revokeObjectURL(audioURL);
            }
        }
    }, [audioFile])

    const updateProgressBar = () => {
        const audio = audioRef.current;
        const progress = (audio.currentTime / audio.duration) * 100

        setCurrentTime(audio.currentTime);
        progressBarRef.current.style.width = `${progress}%`
    }

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }

    const downloadAudio = () => {
        if (audioFile) {
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: 'audio/mpeg' }));

            const a = document.createElement('a');
            a.href = audioURL;

            a.download = 'audio.mp3';
            a.style.display = 'none';
            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(audioURL);
        }
    }

    return (
        <div className='container-audio'>
            <audio ref={audioRef} />
            <div className='container-progress'>
                <div
                    ref={progressBarRef}
                    className='progress-bar'
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                />
            </div>
            <div className='player-bar'>
                <button
                    className='btn-player btn-audio'
                    disabled={!audioFile}
                    onClick={() => togglePlay()}>
                    {
                        isPlaying ?
                            <BsPauseCircleFill className='btn-icon' />
                            :
                            <AiFillPlayCircle className='btn-icon' />
                    }
                </button>
                <button
                    className='btn-player btn-download'
                    disabled={!audioFile}
                    onClick={() => downloadAudio()}>
                    <BiSolidDownload className='icon-btn' />
                </button>
            </div>
        </div>
    )
}

export default AudioPlayer;