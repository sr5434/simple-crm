import { NextResponse, Response } from 'next/server'

import { getAuth } from '@clerk/nextjs/server';
import { doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
import { db } from "../../firebase";

export async function POST(req){
  const {userId} = getAuth(req);
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }
  await setDoc(doc(db, "users", userId), {
    customers: []
  });
  // Sample curl request to test this: curl -X POST -H "Content-Type: application/json" http://localhost:3000/api/onboardUser
  return NextResponse.json({ result: "Success" });
}