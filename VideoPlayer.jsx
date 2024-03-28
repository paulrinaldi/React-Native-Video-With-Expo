import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Video, { TextTrackType } from 'react-native-video';
 
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

const textTracks = [
  {
    title: "English CC",
    language: "en",
    type: TextTrackType.VTT, // "text/vtt"
    uri: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
  },
  {
    title: "Spanish Subtitles",
    language: "es",
    type: TextTrackType.SRT, // "application/x-subrip"
    uri: "https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt"
  }
];
const videoURL = 'https://democracynow.cachefly.net/democracynow/360/dn2024-0105.mp4';
const toTextTrackSelectOption = (textTrack) => {
  return textTrack ? { type: textTrack.title ? 'title' : 'language', value: textTrack.title ? textTrack.title : textTrack.language } : undefined;
};

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [selected, setSelected] = useState(textTracks[0]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('setting English Closed Captions');
  //     setSelected({
  //       title: "English CC",
  //       language: "en",
  //       type: TextTrackType.VTT, // "text/vtt"
  //       uri: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
  //     });
  //   }, 4000);
  // }, [])

  console.log('selected', selected);
  
  return (
    <Video
      textTracks={textTracks}
      // Can be a URL or a local file.
      source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }}
      // Store reference
      // ref={videoRef}
      onTextTracks={(data) => {
        const s = data.textTracks?.find((xTextTrack) => {
          return xTextTrack?.selected;
        });
        console.log('onTextTracks');
        console.log('s', s);
        console.log('selected', selected);

        setSelected(s);
      }}
      selectedTextTrack={toTextTrackSelectOption(selected)}
      style={styles.backgroundVideo}
      controls={true}
      // resizeMode="contain"
    />
  )
}
 
// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
});

export default VideoPlayer;
