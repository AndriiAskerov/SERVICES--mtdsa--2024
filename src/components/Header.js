import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div class="header">
            <p class="logo">Services!</p>
            <div class="services">
                <Link to="/tts" class="btn-services">TTS</Link>
                <Link to="/cat" class="btn-services">URL Cat</Link>
                {/* <Link to="/" class="btn-services">...</Link> */}
                
            </div>
        </div>
    )
}