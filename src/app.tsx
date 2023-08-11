import * as React from 'react';
import {createRoot} from 'react-dom/client';

const App: React.FC = () => {
  const [url, setUrl] = React.useState("");
  const [showUrlError, setShowUrlError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // URL Validation
  function validateUrl(url: string) {
    return /^(https:\/\/)embed\.vntana\.com(\?|\/variant\?).*/.test(url);
  }

  const disableBtn = async (setting: boolean) => {
    (document.getElementById("embed-button") as HTMLButtonElement).disabled = setting;
  }

  const checkUrl = async () => {
    setShowUrlError(false);
    if (!validateUrl(url) || !(url.includes("uuid=") || url.includes("productUuid=")) || !url.includes("clientSlug=") || !url.includes("organizationSlug=")){
      if (url.trim().length >= 1)
        setShowUrlError(true);
    } else {
      setShowUrlError(false);
    }
  }

  async function embedViewer() {
    setShowUrlError(false);
    setIsLoading(true);
    const viewport = await miro.board.viewport.get();

    if (!validateUrl(url) || !(url.includes("uuid=") || url.includes("productUuid=")) || !url.includes("clientSlug=") || !url.includes("organizationSlug=")){
      setShowUrlError(true);
    } else {
      const embedFrame = await miro.board.createEmbed({
          url: url,
          mode: 'modal',
          width: 500,
          height: 500,
          x: viewport.x + (viewport.width/2),
          y: viewport.y + (viewport.height/2)
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
        <p>Simply copy the share link of the asset on the <a className="link link-primary" href="https://platform.vntana.com" target="_blank">VNTANA Platform</a> that you wish to embed, and enter it below.</p>
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
      <div className="footer">
        <div title="Learn more about the VNTANA App">
          <a href="https://www.vntana.com/resources" target="_blank">
            <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m2 9.496 2 .924V13a8 8 0 1 0 16 0v-2.58l3.272-1.512a1 1 0 0 0 0-1.816L12.42 2.076a1 1 0 0 0-.84 0L.92 7.003C0 7.5 0 8.474 0 9v11a1 1 0 1 0 2 0V9.496zM6 13v-1.655l5.58 2.58a1 1 0 0 0 .84 0l5.58-2.58V13a6 6 0 0 1-12 0zm6-1.118L20.764 8 12 4.118 3.236 8 12 11.882z" /></svg>
          </a>
        </div>
        <div title="Contact VNTANA Support">
          <a href="https://www.vntana.com/contact" target="_blank">
            <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M11 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-7.555 5.832C9.602 16.603 10.792 17 12 17c1.208 0 2.398-.397 3.555-1.168a1 1 0 0 0-1.11-1.664C13.602 14.73 12.792 15 12 15c-.792 0-1.602-.27-2.445-.832a1 1 0 0 0-1.11 1.664z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.213 22.316a2 2 0 0 1-2.53-2.53l1.213-3.64A9.966 9.966 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10c-1.45 0-2.856-.31-4.146-.897l-3.64 1.213zm4.162-3.181a8 8 0 1 0-3.511-3.511l.19.372L3.58 20.42l4.423-1.474.372.19z" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
