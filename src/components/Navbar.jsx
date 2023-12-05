import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setDoc(doc(firestore, 'users', result.user.uid), {}, { merge: true });

      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };

  return (
    <nav className="absolute top-0 w-full bg-bgblue p-6 ">
      <div className='max-w-4xl mx-auto flex items-center justify-between flex-wrap'>
        <Link to="/linkbrowser" className='text-textwhite font-semibold text-3xl  mt-[-6px] hover:underline'>LinkBrowser</Link>
        <div className="flex flex-col items-center flex-shrink-0 text-textwhite mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <Link to={'/'}><span className='underline text-3xl'>Linker</span></Link>
            {user ? <span>/{user.email}</span> : <span>/guest</span>}

          </span>
          {user && <div className='text-sm'>uid: {user.uid}</div>}
        </div>
        <div>
          {user ? (
            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-textwhite border-textwhite hover:border-transparent hover:text-bgblue hover:bg-textwhite mt-[-6px]" onClick={() => auth.signOut()}>Log Out</button>
          ) : (
            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-textwhite border-textwhite hover:border-transparent hover:text-bgblue hover:bg-textwhite mt-[-6px]" onClick={signInWithGoogle}>Sign In with Google</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;