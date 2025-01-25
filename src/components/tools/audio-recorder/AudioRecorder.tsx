"use client";
import React, { useState, useRef } from "react";

type AudioRecorderProps = {
  onSyncComplete?: (serverResponse: any) => void; // Callback for when the server sync is complete
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSyncComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audio = new Blob(chunks, { type: "audio/webm" });

        // Validate file size (10 MB limit as an example)
        if (audio.size > 10 * 1024 * 1024) {
          setError("The recorded audio file exceeds the 10 MB size limit.");
          return;
        }

        setAudioBlob(audio);
        setError(null); // Clear any previous errors
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing audio input:", err);
      setError("Error accessing audio input. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const saveToLocal = () => {
    if (!audioBlob) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(audioBlob);
    link.download = "recording.webm";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const syncToServer = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onSyncComplete?.(data);
      } else {
        setError("Failed to sync audio with server.");
      }
    } catch (err) {
      console.error("Error syncing audio:", err);
      setError("Error syncing audio to server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isUploading && <p>Uploading...</p>}
      <button onClick={isRecording ? stopRecording : startRecording} disabled={isUploading}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioBlob && (
        <>
          <button onClick={saveToLocal} disabled={isUploading}>Save to Local</button>
          <button onClick={syncToServer} disabled={isUploading}>Sync to Server</button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
