"use client";
import { useEffect } from 'react';
import { navigate } from '../actions'

export default function Onboarding() {
    useEffect(() => {
        fetch('/api/onboardUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate();
    }, []);
    return <p>Redirecting</p>
}