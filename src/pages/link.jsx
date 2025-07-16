import React from "react";
import Navbar from "../component/Navbar";

export default function Link() {
    const [copied, setCopied] = React.useState(false);
    const linkRef = React.useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(linkRef.current.value)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
    };

    return (
        <div className="link-container">
            <Navbar />
            <div className="link-content">
                <h1 className="link-title">Slam Link</h1>
                <p className="link-description">
                    Here is the slam link you can share with others to interact with your slam space.
                </p>
                <form className="link-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="link">Slam Link</label>
                        <div className="link-input-container">
                            <input
                                type="text"
                                id="link"
                                ref={linkRef}
                                className="link-input"
                                value="https://your-slam-link.com/share"
                                readOnly
                            />
                            <button
                                type="button"
                                className="copy-button"
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        Share Slam
                    </button>
                </form>
            </div>
        </div>
    );
}
 