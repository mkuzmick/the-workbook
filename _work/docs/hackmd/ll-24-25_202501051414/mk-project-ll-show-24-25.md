---
title: mk-project-ll-show-24-25
tags: [mk, code, nextjs, css, show, story, reporting]

---

# mk-project-ll-show-24-25


## notes

- added mdx
- added files.slack.com to whitelist for images
- need to test out some of the templates




Yes, you can provide users with the option to make your website fullscreen by utilizing the Fullscreen API, which is supported in most modern browsers. This API allows you to programmatically enter and exit fullscreen mode.

Here’s how you can implement a button to trigger fullscreen mode in a Next.js application:

1. Create a function to handle the fullscreen request.
2. Add a button to your component to trigger this function.

Here is an example of how you might include this in your `Header` component:

```javascript
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const headerRef = useRef(null);

  const requestFullscreen = () => {
    if (headerRef.current) {
      if (headerRef.current.requestFullscreen) {
        headerRef.current.requestFullscreen();
      } else if (headerRef.current.mozRequestFullScreen) { // Firefox
        headerRef.current.mozRequestFullScreen();
      } else if (headerRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        headerRef.current.webkitRequestFullscreen();
      } else if (headerRef.current.msRequestFullscreen) { // IE/Edge
        headerRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <header ref={headerRef}>
      <div className="text-zinc-200">
        <div className="fill-current">
          <Image src="/spotlight.svg" alt="Logo" width={50} height={50} />
        </div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a>{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={requestFullscreen} className="bg-green-500 text-white px-4 py-2 rounded">
          Go Fullscreen
        </button>
      </div>
    </header>
  );
}

```

In this example:

1. **Header Component:** A `useRef` hook is used to reference the header element.
2. **Fullscreen Function:** The `requestFullscreen` function checks for the appropriate method available in the current browser and calls it to request fullscreen mode.
3. **Button:** A button is added to the header which, when clicked, triggers the `requestFullscreen` function.

### Fullscreen API Browser Compatibility
Make sure to check browser support for the Fullscreen API if you are targeting older browsers: 
- [Fullscreen API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)

The given example should cover most modern browsers including Chrome, Firefox, Safari, and Edge.
in the new next 13 do I need to "use client" for this? and do I not need to useState to keep track of whether they are full screen or not?
In Next.js 13, if you are writing a component that uses client-side functionalities like the Fullscreen API or React hooks such as `useState`, you need to mark the component as a client component using the `"use client"` directive at the top of the file.

Additionally, managing the state of whether the website is in fullscreen mode or not may improve user experience by updating the UI according to fullscreen status. For instance, you might want to toggle the button text based on whether the site is currently in fullscreen mode.

Here's an updated example where we use both `"use client"` directive and `useState` to track the fullscreen status:

```javascript
"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const headerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = () => {
    if (headerRef.current) {
      if (headerRef.current.requestFullscreen) {
        headerRef.current.requestFullscreen();
      } else if (headerRef.current.mozRequestFullScreen) { // Firefox
        headerRef.current.mozRequestFullScreen();
      } else if (headerRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        headerRef.current.webkitRequestFullscreen();
      } else if (headerRef.current.msRequestFullscreen) { // IE/Edge
        headerRef.current.msRequestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Update the state based on fullscreen change event
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  return (
    <header ref={headerRef}>
      <div className="text-zinc-200">
        <div className="fill-current">
          <Image src="/spotlight.svg" alt="Logo" width={50} height={50} />
        </div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a>{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button 
          onClick={toggleFullscreen} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
        </button>
      </div>
    </header>
  );
}
```

### Key Points in the Example:

1. **"use client" Directive**: Placed at the top of the file to indicate that this is a client-side component.
2. **`useState` and `useRef` Hooks**: Used to manage the fullscreen status and reference to the header element.
3. **Event Handling**: Added event listeners to handle when the fullscreen state changes.
4. **Full Screen Toggle**: Updated `toggleFullscreen` function to either request or exit fullscreen based on the current state.
5. **Button Text**: The button text dynamically changes based on the fullscreen status.

By incorporating this approach, you ensure that your UI accurately reflects the fullscreen state and adjust your button accordingly.
getting this error: