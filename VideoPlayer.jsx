import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Video, { TextTrackType } from 'react-native-video';
 
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

const toOption = (textTrack) => {
  return textTrack ? { type: textTrack.title ? 'title' : 'language', value: textTrack.title ? textTrack.title : textTrack.language } : undefined;
};
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
] 

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const defaultValue = toOption(textTracks[0]);
  console.log('defaultValue', defaultValue);
  const [selected, setSelected] = useState(defaultValue);

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
  
  return (
    <Video 
      // textTracks={textTracks}
      // Can be a URL or a local file.
      source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }}
      // Store reference
      // ref={videoRef}
      // onTextTracks={(data) => {
      //   const s = data.textTracks?.find((xTextTrack) => {
      //     return xTextTrack?.selected;
      //   });
      //   console.log('onTextTracks');
      //   console.log('selectedTrack', s);
      //   console.log('selected', selected);

      //   // setSelected(toOption(s));
      // }}
      // selectedTextTrack={toOption(selected)}
      style={styles.backgroundVideo}
      controls={true}
      disableFocus={false} // bc false, do NOT Let background audio/music from other apps play (android only) when your media is playing -> // works well e.g. have youtube playing, then play this app, youtube will pause
      playWhenInactive={true} // on iOS, Continue playing the media when notif controls or control center modals are above the app -> // have not tested yet
      ignoreSilentSwitch={'ignore'}
      playInBackground // (Android and iOS) -> works on Android but not on iOS when backgrounded
      // resizeMode="contain"
      onAudioFocusChanged={(event) => console.log('onAudioFocusChanged', event, event.hasAudioFocus)}
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
