"use client"

import { useState, useEffect } from 'react'

// Add Web MIDI API types
declare global {
  namespace WebMidi {
    interface MIDIOptions {
      sysex?: boolean;
      software?: boolean;
    }
    
    interface MIDIInputMap {
      entries(): IterableIterator<[string, MIDIInput]>;
      forEach(callback: (value: MIDIInput, key: string, map: MIDIInputMap) => void): void;
      get(id: string): MIDIInput | undefined;
      has(id: string): boolean;
      keys(): IterableIterator<string>;
      size: number;
      values(): IterableIterator<MIDIInput>;
      [Symbol.iterator](): IterableIterator<[string, MIDIInput]>;
    }

    interface MIDIOutputMap {
      entries(): IterableIterator<[string, MIDIOutput]>;
      forEach(callback: (value: MIDIOutput, key: string, map: MIDIOutputMap) => void): void;
      get(id: string): MIDIOutput | undefined;
      has(id: string): boolean;
      keys(): IterableIterator<string>;
      size: number;
      values(): IterableIterator<MIDIOutput>;
      [Symbol.iterator](): IterableIterator<[string, MIDIOutput]>;
    }

    interface MIDIAccess extends EventTarget {
      inputs: MIDIInputMap;
      outputs: MIDIOutputMap;
      onstatechange: ((this: MIDIAccess, ev: MIDIConnectionEvent) => any) | null;
      sysexEnabled: boolean;
    }

    interface MIDIConnectionEvent extends Event {
      port: MIDIPort;
    }

    interface MIDIMessageEvent extends Event {
      data: Uint8Array;
      receivedTime: number;
      target: MIDIInput;
    }

    interface MIDIPort extends EventTarget {
      connection: string;
      id: string;
      manufacturer: string;
      name: string;
      state: string;
      type: string;
      version: string;
      onstatechange: ((this: MIDIPort, ev: MIDIConnectionEvent) => any) | null;
      open(): Promise<MIDIPort>;
      close(): Promise<MIDIPort>;
    }

    interface MIDIInput extends MIDIPort {
      onmidimessage: ((this: MIDIInput, ev: MIDIMessageEvent) => any) | null;
    }

    interface MIDIOutput extends MIDIPort {
      send(data: number[] | Uint8Array, timestamp?: number): void;
      clear(): void;
    }
  }

  interface Navigator {
    requestMIDIAccess(options?: WebMidi.MIDIOptions): Promise<WebMidi.MIDIAccess>;
  }
}

// Define TypeScript interfaces for MIDI data
interface MidiEvent {
  timestamp: string;
  receivedTime: number;
  highResTimeMs: number;
  timeSincePrevMs: number | null;
  timingSource: string;
  rawData: number[];
  command: number;
  statusByte: string;
  channel: number;
  note: number;
  velocity: number;
  type: string;
  noteName: string;
  rawEvent: {
    data: number[];
    receivedTime: number;
    target: {
      name: string;
      manufacturer: string;
      id: string;
      type: string;
      state: string;
      connection: string;
    };
  };
}

