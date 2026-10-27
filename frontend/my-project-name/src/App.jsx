import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// Apna naya LivePreview component import kar rahe hain
import LivePreview from "./components/LivePreview";

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '0 50px' }}>
        <h1>AI Website Builder</h1>
        
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Jab user login ho jayega, tabhi usko Live Preview ka section dikhega */}
      <SignedIn>
        <div style={{ marginTop: '30px' }}>
          <LivePreview />
        </div>
      </SignedIn>
    </div>
  )
}

export default App;