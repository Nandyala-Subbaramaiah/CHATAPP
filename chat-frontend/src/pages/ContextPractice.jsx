import React from "react";
import { UserProvider, useUser } from "../context/UserContext";

function Greeting() {
  const userName = useUser();

  return (
    <p className="practice-greeting">Hello, {userName}!</p>
  );
}

function ProfileCard() {
  return (
    <section className="practice-example" aria-label="Context API example">
      <p className="practice-example__label">A nested component reads it:</p>
      <Greeting />
    </section>
  );
}

export default function ContextPractice() {
  return (
    <UserProvider>
      <div className="practice-page">
        <main className="practice-card">
          <p className="eyebrow">React basics</p>
          <h1>Sharing data with Context</h1>
          <p className="practice-description">
            Context lets a parent make a value available to components below
            it, without passing that value through every component as a prop.
          </p>

          <ProfileCard />

          <h2 className="practice-subheading">How it works</h2>
          <ol className="practice-steps">
            <li>
              <strong>Create</strong> a context to hold a value.
            </li>
            <li>
              <strong>Provide</strong> the value around the components that need it.
            </li>
            <li>
              <strong>Read</strong> it in a child with <code>useContext</code>.
            </li>
          </ol>

          <pre className="practice-code"><code>{`<UserProvider>
  <ProfileCard>
    <Greeting />  {/* reads "Alex" from context */}
  </ProfileCard>
</UserProvider>`}</code></pre>
        </main>
      </div>
    </UserProvider>
  );
}
