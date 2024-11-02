import AudioPlayer from "../components/AudioPlayer";

const Service1 = ({ text, setText, convertTextToSpeech }) => {

    return (
        <>
            <h1>Text to speech</h1>
            <div>
                <textarea
                    placeholder="Put the text here.."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="btn-convert"
                    onClick={() => convertTextToSpeech()}
                >Convert to speech</button>
            </div>
            <AudioPlayer />
        </>
    )
}

export default Service1;