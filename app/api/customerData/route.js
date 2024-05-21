import { NextResponse, Response } from 'next/server'

import { getAuth } from '@clerk/nextjs/server';

import { doc, getDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
import { db } from "../../firebase";

export async function POST(req){
  const {userId} = getAuth(req);
 
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }

  const docRef = doc(db, "users", userId);
  const snapshot = await getDoc(docRef);

  
  // Sample curl request to test this: curl -X POST -H "Content-Type: application/json" http://localhost:3000/api/onboardUser
  return NextResponse.json({ customers: snapshot.data().customers });
}