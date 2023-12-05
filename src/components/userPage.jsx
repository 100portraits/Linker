import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function UserLinksPage() {
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, 'users', userId), (doc) => {
            const data = doc.data();
            setUserName(data.name || '');
            setUserBio(data.bio || '');
            
        });
        // now we need to get the links
        const unsubscribe2 = onSnapshot(collection(firestore, 'users', userId, 'links'), (snapshot) => {
            setLinks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => {
            unsubscribe();
            unsubscribe2();
        };
        
        console.log(links);
    }, [userId]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-opacity-70 bg-bgblue text-textwhite'>
          
          <div className='max-w-xl w-full pt-8 px-8 bg-bgblue rounded-lg shadow-md'>
            <h2 className="text-5xl font-semibold">{userName}</h2>
            <p className="text-2xl font-light  mb-8">{userBio}</p>
            {links.map((link, index) => (
              <div key={index} className='mb-4'>
                <a href={link.url} className='block p-4 bg-white rounded-lg shadow-md text-left  text-xl hover:underline' style={{ backgroundColor: link.color }}>
                  {link.title}
                </a>
              </div>
            ))}
          <p className='text-xs relative pt-8 pb-2 mr-[-24px] text-right hover:underline'><Link to={'/'}>generated by Linker</Link></p>
          </div>
        </div>
      );
}

export default UserLinksPage;