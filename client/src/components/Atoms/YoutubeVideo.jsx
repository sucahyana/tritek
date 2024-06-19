import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const YoutubeVideo = ({ videoId, muted }) => {
    const playerRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [animationState, setAnimationState] = useState('initial');
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (playerRef.current) {
            if (muted) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
            }
        }
        setIsMuted(muted);
    }, [muted]);

    const _onReady = (event) => {
        playerRef.current = event.target;
        if (muted) {
            event.target.mute();
        } else {
            event.target.unMute();
        }
        setIsVideoLoaded(true);
    };

    useEffect(() => {
        let timeoutId;
        if (isVideoLoaded && animationState === 'animating') {
            timeoutId = setTimeout(() => {
                setAnimationState('fadingOut');
            }, 5000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isVideoLoaded, animationState]);

    const handleAnimationEnd = () => {
        if (animationState === 'fadingOut') {
            setAnimationState('hidden');
        }
    };

    return (
        <div className="video-responsive relative">
            <YouTube videoId={videoId} opts={{ playerVars: { autoplay: 1, controls: 1 } }} onReady={_onReady} />
            {isLoading && animationState !== 'hidden' && (
                <div
                    className={`absolute inset-0 bg-none flex justify-center items-center ${
                        animationState === 'animating' ? '' : ''
                    } ${animationState === 'fadingOut' ? 'animate-fadeOut' : ''}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <div className={`grid grid-cols grid-2 w-full h-full shadow-2xl`}>
                        <div className={`bg-green-200 animate-slideUp shadow-2xl border-dotted border-b-2 border-gray-600`}></div>
                        <div className={`bg-green-200 animate-slideDown shadow-2xl border-dotted border-t-2 border-gray-600`}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoutubeVideo;
