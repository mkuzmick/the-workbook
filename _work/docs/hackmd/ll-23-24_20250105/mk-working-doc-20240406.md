---
title: mk-working-doc-20240406

---

# mk-working-doc-20240406

- comp lit 200
- comp lit 280x
- gened?
- presentations
- showcase and reporting

## cl200

- github repo for slackbots and other reference code?
- folder full of colabs
- slack bot agents
    - editor
    - code-checker
    - folklore theorist
    - critic of eurocentrism
    - color artist/designer
- colab moves
    - generate completion
    - generate an image
    - build an assistant
    - claude?
    - google?


or maybe even more modular?

- cl200-js-basic-slackbot
- cl200-js-bot-ensemble
- cl200-js-web-app
- cl200-py-notebooks (mirrored in colab)
- cl200-py-scripts
- for monday
    - colab riding-hood-generator


### plan

- today: revise riding-hood generators
    - do one with just chat completions
    - do one more complicated one with function calling and assistants and multiple roles
- tomorrow: build bots for Monday (and space?)




To adapt the provided Google Cloud Speech-to-Text API sample code for handling audio from your Blackmagic Ultrastudio, which receives 16 channels of audio from your ATEM but you only need 8 channels sent to Google, you need a setup that involves both hardware and software configurations. The Google API itself does not directly manage or filter audio hardware channels; it processes the audio data it receives. Thus, the primary task is to ensure that only the 8 channels you wish to transcribe are sent to the API.

Given the complexity of managing multiple audio channels and the specific requirement of selecting a subset of those channels for real-time streaming to the Speech-to-Text API, here are steps and considerations for accomplishing this:

### 1. **Audio Channel Selection & Preprocessing:**
- **Hardware Route:** Check if your Blackmagic Ultrastudio or the ATEM software allows you to route or select specific channels for output. If you can create a mix-down or select specific channels to output, you can set it up to only output the 8 channels you're interested in.
- **Software Solution:** If hardware routing isn't an option or doesn't offer the flexibility you need, consider software that can capture and route audio from your hardware to different applications. Software like [Voicemeeter (for Windows)](https://vb-audio.com/Voicemeeter/index.htm) or [BlackHole (for macOS)](https://existential.audio/blackhole/) can route and mix audio signals virtually. You would select the 8 channels you wish to transcribe and route them to a virtual device that the node-record-lpcm16 library captures from.

### 2. **Modify the Sample Code for Audio Configuration:**
The sample code needs minimal changes for this specific use-case as it primarily captures the audio input from the default or specified recording device. Once you've set up your audio routing to ensure only the 8 channels you need are being sent to the recording input that the code captures from, ensure you've set the `audioChannelCount` to 8 in your configuration to match the number of channels being processed:

```javascript
const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    audioChannelCount: 8, // This needs to match the number of audio channels you're capturing
    enableSeparateRecognitionPerChannel: true, // Set to true to ensure separate recognition for each channel
};
```

### 3. **Considerations for Real-Time Processing:**
- **Latency and Processing Power:** Handling 8 channels of audio in real time requires considerable processing power, especially if you're also managing video or other tasks on the same machine. Monitor your system's performance to ensure real-time processing can proceed without significant latency.
- **Network Bandwidth:** Streaming 8 channels of audio data to the Google Cloud Speech-to-Text API will consume more bandwidth than a single channel. Ensure your internet connection can handle this increased data rate.
- **API Quotas and Costs:** Sending more channels of audio will consume your API quota faster and increase the cost. Ensure you've reviewed the Google Cloud Speech-to-Text [pricing details](https://cloud.google.com/speech-to-text/pricing) and quota limits to accommodate your usage.

By properly setting up your audio routing to capture only the desired 8 channels and adjusting the API request configuration accordingly, you should be able to use the modified version of the provided sample code to transcribe the selected audio channels in real-time. Always test thoroughly with your specific setup to fine-tune performance and ensure accurate transcription results.
where in the code to I indicate that we should be sending the audio from this specific device (rather than the webcam, say)
To specify the audio source device when using the node-record-lpcm16 library (or similar libraries) to capture audio in Node.js, you often need to pass additional configuration that tells the library which device to use. This can be particularly important when your system has multiple audio input devices, such as a built-in microphone, external webcam, or a professional audio interface like your Blackmagic Ultrastudio.

The device selection is typically done through specifying the device ID or name in the recording options. However, the exact method can depend on your operating system and the audio capture library you are using. 

For `node-record-lpcm16`, which is used in the provided Google Cloud Speech API sample code, you would specify the device within the options passed to the `record` function. Here's how you would generally modify the code to specify an audio source device

### Finding Your Device ID

**On macOS:**

You can list the available input devices and their IDs by running this command in the terminal:

```bash
sox -V6 -n -d
```

or 

```bash
rec -l
```

**On Linux:**

Use `arecord -l` to list all capture hardware devices.

**On Windows:**

Listing devices might vary, but you can try `sox` or look into the Sound settings in Control Panel or Settings app to identify your device.

### Specifying the Device in Code

After identifying your device's ID or name, you incorporate it into your `node-record-lpcm16` recording setup. Here’s how you could modify the recording options in the sample code:

```javascript
recorder
  .record({
    sampleRateHertz: sampleRateHertz,
    threshold: 0, // Silence threshold
    silence: '10.0', // Consider increasing silence time to not cut off during brief pauses
    keepSilence: true,
    recordProgram: 'rec', // This might be 'arecord' on Linux or 'sox' on macOS
    device: 'YourDeviceNameHere', // Add your device ID or name here
  })
  .stream()
  .on('error', err => {
    console.error('Audio recording error ' + err);
  })
```

### Notes:
- The `device` option is where you specify your device. For `sox` on macOS or Linux, this is typically done with the `--device` flag, followed by the device name or ID. For `arecord` on Linux, it would just be the device name or ID. The key thing is that `node-record-lpcm16` abstracts these underlying tools, so you only need to pass the device name or ID in the `device` field of the options object.
- The `recordProgram` option should match the recording tool available or preferred on your system: `sox`, `arecord` for Linux, or another supported program. Ensure it's installed and accessible in your system's PATH.
  
### Caution:
Directly specifying the device can be susceptible to changes in device IDs/names or issues across different operating systems. Always test thoroughly on your target environment to ensure reliable operation, and consult the `node-record-lpcm16` documentation or source for the latest options and examples related to device specification.



