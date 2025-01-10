import React, { useState, useRef, useEffect } from 'react';
import classes from './CustomVideoPlayer.module.scss';
import defaultThumbnail from '../../../../assets/images/img.png';
import { FaExpand, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const CustomVideoPlayer = ({ 
  video 

}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const videoRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
        setCurrentTime(formatTime(videoRef.current.currentTime));

        // Update progress bar color
        const progressBar = document.querySelector(`.${classes.progressBar}`);
        if (progressBar) {
          progressBar.style.setProperty('--seek-before-width', `${progress}%`);
        }

        // Update video overlay
        const videoElement = videoRef.current;
        videoElement.style.setProperty('--video-progress-width', `${100-progress}%`);
      }
    };

    const updateDuration = () => {
      if (videoRef.current) {
        setDuration(formatTime(videoRef.current.duration));
      }
    };

    const currentVideo = videoRef.current;
    currentVideo?.addEventListener('timeupdate', updateProgress);
    currentVideo?.addEventListener('loadedmetadata', updateDuration);
    return () => {
      currentVideo?.removeEventListener('timeupdate', updateProgress);
      currentVideo?.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    const volumeBar = document.querySelector(`.${classes.volumeBar}`);
    if (volumeBar) {
      volumeBar.style.setProperty('--volume-before-width', `${volume * 100}%`);
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    
    // Update volume bar color
    const volumeBar = e.target;
    volumeBar.style.setProperty('--volume-before-width', `${newVolume * 100}%`);
  };

  const toggleMute = () => {
    const newVolume = isMuted ? volume : 0;
    videoRef.current.volume = newVolume;
    setIsMuted(!isMuted);
    
    // Update volume bar color
    const volumeBar = document.querySelector(`.${classes.volumeBar}`);
    if (volumeBar) {
      volumeBar.style.setProperty('--volume-before-width', `${newVolume * 100}%`);
    }
  };

  return (
    <div className={classes.videoWrapper} dir="rtl">
      <div className={classes.customVideoPlayer}>
        <video
          ref={videoRef}
          className={classes.videoElement}
          width="100%"
          src={video?.src}
        >
          <source src={video?.src} type="video/mp4" />
          المتصفح الخاص بك لا يدعم عرض الفيديو.
        </video>
        <div className={classes.videoControls}>
          <button className={classes.playPauseBtn} onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className={classes.progressContainer}>
            <input
              type="range"
              className={classes.progressBar}
              value={progress}
              onChange={handleProgressChange}
              min="0"
              max="100"
            />
            <span className={classes.timeDisplay}>{currentTime} / {duration}</span>
          </div>
          <div className={classes.volumeControl}>
            <button className={classes.muteBtn} onClick={toggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              className={classes.volumeBar}
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </div>
          <button className={classes.fullScreenBtn} onClick={toggleFullScreen}>
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
