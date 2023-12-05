import React from 'react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import { useState } from 'react';

const LinkItem = ({ link }) => {
  const userId = auth.currentUser.uid;
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [newTitle, setNewTitle] = useState(link.title);
  const [newUrl, setNewUrl] = useState(link.url);
  const [color, setColor] = useState(link.color || '#000000');

  const handleCancel = () => {
    setNewTitle(link.title);
    setNewUrl(link.url);
    setColor(link.color || '#000000');
    setEditing(false);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    await setDoc(doc(firestore, 'users', userId, 'links', link.id), { title: newTitle, url: newUrl, color: color }, { merge: true });
    setEditing(false);
  };
  
  const handleColorChange = async (event) => {
    setColor(event.target.value);
    await setDoc(doc(firestore, 'users', userId, 'links', link.id), { color: event.target.value }, { merge: true });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await deleteDoc(doc(firestore, 'users', userId, 'links', link.id));
    setDeleting(false);
  };


  if (editing) {
    return (
      <form onSubmit={handleEdit} className='flex items-center justify-between h-16 bg-textwhite text-bgblue shadow rounded-lg my-2'>
        <div className='flex gap-4 pl-4'><input className='border-b' value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        <input className='border-b' value={newUrl} onChange={e => setNewUrl(e.target.value)} /></div>
        <div className='flex gap-2 h-full'>
          <div onClick={handleCancel} className='px-6 flex items-center'>Cancel</div>
          <button type="submit" className=' bg-bgblue bg-opacity-70 text-textwhite h-full px-6'>Save</button>
        </div>
      </form>
    );
  }

  if (deleting) {
    return (
      <div className='bg-accent h-16 my-2 flex items-center justify-between px-4 rounded-lg '>
        <p>Are you sure you want to delete this link?</p>
        <div>
          <button onClick={() => setDeleting(false)} className='px-6'>No</button>
          <button onClick={handleDelete} className='px-6'>Yes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-textwhite text-bgblue shadow-md rounded-lg my-2 h-16">
      <div className='flex items-center'>
      <label style={{ backgroundColor: color, display: 'inline-block'}} className='h-12 w-12 rounded-lg ml-2'>
        <input type="color" value={color} onChange={handleColorChange} className='h-16 bg-textwhite border-0' style={{ width:'0px', height:'0px', visibility:'hidden'}}/>
      </label>
      <a href={link.url} className="text-blue-500 text-lg pl-5">
          {link.title}
        </a>
      </div>
      <div>
        <button onClick={() => setEditing(true)} className=" h-16 px-6">Edit</button>
        <button onClick={() => setDeleting(true)} className="bg-accent text-textwhite rounded-r-lg h-16 px-6">Delete</button>
      </div>
    </div>
  );
};

export default LinkItem;