// Component to display MIDI events
const MidiDisplay = ({ midiEvents }: { midiEvents: MidiEvent[] }) => {
  if (midiEvents.length === 0) {
    return <p>No MIDI events received yet. Play a note on your MIDI device.</p>
  }

  return (
    <div className="my-5 p-4 border border-gray-600 rounded-md bg-gray-800 text-white">
      <h2 className="text-xl font-semibold mb-3">MIDI Events</h2>
      <ul className="max-h-[500px] overflow-y-auto p-0 list-none">
        {midiEvents.map((event: MidiEvent, index: number) => (
          <li key={index} className="mb-3 p-3 rounded bg-gray-700 border border-gray-600 text-white">
            <div className="flex justify-between items-start mb-2">
              <div className="text-green-300 font-mono text-sm">
                {event.timeSincePrevMs !== null ? 
                  `+${event.timeSincePrevMs}ms` : 
                  'First Event'}
              </div>
              <div className="text-yellow-300 font-mono text-sm">
                Type: {event.type} (Channel {event.channel})
              </div>
            </div>
            <div className="flex justify-between items-start mb-2 text-xs text-blue-300 font-mono">
              <div>Browser event time: {event.receivedTime}</div>
              <div>Performance time: {event.highResTimeMs}</div>
            </div>
            <pre className="whitespace-pre-wrap break-words text-cyan-300">{JSON.stringify(event, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main MIDI input page component
export default function MidiTest() {
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null);
  const [midiEvents, setMidiEvents] = useState<MidiEvent[]>([]);
  const [midiStatus, setMidiStatus] = useState('Initializing MIDI...');
  const [error, setError] = useState<string | null>(null);
  const [lastEventTime, setLastEventTime] = useState<number | null>(null);

  // Initialize MIDI access
  useEffect(() => {
    if (typeof navigator === 'undefined' || typeof navigator.requestMIDIAccess !== 'function') {
      setError('Web MIDI API is not supported in your browser.');
      return;
    }

    navigator.requestMIDIAccess()
      .then(access => {
        setMidiAccess(access);
        setMidiStatus('MIDI access granted!');
        
        // Set up MIDI input event listeners
        setupMidiListeners(access);
        
        // Listen for device connections/disconnections
        access.onstatechange = (event) => {
          console.log('MIDI state changed:', event);
          setupMidiListeners(access);
        };
      })
      .catch(err => {
        console.error('MIDI access denied:', err);
        setError(`MIDI access denied: ${err.message}`);
      });
  }, []);

  // Set up listeners for all MIDI inputs
  const setupMidiListeners = (access: WebMidi.MIDIAccess) => {
    // Remove any existing listeners first
    // (this is a simplified approach - a more robust one would track specific listeners)
    
    const inputs = Array.from(access.inputs.values());
    
    if (inputs.length === 0) {
      setMidiStatus('No MIDI devices detected. Please connect a MIDI device.');
    } else {
      setMidiStatus(`Found ${inputs.length} MIDI input(s). Ready for input.`);
      
      inputs.forEach((input: WebMidi.MIDIInput) => {
        input.onmidimessage = handleMidiMessage;
      });
    }
  };

  // Handle incoming MIDI messages
  const handleMidiMessage = (event: WebMidi.MIDIMessageEvent) => {
    // Extract data from MIDI message
    const [command, note, velocity] = event.data;
    
    // Get high-resolution time and round to 3 decimal places to avoid floating point issues
    const now = Math.round(performance.now() * 1000) / 1000; // Round to 3 decimal places
    const timeSincePrev = lastEventTime ? Math.round((now - lastEventTime) * 1000) / 1000 : null;
    
    // Calculate the status byte and channel information
    const statusByte = (command & 0xF0).toString(16).padStart(2, '0').toUpperCase();
    const channel = (command & 0x0F) + 1; // MIDI channels are 1-16, not 0-15
    
    // Create a more readable event object
    const midiEvent = {
      timestamp: new Date().toISOString(),
      receivedTime: event.receivedTime,
      highResTimeMs: now,
      timeSincePrevMs: timeSincePrev,
      timingSource: 'performance.now() rounded to 3 decimal places',
      rawData: Array.from(event.data),  // Convert to Array for JSON serializing
      command: command,
      statusByte: `0x${statusByte}`,
      channel: channel,
      note: note,
      velocity: velocity,
      type: getMidiMessageType(command),
      noteName: getNoteNameFromMidiNumber(note),
      rawEvent: {
        data: Array.from(event.data),
        receivedTime: event.receivedTime,
        target: {
          name: event.target.name,
          manufacturer: event.target.manufacturer,
          id: event.target.id,
          type: event.target.type,
          state: event.target.state,
          connection: event.target.connection
        }
      }
    };
    
    // Log to console
    console.log('MIDI Event:', midiEvent);
    
    // Update last event time
    setLastEventTime(now);
    
    // Update state with the new event at the beginning of the array
    setMidiEvents(prevEvents => [midiEvent, ...prevEvents.slice(0, 19)]); // Keep last 20 events
  };

  // Helper function to determine MIDI message type with more details
  const getMidiMessageType = (command: number): string => {
    const status = command & 0xF0; // Get the upper 4 bits for the status
    
    switch(status) {
      case 0x80: return 'Note Off';
      case 0x90: return 'Note On';
      case 0xA0: return 'Polyphonic Aftertouch (Key Pressure)';
      case 0xB0: return 'Control Change';
      case 0xC0: return 'Program Change';
      case 0xD0: return 'Channel Pressure (Aftertouch)';
      case 0xE0: return 'Pitch Bend';
      case 0xF0: {
        // System messages need more detailed parsing
        switch(command) {
          case 0xF0: return 'System Exclusive';
          case 0xF1: return 'MIDI Time Code Quarter Frame';
          case 0xF2: return 'Song Position Pointer';
          case 0xF3: return 'Song Select';
          case 0xF6: return 'Tune Request';
          case 0xF7: return 'End of System Exclusive';
          case 0xF8: return 'Timing Clock';
          case 0xFA: return 'Start';
          case 0xFB: return 'Continue';
          case 0xFC: return 'Stop';
          case 0xFE: return 'Active Sensing';
          case 0xFF: return 'System Reset';
          default: return `System Message (0x${command.toString(16).toUpperCase()})`;
        }
      }
      default: return `Unknown (0x${status.toString(16).toUpperCase()})`;
    }
  };

  // Helper function to convert MIDI note number to note name
  const getNoteNameFromMidiNumber = (midiNumber: number): string => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    // Handle potential undefined cases to avoid errors
    if (!midiNumber && midiNumber !== 0) return 'Unknown';
    
    const octave = Math.floor(midiNumber / 12) - 1;
    const note = notes[midiNumber % 12];
    return `${note}${octave}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-900 text-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-white mb-6">MIDI Input Test</h1>
      
      <div className="my-5 p-4 border border-gray-600 rounded-md bg-gray-800">
        <h2 className="text-xl font-semibold mb-2 text-white">Status</h2>
        <p>{error ? <span className="text-red-400">{error}</span> : midiStatus}</p>
        
        {midiAccess && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-white mb-2">Connected Devices:</h3>
            <ul className="list-disc pl-5">
              {Array.from(midiAccess.inputs).map(([id, input]: [string, WebMidi.MIDIInput]) => (
                <li key={id} className="mb-1">
                  {input.name || 'Unnamed device'} 
                  <span className="text-gray-400">(Manufacturer: {input.manufacturer || 'Unknown'}, ID: {id})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <MidiDisplay midiEvents={midiEvents} />
    </div>
  );
}