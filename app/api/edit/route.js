import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server';

import { doc, getDoc, updateDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
import { db } from "../../firebase";

export async function PUT(req){
  const {userId} = getAuth(req);
 
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }
  let reqJSON = await req?.json();

  const docRef = doc(db, "users", userId);
  const snapshot = await getDoc(docRef);
  var customers = snapshot.data().customers;

  var index = customers.findIndex(function(customer) {
    return customer.id === reqJSON.id;
  });

  customers[index] = reqJSON;

  await updateDoc(docRef, {
    customers: customers
  });

  // Sample curl request to test this: curl -X POST -H "Content-Type: application/json" -d '{"post":"..."}' http://localhost:3000/api/newPost
  return NextResponse.json({ result: "" });
}