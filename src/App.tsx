import { useState } from "react";
import type { FormEvent } from 'react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import './App.css';

import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

export default function App() {
  const { signOut } = useAuthenticator();

  const [prompt, setPrompt] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);

  const sendPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, errors } = await client.queries.generateImage({
      prompt
    });

    if (!errors) {
      setAnswer(data);
      setPrompt('');
    } else {
      console.log(errors);
    }
  };

  return (
      <main className="app-main">
        <div>
          <h1 className="app-title">Generative AI Sticker Generator</h1>
          <form className="generator-form" onSubmit={sendPrompt}>
            <div>
              <input
                className="prompt-input"
                placeholder="Enter a prompt..."
                name="prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
            </div>
            <div>
              <button className="generate-button">
                Generate
              </button>
            </div>
          </form>
          <div className="image-container">
            {answer && (
              <div className="image-wrapper">
                <img
                  src={`${answer}`}
                  alt="Generated image"
                  className="generated-image"
                />
              </div>
            )}
          </div>
        </div>
        <button onClick={signOut} className="sign-out-button">Sign out</button>
      </main>
  );
}
