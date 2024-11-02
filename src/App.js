import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AWS from 'aws-sdk'
import './App.css';
import Main from './pages/Main'
import Header from './components/Header';
import Service1 from './pages/Service1'
import Service2 from './pages/Service2'
import NoPage from './pages/NoPage'
import AudioPlayer from './components/AudioPlayer';

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "eu-central-1"
})

function App() {
  // Service 1: Speech to text
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState();
  const polly = new AWS.Polly()
  const convertTextToSpeech = () => {
    polly.synthesizeSpeech({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna'
    },
      (error, data) => {
        if (error) {
          console.log(error);
        }
        else {
          console.log(data);
          setAudioFile(data);
        }
      }
    )
  }

  // Service 2: URL Categorization
  const [url, setURL] = useState(''); // State to store the URL
  const [category, setCategory] = useState('N/A'); // State to store the category
  const categorizeURL = async () => {
    if (url === "") {
      setCategory("N/A")
      return
    } else if (!url.match("http(|s)://.+")) {
      alert("The URL is invalid!")
      return
    }

    const response = await fetch(`http://localhost:8000/cat/?url=${url}`, {
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      const predictedCategory = data.main_category + ", " + data.sub_category;
      setCategory(predictedCategory);
    } else {
      // Handle the error (e.g., display an error message to the user)
      console.error('Error fetching data:', response.status);
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Routes>
            <Route // Default main page - index
              index
              element={<Main />}
            />
            <Route // Text to speech
              path='/tts'
              element={
                <>
                  <Service1
                    text={text}
                    setText={setText}
                    convertTextToSpeech={convertTextToSpeech} />
                  <AudioPlayer audioFile={audioFile} />
                </>
              }
            />
            <Route // URL categorizer
              path='/cat'
              element={
                <>
                  <Service2
                     url={url}
                     setURL={setURL}
                     categorizeURL={categorizeURL}
                     category={category}
                     />
                </>
              } />
            <Route // 404 Not found
              path='/*'
              element={<NoPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
