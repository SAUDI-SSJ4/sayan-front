import React, { useState, useRef, useEffect } from 'react';
import classes from './CustomVideoPlayer.module.scss';
import { FaExpand, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { apiCall } from '../../../../utils/auth';

const BASE_URL = "https://www.sayan-server.com";

const CustomVideoPlayer = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Load video with authentication
  useEffect(() => {
    const loadVideo = async () => {
      if (!video) return;

      const token = Cookies.get("student_token");
      if (!token) {
        setError('لا يوجد رمز مصادقة');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const videoUrl = `${BASE_URL}/website/videos/${video}/stream`;
        const authenticatedUrl = `${videoUrl}?token=${encodeURIComponent(token)}&t=${Date.now()}`;
        
        if (videoRef.current) {
          videoRef.current.src = authenticatedUrl;
        }
      } catch (error) {
        console.error('Error loading video:', error);
        setError('حدث خطأ في تحميل الفيديو');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [video]);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
        setCurrentTime(formatTime(videoRef.current.currentTime));
        const progressBar = document.querySelector(`.${classes.progressBar}`);
        if (progressBar)
          progressBar.style.setProperty('--seek-before-width', `${progress}%`);
        const videoElement = videoRef.current;
        videoElement.style.setProperty('--video-progress-width', `${100 - progress}%`);
      }
    };

    const updateDuration = () => {
      if (videoRef.current) {
        setDuration(formatTime(videoRef.current.duration));
      }
    };

    const handleVideoError = (e) => {
      console.error('Video error:', e);
      console.error('Video error details:', e.target.error);
      setLoading(false);
    };

    const handleVideoLoaded = () => {
      console.log('Video loaded successfully');
      setLoading(false);
    };

    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.addEventListener('timeupdate', updateProgress);
      currentVideo.addEventListener('loadedmetadata', updateDuration);
      currentVideo.addEventListener('error', handleVideoError);
      currentVideo.addEventListener('loadeddata', handleVideoLoaded);
      currentVideo.addEventListener('play', () => setIsPlaying(true));
      currentVideo.addEventListener('pause', () => setIsPlaying(false));
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('timeupdate', updateProgress);
        currentVideo.removeEventListener('loadedmetadata', updateDuration);
        currentVideo.removeEventListener('error', handleVideoError);
        currentVideo.removeEventListener('loadeddata', handleVideoLoaded);
        currentVideo.removeEventListener('play', () => setIsPlaying(true));
        currentVideo.removeEventListener('pause', () => setIsPlaying(false));
      }
    };
  }, [video]);

  useEffect(() => {
    const volumeBar = document.querySelector(`.${classes.volumeBar}`);
    if (volumeBar)
      volumeBar.style.setProperty('--volume-before-width', `${volume * 100}%`);
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleProgressChange = (e) => {
    if (videoRef.current) {
      const newTime = (e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
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
    if (videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);

    const volumeBar = e.target;
    volumeBar.style.setProperty('--volume-before-width', `${newVolume * 100}%`);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
    const volumeBar = document.querySelector(`.${classes.volumeBar}`);
    if (volumeBar)
      volumeBar.style.setProperty('--volume-before-width', `${videoRef.current.volume * 100}%`);
  };

  if (!video) {
    return <div className="text-center p-4">لا يتوفر فيديو لهذا الدرس.</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4" style={{ background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px' }}>
        <h5 style={{ color: '#856404' }}>تحذير أمني</h5>
        <p style={{ color: '#856404', margin: 0 }}>{error}</p>
        <button 
          className="btn btn-warning mt-2" 
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className={classes.videoWrapper} dir="rtl">
      <div className={classes.customVideoPlayer}>
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="text-white">جاري تحميل الفيديو...</div>
          </div>
        )}
        <video
          ref={videoRef}
          className={classes.videoElement}
          width="100%"
          preload="metadata"
          crossOrigin="anonymous"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          playsInline
        >
          المتصفح الخاص بك لا يدعم عرض الفيديو.
        </video>
        <div className={classes.videoControls}>
          <button className={classes.playPauseBtn} onClick={togglePlayPause} disabled={loading}>
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
              disabled={loading}
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