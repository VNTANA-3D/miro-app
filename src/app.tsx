import * as React from 'react';
import {createRoot} from 'react-dom/client';

const App: React.FC = () => {
  const [url, setUrl] = React.useState("");
  const [showUrlError, setShowUrlError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // URL Validation
  function validateUrl(url: string) {
    return /^https?:\/\/embed\.vntana\.com\?/.test(url);
  }

  const disableBtn = async (setting: boolean) => {
    (document.getElementById("embed-button") as HTMLButtonElement).disabled = setting;
  }

  const checkUrl = async () => {
    setShowUrlError(false);
    if (!validateUrl(url) || !url.includes("productUuid=") || !url.includes("clientSlug=") || !url.includes("organizationSlug=")){
      if (url.trim().length >= 1)
        setShowUrlError(true);
    } else {
      setShowUrlError(false);
    }
  }

  async function embedViewer() {
    setShowUrlError(false);
    setIsLoading(true);

    if (!validateUrl(url) || !url.includes("productUuid=") || !url.includes("clientSlug=") || !url.includes("organizationSlug=")){
      setShowUrlError(true);
    } else {
      const embedFrame = await miro.board.createEmbed({
          url: url,
          mode: 'modal',
          width: 500,
          height: 500,
          x: 1600,
          y: 1600
        });
        
        await miro.board.viewport.zoomTo(embedFrame);
        setUrl("");
    }
    setIsLoading(false);
  }

  const disabled = url.trim().length < 1;
  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <img width="300" height="37" src="https://www.vntana.com/wp-content/uploads/2020/12/VNTANA-logo-blue-1536x190.png" alt="" />
      </div>
      <div className="cs1 ce12">
        <p>The VNTANA app will allow you to embed your VNTANA 3D assets directly into your Miro workspace!</p>
        <p>Simply copy the share link of the asset on the VNTANA Platform that you wish to embed, and enter it below</p>
      </div>
      <div className="cs1 ce12">
        <div className={`form-group ${showUrlError ? 'error' : ''}`} id="embed-group">
          <label htmlFor="embed-input">Add 3D Share Link</label>
          <input 
            className="input"
            id="embed-input"
            type="text"
            value={url}
            onChange={(event)=> {
              setUrl(event.target.value);
              if (url.trim().length >= 1)
                disableBtn(false);
            }}
            onBlur={()=> {checkUrl();}}
          />
          { showUrlError ? 
            <div className="status-text" id="embed-group-error">"Error, invalid share link!"</div> : null }
        </div>
      </div>
      <div className="cs1 ce12">
        <button 
          className={`button button-primary ${isLoading ? 'button-loading' : ''}`}
          id="embed-button"
          onClick={() => {
            embedViewer();
          }}
          disabled={disabled}
        >Embed 3D</button>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
