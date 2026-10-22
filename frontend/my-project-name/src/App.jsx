import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>AI Website Builder</h1>
      
      {/* Jab user logged out hoga toh Sign In button dikhega */}
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      {/* Jab user logged in hoga toh uski Profile / Logout button dikhega */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default App