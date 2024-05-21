import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server';

import { doc, getDoc, updateDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
import { db } from "../../firebase";

export async function POST(req){
  const {userId} = getAuth(req);
 
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }
  let reqJSON = await req?.json();
  const docRef = doc(db, "users", userId);
  const snapshot = await getDoc(docRef);
  const customers = snapshot.data().customers;
  await updateDoc(docRef, {
    customers: [...customers, reqJSON]
  });

  // Sample curl request to test this: curl -X POST -H "Content-Type: application/json" -d '{"post":"..."}' http://localhost:3000/api/newPost
  return NextResponse.json({ result: "" });
}