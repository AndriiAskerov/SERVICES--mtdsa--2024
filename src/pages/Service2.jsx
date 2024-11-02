

const Service2 = ({ url, setURL, categorizeURL, category }) => {
    
    return (
        <>
            <h1>URL Categorization</h1>
            <div>
                <textarea
                    placeholder="Put the URL here.."
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                />
                <button
                    className="btn-categorize"
                    onClick={() => categorizeURL()}
                >Get category</button>
            </div><br />
            <div>Category: {category}</div>
        </>
    )
}

export default Service2;