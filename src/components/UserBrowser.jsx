import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function UserBrowser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <div className=' bg-bgblue bg-opacity-70 min-h-screen flex '>
        <Navbar />
        <div className='h-screen flex max-w-2xl flex-col mx-auto  mt-[-50px] '>
            <div className=' my-auto bg-bgblue p-10 rounded-lg'>

            <h1 className='text-5xl font-bold text-textwhite pb-2'>LinkBrowser</h1>
            <p className='text-xl underline text-textwhite pb-6'><Link to={'/'}>Build a Linker</Link></p>
            <div className='text-2xl grid grid-cols-3 gap-3 min-w-[30vw]'>
                {users.map((user, index) => (
                    <div key={index} className='group p-6 flex flex-col rounded-lg bg-textwhite text-bgblue'>
                        <a href={`/users/${user.id}`} className='group-hover:underline text-2xl'>{user.name}</a>
                        <p className='text-lg '>{user.bio}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </div>
  );
}

export default UserBrowser;