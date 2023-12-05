import React, { useState } from 'react';
import { useEffect } from 'react';
import LinkList from './LinkList';
import { collection, doc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
    const [currentLink, setCurrentLink] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const userId = auth.currentUser.uid;
    const userLinksRef = collection(firestore, 'users', userId, 'links');
    
    
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');

    const [originalUserName, setOriginalUserName] = useState('');
    const [originalUserBio, setOriginalUserBio] = useState('');

    const [editingProfile, setEditingProfile] = useState(false);
    
    const handleEditProfile = () => {
      setOriginalUserName(userName);
      setOriginalUserBio(userBio);
      setEditingProfile(true);
    };

    const handleProfileCancel = () => {
      setUserName(originalUserName);
      setUserBio(originalUserBio);
      setEditingProfile(false);
    };

    useEffect(() => {
      const unsubscribe = onSnapshot(doc(firestore, 'users', userId), (doc) => {
        const data = doc.data();
        setUserName(data.name || '');
        setUserBio(data.bio || '');
      });
    
      return unsubscribe;
    }, [userId]);

    const handleProfileSave = async (event) => {
      event.preventDefault();
      await setDoc(doc(firestore, 'users', userId), { name: userName, bio: userBio }, { merge: true });
      setEditingProfile(false);
    };
    


    
    const [links, loading, error] = useCollectionData(userLinksRef);
    const handleAdd = () => {
        setCurrentLink(null);
        setTitle('');
        setUrl('');
        setShowForm(true);
    };

    const handleEdit = (link) => {
        setCurrentLink(link);
        setTitle(link.title);
        setUrl(link.url);
        setShowForm(true);
    };

    const handleDelete = async (link) => {
        await deleteDoc(doc(firestore, 'users', userId, 'links', linkId));
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (currentLink) {
        // Update link in Firestore
        await setDoc(doc(firestore, 'users', userId, 'links', linkId), { title, url }, { merge: true });
        } else {
        // Add new link to Firestore
        await addDoc(userLinksRef, { title, url });
        }
        setTitle('');
        setUrl('');
        setShowForm(false);
    };

  return (
    <div className='bg-bgblue min-h-screen flex flex-col justify-center items-center'>
      <Navbar />
    <div className="w-[40vw] min-w-[500px] shrink-0 flex flex-col text-textwhite mt-[-100px]">
      <div className=' flex items-center justify-between w-full'>
        {editingProfile ? (
          <form onSubmit={handleProfileSave} className=' flex justify-between text-bgblue bg-textwhite  w-full rounded-lg '>
            <div className=' flex flex-col items-start justify-between  w-full m-6'>
              <input className='bg-textwhite text-2xl border-b w-auto' value={userName} onChange={e => setUserName(e.target.value)} placeholder="Name" />
              <input className='shrink bg-textwhite text-md border-b w-full pt-2' value={userBio} onChange={e => setUserBio(e.target.value)} placeholder="Bio" />
            </div>
            <div className='flex gap-2'>
            <div onClick={handleProfileCancel} className='bg-textwhite text-bgblue m-0 rounded-r-lg px-6 flex items-center cursor-pointer'>Cancel</div>
            <button type="submit" className='bg-bgblue bg-opacity-70 text-textwhite px-6'>Save</button>
            </div>
          </form>

        ) : (
          <div className='flex justify-between items-center w-full min-h-16 bg-textwhite text-bgblue rounded-lg p-6'>
            <div className='flex flex-col'>
            <h2 className="text-3xl">{userName}</h2>
            <p className="text-lg">{userBio}</p>
            </div>
            <button onClick={handleEditProfile} className='bg-textwhite text-bgblue h-16 m-0 rounded-r-lg'>Edit profile</button>
          </div>
        )}
      </div>
      <div className="mylinks mt-6">
        <div className='flex justify-between mb-4 items-end'>
          <h3 className="text-3xl font-medium mb-2">My Links:</h3>
        </div>
        <LinkList links={links} onEdit={handleEdit} onDelete={handleDelete} />
        {showForm && (
          <form onSubmit={handleSave} className='text-bgblue bg-textwhite mb-4 rounded-lg h-16 flex gap-2  items-center justify-between'>
            <div className='flex gap-2 pl-4'><input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className=" bg-textwhite text-bgblue border-b h-min w-min"
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              className=" bg-textwhite text-bgblue border-b h-min w-full"
            /></div>
            <div className='flex gap-4 h-full items-center'><div onClick={() => setShowForm(false)} className='bg-textwhite text-bgblue h-min rounded-lg'>Cancel</div>
            <button type="submit" className='h-full bg-bgblue px-6 bg-opacity-70 text-textwhite'>Save</button></div>
          </form>
        )}
      </div>
      <button onClick={handleAdd} className="mb-6 text-textwhite flex underline underline-offset-2 hover:no-underline">Add Link</button>
      <Link to={`/users/${userId}`} className='hover:underline underline-offset-2 bg-textwhite text-bgblue h-fit text-2xl py-4 px-6 rounded-lg w-fit'>View my Linker</Link>

    </div>
    </div>
  );
};

export default Dashboard;