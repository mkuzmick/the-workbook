"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Crosshair from '@/components/reactbits/Crosshair';

const Page = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        height: '2300px',
        overflow: 'hidden',
        position: 'relative',
        background: '#121212',
        color: '#ffffff',
        padding: '20px',
      }}
    >
      <Crosshair containerRef={containerRef} color="#ffffff" />
      <h1>hello</h1>

      {/* Test Links */}
      <div style={{ margin: '20px 0', padding: '10px', background: '#333' }}>
        <Link
          href="/test-page-1"
          className="test-link"
          style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}
        >
          Test Link 1
        </Link>
      </div>
      <div style={{ margin: '20px 0', padding: '10px', background: '#333' }}>
        <Link
          href="/test-page-2"
          className="test-link"
          style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}
        >
          Test Link 2
        </Link>
      </div>
      <div style={{ margin: '20px 0', padding: '10px', background: '#333' }}>
        <Link
          href="/test-page-3"
          className="test-link"
          style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}
        >
          Test Link 3
        </Link>
      </div>
    </div>
  );
};

export default Page;
